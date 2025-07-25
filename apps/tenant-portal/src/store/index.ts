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
import { authApiSlice } from './AuthStore/authApi.slice';
import { insightsApiSlice } from './GlobalStore/insightsApi.slice';
import { notificationsApiSlice } from './GlobalStore/notificationsApi.slice';

export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
	auth: authReducer,
	snack: snackbarReducer,
	loader: loaderReducer,
	[authApiSlice.reducerPath]: authApiSlice.reducer,
	[insightsApiSlice.reducerPath]: insightsApiSlice.reducer,
	[notificationsApiSlice.reducerPath]: notificationsApiSlice.reducer,
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
		}).concat(authApiSlice.middleware, insightsApiSlice.middleware, notificationsApiSlice.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export const resetStore = () => {
	store.dispatch(resetAuth());
	store.dispatch(authApiSlice.util.resetApiState());
	store.dispatch(insightsApiSlice.util.resetApiState());
	store.dispatch(notificationsApiSlice.util.resetApiState());
	console.log('resetStore completed');
};
export default store;
export { persistor };
