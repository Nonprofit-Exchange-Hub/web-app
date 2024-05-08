
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { InterestsProps, InterestNamesIsArray } from '../../shared/interests.validator';
import { Interests } from '../../shared/interests.dto';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  // @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  zip_code: string;

  @IsOptional()
  email_notification_opt_out: boolean;

  @IsOptional()
  @Validate(InterestsProps)
  @Validate(InterestNamesIsArray)
  interests?: Interests;

}
