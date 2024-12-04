export type NotificationPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type NotificationData = {
	actionLink: string;
	actionText: string;
	createdAt: Date;
	data: Record<string, unknown>;
	expiresAt: Date;
	id: string;
	isRead: boolean;
	leaseId: number;
	message: string;
	organizationUuid?: string;
	propertyId: string;
	priority?: NotificationPriority;
	readAt: Date;
	title: string;
	type: string;
	unitId: number;
	userId: string;
	time?: string;
	isAnnouncement?: boolean;
};

export type GroupedNotifications = {
	period: string;
	notifications: NotificationData[];
};
