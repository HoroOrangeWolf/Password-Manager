import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserType } from '../../../../api/user/types/user.type';
import UserRepository from '../../../../api/user/repository/user.repository';
import { RegisterRequestType } from '../../../../api/user/types/registerRequest.type';
import { router } from '../../../../../app';
import UserService from '../../../../api/user/user.service';
import AppStorageService from '../../../../storage/appStorage.service';
import AxiosSetupCookieService from '../../../../storage/axiosSetupCookie.service';
import { clearAllContext, setNavigationBlock } from '../context.slice';
import { clearPasswordStore } from '../../passwords/passwords.slice';
import { MainStoreStateType } from '../../../types/mainStore.type';
import { selectMasterKey } from '../selectors/context.selector';
import { closeDialog } from '../../dialogs/dialog.slice';

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
      await router.navigate('/');
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

export const logoutUser = createAsyncThunk('context/logout', async (_a, thunkAPI) => {
  try {
    thunkAPI.dispatch(setNavigationBlock(true));
    await UserService.logoutUser();
    thunkAPI.dispatch(clearAllContext());
    thunkAPI.dispatch(clearPasswordStore());
    await router.navigate('/');

    thunkAPI.dispatch(closeDialog());
  } catch (e) {
    console.error(e);
    toast.error('Couldn\'t logout');
  } finally {
    thunkAPI.dispatch(setNavigationBlock(false));
  }
});

export const changePassword = createAsyncThunk<void, string, {
    state: MainStoreStateType
}>(
  'context/changePassword',
  async (newPassword, thunkAPI) => {
    try {
      thunkAPI.dispatch(setNavigationBlock(true));

      const currentPassword = selectMasterKey(thunkAPI.getState());

      await UserRepository.changePassword({ newPassword, currentPassword });
      await UserService.logoutUser();

      await router.navigate('/');

      thunkAPI.dispatch(clearPasswordStore());
      thunkAPI.dispatch(clearAllContext());
      toast.success('Changed password successfully');
    } catch (e) {
      console.error('Clouldn\'t change password', e);
      toast.error('Couldn\'t change password');
    } finally {
      thunkAPI.dispatch(setNavigationBlock(true));
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
