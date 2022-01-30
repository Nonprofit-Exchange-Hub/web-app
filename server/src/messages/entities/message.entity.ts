import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
// import { Transaction } from '../../transactions/entities/transaction.entity'

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

  // TODO: uncomment the code below when transactions are set up
  // make sure to set up corresponding relationship in transactions
  // and note the ramifications on MessageInboxView component before updating

  // @ManyToOne(() => Transaction, transaction => transaction.messages)
  // transaction: Transaction

  @Column('int')
  transaction_id: number;
}
