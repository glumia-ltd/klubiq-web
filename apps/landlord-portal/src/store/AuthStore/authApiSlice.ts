import { createApi } from '@reduxjs/toolkit/query/react';
import { authEndpoints, notificationEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { UserProfile } from '../../shared/auth-types';
import { ALL_TAGS, API_TAGS } from '../types';
import { consoleError } from '../../helpers/debug-logger';

export const authApiSlice = createApi({
	reducerPath: 'authApiSlice',
	baseQuery: customApiFunction,
	tagTypes: ALL_TAGS,
	endpoints: (builder) => ({
		getUserByFbid: builder.query<UserProfile, void>({
			query: () => ({
				url: authEndpoints.getUserByFbid(),
				method: 'GET',
			}),
			providesTags: [API_TAGS.USER],
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
		verifyMFAOtp: builder.mutation({
			query: (body) => ({
				url: authEndpoints.verifyMFAOtp(),
				method: 'POST',
				body,
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
		signOut: builder.mutation({
			query: () => ({
				url: authEndpoints.signOut(),
				method: 'POST',
			}),
			invalidatesTags: ALL_TAGS,
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					sessionStorage.clear();
				} catch (error) {
					consoleError('Error during sign out:', error);
				}
			},
		}),
		signIn: builder.mutation({
			query: (body) => ({
				url: authEndpoints.signin(),
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
	useSignOutMutation,
	useSignInMutation,
	useVerifyMFAOtpMutation,
} = authApiSlice;
