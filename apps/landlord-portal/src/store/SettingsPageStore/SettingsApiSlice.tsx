/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { settingsEndpoint } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { ALL_TAGS } from '../types';

export const settingsApiSlice = createApi({
    reducerPath: 'settingsApi',
    baseQuery: customApiFunction,
    tagTypes: ALL_TAGS,
    endpoints: (builder) => ({
        updateProfile: builder.mutation<any, { profileId: string; body: any }>({
            query: ({ profileId, body }) => ({
                url: settingsEndpoint.updateProfile(profileId),
                method: 'PUT',
                body,
            }),

        }),
        updateOrganization: builder.mutation<any, { uuid: string; body: any }>({
            query: ({ uuid, body }) => ({
                url: settingsEndpoint.updateOrganization(uuid),
                method: 'PATCH',
                body,
            }),
            // invalidatesTags: [

            // ],
        }),
        updateOrganizationSettings: builder.mutation<any, { organizationId: string; profileUuid: string; body: any }>({
            query: ({ organizationId, profileUuid, body }) => ({
                url: settingsEndpoint.updateOrganizationSettings(organizationId, profileUuid),
                method: 'POST',
                body,
            }),
            // invalidatesTags: [

            // ],
        }),
        getOrganizationSettings: builder.query<any, { uuid: string; profileUuid: string }>({
            query: ({ uuid, profileUuid }) => ({
                url: settingsEndpoint.getUserOrganizationSettings(uuid),
                method: 'GET',
                params: { profileUuid },
            })
        }),
    }),
});


export const {
    useUpdateProfileMutation,
    useUpdateOrganizationMutation,
    useUpdateOrganizationSettingsMutation,
    useGetOrganizationSettingsQuery

} = settingsApiSlice;
