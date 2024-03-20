import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class LoginDto {
  @IsEmail()
  email: string;
  password: string;
}

export class ResetPasswordRequestDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class ReturnUserDto {
  @Expose()
  id: number;
  @Expose()
  firstName: string;
  @Expose()
  last_name?: string;
  @Expose()
  email: string;
  @Expose()
  bio?: string;
  @Expose()
  city?: string;
  @Expose()
  state?: string;
  @Expose()
  zip_code: string;
  @Expose()
  email_notification_opt_out: boolean;
  @Expose()
  email_verified: boolean;
  @Expose()
  profile_image_url?: string;
}

export class ReturnSessionDto {
  user: ReturnUserDto;
}
