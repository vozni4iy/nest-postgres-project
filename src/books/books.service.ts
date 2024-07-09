import { In, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Book } from './book.entity';
import { BookDTO, CreateBookDTO, TransformedBook, transformBook } from './books.utils';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<TransformedBook[]> {
    const books = await this.booksRepository.find({ relations: ['authors'] });
    return books.map(transformBook);
  }

  async findOne(id: string): Promise<TransformedBook> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['authors'] });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return transformBook(book);
  }

  async create(bookData: CreateBookDTO): Promise<Book> {
    const authors = await this.usersRepository.findBy({
      id: In(bookData.authors),
    });
    if (authors.length === 0) {
      throw new NotFoundException(`Authors not found`);
    }
    const book = this.booksRepository.create({
      ...bookData,
      authors,
    });
    return this.booksRepository.save(book);
  }

  async update(id: string, bookData: BookDTO): Promise<TransformedBook> {
    const book = await this.booksRepository.findOne({ where: { id }, relations: ['authors'] });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    const authors = await this.usersRepository.findBy({
      id: In(bookData.authors),
    });
    if (authors.length === 0) {
      throw new NotFoundException(`Authors not found`);
    }

    await this.booksRepository.save({
      ...book,
      ...bookData,
      authors,
    });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.booksRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
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
