import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import { UserOrganization } from '../../user-org/entities/user-org.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  doing_business_as: string;

  @Column('text')
  description: string;

  @Column('text')
  website: string;

  @Column('text')
  address: string;

  @Column('text')
  phone: string;

  @Column('text')
  city: string;

  @Column('text')
  state: string;

  @Column({ type: 'text', unique: true })
  ein: string;

  @Column({ type: 'text' })
  nonprofit_classification: string;

  @OneToMany(() => UserOrganization, (user_org) => user_org.organization)
  users: UserOrganization[];

  @OneToMany(() => Transaction, (transaction) => transaction.donater_organization)
  donated_transactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.claimer)
  claimed_transactions: Transaction[];
}
