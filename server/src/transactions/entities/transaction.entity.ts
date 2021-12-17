import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TransactionStatus } from '../transaction-status.enum';
import { User } from '../../users/entities/user.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { Organization } from '../../organizations/entities/organization.entity';

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

  @Column()
  created_date: Date;

  @ManyToOne((_type) => User, (user) => user.transactions, { eager: false })
  @JoinColumn()
  donater_user: User;

  @ManyToOne(
    (_type) => Organization,
    (organization) => organization.transactions,
    { eager: false },
  )
  @JoinColumn()
  donater_organization?: Organization;

  @ManyToOne((_type) => Asset, (asset) => asset.transactions, { eager: true })
  @JoinColumn()
  asset: Asset;

  @ManyToOne((_type) => Organization, (recipient) => recipient.transactions, {
    eager: false,
  })
  @JoinColumn()
  recipient: Organization;
}
