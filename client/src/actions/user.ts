import Endpoints from '../apis/backend';

import type { RootState, AppDispatch } from '../reducers/store';
import { UserSignupData } from '../components/Users/Auth/SignUpCitizen/UserSignupData';

export const ActionTypes = {
  USER_SIGNUP_PENDING: 'USER_SIGNUP_PENDING',
  USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',
  USER_SIGNUP_ERROR: 'USER_SIGNUP_ERROR',
};

const Actions = {
  userSignup: (userData: UserSignupData) => (dispatch: AppDispatch, getState: RootState) => {
    console.log('ACTION: ', userData);
    dispatch({ type: ActionTypes.USER_SIGNUP_PENDING });

    async function registerUser() {
      const user = await Endpoints.userRegister(userData);
      if (user) {
        dispatch({ type: ActionTypes.USER_SIGNUP_SUCCESS, payload: user });
      }
    }

    registerUser();
  },
};

export default Actions;
