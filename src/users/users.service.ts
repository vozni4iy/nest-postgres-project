import { Repository } from 'typeorm';

import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
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

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updateResult = await this.usersRepository.update(id, user);
    if (updateResult.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    console.log('try to delete user');
    await this.booksService.removeUserFromBooks(id);
    const deleteResult = await this.usersRepository.delete(id);
    if (deleteResult.affected === 0) {
      console.log('delete user not found');
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
