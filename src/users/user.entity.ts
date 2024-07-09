import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Book } from '../books/book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
