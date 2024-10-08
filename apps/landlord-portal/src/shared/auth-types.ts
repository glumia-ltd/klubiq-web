export type UserProfile = {
	addressLine2?: string | null;
	bio?: string | null;
	city?: string | null;
	company?: string;
	companyId?: number;
	companyRole?: string;
	companyUuid?: string;
	country?: string | null;
	countryPhoneCode?: string | null;
	dateOfBirth?: string | null;
	email?: string;
	entitlements?: {
		[key: string]: string;
	};
	fbId?: string;
	firstName?: string;
	formOfIdentity?: string | null;
	gender?: string | null;
	isAccountVerified?: boolean;
	isPrivacyPolicyAgreed?: boolean;
	isTermsAndConditionAccepted?: boolean;
	organizationUserId?: number;
	organizationUserUuid?: string;
	phoneNumber?: string | null;
	postalCode?: string | null;
	profileId?: number;
	profilePicUrl?: string | null;
	profileUuid?: string;
	state?: string | null;
	street?: string | null;
	systemRole?: string | null;
};
