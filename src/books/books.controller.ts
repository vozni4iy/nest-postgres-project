import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { Book } from './book.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<any[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() book: Partial<Book> & { authors: string[] }): Promise<Book> {
    return this.booksService.create(book);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() book: Partial<Book> & { authors: string[] },
  ): Promise<Book> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
