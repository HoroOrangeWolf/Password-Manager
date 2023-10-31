import { MainStoreStateType } from '../../../types/mainStore.type';

export const selectIsDialogOpen = ({ dialog }: MainStoreStateType) => (
  dialog.isOpen
);

export const selectDialogMode = ({ dialog }: MainStoreStateType) => (
  dialog.mode
);

export const selectPasswordToRemove = ({ dialog }: MainStoreStateType) => (
  dialog.passwordToRemove
);

export const selectFolderToRemove = ({ dialog }: MainStoreStateType) => (
  dialog.folderToRemove
);
