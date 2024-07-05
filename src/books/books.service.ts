import { In, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Book } from './book.entity';
import { transformBook } from './books.utils';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any[]> {
    const books = await this.booksRepository.find({ relations: ['authors'] });
    return books.map(transformBook);
  }

  async findOne(id: string): Promise<any> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['authors'] });
    return transformBook(book);
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const authors = await this.usersRepository.findBy({
      id: In(bookData.authors),
    });
    const book = this.booksRepository.create({
      ...bookData,
      authors,
    });
    return this.booksRepository.save(book);
  }

  async update(id: string, bookData: Partial<Book>): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['authors'] });
    const authors = await this.usersRepository.findBy({
      id: In(bookData.authors),
    });

    await this.booksRepository.save({
      ...book,
      ...bookData,
      authors,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async removeUserFromBooks(userId: string): Promise<void> {
    const books = await this.booksRepository.find({ relations: ['authors'] });
    for (const book of books) {
      book.authors = book.authors.filter((author) => author.id !== userId);
      if (book.authors.length === 0) {
        await this.booksRepository.delete(book.id);
      } else {
        await this.booksRepository.save(book);
      }
    }
  }
}
