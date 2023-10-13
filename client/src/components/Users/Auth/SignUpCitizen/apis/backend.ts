import axios from 'axios';

import { Profile, UserSignupData } from '../types/UserSignupData';

const client = axios.create({
  baseURL: '/api',
});

const Endpoints = {
  userRegister: (userData: UserSignupData) => {
    const body = {
      firstName: userData.firstName,
      last_name: userData.lastName,
      city: userData.city,
      state: userData.state,
      zip_code: userData.zipCode,
      email_notification_opt_out: true,
      email: userData.email,
      password: userData.password,
      bio: userData.bio,
      interests: {
        names: userData.interests,
      },
    };
    return client.post('/auth/register', body);
  },
  checkUserEmail: (userEmail: string) => {
    return client.get(`/auth/user-email-exists/${userEmail}`);
  },
  userUpdateProfile: (profile: Profile) => {
    const { file, userId } = profile;
    const formData = new FormData();
    formData.append('profile_image', file);
    return client.put(`/auth/users/profile/${userId}`, formData);
  },
};

export default Endpoints;
