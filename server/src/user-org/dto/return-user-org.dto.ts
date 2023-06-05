import { IsNotEmpty } from 'class-validator';

import { CreateUserOrganizationDto } from './create-user-org.dto';

export class ReturnUserOrganizationDto extends CreateUserOrganizationDto {
  @IsNotEmpty()
  id: number;
}
