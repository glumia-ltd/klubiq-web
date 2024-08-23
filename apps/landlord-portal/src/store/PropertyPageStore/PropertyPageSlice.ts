import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PropertyStateType } from './propertyPageType';
import { RootState } from '..';
import { find } from 'lodash';
import { propertiesEndpoints } from '../../helpers/endpoints';
import { api } from '../../api';

const initialState: PropertyStateType = {
	allPropertiesData: null,
	currentId: null,
	currentProperty: null,
};

const fetchProperties = createAsyncThunk(
	'properties/fetchProperties',
	async () => {
		const {
			data: {
				data: { pageData },
			},
		} = await api.get(propertiesEndpoints.getProperties());
	},
);

const options = {
	name: 'propertyData',
	initialState,
	reducers: {
		savePropertiesData: (
			state: PropertyStateType,
			action: PayloadAction<PropertyStateType>,
		) => {
			return {
				...state,
				allPropertiesData: action.payload.allPropertiesData,
			};
		},

		savePropertyId: (
			state: PropertyStateType,
			action: PayloadAction<PropertyStateType>,
		) => {
			const id = action?.payload?.currentId;
			if (id) {
				const currentProperty = find(state.allPropertiesData, { id: id });

				return {
					...state,
					currentId: action.payload.currentId,
					currentProperty,
				};
			} else {
				return {
					...state,
				};
			}
		},
	},
};

const PropertyPageSlice = createSlice(options);

export const { savePropertiesData, savePropertyId } = PropertyPageSlice.actions;

export const getPropertyData = (state: RootState) =>
	state?.property?.currentProperty;

const propertyDataReducer = PropertyPageSlice.reducer;

export default propertyDataReducer;
