export const authEndpoints = {
	login: () => '/auth/login',
	signin: () => '/auth/signin',
	signup: () => '/auth/landlord/signup',
	signOut: () => '/auth/signout',
	emailVerification: () => '/auth/email-verification-link',
	refreshToken: () => '/auth/exchange-refresh-token',
	getUserByFbid: () => `/auth/landlord/user`,
	sendResetPasswordEmail: () => `/auth/reset-password-link`,
	resetPassword: () => `/auth/reset-password`,
	verifyOobCode: () => `/auth/verify-email`,
	updateUserPreferences: () => `/auth/update-preferences`,
	getOrgSettings: (orgId: string) => `/auth/org/${orgId}/settings`,
	getOrgSubscription: (orgId: string) => `/auth/org/${orgId}/subscription`,
	firebaseAuth: () => 'https://identitytoolkit.googleapis.com/v1/accounts',
	verifyMFAOtp: () => `/auth/mfa/verify-otp`,
	csrf: () => '/security/csrf-token',
	resendInvitation: (invitationId: string) => `/auth/resend-invitation/${invitationId}`,
};

export const dashboardEndpoints = {
	getOrganizationMetrics: () => `/dashboard/organization-metrics`,
	getOrganizationComparativeMetrics: (period: string) => `/dashboard/comparative-metrics?period=${period}`,
	getActivities: (orgId: string) => `/activities/${orgId}`,
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
	patchProperty: (propertyUuid: string) => `/properties/${propertyUuid}`,
	addUnit: (propertyUuid: string) => `/properties/${propertyUuid}/units`,
	editUnit: (propertyUuid: string, unitId: string) => `/properties/${propertyUuid}/units/${unitId}`,
	deleteUnits: (propertyUuid: string) => `/properties/${propertyUuid}/units`,
};

export const organizationEndpoints = {
	getOrganization: (orgUuid: string) => `/organizations/${orgUuid}`,
};

export const leaseEndpoints = {
	getLeaseMetaData: () => '/public/lease-metadata',
	getLeases: () => '/leases',
	getLease: (leaseId: number | string) => `/leases/${leaseId}`,
	addLease: () => '/leases',
	getUnitLeases: (unitId: number | string) => `/leases/unit/${unitId}`,
	addNewTenantToLease: (leaseId: number | string) =>
		`/leases/${leaseId}/invite-tenant`,
	addTenants: (leaseId: number | string) => `/leases/${leaseId}/add-tenants`,
	editLease: (leaseid: string) => `/leases/${leaseid}`,
	deleteLease: (leaseid: string) => `/leases/${leaseid}`,
	archiveLease: (leaseid: string) => `/leases/${leaseid}/archive`,
	terminateLease: (leaseid: string) => `/leases/terminate/${leaseid}`,
};
export const tenantEndpoints = {
	getTenantMetaData: () => '/public/tenant-metadata',
	getTenants: () => '/tenants/organization',
	getSingleTenant: (tenantId: string) => `/tenants/${tenantId}`,
	onboardTenant: () => '/auth/onboard-tenant',
	createTenant: () => '/auth/create-tenant',
	// 	editTenant: (tenantId: string) => `/tenants/${tenantId}`,
	// 	deleteTenant: (tenantId: string) => `/tenants/${tenantId}`,
};
export const notificationEndpoints = {
	subscribe: () => '/notifications-subscription/subscribe',
	unsubscribe: (subId: string) =>
		`/notifications-subscription/unsubscribe/${subId}`,
	notifications: () => '/notifications',
	markAsRead: () => '/notifications/mark-as-read-or-delivered',
	deleteNotifications: () => `/notifications/delete`,
	countNotifications: () => '/notifications/count',
};
export const publicEndpoints = {
	getRoles: () => '/public/organization-roles',
	getFeatures: () => '/public/features',
	getPermissions: () => '/public/permissions',
	globalSearch: () => '/search',
};

export const fileEndpoints = {
	uploadImages: () => '/uploads/images',
	uploadFiles: () => '/uploads/files',
	deleteFile: () => `/uploads/delete-file`,
};
