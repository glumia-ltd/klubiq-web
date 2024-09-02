import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

type AddPropertyType = {
	selectedCard: string;
	propertyType: string;
	propertyName: string;
	description: string;
	propertyImage: string;
	unitType: string;
	propertyPurpose: string;
	streetAddress: string;
	apartment: string;
	country: string;
	postalCode: string;
	state: string;
	city: string;
};

const initialState: AddPropertyType = {
	selectedCard: '',
	propertyType: '',
	propertyName: '',
	description: '',
	propertyImage: '',
	unitType: '',
	propertyPurpose: '',
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
		saveFormDetail: (
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

export const addPropertyReducer = addPropertySlice.reducer;
