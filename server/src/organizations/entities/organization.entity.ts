import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { UserOrganization } from '../../user-org/entities/user-org.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Asset } from '../../assets/entities/asset.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

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

  @Column({ type: 'int', unique: true })
  ein: number;

  @Column('int')
  tax_exempt_id: number;

  @OneToMany(() => UserOrganization, (user_org) => user_org.organization)
  users: UserOrganization[];

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.asset.donater_organization || transaction.recipient,
  )
  transactions: Transaction[];

  @OneToMany(() => Asset, (asset) => asset.donater_organization)
  assets: Asset[];
}
