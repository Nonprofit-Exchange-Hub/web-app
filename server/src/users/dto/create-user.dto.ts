import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { User } from '../entities/user.entity';

export class CreateUserDto extends PartialType(User) {
  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}
