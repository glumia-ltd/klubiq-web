/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { api as axiosInstance } from '../../api';
import { propertiesEndpoints } from '../../helpers/endpoints';

export const propertyApiSlice = createApi({
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
					url: propertiesEndpoints.getProperties(),
					method: 'GET',
					params,
				}),
			},
		),
		getPropertiesMetaData: builder.query<any, void>({
			query: () => ({
				url: propertiesEndpoints.getPropertiesMetaData(),
				method: 'GET',
			}),
		}),
	}),
});

interface GetPropertiesResponse {
	pageData: any;
	meta: any;
}

export const { useGetPropertiesQuery, useGetPropertiesMetaDataQuery } =
	propertyApiSlice;
