/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import {tenantEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS, invalidateMultipleTags } from '../api-tags';
export const tenantApiSlice = createApi({
	reducerPath: 'tenantApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.TENANT, API_TAGS.TENANT_FILTER_METADATA],
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
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {	
					await queryFulfilled;
					invalidateMultipleTags(dispatch, [API_TAGS.TENANT, API_TAGS.LEASE, API_TAGS.TENANT_FILTER_METADATA]);
				} catch (error) {
					console.error(error);
				}
			},
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
