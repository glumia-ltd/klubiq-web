import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { paymentsEndpoints } from '@/helpers/endpoints';
import { API_TAGS } from '../store.types';

export const paymentsApiSlice = createApi({
	reducerPath: 'paymentsApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.PAYMENTS, API_TAGS.CURRENT_PAYMENT],
	// Enhanced cache configuration for better persistence
	keepUnusedDataFor: 300, // 5 minutes default
	refetchOnMountOrArgChange: true,
	refetchOnFocus: false, // Don't refetch when window regains focus
	endpoints: (builder) => ({
		getUpcomingPayments: builder.query<any, string>({
			query: (leaseTenantId) => ({
				url: paymentsEndpoints.getUpcomingPayments(leaseTenantId),
				method: 'GET',
			}),
		}),
		getPaymentMethods: builder.query<any, void>({
			query: () => ({
				url: paymentsEndpoints.getPaymentMethods(),
				method: 'GET',
			}),
		}),
		getPaymentHistory: builder.query<any, string>({
			query: (leaseTenantId) => ({
				url: paymentsEndpoints.getPaymentHistory(leaseTenantId),
				method: 'GET',
			}),
		}),
		initializePayment: builder.mutation<any, any>({
			query: (data) => ({
				url: paymentsEndpoints.initializePayment(),
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useGetUpcomingPaymentsQuery,
	useGetPaymentMethodsQuery,
	useGetPaymentHistoryQuery,
	useInitializePaymentMutation,
} = paymentsApiSlice;
