import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../acccount-manager/entities/user.entity';
import { ApprovalStatus, Role } from '../constants';

@Entity('user_organizations')
export class UserOrganization {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.pending,
  })
  approvalStatus: ApprovalStatus;

  @ApiProperty({ type: () => Organization })
  @ManyToOne(() => Organization, (org) => org.users, { eager: true })
  organization!: Organization;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.admin,
  })
  role: Role;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.organizations, { eager: true })
  user!: User;

  @ApiProperty()
  @CreateDateColumn()
  created_date: Date;
}
