/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { propertiesEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';

export const propertyApiSlice = createApi({
	reducerPath: 'propertyApi',
	baseQuery: customApiFunction,
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
