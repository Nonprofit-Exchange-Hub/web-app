import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { ApprovalStatus, Role } from '../constants';

@Entity('permissions')
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organization, (org) => org.users, { eager: true })
  organization!: Organization;

  @ManyToOne(() => User, (user) => user.organizations, { eager: true })
  user!: User;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.admin,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.pending,
  })
  approvalStatus: ApprovalStatus;

  @CreateDateColumn()
  created_date: Date;
}
