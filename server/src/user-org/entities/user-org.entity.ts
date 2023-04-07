import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';

import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../acccount-manager/entities/user.entity';
import { ApprovalStatus, Role } from '../constants';

@Entity('user_organizations')
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

  @Column()
  organizationId: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.admin,
  })
  role: Role;

  @ManyToOne(() => User, (user) => user.organizations, { eager: true })
  user!: User;

  @CreateDateColumn()
  created_date: Date;
}
