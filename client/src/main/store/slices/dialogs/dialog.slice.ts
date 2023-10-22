import { createSlice } from '@reduxjs/toolkit';
import { DialogModeTypes } from './types/dialogModes.type';
import DialogModesConstant from './constant/dialogModes.constant';

type InitialState = {
    isOpen: boolean;
    mode: DialogModeTypes;
}

const initialState: InitialState = {
  isOpen: false,
  mode: DialogModesConstant.CREATE_FOLDER,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openCreateFolderDialog: (state) => {
      state.isOpen = true;
      state.mode = DialogModesConstant.CREATE_FOLDER;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openCreateFolderDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice;
