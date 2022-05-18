import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('poc_chat')
export class PocChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column('text')
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_date: Date;

  // @ManyToOne(() => User, (user) => user.messages, { eager: true })
  // @JoinColumn()
  // user: User;

  // @ManyToOne(() => Transaction, (transaction) => transaction.messages)
  // transaction: Transaction;

  constructor(pocChat: Partial<PocChat>) {
    Object.assign(this, pocChat);
  }
}
