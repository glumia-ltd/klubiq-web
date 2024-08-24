import { configureStore, Store } from '@reduxjs/toolkit';
import authReducer from './AuthStore/AuthSlice';
import snackbarReducer from './SnackbarStore/SnackbarSlice';
import navReducer from './NavStore/NavSlice';
import { propertyApiSlice } from './PropertyPageStore/propertyApiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dashboardApiSlice } from './DashboardStore/dashboardApiSlice';

export type RootState = ReturnType<typeof store.getState>;

const store: Store = configureStore({
	reducer: {
		auth: authReducer,
		snack: snackbarReducer,
		nav: navReducer,
		[propertyApiSlice.reducerPath]: propertyApiSlice.reducer,
		[dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			propertyApiSlice.middleware,
			dashboardApiSlice.middleware,
		),
});

setupListeners(store.dispatch);

export default store;
