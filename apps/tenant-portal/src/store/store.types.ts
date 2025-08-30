import { UserProfile } from '@/shared/types/data.types';

export type AuthType = {
	user: UserProfile;
	isAuthenticated: boolean;
};

export type RootState = {
	auth: AuthType;
};

export const API_TAGS = {
	USER: 'User',
	INSIGHTS: 'Insights',
	PAYMENTS: 'Payments',
	CURRENT_PAYMENT: 'CurrentPayment',
	PUBLIC_KEY: 'PublicKey',
	SAVED_PAYMENT_METHODS: 'SavedPaymentMethods',
	PAYMENT_HISTORY: 'PaymentHistory',
} as const;
export const ALL_TAGS = Object.values(API_TAGS);


