import { createApi } from '@reduxjs/toolkit/query/react';
import { authEndpoints, notificationEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { UserProfile } from '../../shared/auth-types';
import { ALL_TAGS, API_TAGS } from '../types';
import { consoleError } from '../../helpers/debug-logger';
import { handleApiResponse } from '../../helpers/apiResponseHandler';
import { screenMessages } from '../../helpers/screen-messages';
import { resetStore, RootState } from '..';
import { SignUpResponseType } from '../../page-tytpes/auths/signup.type';
import { PermissionType, PermissionVersionType } from './authType';
import { readPermCookie } from '../../authz/perm-token';
type GetPermsArgs = { orgId: string; roleName: string };
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
			invalidatesTags: (_result, _error) => ALL_TAGS,
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;

					// Use the existing resetStore function
					resetStore();
					// Use the existing resetStore function
					resetStore();

					await new Promise((resolve) => setTimeout(resolve, 100));
					await new Promise((resolve) => setTimeout(resolve, 100));

					// Clear service worker cache
					const cacheNames = await caches.keys();
					await Promise.all(
						cacheNames.map((cacheName) => caches.delete(cacheName)),
						cacheNames.map((cacheName) => caches.delete(cacheName)),
					);

					// Clear IndexedDB if you're using it
					const databases = await window.indexedDB.databases();
					databases.forEach((db) => {
					databases.forEach((db) => {
						if (db.name) {
							window.indexedDB.deleteDatabase(db.name);
						}
					});

					// Clear sessionStorage
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
		fetchCsrfToken: builder.query<
			{ token: string; expiresIn: number; message: string },
			void
		>({
		fetchCsrfToken: builder.query<
			{ token: string; expiresIn: number; message: string },
			void
		>({
			query: () => ({
				url: authEndpoints.csrf(),
				method: 'GET',
			}),
		}),
		signUp: builder.mutation<SignUpResponseType, any>({
			query: (body) => ({
				url: authEndpoints.signup(),
				method: 'POST',
				body,
			}),
		}),
		resetPassword: builder.mutation({
			query: (body) => ({
				url: authEndpoints.resetPassword(),
				method: 'POST',
				body,
			}),

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await handleApiResponse(queryFulfilled, dispatch, {
					successMessage: screenMessages.auth.resetPassword.success,
					errorMessage: screenMessages.auth.resetPassword.error,
				});
			},
		}),
		resendInvitation: builder.mutation<
			void,
			{ invitationId: string; email: string; isTenant: boolean }
		>({
		resendInvitation: builder.mutation<
			void,
			{ invitationId: string; email: string; isTenant: boolean }
		>({
			query: (body) => ({
				url: authEndpoints.resendInvitation(body.invitationId),
				method: 'POST',
				body: {
					email: body.email,
					isTenant: body.isTenant,
				},
			}),
		}),
		getPermissions: builder.query<PermissionVersionType, GetPermsArgs>({
			async queryFn(params, queryApi, _extra, fetchWithBQ) {
				const state = queryApi.getState() as RootState;
				const { hasBeginSession } = state.auth;
				if (!hasBeginSession) {
					return {
						error: 'Session not found',
					};
				}
				// get from cookie
				const snap = readPermCookie('_kbq_pt');
				if (snap) {
					console.log('fetching permissions from cookie. Snapshot found: ', snap);
					const permissions = snap.permissions as PermissionType[];
					return {
						data: {
							permissions,
							version: snap.version,
							source: 'cookie',
						},
					};
				} 
				const res = await fetchWithBQ({
					url: authEndpoints.getPermissions(params.orgId, params.roleName),
					method: 'GET',
					credentials: 'include',
				});
				if (res.data) {
					const body = res.data as { permissions: string[]; version: string };
					const permissions = body.permissions as PermissionType[];
					return {
						data: { permissions, version: body.version, source: 'server' },
					};
				}
				return {
					error: res.error as any,
				};
				
			},
			onCacheEntryAdded: async (
				args,
				{ cacheDataLoaded, updateCachedData, cacheEntryRemoved },
			) => {
				const initial = await cacheDataLoaded;
				if (initial.data?.source !== 'server') {
					try {
						const resp = await fetch(
							authEndpoints.getPermissions(args.orgId, args.roleName),
							{ credentials: 'include' },
						);
						if(!resp.headers.get('Content-Type')?.includes('application/json')) {
							return;
						}
						if (resp.ok) {
							const fresh = (await resp.json()) as {
								permissions: string[];
								version: string;
							};
							updateCachedData((d) => {
								d.permissions = fresh.permissions as PermissionType[];
								d.version = fresh.version;
								d.source = 'server';
							});
						} return;
					} catch (error) {
						consoleError('Error fetching permissions:', error);
					}
				}
				await cacheEntryRemoved;
			},
			serializeQueryArgs: ({ endpointName, queryArgs }) =>
				`${endpointName}|${queryArgs.orgId}|${queryArgs.roleName}`,
			providesTags: (_res, _err, { orgId, roleName }) => [
				{ type: API_TAGS.PERMISSIONS, id: `${orgId}:${roleName}` },
			],
		}),
		// getPermissions: builder.query<PermissionVersionType, GetPermsArgs>({
		// 	query: (params) => ({
		// 		url: authEndpoints.getPermissions(params.orgId, params.roleName),
		// 		method: 'GET',
		// 	}),
		// 	transformResponse: (response: {
		// 		permissions: string[];
		// 		version: string;
		// 	}) => ({
		// 		permissions: response.permissions as PermissionType[],
		// 		version: response.version,
		// 		source: 'server',
		// 	}),
		// 	serializeQueryArgs: ({ endpointName, queryArgs }) =>
		// 		`${endpointName}|${queryArgs.orgId}|${queryArgs.roleName}`,

		// 	// allow external invalidation (e.g., after admin role change)
		// 	providesTags: (_res, _err, { orgId, roleName }) => [
		// 		{ type: API_TAGS.PERMISSIONS, id: `${orgId}:${roleName}` },
		// 	],
		// }),
		invalidatePermissions: builder.mutation<void, GetPermsArgs>({
			queryFn: () => ({ data: undefined }),
			invalidatesTags: (_result, _error, { orgId, roleName }) => [
				{ type: API_TAGS.PERMISSIONS, id: `${orgId}:${roleName}` },
			],
		}),
		verifyEmail: builder.mutation<{emailVerified: boolean, uid: string, email: string}, { email: string; token: string }>({
			query: (body) => ({
				url: authEndpoints.verifyEmail(),
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
	useResetPasswordMutation,
	useSignUpMutation,
	useLazyFetchCsrfTokenQuery,
	useFetchCsrfTokenQuery,
	useResendInvitationMutation,
	useLazyGetPermissionsQuery,
	useGetPermissionsQuery,
	useInvalidatePermissionsMutation,
	useVerifyEmailMutation,
} = authApiSlice;
