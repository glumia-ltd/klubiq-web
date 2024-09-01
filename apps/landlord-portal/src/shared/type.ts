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
	tenants: any[];
};
export type UnitType = {
	area: { value: number; unit: string };
	bathrooms: number;
	bedrooms: number;
	floor: number | null;
	id: string;
	images: string[];
	leases: LeaseType[];
	offices: number | string | null;
	rentAmount: string;
	rooms: null;
	toilets: 4;
	unitNumber: string;
};

export type PropertyDataType = {
	uuid: string;
	id: number;
	name: string;
	description: string;
	note: string | null;
	isMultiUnit: boolean;
	bedrooms: string | number;
	bathrooms: string | number;
	toilets: string | number;
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
	rentOverdue: { overDueLeaseCount: number; overDueRentSum: number } | null;
	singleUnits: number;
	totalProperties: number;
	totalUnits: number;
	vacantUnits: number;
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
	dailyRevenueChangeIndicator: string;
	dailyRevenuePercentageDifference: number;
	netCashFlow: number | null;
	netCashFlowChangeIndicator: string;
	netCashFlowLastMonth: number | null;
	netCashFlowPercentageDifference: number;
	todaysRevenue: number;
	totalExpenses: number;
	totalExpensesChangeIndicator: string;
	totalExpensesPercentageDifference: number;
};
export type DashboardMetricsType = {
	propertyMetrics: PropertyMetricsType;
	revenueMetrics: RevenueMetricsType;
	transactionMetrics: TransactionMetricsType;
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
