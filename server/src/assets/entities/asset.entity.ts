import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { AssetType, Condition } from '../constants';

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

  @ManyToOne(() => User, (user) => user.assets, { eager: true })
  @JoinColumn()
  donater: User;

  @ManyToOne(() => Organization, (organization) => organization.assets)
  @JoinColumn()
  donater_organization?: Organization;

  @OneToMany(() => Transaction, (transaction) => transaction.asset)
  transactions: Transaction[];
}
