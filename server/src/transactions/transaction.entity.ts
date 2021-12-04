import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('transactions')

export class Transaction{
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  donater_user_id: string;

  @Column()
  donater_organization_id: string;

  @Column()
  requester_id: string;

  @Column()
  asset_id: string;

  @Column()
  status: string;

  @Column()
  created_date: string;
}