import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { RootState } from '..';
import { AddPropertyType } from '../../shared/type';

const initialState: AddPropertyType = {
	newAmenity: '',
	customAmenities: [],
	categoryId: null,
	purposeId: null,
	typeId: '',
	name: '',
	description: '',
	images: null,
	isMultiUnit: false,
	address: {
		addressLine2: '',
		unit: '',
		city: '',
		state: '',
		postalCode: '',
		latitude: 0,
		longitude: 0,
		addressLine1: '',
		country: '',
		isManualAddress: false,
	},
	units: [
		{
			id: null,
			unitNumber: '',
			rentAmount: null,
			floor: null,
			bedrooms: null,
			bathrooms: null,
			toilets: null,
			area: {
				value: '',
				unit: '',
			},
			status: '',
			rooms: null,
			offices: null,
			amenities: [],
		},
	],
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
