import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { RootState } from '..';

type AddPropertyType = {
	categoryId?: number | null;
	purposeId?: number | null;
	propertyType?: string;
	propertyName?: string;
	description?: string;
	propertyImage?: string;
	isMultiUnit?: boolean;
	streetAddress?: string;
	apartment?: string;
	country?: string;
	postalCode?: string;
	state?: string;
	city?: string;
};

const initialState: AddPropertyType = {
	categoryId: null,
	purposeId: null,
	propertyType: '',
	propertyName: '',
	description: '',
	propertyImage: '',
	isMultiUnit: false,
	streetAddress: '',
	apartment: '',
	country: '',
	postalCode: '',
	state: '',
	city: '',
};

const options = {
	name: 'addProperty',
	initialState,
	reducers: {
		saveAddPropertyFormDetail: (
			state: AddPropertyType,
			action: PayloadAction<AddPropertyType>,
		) => {
			return {
				...state,
				...action.payload,
			};
		},
	},
};

const addPropertySlice = createSlice(options);

export const getAddPropertyState = (state: RootState) => state.addPropertyForm;

export const { saveAddPropertyFormDetail } = addPropertySlice.actions;

const addPropertyReducer = addPropertySlice.reducer;

export default addPropertyReducer;
