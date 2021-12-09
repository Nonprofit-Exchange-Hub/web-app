import { User_organization } from 'src/user_org/entities/user_org.entitiy';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
  // added for many to many relationship with user_org
  @OneToMany(() => User_organization, (user_org) => user_org.organization)
  user_organizations: User_organization[];
}
