import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';

import { Book } from './book.entity';
import { BooksService } from './books.service';
import { BookDTO, CreateBookDTO, TransformedBook } from './books.utils';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<TransformedBook[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TransformedBook> {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() book: CreateBookDTO): Promise<Book> {
    return this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() book: BookDTO): Promise<TransformedBook> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
