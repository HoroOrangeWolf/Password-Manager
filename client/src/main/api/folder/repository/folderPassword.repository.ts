import axios from 'axios';
import { AddFolderRequest, FolderPasswordType } from '../types/folderPassword.type';
import BackendConstant from '../../constant/backend.constant';
import { PasswordType } from '../types/password.type';

const addFolder = async (folder: AddFolderRequest): Promise<FolderPasswordType> => {
  const response = await axios.post<FolderPasswordType>(`${BackendConstant.BACKEND_URL}/user/folder`, folder);

  return response.data;
};

const removeFolder = async (folderId: string) => {
  await axios.delete(`${BackendConstant.BACKEND_URL}/user/folder/${folderId}`);
};

const addPassword = async (folderId: string, addPasswordRequest: AddFolderRequest) : Promise<PasswordType> => {
  const response = await axios.post<PasswordType>(`${BackendConstant.BACKEND_URL}/user/folder/${folderId}/password`, addPasswordRequest);

  return response.data;
};

const updatePassword = async (folderId: string, passwordId: string, request: AddFolderRequest): Promise<PasswordType> => {
  const response = await axios.post<PasswordType>(`${BackendConstant.BACKEND_URL}/user/folder/${folderId}/password/${passwordId}`, request);

  return response.data;
};

const removePassword = async (passwordId: string) => {
  await axios.delete(`${BackendConstant.BACKEND_URL}/user/password/${passwordId}`);
};

const getFoldersWithDecodedPasswords = async (masterKey: string): Promise<FolderPasswordType[]> => {
  const response = await axios.get<FolderPasswordType[]>(`${BackendConstant.BACKEND_URL}/user/unlock/passwords`, {
    params: {
      masterKey,
    },
  });

  return response.data;
};

const FolderPasswordRepository = {
  addFolder,
  addPassword,
  removeFolder,
  removePassword,
  updatePassword,
  getFoldersWithDecodedPasswords,
};

export default FolderPasswordRepository;
