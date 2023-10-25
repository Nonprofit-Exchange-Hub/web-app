import { IsBoolean, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { InterestsProps, InterestNamesIsArray } from '../../shared/interests.validator';
import { Interests } from '../../shared/interests.dto';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  last_name: string;

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
}
