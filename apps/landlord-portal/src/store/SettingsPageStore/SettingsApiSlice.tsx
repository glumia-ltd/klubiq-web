/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { settingsEndpoint } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS } from '../types';
import { LeaseDetailsType, LeaseType } from '../../shared/type';

export const settingsApiSlice = createApi({
    reducerPath: 'settingsApi',
    baseQuery: customApiFunction,
    tagTypes: [
        // API_TAGS.SETTINGS,
        // API_TAGS.SETTINGS.METADATA,
        // API_TAGS.ORGANIZATIONS,

    ],
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
        getOrganizationSettings: builder.query<any, { uuid: string,profileUuid:string }>({
            query: ({ uuid }) => ({
                url: settingsEndpoint.getUserOrganizationSettings(uuid),
                method: 'GET',
            }),
        }),
    }),
});


export const {
    useUpdateProfileMutation,
    useUpdateOrganizationMutation,
    useUpdateOrganizationSettingsMutation,
    useGetOrganizationSettingsQuery

} = settingsApiSlice;
