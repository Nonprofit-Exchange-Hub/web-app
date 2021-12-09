import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from 'src/transactions/transaction.entity';

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

  @Column({type:'int', unique: true})
  ein: number;

  @Column('int')
  tax_exempt_id: number;

  @OneToMany(() => Transaction, (transaction)=> transaction.donater_organization || transaction.recipient, { eager: true})
  transactions: Transaction[];

}
