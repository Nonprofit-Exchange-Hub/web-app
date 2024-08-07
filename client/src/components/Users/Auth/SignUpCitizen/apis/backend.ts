import axios from 'axios';

import { Profile, UserSignupData } from '../types/UserSignupData';

const client = axios.create({
  baseURL: '/api',
});

const Endpoints = {
  userRegister: (userData: UserSignupData) => {
    const body = {
      firstName: userData.firstName,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
    };
    console.log('backend ts body', body);
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
