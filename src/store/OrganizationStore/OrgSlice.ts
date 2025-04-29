import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';
import { RootState } from '..';
import { Organization } from '../../shared/auth-types';
import { OrgType } from './orgType';

const initialState: OrgType = {
	organization: {} as Organization,
};

const options = {
	name: 'org',
	initialState,
	reducers: {
		saveOrganization: (state: OrgType, action: PayloadAction<OrgType>) => {
			return {
				...state,
				organization: action.payload.organization,
			};
		},
		removeOrganization: (state: OrgType) => {
			return { ...state, organization: {} as Organization };
		},
	},
};

const orgSlice = createSlice(options);

export const { saveOrganization, removeOrganization } = orgSlice.actions;

export const getOrgState = (state: RootState) => state.org;

const orgReducer = orgSlice.reducer;

export default orgReducer;
