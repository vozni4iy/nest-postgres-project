import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksModule } from '../books/books.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => BooksModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
