import React from 'react';
import fetchMock from 'jest-fetch-mock';
import {render, screen, waitFor} from './test-util';
import App from './App';
import {
  testRenderLoginComponent,
  login
} from './components/Login.test';
import {
  testRenderMyInfoComponent,
  expectMyInfoHasContent,
  logout
} from './components/MyInfo.test';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.doMock();
});

describe('App', () => {
  test('render component', async () => {
    render(<App />);
    testRenderMyInfoComponent();
    expect(screen.getByRole('heading', {name: 'Node Developer Test'})).toBeInTheDocument();
    testRenderLoginComponent();
  });

  test('login flow', async () => {
    render(<App />);
    await login();
    expectMyInfoHasContent();
    await logout();
    await waitFor(() => {
      testRenderMyInfoComponent();
      testRenderLoginComponent();
    });
  });
});
