import { PartialType } from '@nestjs/mapped-types';
import { User_organization } from '../entities/user_org.entitiy';

export class CreateUserOrganizationDto extends PartialType(User_organization) {
    user_id: number;
    org_id: number;
    role: Role;
    approvalStatus: ApprovalStatus;
}
