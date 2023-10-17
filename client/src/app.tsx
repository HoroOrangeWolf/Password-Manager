import {
  createRoot,
} from 'react-dom/client';

import React from 'react';

import { Provider } from 'react-redux';
import MainContainer from './main/main.container';
import configureMainStore from './main/store/main.store';

const element = document.getElementById('root');

const root = createRoot(element);

const store = configureMainStore();

root.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
);
