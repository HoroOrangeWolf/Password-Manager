import { createSlice } from '@reduxjs/toolkit';
import { FolderPasswordType } from '../../../api/folder/types/folderPassword.type';
import { FetchableElementType } from '../../../shared/types/fetchableElement.type';
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
  reducers: {},
  initialState,
});

export default passwordsSlice;
