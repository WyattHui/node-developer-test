import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import logout from '../actions/logout';
import * as types from '../actionTypes';

const mockStore = configureMockStore([thunk]);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('creates LOGOUT_SUCCESS when fetching logout has been done', async () => {
    const
      expectedActions = [
        {type: types.LOGOUT_REQUEST},
        {type: types.LOGOUT_SUCCESS, user: null}
      ],
      store = mockStore({
        user: {
          _id: '1234567890',
          name: 'TestUser',
          email: 'test@example.com',
          date: '2021-01-01T00:00:00.000Z'
        }
      });

    fetchMock.postOnce('/users/logout', {
      headers: {'content-type': 'application/json'}
    });

    await store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
