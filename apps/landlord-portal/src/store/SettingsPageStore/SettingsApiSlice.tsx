/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { settingsEndpoint } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { API_TAGS } from '../types';

export const settingsApiSlice = createApi({
    reducerPath: 'settingsApi',
    baseQuery: customApiFunction,
    tagTypes: [API_TAGS.SETTINGS],
    endpoints: (builder) => ({
        updateProfile: builder.mutation<any, { profileId: string; body: any }>({
            query: ({ profileId, body }) => ({
                url: settingsEndpoint.updateProfile(profileId),
                method: 'PUT',
                body,
            }),

        }),
        deleteProfilePicture: builder.mutation<any, { profileUuid: string; body: any }>({
            query: ({ profileUuid, body }) => ({
                url: settingsEndpoint.deleteUserProfilePicture(profileUuid),
                method: 'DELETE',
                body,
            }),

        }),
        updateOrganization: builder.mutation<any, { uuid: string; body: any }>({
            query: ({ uuid, body }) => ({
                url: settingsEndpoint.updateOrganization(uuid),
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [
                API_TAGS.SETTINGS
            ],
        }),
        updateOrganizationSettings: builder.mutation<any, { organizationId: string; profileUuid: string; body: any }>({
            query: ({ organizationId, profileUuid, body }) => ({
                url: settingsEndpoint.updateOrganizationSettings(organizationId, profileUuid),
                method: 'POST',
                body,
            }),
            invalidatesTags: [
                API_TAGS.SETTINGS
            ],
        }),
        updateNotificationPreference: builder.mutation({
            query: (body) => ({
                url: settingsEndpoint.updateNotificationPreferences(),
                method: 'PATCH',
                body,
            }),
        }),
        getNotificationPreference: builder.query<any, void>({
            query: () => ({
                url: settingsEndpoint.getNotificationPreferences(),
                method: 'GET',
            }),
            providesTags: [API_TAGS.SETTINGS],
        }),
        getOrganizationSettings: builder.query<any, { uuid: string; profileUuid: string }>({
            query: ({ uuid, profileUuid }) => ({
                url: settingsEndpoint.getUserOrganizationSettings(uuid),
                method: 'GET',
                params: { profileUuid },
            }),
            providesTags: [API_TAGS.SETTINGS],

        }),
    }),
});


export const {
    useUpdateProfileMutation,
    useUpdateOrganizationMutation,
    useUpdateOrganizationSettingsMutation,
    useGetOrganizationSettingsQuery,
useGetNotificationPreferenceQuery,
    useUpdateNotificationPreferenceMutation,
    useDeleteProfilePictureMutation,
} = settingsApiSlice;
