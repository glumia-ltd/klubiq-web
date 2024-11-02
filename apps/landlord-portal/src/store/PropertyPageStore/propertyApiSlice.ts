/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { propertiesEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';

export const propertyApiSlice = createApi({
	reducerPath: 'propertyApi',
	baseQuery: customApiFunction,
	tagTypes: ['Property'],
	endpoints: (builder) => ({
		getProperties: builder.query<GetPropertiesResponse, { [key: string]: any }>(
			{
				query: (params) => ({
					url: propertiesEndpoints.getProperties(),
					method: 'GET',
					params,
				}),
				providesTags: ['Property'],
			},
		),
		getPropertiesMetaData: builder.query<any, void>({
			query: () => ({
				url: propertiesEndpoints.getPropertiesMetaData(),
				method: 'GET',
			}),
		}),

		getSinglePropertyByUUID: builder.query<any, { uuid: string }>({
			query: (params) => ({
				url: propertiesEndpoints.getSinglePropery(params.uuid),
				method: 'GET',
			}),
		}),

		addProperty: builder.mutation({
			query: (body) => ({
				url: propertiesEndpoints.addProperty(),
				method: 'POST',
				body,
			}),
		}),

		getSignedUrl: builder.mutation({
			query: (body) => ({
				url: propertiesEndpoints.getSignedUrl(),
				method: 'POST',
				body,
			}),
		}),

		archiveProperty: builder.mutation<any, { uuid: string }>({
			query: (params) => ({
				url: propertiesEndpoints.archiveProperty(params.uuid),
				method: 'PUT',
			}),
			invalidatesTags: ['Property'],
		}),
		deleteProperty: builder.mutation<any, { uuid: string }>({
			query: (params) => ({
				url: propertiesEndpoints.deleteProperty(params.uuid),
				method: 'DELETE',
			}),
			invalidatesTags: ['Property'],
		}),

		editProperty: builder.mutation<any, { uuid: string; data: any }>({
			query: ({ uuid, data }) => ({
				url: propertiesEndpoints.editProperty(uuid),
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Property'],
		}),
	}),
});

interface GetPropertiesResponse {
	pageData: any;
	meta: any;
}

export const fetchPropertiesApiData = (filter: any) => {
	return propertyApiSlice.endpoints.getProperties.select(filter);
};

export const {
	useGetPropertiesQuery,
	useGetPropertiesMetaDataQuery,
	useGetSinglePropertyByUUIDQuery,
	useAddPropertyMutation,
	useGetSignedUrlMutation,
	useArchivePropertyMutation,
	useDeletePropertyMutation,
	useEditPropertyMutation,
} = propertyApiSlice;
