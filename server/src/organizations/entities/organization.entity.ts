import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { UserOrganization } from '../../userOrganizations/entities/userOrganization.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { User } from '../../users/entities/user.entity';

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

  @OneToMany(() => UserOrganization, (userOrg) => userOrg.organization)
  users: User[];

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.asset.posterOrganization || transaction.recipient,
  )
  transactions: Transaction[];

  @OneToMany(() => Asset, (asset) => asset.posterOrganization)
  assets: Asset[];
}
