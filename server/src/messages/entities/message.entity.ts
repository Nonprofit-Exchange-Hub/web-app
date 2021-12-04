import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
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

  @Column('int')
  user_id: number;

  @Column('text')
  user_first_name: string;

  // @ManyToOne(() => User, (user) => user.messages)
  // user: User;

  // code below (and import above) for when Transaction is set up
  // @ManyToOne(() => Transaction, transaction => transaction.messages)
  // transaction: Transaction

  @Column('int')
  transaction_id: number;
}
