import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { has, head, isNil } from 'lodash';
import { FolderPasswordType } from '../../../api/folder/types/folderPassword.type';
import { FetchableElementType } from '../../../shared/types/fetchableElement.type';
import {
  addFolder, addPassword, removeFolder, removePassword, unlockVault, updatePassword,
} from './thunks/password.thunks';
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
    clearCurrentSelectedPassword: (state) => {
      if (!has(state.folders.value, state.currentFolder)) {
        return;
      }

      state.folders.value[state.currentFolder].currentPassword = undefined;
    },
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
        const { parentFolder } = action.meta.arg;
        const response = action.payload;

        if (!has(state.folders.value, parentFolder)) {
          return;
        }

        const passwords = state.folders.value[parentFolder].folder;
        state.folders.value[parentFolder].currentPassword = response.id;

        passwords.passwordEntries = [
          ...passwords.passwordEntries,
          response,
        ];
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        const { parentFolder } = action.meta.arg;
        const response = action.payload;

        if (!has(state.folders.value, parentFolder)) {
          return;
        }

        const passwords = state.folders.value[parentFolder].folder;

        const noUpdatedPassword = passwords.passwordEntries.filter(({ id }) => id !== response.id);

        passwords.passwordEntries = [
          ...noUpdatedPassword,
          response,
        ];
      })
      .addCase(unlockVault.pending, (state) => {
        state.folders.status = FetchingStatusConstant.FETCHING;
      })
      .addCase(unlockVault.rejected, (state) => {
        state.folders.status = FetchingStatusConstant.ERROR;
      })
      .addCase(unlockVault.fulfilled, (state, action) => {
        const { payload } = action;

        state.folders.status = FetchingStatusConstant.SUCCESS;

        state.folders.value = payload.reduce((acc, curr) => ({
          ...acc,
          [curr.id]: {
            currentPassword: head(curr.passwordEntries)?.id,
            folder: curr,
          },
        }), {});
      })
      .addCase(removePassword.fulfilled, (state, action) => {
        const { arg } = action.meta;

        if (!has(state.folders.value, state.currentFolder)) {
          return;
        }

        const folders = state.folders.value[state.currentFolder];

        folders.folder.passwordEntries = folders.folder.passwordEntries.filter(({ id }) => id !== arg);
        folders.currentPassword = head(folders.folder.passwordEntries)?.id;
      })
      .addCase(removeFolder.fulfilled, (state, action) => {
        const { arg } = action.meta;

        if (!has(state.folders.value, arg)) {
          return;
        }

        const {
          [arg]: removed,
          ...rest
        } = state.folders.value;

        state.folders.value = rest;

        const nextCurrentFolder = head(Object.values(state.folders.value));

        if (isNil(nextCurrentFolder)) {
          return;
        }

        state.currentFolder = nextCurrentFolder.folder.id;

        if (!isNil(nextCurrentFolder.currentPassword)) {
          return;
        }

        nextCurrentFolder.currentPassword = head(nextCurrentFolder.folder.passwordEntries)?.id;
      });
  },
});

export const {
  setCurrentFolder,
  setCurrentPassword,
  clearCurrentSelectedPassword,
} = passwordsSlice.actions;

export default passwordsSlice;
