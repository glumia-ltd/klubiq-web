import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { RootState } from '..';

type AddPropertyType = {
	categoryId?: number | null;
	purposeId?: number | null;
	typeId?: number | string;
	name?: string;
	description?: string;
	images?: string[] | null;
	isMultiUnit?: boolean;
	address?: {
		addressLine2?: string;
		unit?: string;
		city?: string;
		state?: string;
		postalCode?: string;
		latitude: number;
		longitude?: number;
		addressLine1?: string;
		country?: string;
		isManualAddress?: boolean;
	};
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
