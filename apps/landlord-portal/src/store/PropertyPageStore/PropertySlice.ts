import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { PropertyStateType } from './propertyPageType';
import { RootState } from '..';

const initialState: PropertyStateType = {
	currentId: null,
	currentFilter: {},
};

const options = {
	name: 'propertyPageSlice',
	initialState,
	reducers: {
		setCurrentId: (
			state: PropertyStateType,
			action: PayloadAction<PropertyStateType>,
		) => {
			return {
				...state,
				currentId: action.payload.currentId,
			};
		},
		setCurrentFilter: (
			state: PropertyStateType,
			action: PayloadAction<PropertyStateType>,
		) => {
			return {
				...state,
				currentFilter: action.payload.currentFilter,
			};
		},
	},
};

const propertyPageSlice = createSlice(options);

export const getPropertyData = (state: RootState) => state.propertyPage;

export const { setCurrentId, setCurrentFilter } = propertyPageSlice.actions;

export default propertyPageSlice.reducer;
