import { UserProfile } from "./auth-types";

export interface RouteObjectType {
	'Property Category': { label: string; icon: React.ReactNode };
	'Property Details': { label: string; icon: React.ReactNode };
	'Unit Type': { label: string; icon: React.ReactNode };
	[key: string]: { label: string; icon: React.ReactNode };
}

export type PropertyAddressType = {
	id: number;
	addressLine1: string;
	unit: string | null;
	addressLine2: string | null;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	isManualAddress: boolean;
	latitude: string | number;
	longitude: string | number;
};

export type PropertyMetaData = {
	id?: number | string;
	displayText?: string;
	name?: string;
	url?: string;
	fileSize?: number;
	isMain?: boolean;
};

export type TenantType = {
	id: string;
	profile: UserProfile;
	isPrimaryTenant: boolean;
}

export type LeaseType = {
	endDate: string;
	id: number;
	isArchived: boolean;
	isDraft: boolean;
	name: string;
	paymentFrequency: string;
	rentAmount: string;
	rentDueDay: number;
	securityDeposit: string;
	startDate: string;
	status: string;
	tenants: TenantType[];
};
export type UnitType = {
	area?: { value: number; unit: string };
	bathrooms?: number;
	bedrooms?: number;
	floor?: number | null;
	id?: string;
	images?: string[];
	lease?: LeaseType;
	offices?: number | string | null;
	rentAmount?: string;
	rooms?: null;
	toilets?: 4;
	unitNumber?: string;
};

export type PropertyDataType = {
	uuid: string;
	id: number;
	name: string;
	description: string;
	note: string | null;
	isMultiUnit: boolean;
	bedrooms:  number;
	bathrooms: number;
	toilets: number;
	isArchived: boolean;
	createdDate: string;
	updatedDate: string;
	address: PropertyAddressType;
	unitCount: number;
	isDraft: boolean;
	isListingPublished: boolean;
	mainImage: PropertyMetaData | null;
	purpose: PropertyMetaData;
	category: PropertyMetaData;
	type: PropertyMetaData;
	tags: string[];
	area: {
		value: number | string;
		unit: string;
	};
	units?: UnitType[];
	amenities?: Record<string, string>[];
	status?: string | null;
	owner?: string | null;
	vacantUnitCount?: number;
	totalRent: string;
	images?: { isMain: boolean; url: string }[] | null;
	totalTenants: number;
	offices: number;
	rooms: number;
};

// export type PropertyType = {
// 	title: string;
// 	address: string;
// 	bedrooms: number;
// 	bathrooms: number;
// 	sqm: number;
// 	type: string;
// 	status: string;
// 	image: string;
// 	propertyType: string;
// 	unitType: string;
// 	purpose: string;
// }[];

export type PropertyMetricsType = {
	maintenanceUnits: number;
	maintenanceUnitsChangeIndicator: string;
	maintenanceUnitsLastMonth: number;
	maintenanceUnitsPercentageDifference: number;
	multiUnits: number;
	occupancyRate: number | null;
	occupancyRateChangeIndicator: string;
	occupancyRateLastMonth: number | null;
	occupancyRatePercentageDifference: number;
	occupiedUnits: number;
	singleUnits: number;
	totalProperties: number;
	totalUnits: number;
	vacantUnits: number;
};
export type RentOverdueLeaseType = {
	overDueLeaseCount: number;
	overDueRentSum: number;
};

export type SeriesDataType = {
	data: number[];
	label: string;
	stack?: string;
	color?: string;
}[];

export type RevenueMetricsType = {
	changeIndicator: string;
	maxRevenue: number;
	monthlyRevenues: number[];
	percentageDifference: number;
	revenueChart: { xAxisData: string[]; seriesData: SeriesDataType };
	totalRevenueLast12Months: number;
};

export type TransactionMetricsType = {
	totalRevenueChangeIndicator: string;
	totalRevenuePercentageDifference: number;
	netCashFlow: number | null;
	netCashFlowChangeIndicator: string;
	netCashFlowLastMonth: number | null;
	netCashFlowPercentageDifference: number;
	totalRevenue: number;
	totalRevenueLastMonth: number;
	totalExpenses: number;
	totalExpensesChangeIndicator: string;
	totalExpensesPercentageDifference: number;
};

export type LeaseMetricsType = {
	activeLeaseForPeriodChangeIndicator: string;
	activeLeaseForPeriodPercentageDifference: number;
	activeLeaseCount: number | null;
	activeLeaseForPeriodCount: number | null;
	expiringLeaseForPeriodCount: number;
	tenantCount: number;
	avgLeaseDuration: number;
};
export type DashboardMetricsType = {
	propertyMetrics: PropertyMetricsType;
	revenueMetrics: RevenueMetricsType;
	transactionMetrics: TransactionMetricsType;
	leaseMetrics: LeaseMetricsType;
	rentsOverDueSummary?: RentOverdueLeaseType;
};

export type RevenueReportType = {
	maxRevenue: number;
	monthlyRevenues: {
		month: string;
		revenue: {
			[key: string]: number;
		};
	}[];
	totalRevenueLast12Months: number;
	percentageDifference: number;
	changeIndicator: string;
	revenueChart: {
		xAxisData: string[];
		seriesData: SeriesDataType;
	};
};

export interface MainTextMatchedSubstrings {
	offset: number;
	length: number;
}
export interface StructuredFormatting {
	main_text: string;
	secondary_text: string;
	main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
	place_id: string;
	description: string;
	structured_formatting: StructuredFormatting;
}

export type AddPropertyType = {
	newAmenity: string;
	customAmenities: string[];
	categoryId?: number | null;
	purposeId: number | null;
	typeId: number | string;
	name: string;
	description: string;
	images: PropertyImageType[] | null;
	isMultiUnit?: boolean;
	address: {
		addressLine2: string;
		unit: string;
		city: string;
		state: string;
		postalCode: string;
		latitude: number;
		longitude: number;
		addressLine1: string;
		country: string;
		isManualAddress: boolean;
	};

	units: {
		id: number | null;
		unitNumber: string;
		rentAmount: number | null;
		floor: number | null;
		bedrooms: number | null;
		bathrooms: number | null;
		toilets: number | null;
		area: {
			value: number | null;
			unit: string;
		};
		status: string;
		rooms: number | null;
		offices: number | null;
		amenities: string[] | null;
	}[];
};

export type CategoryMetaDataType = {
	icon?: string;
	hasBedrooms?: boolean;
	hasRooms?: boolean;
	hasOffices?: boolean;
};

export type SignedUrlType = {
	signature: string;
	storageLimit: number;
	storageUsed: string;
	timestamp: number;
};
export type PropertyImageType = {
	isMain: boolean;
	url: string;
	fileSize: number;
	unitNumber?: string;
};
