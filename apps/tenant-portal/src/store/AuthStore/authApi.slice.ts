import { createApi } from '@reduxjs/toolkit/query/react';
import { authEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { UserProfile } from '@/shared/types/data.types';
import { ALL_TAGS, API_TAGS } from '../store.types';
import { resetStore } from '..';

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
		signOut: builder.mutation({
			query: () => ({
				url: authEndpoints.signOut(),
				method: 'POST',
			}),
			invalidatesTags: (_result, _error) => ALL_TAGS,
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					resetStore();
					await new Promise(resolve => setTimeout(resolve, 100));

					// Clear service worker cache
					const cacheNames = await caches.keys();
					await Promise.all(
						cacheNames.map(cacheName => caches.delete(cacheName))
					);

					// Clear IndexedDB if you're using it
					const databases = await window.indexedDB.databases();
					databases.forEach(db => {
						if (db.name) {
							window.indexedDB.deleteDatabase(db.name);
						}
					});
					sessionStorage.clear();
				} catch (error) {
				}
			},
		}),
		signIn: builder.mutation({
			query: (body) => ({
				url: authEndpoints.login(),
				method: 'POST',
				body,
			}),
		}),
		resetPassword: builder.mutation({
			query: (body) => ({
				url: authEndpoints.resetPassword(),
				method: 'POST',
				body,
			})
		}),
		acceptInvitation:builder.mutation<any, {token: string, data: any}>({
			query: ({token, data}) => ({
				url: authEndpoints.acceptInvitation(token),
				method: 'POST',
				body: data,
			})
		}),
		validateResetPasswordToken: builder.mutation<boolean, {token: string, email?: string}>({
			query: ({token, email}) => ({
				url: authEndpoints.validateResetPasswordToken(),
				method: 'POST',
				body: {token, email},
			})
		}),
	}),
});

export const {
	useGetUserByFbidQuery,
	useLazyGetUserByFbidQuery,
	useSignOutMutation,
	useSignInMutation,
	useResetPasswordMutation,
	useAcceptInvitationMutation,
	useValidateResetPasswordTokenMutation,
} = authApiSlice;
