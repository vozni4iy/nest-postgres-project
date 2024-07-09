import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Book } from './book.entity';
import {
  testBook,
  testBookAuthors,
  testBookCreated,
  testBookEntity,
  testBookUpdated,
} from './books.mocks';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let bookRepository: Repository<Book>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all books', async () => {
    jest.spyOn(bookRepository, 'find').mockResolvedValue([]);
    const books = await service.findAll();
    expect(books).toEqual([]);
  });

  it('should find one book by id', async () => {
    jest.spyOn(bookRepository, 'findOne').mockResolvedValue(testBookEntity);
    expect(await service.findOne('1')).toStrictEqual(testBook);
  });

  it('should create a new book', async () => {
    jest.spyOn(userRepository, 'findBy').mockResolvedValue(testBookAuthors);
    jest.spyOn(bookRepository, 'create').mockReturnValue(testBookEntity);
    jest.spyOn(bookRepository, 'save').mockResolvedValue(testBookEntity);
    expect(await service.create(testBookCreated)).toBe(testBookEntity);
  });

  it('should update a book', async () => {
    jest.spyOn(bookRepository, 'findOne').mockResolvedValue(testBookEntity);
    jest.spyOn(userRepository, 'findBy').mockResolvedValue(testBookAuthors);
    jest.spyOn(bookRepository, 'save').mockResolvedValue(testBookEntity);
    jest
      .spyOn(bookRepository, 'update')
      .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
    jest.spyOn(service, 'findOne').mockResolvedValue(testBook);
    expect(await service.update('1', testBookUpdated)).toBe(testBook);
  });

  it('should delete a book', async () => {
    jest.spyOn(bookRepository, 'delete').mockResolvedValue({ affected: 1, raw: {} });
    await expect(service.remove('1')).resolves.not.toThrow();
  });
});
