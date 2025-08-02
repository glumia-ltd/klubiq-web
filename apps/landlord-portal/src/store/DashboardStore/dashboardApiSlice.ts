import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { dashboardEndpoints } from '../../helpers/endpoints';
import {
	ActivityType,
} from '../../shared/type';
import { API_TAGS } from '../types';
import { OrganizationMetrics } from '../../page-tytpes/dashboard/dashboard.types';
//import { api, baseURL, accessToken } from '../../api';

export const dashboardApiSlice = createApi({
	reducerPath: 'dashboardApi',
	baseQuery: customApiFunction,
	tagTypes: [
		API_TAGS.DASHBOARD_METRICS,
		API_TAGS.DASHBOARD_REVENUE_REPORT,
		API_TAGS.ACTIVITY,
		API_TAGS.ORGANIZATION_METRICS,
		API_TAGS.ORGANIZATION_COMPARATIVE_METRICS,
	],
	endpoints: (builder) => ({

		getOrganizationActivities: builder.query<
			ActivityType,
			{ orgId: string; page?: number; limit?: number }
		>({
			query: (params) => {
				return {
					url: dashboardEndpoints.getActivities(params.orgId),
					method: 'GET',
					params: {
						page: params.page,
						limit: params.limit,
					},
				};
			},
			providesTags: [API_TAGS.ACTIVITY],
		}),
		getOrganizationMetrics: builder.query<OrganizationMetrics, void>({
			query: () => {
				return {
					url: dashboardEndpoints.getOrganizationMetrics(),
					method: 'GET'
				};
			},
			providesTags: [API_TAGS.ORGANIZATION_METRICS],
		}),
		getOrganizationComparativeMetrics: builder.query<any, string>({
			query: (period) => {
				return {
					url: dashboardEndpoints.getOrganizationComparativeMetrics(period),
					method: 'GET'
				};
			},
			providesTags: [API_TAGS.ORGANIZATION_COMPARATIVE_METRICS],
		}),
	}),
});

export const {
	useGetOrganizationActivitiesQuery,
	useLazyGetOrganizationActivitiesQuery,
	useGetOrganizationMetricsQuery,
	useGetOrganizationComparativeMetricsQuery,
	useLazyGetOrganizationComparativeMetricsQuery,
	useLazyGetOrganizationMetricsQuery,
} = dashboardApiSlice;
