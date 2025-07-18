import { createApi } from '@reduxjs/toolkit/query/react';
import { customApiFunction } from '../customApiFunction';
import { paymentsEndpoints } from '@/helpers/endpoints';
import { API_TAGS } from '../store.types';

export const paymentsApiSlice = createApi({
	reducerPath: 'paymentsApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.PAYMENTS],
	endpoints: (builder) => ({
		getPayments: builder.query<GetPaymentsResponse, { [key: string]: any }>({
			query: (params) => ({
				url: paymentsEndpoints.getPayments(),
				method: 'GET',
				params,
			}),
		}),
	}),
});

interface GetPaymentsResponse {}
