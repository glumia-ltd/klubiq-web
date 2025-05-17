import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import authReducer, { resetAuth } from './AuthStore/auth.slice';
import snackbarReducer from './GlobalStore/snackbar.slice';
import loaderReducer from './GlobalStore/LoaderSlice';

import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
  } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';

export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
		auth: authReducer,
		snack: snackbarReducer,
		loader: loaderReducer,
});
const persistConfig = {
	key: 'root',
	storage: storageSession,
	whitelist: ['auth'], // only persist auth slice
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(

		),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export const resetStore = () => {
	store.dispatch(resetAuth());
};
export default store;
export { persistor };
