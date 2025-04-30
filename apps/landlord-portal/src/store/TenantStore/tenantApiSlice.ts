/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import {tenantEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';

export const tenantApiSlice = createApi({
	reducerPath: 'tenantApi',
	baseQuery: customApiFunction,
	tagTypes: ['tenants', 'tenant-filter-metadata'],
	endpoints: (builder) => ({
		// getTenantFilterMetaData: builder.query<any, void>({
		// 	query: () => ({
		// 		url: tenantEndpoints.getTenantMetaData(),
		// 		method: 'GET',
		// 	}),
		// 	providesTags: ['tenant-filter-metadata'],
		// }),

		// getTenants: builder.query<GetLeasesResponse, { [key: string]: any }>({
		// 	query: (params) => ({
		// 		url: tenantEndpoints.getTenants(),
		// 		method: 'GET',
		// 		params,
		// 	}),
		// 	providesTags: ['tenants'],
		// }),
		// getSingleTenantById: builder.query<any, { id: string | number }>({
		// 	query: (params) => ({
		// 		url: tenantEndpoints.getTenant(params?.id),
		// 		method: 'GET',
		// 	}),
		// 	providesTags: ['tenants/{id}'],
		// }),
		onboardTenant: builder.mutation({
			query: (body) => ({
				url: tenantEndpoints.onboardTenant(),
				method: 'POST',
				body,
			}),
			invalidatesTags: ['tenants'],
		}),
	}),
});

// interface GetTenantsResponse {
// 	pageData: any;
// 	meta: any;
// }

export const {
	useOnboardTenantMutation,
} = tenantApiSlice;
