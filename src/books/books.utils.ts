import { Book } from './book.entity';

type BookWithoutAuthors = Omit<Book, 'authors'>;
type AuthorsInfo = {
  id: string;
  name: string;
};

type TransformedBook = BookWithoutAuthors & { authorsInfo: AuthorsInfo[] };

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
