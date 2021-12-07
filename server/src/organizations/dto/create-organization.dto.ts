import { Organization } from '../entities/organization.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrganizationDto {
  name: string;
  description: string;
  website: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  ein: number;
  tax_exempt_id: number;
}
