import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import me from '../actions/me';
import * as types from '../actionTypes';

const mockStore = configureMockStore([thunk]);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('creates ME_SUCCESS when fetching me has been done', async () => {
    const
      body = {
        _id: '1234567890',
        name: 'TestUser',
        email: 'test@example.com',
        date: '2021-01-01T00:00:00.000Z'
      },
      expectedActions = [
        {type: types.ME_REQUEST},
        {type: types.ME_SUCCESS, user: body}
      ],
      store = mockStore();

    fetchMock.getOnce('/users/me', {
      body,
      headers: {'content-type': 'application/json'}
    });

    await store.dispatch(me());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
