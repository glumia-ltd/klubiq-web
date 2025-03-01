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
	orgSettings?: {
		[key: string]: unknown;
	};
	organizationUuid?: string | null;
};

export type Organization = {
	organizationUuid: string;
	organizationId: number;
	isActive: boolean;
	name: string;
	isVerified?: boolean | null;
	email?: string | null;
	govRegistrationNumber?: string | null;
	countryPhoneCode?: string | null;
	phoneNumber?: string | null;
	street?: string | null;
	addressLine2?: string | null;
	state?: string | null;
	city?: string | null;
	country?: string | null;
	postalCode?: string | null;
	companyType?: string | null;
	createdDate?: Date | null;
	updatedDate?: Date | null;
	website?: string | null;
	logoUrl?: string | null;
	subscriptions?: Subscription[] | null;
	settings?: Settings | null;
};

export interface Settings {}

export interface Subscription {
	id: number;
	organizationUuid?: string | null;
	subscription_plan_id?: number | null;
	start_date?: string | null;
	end_date?: string | null;
	duration?: string | null;
	price?: number | null;
	auto_renew?: boolean | null;
	is_free_trial?: boolean | null;
	is_active?: boolean | null;
	payment_status?: string | null;
	subscription_plan?: SubscriptionPlan | null;
}

export interface SubscriptionPlan {
	id: number;
	name: string;
	monthly_price: number;
	annual_price: number;
	percentage_savings_on_annual_price: string;
	currency: string;
	property_limit: number;
	unit_limit: number;
	user_limit: number;
	tenant_limit: number;
	document_storage_limit: number;
	support_type: string;
	automated_rent_collection: boolean;
	multi_currency_support: boolean;
}
