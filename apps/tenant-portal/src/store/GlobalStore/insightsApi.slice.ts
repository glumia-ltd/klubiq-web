import { createApi } from '@reduxjs/toolkit/query/react';
import { tenantEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { ALL_TAGS, API_TAGS } from '../store.types';
import { LeaseInsights } from '@/pages/Features/Dashboard/type';

export const insightsApiSlice = createApi({
	reducerPath: 'insightsApiSlice',
	baseQuery: customApiFunction,
	tagTypes: ALL_TAGS,
	endpoints: (builder) => ({
		getLeaseInsights: builder.query<LeaseInsights[], void>({
			query: () => ({
				url: tenantEndpoints.leaseInsights(),
				method: 'GET',
			}),
			providesTags: [API_TAGS.INSIGHTS],
		}),
	}),
});

export const {
	useGetLeaseInsightsQuery,
	useLazyGetLeaseInsightsQuery,
} = insightsApiSlice;
