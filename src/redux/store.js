import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './reducers';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

