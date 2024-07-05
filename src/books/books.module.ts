import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { Book } from './book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User]), UsersModule],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
