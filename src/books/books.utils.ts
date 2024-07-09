import { Book } from './book.entity';

export type BookWithoutAuthors = Omit<Book, 'authors'>;
type AuthorsInfo = {
  id: string;
  name: string;
};

export type BookDTO = BookWithoutAuthors & { authors: string[] };
export type CreateBookDTO = Omit<BookDTO, 'id'>;
export type TransformedBook = BookWithoutAuthors & { authorsInfo: AuthorsInfo[] };

export const transformBook = (book: Book): TransformedBook => {
  const { authors, ...bookWithoutAuthors } = book;
  const authorsInfo = authors.map((author) => ({
    id: author.id,
    name: author.name,
  }));
  return {
    ...bookWithoutAuthors,
    authorsInfo,
  };
};
