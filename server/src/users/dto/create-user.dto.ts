import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

import { Organization } from '../../organizations/entities/organization.entity';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  organizations?: Organization[];
}
