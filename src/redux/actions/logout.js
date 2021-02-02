import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actionTypes';
import {logout} from '../../api/users';

const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const logoutRequestSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
    user: null
  };
};

const logoutRequestFailure = error => {
  return {
    type: LOGOUT_FAILURE,
    error
  };
};

export default () => {
  return async dispatch => {
    dispatch(logoutRequest());
    try {
      let res = await logout();
      dispatch(logoutRequestSuccess(res));
      return res;
    } catch (error) {
      dispatch(logoutRequestFailure(error));
      throw error;
    }
  };
};
