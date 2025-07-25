import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { paymentsEndpoints } from '@/helpers/endpoints';
import { API_TAGS } from '../store.types';

export const paymentsApiSlice = createApi({
	reducerPath: 'paymentsApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.PAYMENTS],
	endpoints: (builder) => ({
		getUpcomingPayments: builder.query<any, { leaseTenantId: string }>({
			query: (params) => ({
				url: paymentsEndpoints.getUpcomingPayments(params.leaseTenantId),
				method: 'GET',
				params,
			}),
		}),
		getPaymentMethods: builder.query<any, void>({
			query: () => ({
				url: paymentsEndpoints.getPaymentMethods(),
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetUpcomingPaymentsQuery, useGetPaymentMethodsQuery } =
	paymentsApiSlice;
