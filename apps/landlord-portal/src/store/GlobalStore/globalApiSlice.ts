import { createApi } from '@reduxjs/toolkit/query/react';
import { publicEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { GenericType } from './global.types';

export const globalApiSlice = createApi({
	reducerPath: 'globalApiSlice',
	baseQuery: customApiFunction,
	endpoints: (builder) => ({
		getRoles: builder.query<GenericType[], void>({
			query: () => ({
				url: publicEndpoints.getRoles(),
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetRolesQuery } = globalApiSlice;
