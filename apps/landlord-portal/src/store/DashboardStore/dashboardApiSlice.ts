import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { dashboardEndpoints } from '../../helpers/endpoints';
import { DashboardMetricsType, RevenueReportType } from '../../shared/type';

export const dashboardApiSlice = createApi({
	reducerPath: 'dashboardApi',
	baseQuery: customApiFunction,
	endpoints: (builder) => ({
		getDashboardMetrics: builder.query<DashboardMetricsType, void>({
			query: () => ({
				url: dashboardEndpoints.getDashboardMetrics(),
				method: 'GET',
			}),
		}),
		getRevenueReportData: builder.query<
			RevenueReportType,
			{ startDate: string; endDate: string }
		>({
			query: (params) => ({
				url: dashboardEndpoints.getRevenueReport(),
				method: 'GET',
				params,
			}),
		}),
	}),
});

export const { useGetDashboardMetricsQuery, useLazyGetRevenueReportDataQuery } =
	dashboardApiSlice;
