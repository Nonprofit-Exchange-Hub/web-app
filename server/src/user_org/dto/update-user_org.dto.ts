import { PartialType } from '@nestjs/mapped-types';
import { CreateUserOrganizationDto } from './create-user_org.dto';

export class UpdateUserOrganizationDto extends PartialType(CreateUserOrganizationDto) {}
