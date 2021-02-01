import reducer from './loginInfo';
import * as types from '../actionTypes';

describe('loginInfo reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoggingIn: false,
      user: null,
      error: null
    });
  });

  test('should handle LOGIN_REQUEST', () => {
    expect(reducer({
      error: {message: 'error'}
    }, {
      type: types.LOGIN_REQUEST
    })).toEqual({
      isLoggingIn: true,
      error: null
    });
  });

  test('should handle LOGIN_FAILURE', () => {
    expect(reducer({
      isLoggingIn: true
    }, {
      type: types.LOGIN_FAILURE,
      error: {message: 'error'}
    })).toEqual({
      isLoggingIn: false,
      error: {message: 'error'}
    });
  });

  test('should handle LOGIN_SUCCESS', () => {
    expect(reducer({
      isLoggingIn: true,
      error: {message: 'error'}
    }, {
      type: types.LOGIN_SUCCESS,
      user: {
        _id: '1234567890',
        name: 'TestUser',
        email: 'test@example.com',
        date: '2021-01-01T00:00:00.000Z'
      }
    })).toEqual({
      isLoggingIn: false,
      user: {
        _id: '1234567890',
        name: 'TestUser',
        email: 'test@example.com',
        date: '2021-01-01T00:00:00.000Z'
      },
      error: null
    });
  });

  test('should handle LOGOUT_SUCCESS', () => {
    expect(reducer({
      isLoggingIn: true,
      error: {message: 'error'}
    }, {
      type: types.LOGOUT_SUCCESS,
      user: {
        _id: '1234567890',
        name: 'TestUser',
        email: 'test@example.com',
        date: '2021-01-01T00:00:00.000Z'
      }
    })).toEqual({
      isLoggingIn: false,
      user: {
        _id: '1234567890',
        name: 'TestUser',
        email: 'test@example.com',
        date: '2021-01-01T00:00:00.000Z'
      },
      error: null
    });
  });

  test('should handle ME_SUCCESS', () => {
    expect(reducer({
      isLoggingIn: true,
      error: {message: 'error'}
    }, {
      type: types.ME_SUCCESS,
      user: {
        _id: '1234567890',
        name: 'TestUser',
        email: 'test@example.com',
        date: '2021-01-01T00:00:00.000Z'
      }
    })).toEqual({
      isLoggingIn: false,
      user: {
        _id: '1234567890',
        name: 'TestUser',
        email: 'test@example.com',
        date: '2021-01-01T00:00:00.000Z'
      },
      error: null
    });
  });
});
