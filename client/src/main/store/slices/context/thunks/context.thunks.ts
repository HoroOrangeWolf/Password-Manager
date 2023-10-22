import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
import { UserType } from '../../../../api/user/types/user.type';
import UserRepository from '../../../../api/user/repository/user.repository';

export const fetchCurrentUser = createAsyncThunk<UserType>(
  'cache/currentUser',
  async () => {
    try {
      const response = await UserRepository.fetchCurrentUser();

      redirect('/unlocok');

      return response;
    } catch (e) {
      console.error('Couldn\'t fetch current user', e);
      redirect('/');
      throw e;
    }
  },
);
