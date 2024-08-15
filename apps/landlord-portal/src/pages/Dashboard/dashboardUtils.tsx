import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const initialDashboardMetrics = {
	propertyMetrics: {
		maintenanceUnits: 0,
		maintenanceUnitsChangeIndicator: '',
		maintenanceUnitsLastMonth: 0,
		maintenanceUnitsPercentageDifference: 0,
		multiUnits: 0,
		occupancyRate: 0,
		occupancyRateChangeIndicator: '',
		occupancyRateLastMonth: 0,
		occupancyRatePercentageDifference: 0,
		occupiedUnits: 0,
		rentOverdue: { overDueLeaseCount: 0, overDueRentSum: 0 },
		singleUnits: 0,
		totalProperties: 0,
		totalUnits: 0,
		vacantUnits: 0,
	},
	revenueMetrics: {
		changeIndicator: '',
		maxRevenue: 0,
		monthlyRevenues: [0],
		percentageDifference: 0,
		revenueChart: { xAxisData: [], seriesData: [] },
		totalRevenueLast12Months: 0,
	},
	transactionMetrics: {
		dailyRevenueChangeIndicator: '',
		dailyRevenuePercentageDifference: 0,
		netCashFlow: 0,
		netCashFlowChangeIndicator: '',
		netCashFlowLastMonth: 0,
		netCashFlowPercentageDifference: 0,
		todaysRevenue: 0,
		totalExpenses: 0,
		totalExpensesChangeIndicator: '',
		totalExpensesPercentageDifference: 0,
	},
};

export enum IndicatorOptions {
	POSITIVE = 'positive',
	NEGATIVE = 'negative',
	NEUTRAL = 'neutral',
}

export const indicatorColor = (changeIndicator?: string) =>
	changeIndicator === IndicatorOptions.POSITIVE
		? '#17B26A'
		: changeIndicator === IndicatorOptions.NEGATIVE
			? '#FF0000'
			: '#49a0e3';

export const indicatorBackground = (changeIndicator?: string) =>
	changeIndicator === IndicatorOptions.POSITIVE
		? 'rgba(236,253,243)'
		: changeIndicator === IndicatorOptions.NEGATIVE
			? 'rgba(255, 0, 0, 0.1)'
			: '#c2daed';

export const indicatorText = (changeIndicator?: string) =>
	changeIndicator === IndicatorOptions.POSITIVE
		? 'Up from yesterday'
		: changeIndicator === IndicatorOptions.NEGATIVE
			? 'Down from yesterday'
			: 'No changes from yesterday';

export const showChangeArrow = (changeIndicator?: string) => {
	if (changeIndicator === IndicatorOptions.POSITIVE) {
		return (
			<ArrowUpwardIcon
				sx={{
					color: '#17B26A',
					fontSize: '14px',
					marginRight: '2px',
				}}
			/>
		);
	} else if (changeIndicator === IndicatorOptions.NEGATIVE) {
		return (
			<ArrowDownwardIcon
				sx={{
					color: '#FF0000',
					fontSize: '15px',
					marginRight: '2px',
				}}
			/>
		);
	} else {
		return null;
	}
};

export const showTrendArrow = (changeIndicator?: string) => {
	if (changeIndicator === IndicatorOptions.POSITIVE) {
		return <TrendingUpIcon sx={{ color: '#17B26A' }} />;
	} else if (changeIndicator === IndicatorOptions.NEGATIVE) {
		return <TrendingDownIcon sx={{ color: '#FF0000' }} />;
	} else {
		return null;
	}
};
