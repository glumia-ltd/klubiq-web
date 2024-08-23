import { configureStore, Store } from '@reduxjs/toolkit';
import authReducer from './AuthStore/AuthSlice';
import snackbarReducer from './SnackbarStore/SnackbarSlice';
import navReducer from './NavStore/NavSlice';
import propertyDataReducer from './PropertyPageStore/PropertyPageSlice';
import { apiSlice } from './apiSlice';

export type RootState = ReturnType<typeof store.getState>;

const store: Store = configureStore({
	reducer: {
		auth: authReducer,
		snack: snackbarReducer,
		nav: navReducer,
		property: propertyDataReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
