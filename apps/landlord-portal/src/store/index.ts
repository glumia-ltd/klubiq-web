import { configureStore, Store } from '@reduxjs/toolkit';
import authReducer from './AuthStore/AuthSlice';
import snackbarReducer from './SnackbarStore/SnackbarSlice';
import navReducer from './NavStore/NavSlice';
import { propertyApiSlice } from './PropertyPageStore/propertyApiSlice';

export type RootState = ReturnType<typeof store.getState>;

const store: Store = configureStore({
	reducer: {
		auth: authReducer,
		snack: snackbarReducer,
		nav: navReducer,
		[propertyApiSlice.reducerPath]: propertyApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(propertyApiSlice.middleware),
});

export default store;
