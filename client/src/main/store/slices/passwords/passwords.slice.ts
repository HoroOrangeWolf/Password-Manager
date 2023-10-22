import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { has } from 'lodash';
import { FolderPasswordType } from '../../../api/folder/types/folderPassword.type';
import { FetchableElementType } from '../../../shared/types/fetchableElement.type';
import { addFolder, addPassword } from './thunks/password.thunks';
import FetchingStatusConstant from '../../../shared/constant/fetchingStatus.constant';

type InitialState = {
  folders: FetchableElementType<{
    [x: string]: {
      currentPassword?: string;
      folder: FolderPasswordType
    }
  }>,
  currentFolder?: string;
}

const initialState: InitialState = {
  folders: {
    status: FetchingStatusConstant.PENDING,
  },
};

const passwordsSlice = createSlice({
  name: 'password',
  reducers: {
    setCurrentFolder: (state, action: PayloadAction<string>) => {
      state.currentFolder = action.payload;
    },
    setCurrentPassword: (state, action: PayloadAction<string>) => {
      if (!has(state.folders.value, state.currentFolder)) {
        return;
      }

      state.folders.value[state.currentFolder].currentPassword = action.payload;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addFolder.fulfilled, (state, { payload }) => {
        state.folders.value = {
          ...(state.folders.value ?? {}),
          [payload.id]: {
            folder: payload,
          },
        };
      })
      .addCase(addPassword.fulfilled, (state, action) => {
        const { folderId } = action.meta.arg;
        const response = action.payload;

        if (!has(state.folders.value, folderId)) {
          return;
        }

        const passwords = state.folders.value[folderId].folder;

        passwords.passwordEntries = [
          ...passwords.passwordEntries,
          response,
        ];
      });
  },
});

export const { setCurrentFolder, setCurrentPassword } = passwordsSlice.actions;

export default passwordsSlice;
