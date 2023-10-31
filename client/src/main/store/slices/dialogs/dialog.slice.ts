import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DialogModeTypes } from './types/dialogModes.type';
import DialogModesConstant from './constant/dialogModes.constant';
import { PasswordType } from '../../../api/folder/types/password.type';
import { FolderPasswordType } from '../../../api/folder/types/folderPassword.type';

type InitialState = {
    isOpen: boolean;
    mode: DialogModeTypes;
    passwordToRemove?: PasswordType;
    folderToRemove?: FolderPasswordType;
}

const initialState: InitialState = {
  isOpen: false,
  mode: DialogModesConstant.CREATE_FOLDER,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setPasswordToRemove: (state, action: PayloadAction<PasswordType>) => {
      state.passwordToRemove = action.payload;
    },
    setFolderToRemove: (state, action: PayloadAction<FolderPasswordType>) => {
      state.folderToRemove = action.payload;
    },
    openCreateFolderDialog: (state) => {
      state.isOpen = true;
      state.mode = DialogModesConstant.CREATE_FOLDER;
    },
    openConfirmRemovePasswordDialog: (state) => {
      state.isOpen = true;
      state.mode = DialogModesConstant.REMOVE_PASSWORD;
    },
    openConfirmRemoveFolderDialog: (state) => {
      state.isOpen = true;
      state.mode = DialogModesConstant.REMOVE_FOLDER;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.folderToRemove = undefined;
      state.passwordToRemove = undefined;
    },
  },
});

export const {
  openCreateFolderDialog,
  closeDialog,
  openConfirmRemovePasswordDialog,
  openConfirmRemoveFolderDialog,
  setFolderToRemove,
  setPasswordToRemove,
} = dialogSlice.actions;

export default dialogSlice;
