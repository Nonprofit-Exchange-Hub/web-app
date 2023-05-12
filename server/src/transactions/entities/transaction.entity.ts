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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionStatus } from '../transaction-status.enum';
import { User } from '../../acccount-manager/entities/user.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('transactions')
export class Transaction {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.NEW_CLAIM,
  })
  status: TransactionStatus;

  @ApiProperty()
  @CreateDateColumn()
  created_date: Date;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn()
  donater_user: User;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (organization) => organization.donated_transactions)
  @JoinColumn()
  donater_organization?: Organization;

  @ApiProperty({ type: () => Asset })
  @ManyToOne(() => Asset, (asset) => asset.transactions, { eager: true })
  @JoinColumn()
  asset: Asset;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (org) => org.claimed_transactions)
  @JoinColumn()
  claimer: Organization;

  @ApiProperty()
  @OneToMany(() => Message, (message) => message.transaction)
  @JoinColumn()
  messages: Message[];
}
