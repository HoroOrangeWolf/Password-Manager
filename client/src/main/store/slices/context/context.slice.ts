import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchableElementType } from '../../../shared/types/fetchableElement.type';
import { UserType } from '../../../api/user/types/user.type';
import FetchingStatusConstant from '../../../shared/constant/fetchingStatus.constant';
import { fetchCurrentUser } from './thunks/context.thunks';

type InitialType = {
  currentUser: FetchableElementType<UserType>,
  masterPassword: string;
  isBlockedNavigation: boolean;
}

const initialState: InitialType = {
  masterPassword: '',
  isBlockedNavigation: false,
  currentUser: {
    status: FetchingStatusConstant.PENDING,
  },
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    setNavigationBlock: (state, action: PayloadAction<boolean>) => {
      state.isBlockedNavigation = action.payload;
    },
    setMasterPassword: (state, action: PayloadAction<string>) => {
      state.masterPassword = action.payload;
    },
    clearMasterPassword: (state) => {
      state.masterPassword = '';
    },
    clearAllContext: (state) => {
      state.masterPassword = '';
      state.currentUser.value = undefined;
      state.currentUser.status = FetchingStatusConstant.PENDING;
    },
  },
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

export const {
  setNavigationBlock,
  clearAllContext,
  setMasterPassword,
  clearMasterPassword,
} = contextSlice.actions;

export default contextSlice;
