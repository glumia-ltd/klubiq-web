export const authEndpoints = {
	login: () => '/auth/login',
	signup: () => '/auth/landlord/signup',
	emailVerification: () => '/auth/email-verification-link',
	refreshToken: () => '/auth/exchange-refresh-token',
	getUserByFbid: () => `/auth/user`,
	sendResetPasswordEmail: () => `/auth/reset-password-link`,
	resetPassword: () => `/auth/reset-password`,
	verifyOobCode: () => `/auth/verify-email`,
	updateUserPreferences: () => `/auth/update-preferences`,
	getOrgSettings: (orgId: string) => `/auth/org/${orgId}/settings`,
	getOrgSubscription: (orgId: string) => `/auth/org/${orgId}/subscription`,
	firebaseAuth: () => 'https://identitytoolkit.googleapis.com/v1/accounts',
};

export const dashboardEndpoints = {
	getDashboardMetrics: () => '/dashboard/metrics',
	getRevenueReport: () => `/dashboard/revenue-report`,
	downloadReport: () => '/dashboard/download-revenue-report',
	propertyReportStream: () => `/events/sse/properties`, // eslint-disable-line(orgId)
};

export const propertiesEndpoints = {
	getProperties: () => '/properties',
	addProperty: () => `/properties`,
	getPropertiesMetaData: () => '/public/property-metadata',
	getSingleProperty: (propertyUuid: string) => `/properties/${propertyUuid}`,
	getSignedUrl: () => '/properties/signed-url',
	getPropertiesNames: () => '/properties/view/list',
	archiveProperty: (propertyUuid: string) =>
		`/properties/${propertyUuid}/archive`,
	deleteProperty: (propertyUuid: string) => `/properties/${propertyUuid}`,
	editProperty: (propertyUuid: string) => `/properties/${propertyUuid}`,
	getOrgPropertiesViewList: (orgId: string) =>
		`/public/org/${orgId}/properties`,
};

export const organizationEndpoints = {
	getOrganization: (orgUuid: string) => `/organizations/${orgUuid}`,
};

export const leaseEndpoints = {
	getLeaseMetaData: () => '/public/lease-metadata',
	getLeases: () => '/leases',
	getLease: (leaseId: number | string) => `/leases/${leaseId}`,
	addLease: () => '/leases',
};
export const notificationEndpoints = {
	subscribe: () => '/notifications-subscription/subscribe',
	unsubscribe: (subId: string) =>
		`/notifications-subscription/unsubscribe/${subId}`,
	notifications: () => '/notifications',
	markAsRead: () => '/notifications/mark-as-read-or-delivered',
	deleteNotifications: () => `/notifications/delete`,
};
export const publicEndpoints = {
	getRoles: () => '/public/organization-roles',
	getFeatures: () => '/public/features',
	getPermissions: () => '/public/permissions',
};
