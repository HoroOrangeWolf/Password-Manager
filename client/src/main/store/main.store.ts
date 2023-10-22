import { configureStore } from '@reduxjs/toolkit';
import passwordsSlice from './slices/passwords/passwords.slice';
import contextSlice from './slices/context/context.slice';

const configureMainStore = () => (
  configureStore({
    reducer: {
      password: passwordsSlice.reducer,
      context: contextSlice.reducer,
    },
  })
);

export default configureMainStore;
