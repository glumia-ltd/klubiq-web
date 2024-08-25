import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { PropertyStateType } from './propertyPageType';
import { RootState } from '..';

const initialState: PropertyStateType = {
	currentId: null,
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
	},
};

const propertyPageSlice = createSlice(options);

export const getCurrentId = (state: RootState) => state.propertyPage;

export const { setCurrentId } = propertyPageSlice.actions;

export default propertyPageSlice.reducer;
