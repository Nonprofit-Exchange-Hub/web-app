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

@Entity('userOrganizations')
export class UserOrganization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.pending,
  })
  approvalStatus: ApprovalStatus;

  @ManyToOne(() => Organization, (org) => org.users, { eager: true })
  organization!: Organization;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.admin,
  })
  role: Role;

  @ManyToOne(() => User, (user) => user.organizations, { eager: true })
  user!: User;

  @CreateDateColumn()
  created_at: Date;
}
