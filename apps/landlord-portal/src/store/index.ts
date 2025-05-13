import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import authReducer, { resetAuth } from './AuthStore/AuthSlice';
import snackbarReducer from './SnackbarStore/SnackbarSlice';
import navReducer from './NavStore/NavSlice';
import propertyPageReducer from './PropertyPageStore/PropertySlice';
import addPropertyReducer from './AddPropertyStore/AddPropertySlice';
import { propertyApiSlice } from './PropertyPageStore/propertyApiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dashboardApiSlice } from './DashboardStore/dashboardApiSlice';
import { authApiSlice } from './AuthStore/authApiSlice';
import { orgApiSlice } from './OrganizationStore/orgApiSlice';
import orgReducer from './OrganizationStore/OrgSlice';
import { leaseApiSlice } from './LeaseStore/leaseApiSlice';
import { notificationApiSlice } from './NotificationStore/NotificationApiSlice';
import loaderReducer from './GlobalStore/LoaderSlice';
import { globalApiSlice } from './GlobalStore/globalApiSlice';
import { tenantApiSlice } from './TenantStore/tenantApiSlice';
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

export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
		auth: authReducer,
		snack: snackbarReducer,
		nav: navReducer,
		org: orgReducer,
		propertyPage: propertyPageReducer,
		addPropertyForm: addPropertyReducer,
		loader: loaderReducer,
		[propertyApiSlice.reducerPath]: propertyApiSlice.reducer,
		[dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
		[authApiSlice.reducerPath]: authApiSlice.reducer,
		[orgApiSlice.reducerPath]: orgApiSlice.reducer,
		[leaseApiSlice.reducerPath]: leaseApiSlice.reducer,
		[notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
		[globalApiSlice.reducerPath]: globalApiSlice.reducer,
		[tenantApiSlice.reducerPath]: tenantApiSlice.reducer,
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
			propertyApiSlice.middleware,
			dashboardApiSlice.middleware,
			authApiSlice.middleware,
			orgApiSlice.middleware,
			leaseApiSlice.middleware,
			notificationApiSlice.middleware,
			globalApiSlice.middleware,
			tenantApiSlice.middleware,
		),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
export const resetStore = () => {
	store.dispatch(resetAuth());
	store.dispatch(propertyApiSlice.util.resetApiState());
	store.dispatch(dashboardApiSlice.util.resetApiState());
	store.dispatch(authApiSlice.util.resetApiState());
	store.dispatch(orgApiSlice.util.resetApiState());
	store.dispatch(leaseApiSlice.util.resetApiState());
	store.dispatch(notificationApiSlice.util.resetApiState());
	store.dispatch(globalApiSlice.util.resetApiState());
	store.dispatch(tenantApiSlice.util.resetApiState());
};
export default store;
export { persistor };
