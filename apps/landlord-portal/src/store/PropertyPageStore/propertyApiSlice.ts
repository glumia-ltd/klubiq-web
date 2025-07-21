/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { propertiesEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS } from '../types';
// import { screenMessages } from '../../helpers/screen-messages';
import { handleApiResponse } from '../../helpers/apiResponseHandler';
// import { invalidateMultipleTags } from '../tags-invalidator';

export const propertyApiSlice = createApi({
	reducerPath: 'propertyApi',
	baseQuery: customApiFunction,
	tagTypes: [
		API_TAGS.PROPERTY,
		API_TAGS.DASHBOARD_METRICS,
		API_TAGS.DASHBOARD_REVENUE_REPORT,
		API_TAGS.PROPERTY_METADATA,
		API_TAGS.PROPERTIES_AND_TENANTS,
		API_TAGS.NOTIFICATION,
	],
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
			providesTags: [API_TAGS.PROPERTY_METADATA],
		}),

		getSinglePropertyByUUID: builder.query<any, { uuid: string }>({
			query: (params) => ({
				url: propertiesEndpoints.getSingleProperty(params.uuid),
				method: 'GET',
			}),
			providesTags: (_result, _error, { uuid }) => [
				{ type: API_TAGS.PROPERTY, uuid: uuid },
			],
		}),

		addProperty: builder.mutation({
			query: (body) => ({
				url: propertiesEndpoints.addProperty(),
				method: 'POST',
				body,
			}),
			invalidatesTags: [
				API_TAGS.PROPERTY,
				API_TAGS.DASHBOARD_METRICS,
				API_TAGS.DASHBOARD_REVENUE_REPORT,
				API_TAGS.NOTIFICATION,
			],
		}),

		archiveProperty: builder.mutation<any, { uuid: string }>({
			query: (params) => ({
				url: propertiesEndpoints.archiveProperty(params.uuid),
				method: 'PUT',
			}),
			invalidatesTags: (_result, _error, { uuid }) => [
				{ type: API_TAGS.PROPERTY, uuid: uuid },
				API_TAGS.PROPERTY,
				API_TAGS.DASHBOARD_METRICS,
				API_TAGS.DASHBOARD_REVENUE_REPORT,
			],
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
			invalidatesTags: (_result, _error, { uuid }) => [
				{ type: API_TAGS.PROPERTY, uuid: uuid },
				API_TAGS.PROPERTY,
				API_TAGS.DASHBOARD_METRICS,
				API_TAGS.DASHBOARD_REVENUE_REPORT,
				API_TAGS.NOTIFICATION,
			],
		}),

		editProperty: builder.mutation<any, { uuid: string; data: any }>({
			query: ({ uuid, data }) => ({
				url: propertiesEndpoints.editProperty(uuid),
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: (_result, _error, { uuid }) => [
				{ type: API_TAGS.PROPERTY, uuid: uuid },
			],
		}),
		patchProperty: builder.mutation<any, { uuid: string; data: any }>({
			query: ({ uuid, data }) => ({
				url: propertiesEndpoints.patchProperty(uuid),
				method: 'PATCH',
				body: data,
			}),
		}),
		addUnit: builder.mutation<any, { propertyUuid: string; data: any }>({
			query: ({ propertyUuid, data }) => ({
				url: propertiesEndpoints.addUnit(propertyUuid),
				method: 'POST',
				body: data,
			}),
			invalidatesTags: (_result, _error, { propertyUuid }) => [
				{ type: API_TAGS.PROPERTY, uuid: propertyUuid },
				API_TAGS.PROPERTY,
				API_TAGS.DASHBOARD_METRICS,
				API_TAGS.DASHBOARD_REVENUE_REPORT,
				API_TAGS.NOTIFICATION,
			],
		}),
		editUnit: builder.mutation<
			any,
			{ propertyUuid: string; unitId: string; data: any }
		>({
			query: ({ propertyUuid, unitId, data }) => ({
				url: propertiesEndpoints.editUnit(propertyUuid, unitId),
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: (_result, _error, { propertyUuid }) => [
				{ type: API_TAGS.PROPERTY, uuid: propertyUuid },
				API_TAGS.PROPERTY,
				API_TAGS.DASHBOARD_METRICS,
				API_TAGS.DASHBOARD_REVENUE_REPORT,
				API_TAGS.NOTIFICATION,
			],
			// Add optimistic updates
			async onQueryStarted(
				{ propertyUuid, unitId, data },
				{ dispatch, queryFulfilled },
			) {
				try {
					await queryFulfilled;
					// Optimistically update the cache
					dispatch(
						propertyApiSlice.util.updateQueryData(
							'getSinglePropertyByUUID',
							{ uuid: propertyUuid },
							(draft) => {
								if (draft?.units) {
									const unitIndex = draft.units.findIndex(
										(unit: any) => unit.id === unitId,
									);
									if (unitIndex !== -1) {
										draft.units[unitIndex] = {
											...draft.units[unitIndex],
											...data,
										};
									}
								}
							},
						),
					);
				} catch {
					// If the mutation fails, the cache will be invalidated and refetched
				}
			},
		}),
		deleteUnit: builder.mutation<
			any,
			{ propertyUuid: string; unitIds: string[] }
		>({
			query: ({ propertyUuid, unitIds }) => ({
				url: propertiesEndpoints.deleteUnits(propertyUuid),
				method: 'DELETE',
				body: unitIds,
			}),
			
			invalidatesTags: (_result, _error, { propertyUuid }) => [
				{ type: API_TAGS.PROPERTY, uuid: propertyUuid },
				API_TAGS.PROPERTY,
				API_TAGS.DASHBOARD_METRICS,
				API_TAGS.DASHBOARD_REVENUE_REPORT,
				API_TAGS.NOTIFICATION,
			],
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
	useArchivePropertyMutation,
	useDeletePropertyMutation,
	useEditPropertyMutation,
	usePatchPropertyMutation,
	useAddUnitMutation,
	useEditUnitMutation,
	useDeleteUnitMutation,
} = propertyApiSlice;
