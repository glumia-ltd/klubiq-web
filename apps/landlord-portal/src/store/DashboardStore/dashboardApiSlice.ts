import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { dashboardEndpoints } from '../../helpers/endpoints';
import { DashboardMetricsType, RevenueReportType } from '../../shared/type';
//import { api, baseURL, accessToken } from '../../api';

export const dashboardApiSlice = createApi({
	reducerPath: 'dashboardApi',
	baseQuery: customApiFunction,
	endpoints: (builder) => ({
		getDashboardMetrics: builder.query<DashboardMetricsType, void>({
			query: () => ({
				url: dashboardEndpoints.getDashboardMetrics(),
				method: 'GET',
			}),
			// comment SSE out for now
			// async onCacheEntryAdded(
			// 	arg,
			// 	{ updateCachedData, cacheDataLoaded, cacheEntryRemoved },
			// ) {
			// 	try {
			// 		await cacheDataLoaded;
			// 		const eventSource = new EventSource(
			// 			`${baseURL}${dashboardEndpoints.propertyReportStream()}?token=${accessToken}`,
			// 		);
			// 		eventSource.onopen = () => {
			// 			console.log('Connection opened');
			// 			console.log('starting streaming');
			// 		};
			// 		eventSource.onerror = (error) => {
			// 			console.error('EventSource failed! Error occurred:', error);
			// 		};
			// 		eventSource.onmessage = (event) => {
			// 			const result = JSON.parse(event.data);
			// 			console.log('Message from SSE:', result.data);
			// 			if (!result || result.type !== 'dashboard') {
			// 				console.log('not dashboard');
			// 				return;
			// 			}
			// 			updateCachedData((draft) => {
			// 				console.log('updating cache', result);
			// 				draft.propertyMetrics = result.data;
			// 			});
			// 		};

			// 		await cacheEntryRemoved;
			// 		//eventSource.close();
			// 	} catch (error) {
			// 		console.error('Error fetching dashboard metrics:', error);
			// 	}
			// },
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

export const {
	useGetDashboardMetricsQuery,
	useGetRevenueReportDataQuery,
	useLazyGetRevenueReportDataQuery,
} = dashboardApiSlice;
