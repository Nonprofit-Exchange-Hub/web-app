import Endpoints from '../apis/backend';

import type { RootState, AppDispatch } from '../reducers/store';
import { UserSignupData } from '../components/Users/Auth/SignUpCitizen/UserSignupData';

export const Types = {
  USER_SIGNUP_START: 'USER_SIGNUP_START',
  USER_SIGNUP_IN_PROGRESS: 'USER_SIGNUP_IN_PROGRESS',
  USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',
  USER_SIGNUP_ERROR: 'USER_SIGNUP_ERROR',
};

const Actions = {
  userSignup: (userData: UserSignupData) => (dispatch: AppDispatch, getState: RootState) => {
    console.log('ACTION: ', userData);
    dispatch({ type: Types.USER_SIGNUP_START });

    async function registerUser() {
      const user = await Endpoints.userRegister(userData);
      if (user) {
        console.log(user);
        dispatch({ type: Types.USER_SIGNUP_SUCCESS, payload: user });
      }
    }

    registerUser();
  },
};

export default Actions;
