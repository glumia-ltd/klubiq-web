import { createApi } from '@reduxjs/toolkit/query/react';
import { publicEndpoints } from '../../helpers/endpoints';
import { customApiFunction } from '../customApiFunction';
import { ALL_TAGS } from '../store.types';
import { NotificationType } from '@/pages/Features/Dashboard/type';

export const notificationsApiSlice = createApi({
	reducerPath: 'notificationsApiSlice',
	baseQuery: customApiFunction,
	tagTypes: ALL_TAGS,
	endpoints: (builder) => ({
		getNotifications: builder.query<NotificationType[], { userId: string; isRead: boolean }>({
			query: ({ userId, isRead }) => ({
				url: publicEndpoints.notifications(userId, isRead),
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetNotificationsQuery, useLazyGetNotificationsQuery } = notificationsApiSlice;
