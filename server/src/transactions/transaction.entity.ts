import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm";
import { TransactionStatus } from "./transaction-status.enum";
import { User } from "../users/entities/user.entity"
import { Asset } from "../assets/entities/asset.entity"
import { Organization } from "../organizations/entities/organization.entity"

@Entity('transactions')

export class Transaction{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  donater_user_id: number;

  @Column('int')
  donater_organization_id: number;

  @Column('int')
  requester_id: number;

  @Column('int')
  asset_id: number;

  @Column()
  status: TransactionStatus;

  @Column()
  created_date: Date;

  // Unclear if this is the proper syntax
  @ManyToOne(_type => User, (user) => user.transactions, { eager: false })
  user: User;
}