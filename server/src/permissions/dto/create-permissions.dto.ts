import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateOrganizationDto } from '../../organizations/dto/create-organization.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';

import { ApprovalStatus, Role } from '../constants';

export class CreatePermissionsDto {
  @IsOptional()
  @IsEnum(ApprovalStatus)
  approvalStatus: ApprovalStatus;

  @IsNotEmpty({ message: 'org_id is required' })
  organization: CreateOrganizationDto;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty({ message: 'user_id is required' })
  user: CreateUserDto;
}
