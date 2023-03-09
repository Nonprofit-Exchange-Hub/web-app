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
