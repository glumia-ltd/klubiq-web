import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { dashboardEndpoints } from '../../helpers/endpoints';
import { DashboardMetricsType, RevenueReportType } from '../../shared/type';
import { consoleDebug } from '../../helpers/debug-logger';
//import { api, baseURL, accessToken } from '../../api';

export const dashboardApiSlice = createApi({
	reducerPath: 'dashboardApi',
	baseQuery: customApiFunction,
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
				consoleDebug('Executing getDashboardMetrics query for user:', userId);
				return {
					url: dashboardEndpoints.getDashboardMetrics(),
					method: 'GET',
					params: { userId }
				};
			},
		}),
		getRevenueReportData: builder.query<
			RevenueReportType,
			{ startDate: string; endDate: string }
		>({
			query: (params) => {
				consoleDebug('Executing getRevenueReportData query with params:', params);
				return {
					url: dashboardEndpoints.getRevenueReport(),
					method: 'GET',
					params,
				};
			},
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
