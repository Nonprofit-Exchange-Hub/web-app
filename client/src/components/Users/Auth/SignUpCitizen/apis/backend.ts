import axios from 'axios';

import { UserSignupData } from '../types/UserSignupData';

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
      interests: {
        names: userData.interests,
      },
    };
    return client
      .post('/auth/register', body)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  },
};

export default Endpoints;
