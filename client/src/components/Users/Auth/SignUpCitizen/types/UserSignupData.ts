export interface UserSignupData {
  firstName: string;
  last_name: string;
  email: string;
  password: string;
  acceptTerms?: boolean;
}

// ###need to implement this due to recent user sign up flow change to only needing email and pass, can update profile information later
// export interface UserProfileData {
// email_notification_opt_out?: boolean;
// city: string;
// state: string;
// zipCode: string;
// interests: string[];
// bio: string;
// passwordConfirm: string;
// }

export interface Profile {
  file: File;
  userId: number;
}
