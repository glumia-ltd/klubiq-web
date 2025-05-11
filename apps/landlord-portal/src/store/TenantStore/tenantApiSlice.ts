import { createApi } from '@reduxjs/toolkit/query/react';
import { tenantEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS } from '../types';
import { invalidateMultipleTags } from '../tags-invalidator';
export const tenantApiSlice = createApi({
	reducerPath: 'tenantApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.TENANT, API_TAGS.TENANT_FILTER_METADATA],
	endpoints: (builder) => ({
		getTenantFilterMetaData: builder.query<any, void>({
			query: () => ({
				url: tenantEndpoints.getTenantMetaData(),
				method: 'GET',
			}),
			providesTags: [API_TAGS.TENANT_FILTER_METADATA],
		}),

		getTenants: builder.query<GetTenantsResponse, { [key: string]: any }>({
			query: (params) => ({
				url: tenantEndpoints.getTenants(),
				method: 'GET',
				params,
			}),
			providesTags: [API_TAGS.TENANT],
		}),
		getSingleTenantById: builder.query<any, { id: string | number }>({
			query: (params) => ({
				url: tenantEndpoints.getSingleTenant(String(params?.id)),
				method: 'GET',
			}),
			providesTags: [API_TAGS.TENANT],
		}),
		onboardTenant: builder.mutation({
			query: (body) => ({
				url: tenantEndpoints.onboardTenant(),
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					invalidateMultipleTags(dispatch, [
						API_TAGS.TENANT,
						API_TAGS.LEASE,
						API_TAGS.PROPERTY,
						API_TAGS.TENANT_FILTER_METADATA,
					]);
				} catch (error) {
					console.error(error);
				}
			},
		}),
		addNewTenantWithoutLease: builder.mutation({
			query: (body) => ({
				url: tenantEndpoints.createTenant(),
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					invalidateMultipleTags(dispatch, [
						API_TAGS.TENANT,
						API_TAGS.TENANT_FILTER_METADATA,
						API_TAGS.PROPERTY,
					]);
				} catch (error) {
					console.error(error);
				}
			},
		}),
	}),
});

interface GetTenantsResponse {
	pageData: any;
	meta: any;
}

export const { useOnboardTenantMutation, useAddNewTenantWithoutLeaseMutation,useGetTenantFilterMetaDataQuery,
	useGetTenantsQuery,useGetSingleTenantByIdQuery } = tenantApiSlice;
