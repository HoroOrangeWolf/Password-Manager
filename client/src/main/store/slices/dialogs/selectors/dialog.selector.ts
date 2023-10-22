import { MainStoreStateType } from '../../../types/mainStore.type';

export const selectIsDialogOpen = ({ dialog }: MainStoreStateType) => (
  dialog.isOpen
);

export const selectDialogMode = ({ dialog }: MainStoreStateType) => (
  dialog.mode
);
