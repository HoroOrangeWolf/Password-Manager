import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { string } from 'yup';
import { AddFolderRequest, FolderPasswordType } from '../../../../api/folder/types/folderPassword.type';
import FolderPasswordRepository from '../../../../api/folder/repository/folderPassword.repository';
import { AddPasswordRequest, PasswordType } from '../../../../api/folder/types/password.type';
import { router } from '../../../../../app';
import { setMasterPassword } from '../../context/context.slice';

export const addFolder = createAsyncThunk<FolderPasswordType, AddFolderRequest>(
  'password/addFolder',
  async (folder) => {
    try {
      const response = await FolderPasswordRepository.addFolder(folder);

      toast.success('Added folder');

      return response;
    } catch (e) {
      console.error('Couldn\'t add folder', e);
      toast.error('Couldn\'t add new folder');
      throw e;
    }
  },
);

export const unlockVault = createAsyncThunk<FolderPasswordType[], string>(
  'context/unlockVault',
  async (masterKey, thunkAPI) => {
    try {
      const response = await FolderPasswordRepository.getFoldersWithDecodedPasswords(masterKey);

      thunkAPI.dispatch(setMasterPassword(masterKey));

      await router.navigate('/dashboard');

      return response;
    } catch (e) {
      console.error('Couldn\'t unlock valut', e);
      throw e;
    }
  },
);

export const addPassword = createAsyncThunk<PasswordType, AddPasswordRequest>(
  'password/addPassword',
  async (request) => {
    try {
      const response = await FolderPasswordRepository.addPassword(request.parentFolder, request);

      toast.success('Added new password to vault');

      return response;
    } catch (e) {
      toast.error("Couldn't add new password");
      console.error('Couldn\'t add password', e);
      throw e;
    }
  },
);

export const removePassword = createAsyncThunk<void, string>(
  'password/removePassword',
  async (passwordId) => {
    try {
      await FolderPasswordRepository.removePassword(passwordId);
    } catch (e) {
      console.error('Couldn\'t remove password', e);
      throw e;
    }
  },
);

export const removeFolder = createAsyncThunk<void, string>(
  'password/removeFolder',
  async (folderId: string) => {
    try {
      await FolderPasswordRepository.removeFolder(folderId);
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
);

export const updatePassword = createAsyncThunk<PasswordType, AddPasswordRequest & {passwordId: string}>(
  'password/updatePassword',
  async (request) => {
    try {
      const response = await FolderPasswordRepository.updatePassword(request.parentFolder, request.passwordId, request);

      toast.success('Updated new password to vault');

      return response;
    } catch (e) {
      toast.error("Couldn't update password");
      console.error('Couldn\'t update password', e);
      throw e;
    }
  },
);
