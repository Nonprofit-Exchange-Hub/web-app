import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Organization } from '../../organizations/entities/organization.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Asset, (asset) => asset.poster)
  assets: Asset[];

  @OneToMany(() => Transaction, (transaction) => transaction.asset.poster)
  transactions: Transaction[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Organization, (org) => org.users, { nullable: true, eager: true })
  @JoinTable()
  organizations: Organization[];
}
