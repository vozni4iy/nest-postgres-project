import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BooksService } from '../books/books.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: BooksService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should return a user by id', async () => {
    const user = new User();
    jest.spyOn(service, 'findOne').mockResolvedValue(user);
    expect(await controller.findOne('1')).toBe(user);
  });

  it('should create a user', async () => {
    const user = new User();
    jest.spyOn(service, 'create').mockResolvedValue(user);
    expect(await controller.create({ name: 'John Doe' })).toBe(user);
  });

  it('should update a user', async () => {
    const user = new User();
    jest.spyOn(service, 'update').mockResolvedValue(user);
    expect(await controller.update('1', { name: 'John Doe' })).toBe(user);
  });

  it('should delete a user', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    expect(await controller.remove('1')).toBe(undefined);
  });
});
