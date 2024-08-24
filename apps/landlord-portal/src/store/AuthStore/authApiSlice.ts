import { createApi } from '@reduxjs/toolkit/query/react';
import { authEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';

export const authApiSlice = createApi({
	reducerPath: 'authApiSlice',
	baseQuery: customApiFunction,
	endpoints: (builder) => ({
		getUserByFbid: builder.query<any, void>({
			query: () => ({
				url: authEndpoints.getUserByFbid(),
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetUserByFbidQuery, useLazyGetUserByFbidQuery } =
	authApiSlice;
