import { configureStore } from '@reduxjs/toolkit';
import passwordsSlice from './slices/passwords/passwords.slice';
import contextSlice from './slices/context/context.slice';
import dialogSlice from './slices/dialogs/dialog.slice';

const configureMainStore = () => (
  configureStore({
    reducer: {
      password: passwordsSlice.reducer,
      context: contextSlice.reducer,
      dialog: dialogSlice.reducer,
    },
  })
);

export default configureMainStore;
