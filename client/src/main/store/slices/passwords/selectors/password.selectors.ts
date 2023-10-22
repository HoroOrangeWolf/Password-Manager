import { createSelector } from '@reduxjs/toolkit';
import { MainStoreStateType } from '../../../types/mainStore.type';
import FetchingStatusConstant from '../../../../shared/constant/fetchingStatus.constant';

export const selectFolders = ({ password }: MainStoreStateType) => (
  password.folders.value ?? {}
);

export const selectIsFetchingFolders = ({ password }: MainStoreStateType) => (
  password.folders.status === FetchingStatusConstant.FETCHING
);

export const selectIsFetchingFoldersError = ({ password }: MainStoreStateType) => (
  password.folders.status === FetchingStatusConstant.ERROR
);

export const selectCurrentFolder = ({ password }: MainStoreStateType) => (
  password.currentFolder
);

export const selectCurrentSelectedPassword = createSelector(
  [
    selectFolders,
    selectCurrentFolder,
  ],
  (folders, currentFolder) => (
    folders[currentFolder]?.currentPassword
  ),
);

export const selectCurrentPasswords = createSelector(
  [
    selectFolders,
    selectCurrentFolder,
  ],
  (folders, currentFolderId) => folders[currentFolderId]?.folder?.passwordEntries,
);
