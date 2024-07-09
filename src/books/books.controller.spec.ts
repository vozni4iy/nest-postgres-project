import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Book } from './book.entity';
import { BooksController } from './books.controller';
import { testBook, testBookCreated, testBookUpdated } from './books.mocks';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all books', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should return a book by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(testBook);
    expect(await controller.findOne('1')).toBe(testBook);
  });

  it('should create a book', async () => {
    const book = new Book();
    jest.spyOn(service, 'create').mockResolvedValue(book);
    expect(await controller.create(testBookCreated)).toBe(book);
  });

  it('should update a book', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(testBook);
    expect(await controller.update('1', testBookUpdated)).toBe(testBook);
  });

  it('should delete a book', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    expect(await controller.remove('1')).toBe(undefined);
  });
});
