import { createApi } from '@reduxjs/toolkit/query/react';
import { leaseEndpoints, propertiesEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';

export const leaseApiSlice = createApi({
	reducerPath: 'leaseApi',
	baseQuery: customApiFunction,
	endpoints: (builder) => ({
		getLeaseMetaData: builder.query<any, void>({
			query: () => ({
				url: leaseEndpoints.getLeaseMetaData(),
				method: 'GET',
			}),
		}),

		getLeases: builder.query<GetLeasesResponse, { [key: string]: any }>({
			query: (params) => ({
				url: leaseEndpoints.getLeases(),
				method: 'GET',
				params,
			}),
		}),
		getSingleLeaseById: builder.query<any, { id: string | number }>({
			query: (params) => ({
				url: leaseEndpoints.getLease(params?.id),
				method: 'GET',
			}),
		}),
		getOrgPropertiesViewList: builder.query<any, { orgId: string }>({
			query: (params) => ({
				url: propertiesEndpoints.getOrgPropertiesViewList(params?.orgId),
				method: 'GET',
			}),
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
} = leaseApiSlice;
