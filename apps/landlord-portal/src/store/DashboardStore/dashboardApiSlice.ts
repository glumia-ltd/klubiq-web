import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { dashboardEndpoints } from '../../helpers/endpoints';
import { DashboardMetricsType, RevenueReportType } from '../../shared/type';
import { API_TAGS } from '../types';
//import { api, baseURL, accessToken } from '../../api';

export const dashboardApiSlice = createApi({
	reducerPath: 'dashboardApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.DASHBOARD_METRICS, API_TAGS.DASHBOARD_REVENUE_REPORT],
	endpoints: (builder) => ({
		downloadReport: builder.mutation<Blob, { startDate: string; endDate: string }>({
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
					params: { userId }
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
	}),
});

export const {
	useGetDashboardMetricsQuery,
	useLazyGetDashboardMetricsQuery,
	useGetRevenueReportDataQuery,
	useLazyGetRevenueReportDataQuery,
	useDownloadReportMutation,
} = dashboardApiSlice;
