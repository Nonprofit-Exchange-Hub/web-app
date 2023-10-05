export interface UserSignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms?: boolean;
  email_notification_opt_out?: boolean;
  city: string;
  state: string;
  zipCode: string;
  interests: string[];
  bio: string;
  passwordConfirm: string;
}

export interface Profile {
  file: File;
  userId: number;
}
