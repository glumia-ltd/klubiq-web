
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
	firebaseId?: string;
	firstName?: string;
	lastName?: string;
	formOfIdentity?: string | null;
	gender?: string | null;
	isAccountVerified?: boolean;
	isPrivacyPolicyAgreed?: boolean;
	isTermsAndConditionAccepted?: boolean;
	organizationUserId?: number;
	uuid?: string;
	phone?: string | null;
	postalCode?: string | null;
	profileId?: number;
	profilePicUrl?: string | null;
	profileUuid?: string;
	state?: string | null;
	street?: string | null;
	roleName?: string | null;
	organizationUuid?: string;
	notificationSubscription?: {
		[key: string]: boolean;
	};
	tenantId?: string;
	role?: string;
	orgSettings?: Record<string, any> | null;
	orgSubscription?: Record<string, any> | null;
	phoneNumber?: string | null;
	companyName?: string;
};