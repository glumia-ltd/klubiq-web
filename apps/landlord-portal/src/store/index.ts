import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthStore/AuthSlice';
import snackbarReducer from './SnackbarStore/SnackbarSlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
	reducer: {
		auth: authReducer,
		snack: snackbarReducer,
	},
});

export default store;
