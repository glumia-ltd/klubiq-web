import { createApi } from '@reduxjs/toolkit/query/react';
import { notificationEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import {
	ReadNotificationType,
	DeleteNotificationType,
} from './NotificationType';
import {
	GroupedNotifications,
	NotificationData,
} from '../../shared/global-types';
import { each } from 'lodash';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { API_TAGS } from '../types';

export const notificationApiSlice = createApi({
	reducerPath: 'notificationApi',
	baseQuery: customApiFunction,
	tagTypes: [API_TAGS.NOTIFICATION, API_TAGS.NOTIFICATION_COUNT],
	endpoints: (builder) => ({
		getGroupedNotifications: builder.query<GroupedNotifications[], void>({
			query: () => ({
				url: notificationEndpoints.notifications(),
				method: 'GET',
			}),
			transformResponse: (response: NotificationData[]) => {
				return groupNotificationsByDate(response);
			},
			providesTags: [API_TAGS.NOTIFICATION],
		}),
		getNotifications: builder.query<NotificationData[], void>({
			query: () => ({
				url: notificationEndpoints.notifications(),
				method: 'GET',
			}),
			providesTags: [API_TAGS.NOTIFICATION],
		}),
		// getNotifications: builder.query<GroupedNotifications[], void>({
		//     query: () => ({
		//         url: notificationEndpoints.notifications(),
		//         method: 'GET',
		//     }),
		//     providesTags: (result) =>
		//         result
		//             ? [...result.map(({ period }) => ({ type: 'Notifications' as const, period })), { type: 'Notifications' as const }]
		//             : [{ type: 'Notifications' as const }],
		// }),
		readNotifications: builder.mutation<unknown, ReadNotificationType>({
			query: (data: ReadNotificationType) => ({
				url: notificationEndpoints.markAsRead(),
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: [API_TAGS.NOTIFICATION, API_TAGS.NOTIFICATION_COUNT],
			onQueryStarted: async (readData, { dispatch, queryFulfilled }) => {
				// Optimistic Update
				const patchResult = dispatch(
					notificationApiSlice.util.updateQueryData(
						'getGroupedNotifications',
						undefined,
						(draft) => {
							draft.forEach((group) => {
								group.notifications = group.notifications.map((notification) =>
									readData.notificationIds.includes(notification.id)
										? { ...notification, isRead: true }
										: notification,
								);
							});
						},
					),
				);

				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),
		deleteNotifications: builder.mutation<unknown, DeleteNotificationType>({
			query: (data: DeleteNotificationType) => ({
				url: notificationEndpoints.deleteNotifications(),
				method: 'DELETE',
				body: data,
			}),
			invalidatesTags: [API_TAGS.NOTIFICATION_COUNT],
			// onQueryStarted: async (readData, { dispatch, queryFulfilled }) => {
			// 	// Optimistic Update
			// 	const patchResult = dispatch(
			// 		notificationApiSlice.util.updateQueryData(
			// 			'getGroupedNotifications',
			// 			undefined,
			// 			(draft) => {
			// 				draft.forEach((group) => {
			// 					group.notifications = group.notifications.filter(
			// 						(notification) =>
			// 							!readData.notificationIds.includes(notification.id),
			// 					);
			// 				});
			// 			},
			// 		),
			// 	);

			// 	try {
			// 		await queryFulfilled;
			// 	} catch {
			// 		patchResult.undo();
			// 	}
			// },
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
	useGetGroupedNotificationsQuery,
	useGetNotificationsQuery,
	useReadNotificationsMutation,
	useDeleteNotificationsMutation,
	useCountNotificationsQuery,	
} = notificationApiSlice;
const groupNotificationsByDate = (
	notifications: NotificationData[],
): GroupedNotifications[] => {
	dayjs.extend(utc);
	dayjs.extend(relativeTime, { rounding: Math.floor });
	const today = dayjs().utc();
	const yesterday = today.startOf('day').subtract(1, 'days');
	const last7Days = today.startOf('day').subtract(7, 'days');
	const last30Days = today.startOf('day').subtract(30, 'days');
	const grouped: { [key: string]: NotificationData[] | undefined } = {
		today: [] as NotificationData[],
		yesterday: [] as NotificationData[],
		last7Days: [] as NotificationData[],
		last30Days: [] as NotificationData[],
		older: [] as NotificationData[],
	};
	const groupedNotifications: GroupedNotifications[] = [];
	each(notifications, (notification) => {
		const createdAt = dayjs(notification.createdAt);

		notification.time = dayjs(createdAt).fromNow();
		if (createdAt >= today) {
			grouped.today?.push(notification);
		} else if (createdAt >= yesterday) {
			grouped.yesterday?.push(notification);
		} else if (createdAt >= last7Days) {
			grouped.last7Days?.push(notification);
		} else if (createdAt >= last30Days) {
			grouped.last30Days?.push(notification);
		} else {
			grouped.older?.push(notification);
		}
	});
	if (grouped.today && grouped.today.length > 0) {
		groupedNotifications.push({
			period: 'Today',
			notifications: grouped.today,
		});
	}
	if (grouped.yesterday && grouped.yesterday.length > 0) {
		groupedNotifications.push({
			period: 'Yesterday',
			notifications: grouped.yesterday,
		});
	}
	if (grouped.last7Days && grouped.last7Days.length > 0) {
		groupedNotifications.push({
			period: 'Last 7 days',
			notifications: grouped.last7Days,
		});
	}
	if (grouped.last30Days && grouped.last30Days.length > 0) {
		groupedNotifications.push({
			period: 'Last 30 days',
			notifications: grouped.last30Days,
		});
	}
	return groupedNotifications;
};

// // consoleDebug('createdAt', createdAt);
// // consoleDebug('today', today);
// // const timeDiffInDays = Math.abs(today.diff(createdAt, 'day'));
// // consoleDebug('timeDiffInDays', timeDiffInDays);
// // const timeDiffInHours = Math.abs(today.diff(createdAt, 'hour'));
// // consoleDebug('timeDiffInHours', timeDiffInHours);
// // const timeDiffInMinutes = Math.abs(today.diff(createdAt, 'minute'));
// // consoleDebug('timeDiffInMinutes', timeDiffInMinutes);
// // const timeDiffInSeconds = Math.abs(today.diff(createdAt, 'second'));
// // consoleDebug('timeDiffInSeconds', timeDiffInSeconds);
// // notification.time =
// // 	timeDiffInSeconds < 60
// // 		? `${timeDiffInSeconds} seconds ago`
// // 		: timeDiffInMinutes < 60
// // 			? `${timeDiffInMinutes} minutes ago`
// // 			: timeDiffInHours < 24
// // 				? `${timeDiffInHours} hours ago`
// // 				: `${timeDiffInDays} days ago`;
