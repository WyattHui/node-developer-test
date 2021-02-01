import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './redux/reducers';

const render = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) => {
  const wrapper = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, {wrapper, ...renderOptions});
};

export * from '@testing-library/react';
export {render};
