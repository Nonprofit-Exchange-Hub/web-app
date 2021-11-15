import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Considering validators for uniqueness: org_name? ein? both? 
@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  org_name:  string;

  @Column()
  description: string;

  @Column()
  website: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  ein: number;
 
  @Column()
  tax_exempt_id: number;
}
