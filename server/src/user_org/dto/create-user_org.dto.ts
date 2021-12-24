import { PartialType } from '@nestjs/mapped-types';
import { UserOrganization, Role, ApprovalStatus } from '../entities/user_org.entitiy';

export class CreateUserOrganizationDto extends PartialType(UserOrganization) {
  user_id: number;
  org_id: number;
  role: Role;
  approvalStatus: ApprovalStatus;
}
