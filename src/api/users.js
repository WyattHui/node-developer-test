import {
  get,
  post
} from './index';

const URL_BASE = '/users';

export const login = body => {
  return post(`${URL_BASE}/login`, {body});
};

export const logout = () => {
  return post(`${URL_BASE}/logout`);
};

export const me = () => {
  return get(`${URL_BASE}/me`);
};
