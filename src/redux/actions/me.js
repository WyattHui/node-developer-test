import {
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE
} from '../actionTypes';
import {me} from '../../api/users';

const meRequest = () => {
  return {
    type: ME_REQUEST
  };
};

const meRequestSuccess = user => {
  return {
    type: ME_SUCCESS,
    user
  };
};

const meRequestFailure = error => {
  return {
    type: ME_FAILURE,
    error
  };
};

export default () => {
  return async dispatch => {
    dispatch(meRequest());
    try {
      let res = await me();
      dispatch(meRequestSuccess(res));
      return res;
    } catch (error) {
      dispatch(meRequestFailure(error));
      throw error;
    }
  };
};
