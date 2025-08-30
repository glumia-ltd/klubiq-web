import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { paymentsEndpoints } from '@/helpers/endpoints';
import { API_TAGS } from '../store.types';
import { PaymentMethodType } from '@/shared/types/payment.types';

export const paymentsApiSlice = createApi({
	reducerPath: 'paymentsApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.PAYMENTS, API_TAGS.CURRENT_PAYMENT, API_TAGS.PUBLIC_KEY, API_TAGS.SAVED_PAYMENT_METHODS, API_TAGS.PAYMENT_HISTORY],
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
		getPaymentMethods: builder.query<PaymentMethodType[], void>({
			query: () => ({
				url: paymentsEndpoints.getPaymentMethods(),
				method: 'GET',
				providesTags: [API_TAGS.SAVED_PAYMENT_METHODS],
			}),
		}),
		getPaymentHistory: builder.query<any, string>({
			query: (leaseTenantId) => ({
				url: paymentsEndpoints.getPaymentHistory(leaseTenantId),
				method: 'GET',
				providesTags: [API_TAGS.PAYMENT_HISTORY],
			}),
		}),
		initialize: builder.mutation<any, {body: any, testMode: boolean}>({
			query: (data) => ({
				url: data.testMode ? `${paymentsEndpoints.initialize()}?testMode=${data.testMode}` : paymentsEndpoints.initialize(),
				method: 'POST',
				body: data.body,
			}),
		}),
		getTransactionStatus: builder.query<any, { provider: string; reference: string }>({
			query: ({ provider, reference }) => ({
				url: paymentsEndpoints.getTransactionStatus(provider, reference),
				method: 'GET',
			}),
		}),
		updateTransactionStatus: builder.mutation<any, any>({	
			query: (data) => ({
				url: paymentsEndpoints.updateTransactionStatus(),
				method: 'PUT',
				body: data,
			}),
		}),
	}),
});

export const {
	useGetUpcomingPaymentsQuery,
	useGetPaymentMethodsQuery,
	useGetPaymentHistoryQuery,
	useInitializeMutation,
	useGetTransactionStatusQuery,
	useLazyGetTransactionStatusQuery,
	useUpdateTransactionStatusMutation,
} = paymentsApiSlice;
