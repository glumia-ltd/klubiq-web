import { createApi } from '@reduxjs/toolkit/query/react';
import { leaseEndpoints } from '../../helpers/endpoints';
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
	}),
});

interface GetLeasesResponse {
	pageData: any;
	meta: any;
}

export const { useGetLeaseMetaDataQuery, useGetLeasesQuery } = leaseApiSlice;
