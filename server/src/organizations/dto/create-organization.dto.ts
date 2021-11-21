import { Organization } from '../entities/organization.entity'
import { PartialType } from '@nestjs/mapped-types';

// I could see Partial type being helpful in update, but why in create? I saw it in Users and Assets, but I don't see how some of the inputs here could be optional

// also a question: do we want validators on any of these inputs using class-validator? 
export class CreateOrganizationDto extends PartialType(Organization){
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