import { User } from '../users/user.entity';
import { Book } from './book.entity';
import { BookDTO, CreateBookDTO, TransformedBook } from './books.utils';

const testBookDetails = {
  title: 'Test title',
  description: 'Test desc',
  pages: 100,
  price: 30,
};

export const testBookCreated: CreateBookDTO = {
  ...testBookDetails,
  authors: ['test_authors'],
};

export const testBookUpdated: BookDTO = {
  id: '1',
  ...testBookCreated,
};

export const testBook: TransformedBook = {
  id: '1',
  ...testBookDetails,
  authorsInfo: [
    {
      id: '1',
      name: 'Test author',
    },
  ],
};

export const testBookAuthors: User[] = [
  {
    id: '1',
    name: 'Test author',
    email: '',
    password: '',
    books: [],
  },
];

export const testBookEntity: Book = {
  id: '1',
  ...testBookDetails,
  authors: testBookAuthors,
};
