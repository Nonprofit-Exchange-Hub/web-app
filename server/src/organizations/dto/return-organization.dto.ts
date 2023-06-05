import { IsNotEmpty } from 'class-validator';

import { CreateOrganizationDto } from './create-organization.dto';

export class ReturnOrganizationDto extends CreateOrganizationDto {
  @IsNotEmpty()
  id: number;
}
