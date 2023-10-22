import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserType } from '../../../../api/user/types/user.type';
import UserRepository from '../../../../api/user/repository/user.repository';

export const fetchCurrentUser = createAsyncThunk<UserType>(
  'cache/currentUser',
  async () => {
    try {
      return await UserRepository.fetchCurrentUser();
    } catch (e) {
      console.error('Couldn\'t fetch current user', e);
      throw e;
    }
  },
);
