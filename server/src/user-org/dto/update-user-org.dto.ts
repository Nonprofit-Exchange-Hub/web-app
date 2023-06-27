import { CreateUserOrganizationDto } from './create-user-org.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateUserOrganizationDto extends PickType(CreateUserOrganizationDto, [
  'approvalStatus',
  'role',
] as const) {}
