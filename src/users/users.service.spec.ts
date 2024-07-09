import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BooksService } from '../books/books.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: BooksService,
          useValue: {
            removeUserFromBooks: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users', async () => {
    jest.spyOn(userRepository, 'find').mockResolvedValue([]);
    const users = await service.findAll();
    expect(users).toEqual([]);
  });

  it('should find one user by id', async () => {
    const user = new User();
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
    expect(await service.findOne('1')).toBe(user);
  });

  it('should create a new user', async () => {
    const user = new User();
    jest.spyOn(userRepository, 'create').mockReturnValue(user);
    jest.spyOn(userRepository, 'save').mockResolvedValue(user);
    expect(await service.create(user)).toBe(user);
  });

  it('should update a user', async () => {
    const user = new User();
    jest
      .spyOn(userRepository, 'update')
      .mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
    jest.spyOn(service, 'findOne').mockResolvedValue(user);
    expect(await service.update('1', user)).toBe(user);
  });

  it('should delete a user', async () => {
    jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 1, raw: {} });
    jest.spyOn(booksService, 'removeUserFromBooks').mockResolvedValue();
    await expect(service.remove('1')).resolves.not.toThrow();
  });
});
