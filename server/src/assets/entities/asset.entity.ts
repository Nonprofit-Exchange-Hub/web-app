import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

import { AssetType, Condition } from '../constants';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: AssetType,
    default: AssetType.REQUEST,
  })
  type: AssetType;

  @Column({
    type: 'enum',
    enum: Condition,
    default: Condition.NONE,
  })
  condition: Condition;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.assets)
  @JoinColumn()
  poster: User;

  @OneToMany(() => Transaction, (transaction) => transaction.asset, { eager: true })
  @JoinColumn()
  transactions: Transaction[];
}
