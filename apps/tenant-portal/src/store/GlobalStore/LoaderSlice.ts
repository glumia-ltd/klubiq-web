import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

type loaderType = {
	isLoading: boolean;
};

const options = {
	name: 'loader',
	initialState: { isLoading: true },
	reducers: {
		showLoader: (state: loaderType) => {
			return { ...state, isLoading: true };
		},
		hideLoader: (state: loaderType) => {
			return { ...state, isLoading: false };
		},
	},
};

const loaderSlice = createSlice(options);

export const { showLoader, hideLoader } = loaderSlice.actions;

export const getLoaderState = (state: RootState) => state.loader;

const loaderReducer = loaderSlice.reducer;

export default loaderReducer;
