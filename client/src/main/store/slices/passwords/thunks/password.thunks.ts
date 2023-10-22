import { createAsyncThunk } from '@reduxjs/toolkit';
import { FolderPasswordType } from '../../../../api/folder/types/folderPassword.type';
import FolderPasswordRepository from '../../../../api/folder/repository/folderPassword.repository';
import { AddPasswordRequest, PasswordType } from '../../../../api/folder/types/password.type';

export const addFolder = createAsyncThunk<FolderPasswordType, AddPasswordRequest>(
  'password/addFolder',
  async (folder) => {
    try {
      return await FolderPasswordRepository.addFolder(folder);
    } catch (e) {
      console.error('Couldn\'t add folder', e);
      throw e;
    }
  },
);

type PasswordThunkType = {
    folderId: string;
    request: AddPasswordRequest;
}

export const addPassword = createAsyncThunk<PasswordType, PasswordThunkType>(
  'password/addPassword',
  async (request) => {
    try {
      return await FolderPasswordRepository.addPassword(request.folderId, request.request);
    } catch (e) {
      console.error('Couldn\'t add password', e);
      throw e;
    }
  },
);
