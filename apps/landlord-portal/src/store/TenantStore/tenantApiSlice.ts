import { createApi } from '@reduxjs/toolkit/query/react';
import { tenantEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS } from '../types';
// import { screenMessages } from '../../helpers/screen-messages';
// import { handleApiResponse } from '../../helpers/apiResponseHandler';
export const tenantApiSlice = createApi({
	reducerPath: 'tenantApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.TENANT, API_TAGS.TENANT_FILTER_METADATA, API_TAGS.LEASE, API_TAGS.LEASE_METADATA, API_TAGS.DASHBOARD_METRICS, API_TAGS.DASHBOARD_REVENUE_REPORT, API_TAGS.PROPERTY],
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
		onboardTenant: builder.mutation<any, { propertyId: string; body: any }>({
			query: ({ body }) => ({
				url: tenantEndpoints.onboardTenant(),
				method: 'POST',
				body,
			}),
			invalidatesTags: [API_TAGS.TENANT, API_TAGS.PROPERTY, API_TAGS.LEASE_METADATA, API_TAGS.LEASE, API_TAGS.DASHBOARD_METRICS, API_TAGS.DASHBOARD_REVENUE_REPORT],
			// async onQueryStarted({ propertyId }, { dispatch, queryFulfilled }) {
			// 	await handleApiResponse(queryFulfilled, dispatch, {
			// 		successMessage: screenMessages.tenant.add.success,
			// 		errorMessage: screenMessages.tenant.add.error,
			// 		tagsToInvalidate: [
			// 			API_TAGS.TENANT,
			// 			API_TAGS.TENANT_FILTER_METADATA,
			// 			API_TAGS.PROPERTY,
			// 			API_TAGS.LEASE,
			// 			{ type: API_TAGS.PROPERTY, id: propertyId }
			// 		]
			// 	});
			// },
		}),
		addNewTenantWithoutLease: builder.mutation({
			query: (body) => ({
				url: tenantEndpoints.createTenant(),
				method: 'POST',
				body,
			}),
			invalidatesTags: [API_TAGS.TENANT, API_TAGS.LEASE_METADATA,],
		}),
	}),
});

interface GetTenantsResponse {
	pageData: any;
	meta: any;
}

export const { useOnboardTenantMutation, useAddNewTenantWithoutLeaseMutation,useGetTenantFilterMetaDataQuery,
	useGetTenantsQuery,useGetSingleTenantByIdQuery } = tenantApiSlice;
