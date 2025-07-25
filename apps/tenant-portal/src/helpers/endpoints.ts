export const authEndpoints = {
	login: () => '/auth/signin',
	signOut: () => '/auth/signout',
	refreshToken: () => '/auth/exchange-refresh-token',
	getUserByFbid: () => `/auth/tenant/user`,
	acceptInvitation: (token: string) =>
		`/auth/accept-tenant-invitation?token=${token}`,
	csrf: () => '/security/csrf-token',
	validateInvitationToken: (token: string) =>
		`/auth/is-invite-valid?token=${token}`,
	sendResetPasswordEmail: () => `/auth/reset-password-link`,
	validateResetPasswordToken: () =>
		`/auth/reset-token-valid`,
	resetPassword: () => `/auth/reset-password`,
};

export const tenantEndpoints = {
	leaseInsights: () => '/tenants/lease-insights',
	paymentHistory: () => '/tenants/payment-history',
	maintenanceRequests: () => '/tenants/maintenance-requests',
	documents: () => '/tenants/documents',
	profile: () => '/tenants/profile',
};
export const publicEndpoints = {
	notifications: (userId: string, isRead: boolean) =>
		`/notifications?userId=${userId}&isRead=${isRead}`,
};

export const paymentsEndpoints = {
	getUpcomingPayments: (leaseTenantId: string) =>
		`/payments/upcoming-payments/${leaseTenantId}`,
	getPaymentMethods: () => '/payment-methods',
};
