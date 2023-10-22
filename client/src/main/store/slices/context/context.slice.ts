import { createSlice } from '@reduxjs/toolkit';
import { FetchableElementType } from '../../../shared/types/fetchableElement.type';
import { UserType } from '../../../api/user/types/user.type';
import FetchingStatusConstant from '../../../shared/constant/fetchingStatus.constant';
import { fetchCurrentUser } from './thunks/context.thunks';

type InitialType = {
    currentUser: FetchableElementType<UserType>
}

const initialState: InitialType = {
  currentUser: {
    status: FetchingStatusConstant.PENDING,
  },
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.currentUser = {
          status: FetchingStatusConstant.FETCHING,
        };
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.currentUser = {
          status: FetchingStatusConstant.ERROR,
        };
      })
      .addCase(fetchCurrentUser.fulfilled, (state) => {
        state.currentUser = {
          status: FetchingStatusConstant.SUCCESS,
        };
      });
  },
});

export default contextSlice;
