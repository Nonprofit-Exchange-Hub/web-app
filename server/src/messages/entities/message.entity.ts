import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
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

  // @Column('int')
  // user_id: number;

  // @Column('text')
  // user_first_name: string;

  // TODO: remove two fields above and uncomment two below when ready
  // note the ramifications on MessageInboxView component before updating

  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  user: User;

  // @ManyToOne(() => Transaction, transaction => transaction.messages)
  // transaction: Transaction

  @Column('int')
  transaction_id: number;
}
