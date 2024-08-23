/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { api as axiosInstance } from '../api';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: async (args) => {
		try {
			const result = await axiosInstance({
				method: args.method,
				url: args.url,
				data: args.body,
				params: args.params,
			});

			return { data: result.data.data };
		} catch (error) {
			return { error: (error as Error).message };
		}
	},
	endpoints: (builder) => ({
		getProperties: builder.query<GetPropertiesResponse, { [key: string]: any }>(
			{
				query: (params) => ({
					url: '/properties',
					method: 'GET',
					params,
				}),
			},
		),
	}),
});

interface GetPropertiesResponse {
	pageData: any;
	meta: any;
}

export const { useGetPropertiesQuery } = apiSlice;
