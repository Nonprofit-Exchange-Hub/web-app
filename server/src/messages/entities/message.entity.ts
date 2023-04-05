import { Organization } from '../../organizations/entities/organization.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { User } from '../../acccount-manager/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

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

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn()
  sending_user: User;

  @ManyToOne(() => Organization, (org) => org.messages)
  @JoinColumn()
  sending_org: Organization;

  @ManyToOne(() => Transaction, (transaction) => transaction.messages)
  @JoinColumn()
  transaction: Transaction;
}
