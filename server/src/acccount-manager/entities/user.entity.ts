import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { UserOrganization } from '../../user-org/entities/user-org.entity';
import { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  firstName: string;

  @ApiProperty()
  @Column('text')
  last_name: string;

  @ApiProperty()
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty()
  @Column('text')
  password: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  bio?: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  city: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  state: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  zip_code: string;

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  email_notification_opt_out: boolean;

  @ApiProperty()
  @Column({ type: 'bool', default: false })
  email_verified: boolean;

  @OneToMany(() => Asset, (asset) => asset.poster)
  assets: Asset[];

  @OneToMany(() => Transaction, (transaction) => transaction.donater_user)
  transactions: Transaction[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => UserOrganization, (user_org) => user_org.user)
  organizations: UserOrganization[];

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  profile_image_url?: string;

  @ApiProperty()
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  interests?: { names: string[] };
}
