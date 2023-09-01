import Endpoints from '../apis/backend';

import type { RootState, AppDispatch } from '../reducers/store';
import { UserSignupData } from '../components/Users/Auth/SignUpCitizen/types/UserSignupData';

export const ActionTypes = {
  USER_SIGNUP_PENDING: 'USER_SIGNUP_PENDING',
  USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',
  USER_SIGNUP_ERROR: 'USER_SIGNUP_ERROR',
};

const Actions = {
  userSignup: (userData: UserSignupData) => (dispatch: AppDispatch, getState: RootState) => {
    async function registerUser() {
      dispatch({ type: ActionTypes.USER_SIGNUP_PENDING });
      const user = await Endpoints.userRegister(userData);
      if (user) {
        dispatch({ type: ActionTypes.USER_SIGNUP_SUCCESS, payload: user });
      }
    }

    registerUser();
  },
};

export default Actions;
