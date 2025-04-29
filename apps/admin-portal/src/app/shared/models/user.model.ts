export interface UserProfile {
	addressLine2?: string | null;
	bio?: string | null;
	city?: string | null;
	countryPhoneCode?: string | null;
	country?: string | null;
	dateOfBirth?: string | null;
	email?: string;
	formOfIdentity?: string | null;
	gender?: string | null;
	isPrivacyPolicyAgreed: boolean;
	isTermsAndConditionAccepted: boolean;
	phoneNumber?: string | null;
	postalCode?: string | null;
	profileId: number;
	profilePicUrl?: string | null;
	profileUuid: string;
	state?: string | null;
	street?: string | null;
	fbId?: string;
	systemRole?: string;
	entitlements: any;
}
