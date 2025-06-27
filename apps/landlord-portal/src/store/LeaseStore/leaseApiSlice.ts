/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { leaseEndpoints, propertiesEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS } from '../types';
import { LeaseDetailsType, LeaseType } from '../../shared/type';

export const leaseApiSlice = createApi({
	reducerPath: 'leaseApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.LEASE, API_TAGS.LEASE_METADATA, API_TAGS.TENANT, API_TAGS.PROPERTY, 
		API_TAGS.DASHBOARD_REVENUE_REPORT, API_TAGS.DASHBOARD_METRICS, API_TAGS.PROPERTIES_AND_TENANTS, API_TAGS.NOTIFICATION],
	endpoints: (builder) => ({
		getLeaseMetaData: builder.query<any, void>({
			query: () => ({
				url: leaseEndpoints.getLeaseMetaData(),
				method: 'GET',
			}),
			providesTags: [API_TAGS.LEASE_METADATA],
		}),

		getLeases: builder.query<GetLeasesResponse, { [key: string]: any }>({
			query: (params) => ({
				url: leaseEndpoints.getLeases(),
				method: 'GET',
				params,
			}),
			providesTags: [API_TAGS.LEASE],
		}),
		getSingleLeaseById: builder.query<LeaseDetailsType, { id: string | number }>({
			query: (params) => ({
				url: leaseEndpoints.getLease(params?.id),
				method: 'GET',
			}),
		}),
		getUnitLeases: builder.query<any, { id: string | number }>({
			query: (params) => ({
				url: leaseEndpoints.getUnitLeases(params?.id),
				method: 'GET',
			}),
		}),
		getOrgPropertiesViewList: builder.query<any, { orgId: string }>({
			query: (params) => ({
				url: propertiesEndpoints.getOrgPropertiesViewList(params?.orgId),
				method: 'GET',
			}),
			providesTags: [API_TAGS.PROPERTIES_AND_TENANTS],
		}),
		addLease: builder.mutation({
			query: (body) => ({
				url: leaseEndpoints.addLease(),
				method: 'POST',
				body,
			}),
			invalidatesTags: [API_TAGS.LEASE, API_TAGS.TENANT, API_TAGS.PROPERTY, API_TAGS.DASHBOARD_REVENUE_REPORT, 
				API_TAGS.DASHBOARD_METRICS, API_TAGS.PROPERTIES_AND_TENANTS, API_TAGS.NOTIFICATION],
		}),
		addNewTenantToLease: builder.mutation<any, { leaseId: string, body: any }>({
			query: ({ leaseId, body }) => ({
				url: leaseEndpoints.addNewTenantToLease(leaseId),
				method: 'POST',
				body,
			}),
			invalidatesTags: [API_TAGS.LEASE, API_TAGS.TENANT, API_TAGS.PROPERTY, API_TAGS.DASHBOARD_REVENUE_REPORT, 
				API_TAGS.DASHBOARD_METRICS, API_TAGS.PROPERTIES_AND_TENANTS, API_TAGS.NOTIFICATION],
		}),
		addTenants: builder.mutation<any, { leaseId: string, body: any }>({
			query: ({ leaseId, body }) => ({
				url: leaseEndpoints.addTenants(leaseId),
				method: 'POST',
				body,
			}),
			invalidatesTags: [API_TAGS.LEASE, API_TAGS.TENANT, API_TAGS.PROPERTY, API_TAGS.DASHBOARD_REVENUE_REPORT, 
				API_TAGS.DASHBOARD_METRICS, API_TAGS.PROPERTIES_AND_TENANTS, API_TAGS.NOTIFICATION],
		}),
	}),
});

interface GetLeasesResponse {
	pageData: LeaseType[];
	meta: any;
}

export const {
	useGetLeaseMetaDataQuery,
	useGetLeasesQuery,
	useLazyGetLeasesQuery,
	useGetSingleLeaseByIdQuery,
	useGetOrgPropertiesViewListQuery,
	useAddLeaseMutation,
	useGetUnitLeasesQuery,
	useLazyGetUnitLeasesQuery,
	useAddNewTenantToLeaseMutation,
	useAddTenantsMutation,
} = leaseApiSlice;
