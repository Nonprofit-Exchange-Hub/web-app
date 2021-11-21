import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Considering validators for uniqueness: org_name? ein? both? 
@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text', unique: true})
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
}
