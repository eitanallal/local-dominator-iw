import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  title!: string;

  @Column('text', { array: true, nullable: true })
  tags!: string[];

  @Column({ type: 'text', nullable: true })
  content!: string;

  @ManyToOne(() => User, { eager: false })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
