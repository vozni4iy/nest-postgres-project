import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  pages: number;

  @Column('decimal')
  price: number;

  @ManyToMany(() => User, (user) => user.books)
  @JoinTable()
  authors: User[];
}
