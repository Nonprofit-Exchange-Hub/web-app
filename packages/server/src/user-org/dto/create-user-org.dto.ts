import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { ApprovalStatus, Role } from '../constants';

export class CreateUserOrganizationDto {
  @IsOptional()
  @IsEnum(ApprovalStatus)
  approvalStatus: ApprovalStatus;

  @IsNotEmpty({ message: 'org_id is required' })
  organization: Organization;

  @IsNotEmpty({ message: 'role is required' })
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty({ message: 'user_id is required' })
  user: User;
}
