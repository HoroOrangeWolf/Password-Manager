import { configureStore } from '@reduxjs/toolkit';
import passwordsSlice from './slices/passwords/passwords.slice';

const configureMainStore = () => (
  configureStore({
    reducer: {
      password: passwordsSlice.reducer,
    },
  })
);

export default configureMainStore;
