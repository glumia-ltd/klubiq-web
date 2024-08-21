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

export type PropertyDataType = {
	uuid: string;
	id: number;
	name: string;
	description: string;
	note: string | null;
	isMultiUnit: boolean;
	bedroom: string | number;
	bathroom: string | number;
	toilet: string | number;
	isArchived: boolean;
	createdDate: string;
	updatedDate: string;
	address: PropertyAddressType;
	unitCount: number;
	isDraft: boolean;
	isListingPublished: boolean;
	mainPhoto: PropertyMetaData | null;
	purpose: PropertyMetaData;
	category: PropertyMetaData;
	type: PropertyMetaData;
	tags: string[];
	area: {
		value: number | string;
		unit: string;
	};
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