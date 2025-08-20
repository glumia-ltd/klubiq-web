
export {}
export type UserProfile = {
	addressLine2?: string | null;
	bio?: string | null;
	city?: string | null;
	organization?: string;
	country?: string | null;
	countryPhoneCode?: string | null;
	dateOfBirth?: string | null;
	email?: string;
	entitlements?: {
		[key: string]: string;
	};
	isactive?: boolean;
	firebaseid?: string;
	firstname?: string;
	lastname?: string;
	formOfIdentity?: string | null;
	gender?: string | null;
	isAccountVerified?: boolean;
	isprivacypolicyagreed?: boolean;
	istermsandconditionaccepted?: boolean;
	uuid?: string;
	phone?: string | null;
	postalCode?: string | null;
	profilepicurl?: string | null;
	profileuuid?: string;
	state?: string | null;
	street?: string | null;
	roleName?: string | null;
	notificationSubscription?: {
		[key: string]: boolean;
	};
	role?: string;
	companyname?: string;
	userpreferences?: Record<string, any> | null;
	preferences?: Record<string, any> | null;
};

export type PublicKeyType = {
	algorithm: string;
	hash: string;
	publicKey: string;
}
export const PaymentProviders = {
	vitalswap: 'vitalswap',
	monnify: 'monnify',
} as const;

export type PaymentProvider = (typeof PaymentProviders)[keyof typeof PaymentProviders];

export type MonnifyPaymentData = {
	provider: PaymentProvider;
	checkoutUrl: string;
	merchantName: string;
}

export type VitalSwapPaymentData = {
	provider: PaymentProvider;
	sessionId: string;
	isOtp: boolean;
	otpStatus: string;
	businessName: string;
	businessDescription: string;
}

export type PaymentData = {
	providerData?: MonnifyPaymentData | VitalSwapPaymentData;
	amount: number;
	providerTxnId: string;
	ledgerId: string;
	ledgerReference: string;
}