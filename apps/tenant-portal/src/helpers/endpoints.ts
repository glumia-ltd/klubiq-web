export const authEndpoints = {
	login: () => '/auth/signin',
	signOut: () => '/auth/signout',
	refreshToken: () => '/auth/exchange-refresh-token',
	getUserByFbid: () => `/auth/tenant/user`,
	acceptInvitation: (token: string) =>
		`/auth/accept-tenant-invitation?token=${token}`,
	csrf: () => '/security/csrf-token',
};

export const tenantEndpoints = {
	leaseInsights: () => '/tenants/lease-insights',
	paymentHistory: () => '/tenants/payment-history',
	maintenanceRequests: () => '/tenants/maintenance-requests',
	documents: () => '/tenants/documents',
	profile: () => '/tenants/profile',
};