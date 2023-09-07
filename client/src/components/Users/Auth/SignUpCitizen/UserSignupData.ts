export interface UserSignupData {
  firstName: string;
  last_name: string;
  email: string;
  password: string;
  accept_terms?: boolean;
  email_notification_opt_out?: boolean;
  city?: string;
  state?: string;
  zip_code?: string;
  interests: string[];
  bio?: string;
}
export const emptyUserSignupData: UserSignupData = {
  firstName: '',
  last_name: '',
  email: '',
  password: '',
  accept_terms: false,
  email_notification_opt_out: false,
  city: '',
  state: '',
  zip_code: '',
  interests: [],
  bio: '',
};
