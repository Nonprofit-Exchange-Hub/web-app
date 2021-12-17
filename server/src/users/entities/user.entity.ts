import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';
import { Transaction } from '../../transactions/entities/transaction.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Asset, (asset) => asset.poster)
  assets: Asset[];

  @OneToMany(() => Transaction, (transaction)=> transaction.donater_user)
  transactions: Transaction[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}