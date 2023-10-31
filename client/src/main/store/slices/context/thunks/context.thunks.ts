import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserType } from '../../../../api/user/types/user.type';
import UserRepository from '../../../../api/user/repository/user.repository';
import { RegisterRequestType } from '../../../../api/user/types/registerRequest.type';
import { router } from '../../../../../app';
import UserService from '../../../../api/user/user.service';
import AppStorageService from '../../../../storage/appStorage.service';
import AxiosSetupCookieService from '../../../../storage/axiosSetupCookie.service';

export const fetchCurrentUser = createAsyncThunk<UserType>(
  'context/currentUser',
  async () => {
    try {
      const response = await UserRepository.fetchCurrentUser();

      AxiosSetupCookieService.setDefaultAxios(response.token);

      await AppStorageService.setToken(response.token);

      await router.navigate('/unlock');
      return response;
    } catch (e) {
      console.error('Couldn\'t fetch current user', e);
      throw e;
    }
  },
);

export type LoginType = {
    username: string;
    password: string;
}

export const loginUser = createAsyncThunk<any, LoginType>(
  'context/loginUser',
  async (req, thunkAPI) => {
    try {
      await UserService.loginUser(req.username, req.password);
      await thunkAPI.dispatch(fetchCurrentUser());
      await router.navigate('/unlock');
      toast.success('Logged in successfully');
    } catch (e) {
      console.error('Couldn\'t login  user', e);
      toast.error('Couldn\'t login  user');
      throw e;
    }
  },
);

export const registerUser = createAsyncThunk<any, RegisterRequestType>(
  'context/register',
  async (req) => {
    try {
      await UserRepository.registerUser(req);
      toast.success('Registered user successfully');
      await router.navigate('/');
    } catch (e) {
      console.error("Couldn't register user", e);
      toast.error('Couldn\'t register user');
      throw e;
    }
  },
);
