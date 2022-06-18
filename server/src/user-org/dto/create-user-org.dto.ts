import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateOrganizationDto } from 'src/organizations/dto/create-organization.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { ApprovalStatus, Role } from '../constants';

export class CreateUserOrganizationDto {
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
