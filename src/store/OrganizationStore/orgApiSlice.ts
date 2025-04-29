import { createApi } from '@reduxjs/toolkit/query/react';
import { organizationEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';

export const orgApiSlice = createApi({
	reducerPath: 'orgApiSlice',
	baseQuery: customApiFunction,
	endpoints: (builder) => ({
		getOrgById: builder.query<any, { uuid: string }>({
			query: (params) => ({
				url: organizationEndpoints.getOrganization(params.uuid),
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetOrgByIdQuery, useLazyGetOrgByIdQuery } = orgApiSlice;
