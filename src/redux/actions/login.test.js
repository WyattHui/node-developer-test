import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import login from '../actions/login';
import * as types from '../actionTypes';

const mockStore = configureMockStore([thunk]);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('creates LOGIN_SUCCESS when fetching login has been done', async () => {
    const
      body = {
        _id: '1234567890',
        name: 'TestUser',
        email: 'test@example.com',
        date: '2021-01-01T00:00:00.000Z'
      },
      expectedActions = [
        {type: types.LOGIN_REQUEST},
        {type: types.LOGIN_SUCCESS, user: body}
      ],
      store = mockStore();

    fetchMock.postOnce('/users/login', {
      body,
      headers: {'content-type': 'application/json'}
    });

    await store.dispatch(login({
      email: 'test@example.com',
      password: '123456'
    }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
