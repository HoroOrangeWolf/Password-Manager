import {
  createRoot,
} from 'react-dom/client';

import React from 'react';

import { Provider } from 'react-redux';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import axios from 'axios';
import configureMainStore from './main/store/main.store';
import LoginMainContainer from './main/pages/login/loginMain.container';
import RegisterMainContainer from './main/pages/register/registerMain.container';
import MainPageContainer from './main/pages/mainPage.container';
import UnlockPageContainer from './main/pages/unlockPage/unlockPage.container';

const element = document.getElementById('root');

const root = createRoot(element);

const store = configureMainStore();

axios.defaults.withCredentials = true;

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPageContainer />}>
      <Route path="unlock" element={<UnlockPageContainer />} />
      <Route path="login" element={<LoginMainContainer />} />
      <Route path="register" element={<RegisterMainContainer />} />
    </Route>,
  ),
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
