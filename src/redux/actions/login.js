import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actionTypes';
import {login} from '../../api/users';

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const loginRequestSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginRequestFailure = error => {
  return {
    type: LOGIN_FAILURE,
    error
  };
};

export default body => {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      let res = await login(body);
      dispatch(loginRequestSuccess(res));
      return res;
    } catch (error) {
      dispatch(loginRequestFailure(error));
      throw error;
    }
  };
};
