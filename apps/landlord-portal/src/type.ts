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
