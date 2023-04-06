import { IsEmail, IsNotEmpty, IsBoolean, IsOptional, Validate } from 'class-validator';
import { InterestsProps, InterestNamesIsArray } from '../../shared/interests.validator';
import { Interests } from '../../shared/interests.dto';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  bio?: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zip_code: string;

  @IsBoolean()
  email_notification_opt_out: boolean;

  @IsOptional()
  @Validate(InterestsProps)
  @Validate(InterestNamesIsArray)
  interests?: Interests;

  @IsBoolean()
  email_verified?: boolean;
}
