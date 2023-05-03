import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../acccount-manager/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

import { AssetType, Condition } from '../constants';

@Entity('assets')
export class Asset {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  title: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AssetType,
    default: AssetType.REQUEST,
  })
  type: AssetType;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Condition,
    default: Condition.NONE,
  })
  condition: Condition;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
  })
  location: string;

  @ApiProperty()
  @CreateDateColumn()
  datePosted: Date;

  @ApiProperty()
  @Column('int')
  quantity: number;

  @ApiProperty()
  @Column({
    type: 'simple-array',
    nullable: true,
  })
  imgUrls: string[];

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.assets, { eager: true })
  @JoinColumn()
  poster: User;

  @ApiProperty()
  @OneToMany(() => Transaction, (transaction) => transaction.asset)
  transactions: Transaction[];
}
