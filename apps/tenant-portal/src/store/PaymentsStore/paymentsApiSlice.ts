import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { paymentsEndpoints } from '@/helpers/endpoints';
import { API_TAGS } from '../store.types';
import { PaymentMethodType } from '@/shared/types/payment.types';
import { PublicKeyType } from '@/shared/types/data.types';

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
		initializeCardPayment: builder.mutation<any, any>({
			query: (data) => ({
				url: paymentsEndpoints.initializeCardPayment(),
				method: 'POST',
				body: data,
			}),
		}),
		intializeBankTransferPayment: builder.mutation<any, any>({
			query: (data) => ({
				url: paymentsEndpoints.intializeBankTransferPayment(),
				method: 'POST',
				body: data,
			}),
		}),
		getPublicKey: builder.query<PublicKeyType, void>({
			query: () => ({
				url: paymentsEndpoints.getPublicKey(),
				method: 'GET',
				providesTags: [API_TAGS.PUBLIC_KEY],
			}),
		}),
		processCardPayment: builder.mutation<any, any>({
			query: (data) => ({
				url: paymentsEndpoints.secureChargeCard(),
				method: 'POST',
				body: data,
			}),
			invalidatesTags: [API_TAGS.CURRENT_PAYMENT, API_TAGS.PAYMENT_HISTORY],
		}),
	}),
});

export const {
	useGetUpcomingPaymentsQuery,
	useGetPaymentMethodsQuery,
	useGetPaymentHistoryQuery,
	useInitializeCardPaymentMutation,
	useIntializeBankTransferPaymentMutation,
	useGetPublicKeyQuery,
	useProcessCardPaymentMutation,
} = paymentsApiSlice;
