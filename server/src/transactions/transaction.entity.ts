import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TransactionStatus } from "./transaction-status.enum";

@Entity('transactions')

export class Transaction{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  donater_user_id: number;

  @Column()
  donater_organization_id: number;

  @Column()
  requester_id: number;

  @Column()
  asset_id: number;

  @Column()
  status: TransactionStatus;

  @Column()
  created_date: Date;
}