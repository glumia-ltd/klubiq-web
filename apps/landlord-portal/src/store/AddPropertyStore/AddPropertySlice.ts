import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { RootState } from '..';

type AddPropertyType = {
	categoryId?: number | null;
	purposeId: number | null;
	typeId: number | string;
	name: string;
	description: string;
	images: string[] | null;
	isMultiUnit?: boolean;
	address: {
		addressLine2: string;
		unit: string;
		city: string;
		state: string;
		postalCode: string;
		latitude: number;
		longitude: number;
		addressLine1: string;
		country: string;
		isManualAddress: boolean;
	};

	units: {
		id: number | null;
		unitNumber: string;
		rentAmount: number | null;
		floor: number | null;
		bedrooms: number | null;
		bathrooms: number | null;
		toilets: number | null;
		area: {
			value: number | null;
			unit: string;
		};
		status: string;
		rooms: number | null;
		offices: number | null;
	}[];
};

const initialState: AddPropertyType = {
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
				value: null,
				unit: '',
			},
			status: '',
			rooms: null,
			offices: null,
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
