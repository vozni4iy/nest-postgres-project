import { Repository } from 'typeorm';

import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BooksService } from '../books/books.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => BooksService))
    private booksService: BooksService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.booksService.removeUserFromBooks(id);
    await this.usersRepository.delete(id);
  }
}
