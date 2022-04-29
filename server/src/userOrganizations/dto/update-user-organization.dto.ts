import { PartialType } from '@nestjs/mapped-types';
import { CreateUserOrganizationDto } from './create-user-organization.dto';

export class UpdateUserOrganizationDto extends PartialType(CreateUserOrganizationDto) {}
