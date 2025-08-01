import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { dashboardEndpoints } from '../../helpers/endpoints';
import {
	ActivityType,
	DashboardMetricsType,
	RevenueReportType,
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
		downloadReport: builder.mutation<
			Blob,
			{ startDate: string; endDate: string }
		>({
			query: (params) => ({
				url: dashboardEndpoints.downloadReport(),
				method: 'POST',
				body: params,
			}),
		}),
		getDashboardMetrics: builder.query<DashboardMetricsType, string>({
			query: (userId) => {
				return {
					url: dashboardEndpoints.getDashboardMetrics(),
					method: 'GET',
					params: { userId },
				};
			},
			providesTags: [API_TAGS.DASHBOARD_METRICS],
		}),
		getRevenueReportData: builder.query<
			RevenueReportType,
			{ startDate: string; endDate: string }
		>({
			query: (params) => {
				return {
					url: dashboardEndpoints.getRevenueReport(),
					method: 'GET',
					params,
				};
			},
			providesTags: [API_TAGS.DASHBOARD_REVENUE_REPORT],
		}),
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
	useGetDashboardMetricsQuery,
	useLazyGetDashboardMetricsQuery,
	useGetRevenueReportDataQuery,
	useLazyGetRevenueReportDataQuery,
	useDownloadReportMutation,
	useGetOrganizationActivitiesQuery,
	useLazyGetOrganizationActivitiesQuery,
	useGetOrganizationMetricsQuery,
	useGetOrganizationComparativeMetricsQuery,
	useLazyGetOrganizationComparativeMetricsQuery,
	useLazyGetOrganizationMetricsQuery,
} = dashboardApiSlice;
