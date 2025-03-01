import { createApi } from '@reduxjs/toolkit/query/react';
import { authEndpoints, notificationEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { UserProfile } from '../../shared/auth-types';

export const authApiSlice = createApi({
	reducerPath: 'authApiSlice',
	baseQuery: customApiFunction,
	endpoints: (builder) => ({
		getUserByFbid: builder.query<UserProfile, void>({
			query: () => ({
				url: authEndpoints.getUserByFbid(),
				method: 'GET',
			}),
		}),
		getOrgSettings: builder.query<any, { orgId: string }>({
			query: (params) => ({
				url: authEndpoints.getOrgSettings(params.orgId),
				method: 'GET',
			}),
		}),
		getOrgSubscription: builder.query<any, { orgId: string }>({
			query: (params) => ({
				url: authEndpoints.getOrgSubscription(params.orgId),
				method: 'GET',
			}),
		}),
		updateUserPreferences: builder.mutation({
			query: (body) => ({
				url: authEndpoints.updateUserPreferences(),
				method: 'POST',
				body,
			}),
		}),
		updateNotificationSubscription: builder.mutation({
			query: (body) => ({
				url: notificationEndpoints.subscribe(),
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useGetUserByFbidQuery,
	useLazyGetUserByFbidQuery,
	useLazyGetOrgSettingsQuery,
	useLazyGetOrgSubscriptionQuery,
	useGetOrgSubscriptionQuery,
	useGetOrgSettingsQuery,
	useUpdateUserPreferencesMutation,
	useUpdateNotificationSubscriptionMutation,
} = authApiSlice;
