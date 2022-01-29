import { Organization } from '../../organizations/entities/organization.entity';
import { User } from '../../users/entities/user.entity';
import { ApprovalStatus, Role } from '../constants';

export class CreateUserOrganizationDto {
  approvalStatus: ApprovalStatus;
  organization: Organization;
  role: Role;
  user: User;
}
