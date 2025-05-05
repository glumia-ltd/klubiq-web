/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { leaseEndpoints, propertiesEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS } from '../types';

export const leaseApiSlice = createApi({
	reducerPath: 'leaseApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.LEASE, API_TAGS.LEASE_METADATA],
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
		getSingleLeaseById: builder.query<any, { id: string | number }>({
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
		}),
		addLease: builder.mutation({
			query: (body) => ({
				url: leaseEndpoints.addLease(),
				method: 'POST',
				body,
			}),
			invalidatesTags: [API_TAGS.LEASE],
		}),
	}),
});

interface GetLeasesResponse {
	pageData: any;
	meta: any;
}

export const {
	useGetLeaseMetaDataQuery,
	useGetLeasesQuery,
	useGetSingleLeaseByIdQuery,
	useGetOrgPropertiesViewListQuery,
	useAddLeaseMutation,
	useGetUnitLeasesQuery,
	useLazyGetUnitLeasesQuery,
} = leaseApiSlice;
