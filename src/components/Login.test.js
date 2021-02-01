import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import {render, screen, waitFor} from '../test-util';
import Login from './Login';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.doMock();
});

describe('Login', () => {
  test('render component', () => {
    renderComponent();
    testRenderLoginComponent();
  });

  test('login fail', async () => {
    const ERROR_MSG = 'error message';

    renderComponent();
    const
      EMAIL_TEXT_BOX = getEmailTextBox(),
      PASSWORD_BOX = getPasswordBox();

    fetch.mockRejectOnce({
      message: ERROR_MSG
    });
    await inputAndLogin();

    expect(await screen.findByText(ERROR_MSG)).toBeInTheDocument();
    expect(EMAIL_TEXT_BOX).toHaveValue('test@examplem.com');
    expect(PASSWORD_BOX).toHaveValue('123456');
  });

  test('login success', async () => {
    renderComponent();
    await login();
  });
});

const renderComponent = () => {
  render(<Login />);
};

export const testRenderLoginComponent = () => {
  expect(screen.getByLabelText('Email:')).toBeInTheDocument();
  expect(getEmailTextBox()).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  expect(getPasswordBox()).toBeInTheDocument();
  expect(getLoginButton()).toBeInTheDocument();
};

export const login = async () => {
  mockLoginResponseOnce();
  await inputAndLogin();
  await expectLoginSuccess();
};

const mockLoginResponseOnce = () => {
  fetch.mockResponseOnce(JSON.stringify(LOGIN_RESPONSE));
};

export const LOGIN_RESPONSE = {
  _id: '1234567890',
  name: 'TestUser',
  email: 'test@example.com',
  date: '2021-01-01T00:00:00.000Z'
};

const inputAndLogin = async () => {
  await userEvent.type(getEmailTextBox(), 'test@examplem.com');
  await userEvent.type(getPasswordBox(), '123456');
  await userEvent.click(getLoginButton());
};

const expectLoginSuccess = async () => {
  await waitFor(() => {
    expect(screen.queryByRole('textbox', {name: 'Email:'})).not.toBeInTheDocument();
  });
};

const getEmailTextBox = () => {
  return screen.getByRole('textbox', {name: 'Email:'});
};

const getPasswordBox = () => {
  return screen.getByTestId('password');
};

const getLoginButton = () => {
  return screen.getByRole('button', {name: 'Login'});
};
