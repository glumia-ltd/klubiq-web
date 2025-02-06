import { configureStore, Store } from '@reduxjs/toolkit';
import authReducer from './AuthStore/AuthSlice';
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

export type RootState = ReturnType<typeof store.getState>;

const store: Store = configureStore({
	reducer: {
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
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			propertyApiSlice.middleware,
			dashboardApiSlice.middleware,
			authApiSlice.middleware,
			orgApiSlice.middleware,
			leaseApiSlice.middleware,
			notificationApiSlice.middleware,
		),
});

setupListeners(store.dispatch);

export default store;
