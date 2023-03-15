import { IsEmail, IsNotEmpty, IsBoolean, IsOptional, Validate } from 'class-validator';
import { UserInterestNamesIsArray, UserInterestsProps } from './user-interest.validator';

export class UserInterests {
  @IsNotEmpty()
  names: string[];
}
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
  @Validate(UserInterestsProps)
  @Validate(UserInterestNamesIsArray)
  interests?: UserInterests;

  @IsBoolean()
  email_verified?: boolean;
}
