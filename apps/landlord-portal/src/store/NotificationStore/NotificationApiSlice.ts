import { createApi } from '@reduxjs/toolkit/query/react';
import { notificationEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import {
	ReadNotificationType,
	DeleteNotificationType,
} from './NotificationType';
import {
	NotificationData,
} from '../../shared/global-types';
import { API_TAGS } from '../types';

export const notificationApiSlice = createApi({
	reducerPath: 'notificationApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.NOTIFICATION, API_TAGS.NOTIFICATION_COUNT],
	endpoints: (builder) => ({
		getNotifications: builder.query<NotificationData[], void>({
			query: () => ({
				url: notificationEndpoints.notifications(),
				method: 'GET',
			}),
			providesTags: [API_TAGS.NOTIFICATION],
		}),
		readNotifications: builder.mutation<unknown, ReadNotificationType>({
			query: (data: ReadNotificationType) => ({
				url: notificationEndpoints.markAsRead(),
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: [API_TAGS.NOTIFICATION, API_TAGS.NOTIFICATION_COUNT],
			onQueryStarted: async (readData, { dispatch, queryFulfilled }) => {
				const patch = dispatch(
				  notificationApiSlice.util.updateQueryData(
					'getNotifications',
					undefined,
					(draft: NotificationData[]) => {
					  draft.forEach((n: NotificationData) => {
						if (readData.notificationIds.includes(n.id)) n.isRead = true;
					  });
					},
				  ),
				);
				try { await queryFulfilled; } catch { patch.undo(); }
			  }
		}),
		deleteNotifications: builder.mutation<unknown, DeleteNotificationType>({
			query: (data: DeleteNotificationType) => ({
				url: notificationEndpoints.deleteNotifications(),
				method: 'DELETE',
				body: data,
			}),
			invalidatesTags: [API_TAGS.NOTIFICATION_COUNT],
			onQueryStarted: async ({ notificationIds }, { dispatch, queryFulfilled }) => {
				// Optimistically remove deleted notifications from getNotifications cache
				const patchGetNotifications = dispatch(
					notificationApiSlice.util.updateQueryData(
						'getNotifications',
						undefined,
						(draft) => draft.filter((n) => !notificationIds.includes(n.id)),
					),
				);

				try {
					await queryFulfilled;
				} catch {
					patchGetNotifications.undo();
				}
			},
		}),
		countNotifications: builder.query<number, void>({
			query: () => ({
				url: notificationEndpoints.countNotifications(),
				method: 'GET',
			}),
			providesTags: [API_TAGS.NOTIFICATION_COUNT],
		}),
	}),
});
export const {
	useGetNotificationsQuery,
	useReadNotificationsMutation,
	useDeleteNotificationsMutation,
	useCountNotificationsQuery,	
} = notificationApiSlice;
