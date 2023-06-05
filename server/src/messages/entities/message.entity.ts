import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

import { User } from '../../acccount-manager/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_date: Date;

  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Transaction, (transaction) => transaction.messages)
  @JoinColumn()
  transaction: Transaction;
}
