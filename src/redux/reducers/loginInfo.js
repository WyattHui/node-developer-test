import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  ME_SUCCESS
} from '../actionTypes';

const initialState = {
  isLoggingIn: false,
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error
      };
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case ME_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        user: action.user,
        error: null
      };
    default:
      return state;
  }
};
