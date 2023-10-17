import { configureStore } from '@reduxjs/toolkit';

const configureMainStore = () => (
  configureStore({
    reducer: {},
  })
);

export default configureMainStore;
