import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../account-manager/entities/user.entity';

import { AssetType, Condition } from '../constants';
import { Transaction } from '../../transactions/entities/transaction.entity';

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

  @Column({
    type: 'text',
    nullable: true,
  })
  location: string;

  @CreateDateColumn()
  datePosted: Date;

  @Column('int')
  quantity: number;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  imgUrls: string[];

  @ManyToOne(() => User, (user) => user.assets, { eager: true })
  @JoinColumn()
  poster: User;

  @OneToMany(() => Transaction, (transaction) => transaction.asset)
  transactions: Transaction[];
}
