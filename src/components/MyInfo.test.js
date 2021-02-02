import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import moment from 'moment';
import React from 'react';
import {
  DEFAULT_MOMENT_FORMAT
} from '../constants';
import {render, screen} from '../test-util';
import MyInfo from './MyInfo';
import {
  LOGIN_RESPONSE
} from './Login.test';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.doMock();
});

describe('MyInfo', () => {
  test('render component', () => {
    renderComponent();
    testRenderMyInfoComponent();
  });
});

const renderComponent = () => {
  render(<MyInfo />);
};

export const testRenderMyInfoComponent = () => {
  expect(screen.queryByRole('heading', {name: 'User Detail'})).not.toBeInTheDocument();
};

export const expectMyInfoHasContent = () => {
  expect(screen.getByRole('heading', {name: 'User Detail'})).toBeInTheDocument();
  expect(screen.getByText(`Email: ${LOGIN_RESPONSE.email}`)).toBeInTheDocument();
  expect(screen.getByText(`Name: ${LOGIN_RESPONSE.name}`)).toBeInTheDocument();
  expect(screen.getByText(
    `Created At: ${moment(LOGIN_RESPONSE.date).format(DEFAULT_MOMENT_FORMAT)}`
  )).toBeInTheDocument();
  expect(getLogoutButton()).toBeInTheDocument();
};

export const logout = async () => {
  fetch.mockResponseOnce();
  await userEvent.click(getLogoutButton());
};

const getLogoutButton = () => {
  return screen.getByRole('button', {name: 'Logout'});
};
