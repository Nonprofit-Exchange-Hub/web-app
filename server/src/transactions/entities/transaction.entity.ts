import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionStatus } from '../transaction-status.enum';
import { User } from '../../users/entities/user.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.IN_PROGRESS,
  })
  status: TransactionStatus;

  @CreateDateColumn()
  created_date: Date;

  @ManyToOne(() => Asset, (asset) => asset.transactions, { eager: true })
  @JoinColumn()
  asset: Asset;

  @ManyToOne(() => Organization, (recipient) => recipient.transactions)
  @JoinColumn()
  recipient: Organization;

  @OneToMany(() => Message, (message) => message.transaction)
  @JoinColumn()
  messages: Message;
}
