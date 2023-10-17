import configureMainStore from '../main.store';

type StoreType = ReturnType<typeof configureMainStore>;

export type MainStoreStateType = StoreType['getState'];

export type AppDispatchType = StoreType['dispatch'];
