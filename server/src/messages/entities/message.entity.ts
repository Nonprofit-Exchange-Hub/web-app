import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../acccount-manager/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('messages')
export class Message {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  text: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_date: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  @JoinColumn()
  user: User;

  @ApiProperty({ type: () => Transaction })
  @ManyToOne(() => Transaction, (transaction) => transaction.messages)
  @JoinColumn()
  transaction: Transaction;
}
