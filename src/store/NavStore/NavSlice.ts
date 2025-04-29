import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

type navType = {
	open: boolean;
};

const initialState: navType = {
	open: false,
};

const options = {
	name: 'nav',
	initialState,
	reducers: {
		openSidebar: () => {
			return {
				open: true,
			};
		},
		closeSidebar: () => {
			return { open: false };
		},
	},
};

const navSlice = createSlice(options);

export const { openSidebar, closeSidebar } = navSlice.actions;

export const getNavControl = (state: RootState) => state.nav;

const navReducer = navSlice.reducer;

export default navReducer;
