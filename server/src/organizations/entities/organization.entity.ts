import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserOrganization } from '../../user-org/entities/user-org.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('organizations')
export class Organization {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  name: string;

  @ApiProperty()
  @Column('text')
  doing_business_as: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column('text')
  website: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  facebook?: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  twitter?: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  instagram?: string;

  @ApiProperty()
  @Column('text')
  address: string;

  @ApiProperty()
  @Column('text')
  phone: string;

  @ApiProperty()
  @Column('text')
  city: string;

  @ApiProperty()
  @Column('text')
  state: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  zip_code: string;

  @ApiProperty()
  @Column({ type: 'text', unique: true })
  ein: string;

  @ApiProperty()
  @Column({ type: 'text' })
  nonprofit_classification: string;

  @ApiProperty({ type: () => UserOrganization })
  @OneToMany(() => UserOrganization, (user_org) => user_org.organization)
  users: UserOrganization[];

  @ApiProperty({ type: () => Transaction })
  @OneToMany(() => Transaction, (transaction) => transaction.donater_organization)
  donated_transactions: Transaction[];

  @ApiProperty({ type: () => Transaction })
  @OneToMany(() => Transaction, (transaction) => transaction.claimer)
  claimed_transactions: Transaction[];

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  image_url: string;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  categories: { names: string[] };
}
