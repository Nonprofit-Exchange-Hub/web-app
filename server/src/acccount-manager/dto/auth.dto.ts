import { IsEmail } from 'class-validator';

export class VerifyEmailDto {
  token: string;
}

export class LoginDto {
  @IsEmail()
  email: string;
  password: string;
}

export class ResetPasswordDto {
  @IsEmail()
  email: string;
}

export class ReturnUserDto {
  id: number;
  firstName: string;
  last_name: string;
  email: string;
  bio?: string;
  city: string;
  state: string;
  zip_code: string;
  email_notification_opt_out: boolean;
  email_verified: boolean;
  profile_image_url?: string;
}
export class ReturnSessionDto {
  user: ReturnUserDto;
}
