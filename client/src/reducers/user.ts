import { Types } from '../actions/user';

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
    case Types.USER_SIGNUP_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case Types.USER_SIGNUP_IN_PROGRESS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case Types.USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        ...action.payload,
      };
    }
    case Types.USER_SIGNUP_ERROR: {
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
