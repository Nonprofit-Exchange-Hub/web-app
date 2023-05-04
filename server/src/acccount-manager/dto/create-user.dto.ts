import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsBoolean, IsOptional, Validate } from 'class-validator';
import { InterestsProps, InterestNamesIsArray } from '../../shared/interests.validator';
import { Interests } from '../../shared/interests.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'test@test.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  bio?: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  zip_code: string;

  @ApiProperty()
  @IsBoolean()
  email_notification_opt_out: boolean;

  @ApiPropertyOptional({ example: { names: ['furniture'] } })
  @IsOptional()
  @Validate(InterestsProps)
  @Validate(InterestNamesIsArray)
  interests?: Interests;
}
