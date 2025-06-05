/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { propertiesEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS } from '../types';
import { screenMessages } from '../../helpers/screen-messages';
import { handleApiResponse } from '../../helpers/apiResponseHandler';
// import { invalidateMultipleTags } from '../tags-invalidator';

export const propertyApiSlice = createApi({
	reducerPath: 'propertyApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.PROPERTY],
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
				url: propertiesEndpoints.getSingleProperty(params.uuid),
				method: 'GET',
			}),
			providesTags: (_result, _error, { uuid }) => [{ type: API_TAGS.PROPERTY, id: uuid }],
		}),

		addProperty: builder.mutation({
			query: (body) => ({
				url: propertiesEndpoints.addProperty(),
				method: 'POST',
				body,
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await handleApiResponse(queryFulfilled, dispatch, {
					successMessage: screenMessages.property.create.success,
					errorMessage: screenMessages.property.create.error,
					tagsToInvalidate: [
						API_TAGS.PROPERTY,
						API_TAGS.DASHBOARD_METRICS,
						API_TAGS.DASHBOARD_REVENUE_REPORT,
					]
				});
			},
			//invalidatesTags: [API_TAGS.PROPERTY],
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
			invalidatesTags: (_result, _error, { uuid }) => [{ type: API_TAGS.PROPERTY, id: uuid }],
		}),
		deleteProperty: builder.mutation<
			any,
			{ uuid: string; address: string; name: string; unitCount: number }
		>({
			query: (params) => ({
				url: propertiesEndpoints.deleteProperty(params.uuid),
				method: 'DELETE',
				body: {
					uuid: params.uuid,
					address: params.address,
					name: params.name,
					unitCount: params.unitCount,
				},
			}),
			invalidatesTags: (_result, _error, { uuid }) => [{ type: API_TAGS.PROPERTY, id: uuid }],
		}),

		editProperty: builder.mutation<any, { uuid: string; data: any }>({
			query: ({ uuid, data }) => ({
				url: propertiesEndpoints.editProperty(uuid),
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (_result, _error, { uuid }) => [{ type: API_TAGS.PROPERTY, id: uuid }],
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
