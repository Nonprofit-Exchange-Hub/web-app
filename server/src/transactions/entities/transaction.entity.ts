import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionStatus } from '../transaction-status.enum';
import { User } from '../../acccount-manager/entities/user.entity';
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
    default: TransactionStatus.NEW_CLAIM,
  })
  status: TransactionStatus;

  @CreateDateColumn()
  created_date: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn()
  donater_user: User;

  @ManyToOne(() => Organization, (organization) => organization.donated_transactions)
  @JoinColumn()
  donater_organization?: Organization;

  @ManyToOne(() => Asset, (asset) => asset.transactions, { eager: true })
  @JoinColumn()
  asset: Asset;

  @ManyToOne(() => Organization, (org) => org.claimed_transactions)
  @JoinColumn()
  claimer: Organization;

  @OneToMany(() => Message, (message) => message.transaction)
  @JoinColumn()
  messages: Message[];
}
