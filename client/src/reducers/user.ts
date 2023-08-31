import { ActionTypes } from '../actions/user';

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  city: null,
  state: null,
  zipCode: null,
  interests: [],
  profileImageUrl: null,
  emailVerified: false,
  isLoading: false,
  error: null,
};

interface ActionType {
  type: string;
  payload: any;
}

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.USER_SIGNUP_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        ...action.payload,
      };
    }
    case ActionTypes.USER_SIGNUP_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
