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
import { ToastContainer } from 'react-toastify';
import configureMainStore from './main/store/main.store';
import LoginMainContainer from './main/pages/login/loginMain.container';
import RegisterMainContainer from './main/pages/register/registerMain.container';
import MainPageContainer from './main/pages/mainPage.container';
import 'react-toastify/dist/ReactToastify.css';
import UnlockPageContainer from './main/pages/unlockPage/unlockPage.container';
import AppStorageService from './main/storage/appStorage.service';
import AxiosSetupCookieService from './main/storage/axiosSetupCookie.service';
import DashboardContainer from './main/pages/dashboard/dashboard.container';

const element = document.getElementById('root');

const root = createRoot(element);

const store = configureMainStore();

axios.defaults.withCredentials = true;

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPageContainer />}>
      <Route path="dashboard" element={<DashboardContainer />} />
      <Route path="unlock" element={<UnlockPageContainer />} />
      <Route path="login" element={<LoginMainContainer />} />
      <Route path="register" element={<RegisterMainContainer />} />
    </Route>,
  ),
);

AppStorageService.getToken()
  .then((token) => {
    AxiosSetupCookieService.setDefaultAxios(token);

    root.render(
      <>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
        <ToastContainer
          autoClose={3000}
          newestOnTop
          position="top-right"
        />
      </>,
    );
  });
