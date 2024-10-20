export const authEndpoints = {
	login: () => 'auth/login',
	signup: () => 'auth/landlord/signup',
	emailVerification: () => 'auth/email-verification-link',
	refreshToken: () => 'auth/exchange-refresh-token',
	getUserByFbid: () => `auth/user`,
	sendResetPasswordEmail: () => `auth/reset-password-link`,
	resetPassword: () => `auth/reset-password`,
	verifyOobCode: () => `auth/verify-email`,
	updateUserPreferences: () => `auth/update-preferences`,
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
	getSinglePropery: (propertyUuid: string) => `/properties/${propertyUuid}`,
	getSignedUrl: () => '/properties/signed-url',
};

export const organizationEndpoints = {
	getOrganization: (orgUuid: string) => `/organizations/${orgUuid}`,
};
