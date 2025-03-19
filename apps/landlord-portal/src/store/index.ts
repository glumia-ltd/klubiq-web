import { configureStore, Store } from '@reduxjs/toolkit';
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
		[globalApiSlice.reducerPath]: globalApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			propertyApiSlice.middleware,
			dashboardApiSlice.middleware,
			authApiSlice.middleware,
			orgApiSlice.middleware,
			leaseApiSlice.middleware,
			notificationApiSlice.middleware,
			globalApiSlice.middleware,
		),
});

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
};
export default store;
