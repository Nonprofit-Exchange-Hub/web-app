import { IsEmail, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
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
  @IsBoolean()
  email_verified?: boolean;
}
