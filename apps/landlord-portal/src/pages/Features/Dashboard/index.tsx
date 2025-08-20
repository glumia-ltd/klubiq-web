import {
	Typography,
	Box,
	Stack,
	Skeleton,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import dayjs from 'dayjs';
import { PropertiesGuage } from '../../../components/PropertiesGuage';
import { styles } from './style';
import {
	indicatorText,
	IndicatorOptions,
} from './dashboardUtils';
import {
	formatCurrencyNumberShort,
	getLocaleFormat,
} from '../../../helpers/utils';
import { useDashboardActions } from '../../../hooks/page-hooks/dashboard.hooks';
import { Activity } from '../../../shared/type';
import { ActivityCard, ActivityItem, DBInfoCard } from '@klubiq/ui-components';
import { truncate } from 'lodash';
import ReportCard from './ReportCard';
import DashboardDataCard from '../../../components/DashboardMetricsCard/DashboardDataCard';
import {
	ArrowDownward,
	ArrowUpward,
	DescriptionOutlined,
	GroupOutlined,
	PaymentOutlined,
} from '@mui/icons-material';
import { MonthlySeries, PropertyCountByType, RevenueSeries } from '../../../page-tytpes/dashboard/dashboard.types';
import DashboardChartsCard from '../../../components/DashboardMetricsCard/DashboardChartsCard';

// import { FileCopy, Home, } from '@mui/icons-material';

const DashBoard = () => {
	const {
		user,
		greeting,
		organizationActivities,
		isOrganizationActivitiesLoading,
		organizationActivitiesError,
		organizationMetrics,
		isOrganizationMetricsLoading,
	} = useDashboardActions();


	
	// const getActivityIcon = (activity: Activity) => {
	// 	if (activity.targetType === 'property') {
	// 		return <Home />;
	// 	} else if (activity.targetType === 'lease') {
	// 		return <FileCopy />;
	// 	} else if (activity.targetType === 'tenant') {
	// 		return <GroupAddOutlinedIcon />;
	// 	} else if (activity.targetType === 'payment') {
	// 		return <PendingActionsOutlinedIcon />;
	// 	}
	// 	return <Home />;
	// }
	const getActivityVariant = (activity: Activity) => {
		if (activity.action.includes('created')) {
			return 'success';
		} else if (activity.action.includes('updated')) {
			return 'info';
		} else if (
			activity.action.includes('deleted') ||
			activity.action.includes('removed')
		) {
			return 'error';
		} else if (activity.action.includes('viewed')) {
			return 'primary';
		}

		return 'info';
	};
	const renderActivities = () => {
		if (isOrganizationActivitiesLoading) {
			return <Skeleton variant='rounded' width='50px' />;
		}
		if (organizationActivitiesError) {
			return (
				<Typography variant='caption'>Unable to load activities</Typography>
			);
		}
		const activityItems: ActivityItem[] = organizationActivities?.activities
			? organizationActivities.activities.map((activity: Activity) => ({
					id: activity.id,
					title: '',
					subtitle: truncate(activity.metadata.message, { length: 200 }),
					timestamp: dayjs(activity.createdAt).format('DD/MM/YYYY h:mm A'),
					variant: getActivityVariant(activity),
				}))
			: [];
		return activityItems.length > 0 ? (
			<ActivityCard
				title={
					<Typography variant='subtitle2' gutterBottom={false}>
						Recent Activities
					</Typography>
				}
				maxItems={5}
				items={activityItems}
				variant='alerts'
				sx={{
					width: '100%',
					backgroundColor: '',
					overflow: 'auto',
					borderRadius: 3,
					minHeight: '386px',
					maxHeight: '436px',
				}}
				loading={isOrganizationActivitiesLoading}
				// viewAllLink={'/activities'}
				// onViewAllClick={() => {
				// 	navigate('/activities');
				// }}
			/>
		) : (
			<ReportCard title=''>
				<Typography variant='subtitle2' gutterBottom={false}>
					No recent activities
				</Typography>
			</ReportCard>
		);
	};
	const renderUnitsGuage = () => {
		const unitsGuageData = {
			occupied: organizationMetrics?.occupiedUnits || 0,
			vacant: organizationMetrics?.vacantUnits || 0,
			maintenance: 0,
		};
		return (
			<Box sx={{ width: '100%', height: '100%' }}>
				<PropertiesGuage
					data={unitsGuageData}
					width={null}
					height={100}
					colors={['#6EC03C', '#D108A5', '#0088F0']}
					legend={true}
					legendPosition='left'
				/>
			</Box>
		);
	};
	const getChipIcon = (indicator: IndicatorOptions) => {
		if (indicator === IndicatorOptions.POSITIVE) {
			return <ArrowUpward color='inherit' />;
		} else if (indicator === IndicatorOptions.NEGATIVE) {
			return <ArrowDownward color='inherit' />;
		}
		return <TrendingFlatIcon color='inherit' />;
	};
	const getPropertyTypePieChartData = () => {

		return organizationMetrics?.propertyCountByType?.map(
  				(propertyType: PropertyCountByType) => ({
  					label: `${propertyType.displayText}: ${propertyType.count}`,
  					value: propertyType.count,
					labelMarkType: 'circle'
  				}),
  			) || [];
	
	};
	const getPropertyCountBarChartData = () => {
		return organizationMetrics?.monthlyPropertiesSeries?.map((property:MonthlySeries) => ({
			label: `${dayjs(`${property.year}-${property.month}-01`).format('MMM')}`,
			value: property.count,
		})) || [];
	};
	const getTotalRevenueBarChartData = () => {
		const monthlyRevenueSeries = organizationMetrics?.monthlyRevenueSeries || [];
		const totalRevenue = monthlyRevenueSeries.reduce((acc: number, revenue:RevenueSeries) => acc + revenue.revenue, 0);
		const averagePercentage = monthlyRevenueSeries.length > 0 
			? monthlyRevenueSeries.reduce((acc: number, revenue:RevenueSeries) => acc + revenue.pctChange, 0) / monthlyRevenueSeries.length
			: 0;
		const overallIndicator = averagePercentage > 0 ? IndicatorOptions.POSITIVE : averagePercentage < 0 ? IndicatorOptions.NEGATIVE : IndicatorOptions.NEUTRAL;

		const seriesData = monthlyRevenueSeries.map((revenue:RevenueSeries) => ({
			label: `${dayjs(`${revenue.year}-${revenue.month}-01`).format('MMM')}`,
			value: revenue.revenue,
			valuePct: revenue.pctChange,
		}));
		return {
			seriesData,
			totalRevenue,
			averagePercentage,
			overallIndicator,
		};
	};
	return (
		<>
			<Stack direction={'column'} gap={3}>
				{/* Greeting Section */}
				{user && user?.firstName ? (
					<Typography
						variant='h4'
						sx={{
							mb: 2,
							color: 'text.primary',
							// Add transition for smooth theme changes
							transition: 'color 0.2s ease-in-out',
						}}
					>
						{`${greeting}, ${user?.firstName || 'User'}`}
					</Typography>
				) : (
					<Skeleton
						variant='text'
						sx={{ ...styles.valueTextStyle, mb: 3 }}
						width='20rem'
						height={50}
					/>
				)}
				{/* Comparative Metrics Section will be here TODO: Add Comparative Metrics Section */}
				<Stack
					direction={{ sm: 'row', md: 'row', xs: 'column' }}
					spacing={2}
					width='100%'
					height={'100%'}
					useFlexGap
					flexWrap='wrap'
					justifyContent={'space-between'}
				>
					<DashboardDataCard
						label='Total Units'
						amount={organizationMetrics?.totalUnits || 0}
						variant='custom'
						children={renderUnitsGuage()}
						loading={isOrganizationMetricsLoading}
					/>
					<DashboardDataCard
						label='Occupancy Rate'
						amount={`${(organizationMetrics?.occupancyRate ?? 0).toFixed(0)}%`}
						badgeText={`${organizationMetrics?.occupancyRateChangeIndicator === IndicatorOptions.POSITIVE ? '+' : organizationMetrics?.occupancyRateChangeIndicator === IndicatorOptions.NEGATIVE ? '-' : ''}${getLocaleFormat(
							user?.orgSettings,
							organizationMetrics?.occupancyRateDiffPercent || 0,
							'decimal',
							0,
						)}%`}
						loading={isOrganizationMetricsLoading}
						badgeIcon={getChipIcon(
							organizationMetrics?.occupancyRateChangeIndicator as IndicatorOptions,
						)}
						caption={indicatorText(
							organizationMetrics?.occupancyRateChangeIndicator,
						)}
						chipVariant={
							organizationMetrics?.occupancyRateChangeIndicator ===
							IndicatorOptions.POSITIVE
								? 'upTrend'
								: organizationMetrics?.occupancyRateChangeIndicator ===
									  IndicatorOptions.NEGATIVE
									? 'downTrend'
									: 'neutralTrend'
						}
					/>
					<DashboardDataCard
						label='Rent Overdue'
						amount={formatCurrencyNumberShort(
							organizationMetrics?.totalRentOverdue || 0.0,
							user?.orgSettings,
						)}
						loading={isOrganizationMetricsLoading}
						icon={<CalendarTodayIcon sx={styles.calendarTodayStyle} />}
						caption={`${organizationMetrics?.overdueRentCount || 0} Overdue`}
					/>

					<DBInfoCard
						loading={isOrganizationMetricsLoading}
						label={<Typography variant='subtitle2'>Active Tenants</Typography>}
						amount={organizationMetrics?.activeLeasesTenantsCount || 0}
						variant='default'
						sx={{
							maxWidth: {
								xs: '100%',
								sm: 'calc(50% - 8px)',
								md: 'calc(33.333% - 10.667px)',
							},
						}}
						icon={<GroupOutlined sx={{ fontSize: '24px' }} />}
					/>
					<DBInfoCard
						loading={isOrganizationMetricsLoading}
						label={<Typography variant='subtitle2'>Active Leases</Typography>}
						amount={organizationMetrics?.activeLeasesCount || 0}
						variant='default'
						sx={{
							maxWidth: {
								xs: '100%',
								sm: 'calc(50% - 8px)',
								md: 'calc(33.333% - 10.667px)',
							},
						}}
						icon={<DescriptionOutlined sx={{ fontSize: '24px' }} />}
					/>
					<DBInfoCard
						loading={isOrganizationMetricsLoading}
						label={<Typography variant='subtitle2'>Monthly Revenue</Typography>}
						amount={formatCurrencyNumberShort(
							organizationMetrics?.totalRevenueWindow?.totalCurrent || 0.0,
							user?.orgSettings,
						)}
						variant='default'
						sx={{
							maxWidth: {
								xs: '100%',
								sm: 'calc(50% - 8px)',
								md: 'calc(33.333% - 10.667px)',
							},
						}}
						icon={<PaymentOutlined sx={{ fontSize: '24px' }} />}
					/>
				</Stack>
				<Stack
					direction={{ sm: 'row', md: 'row', xs: 'column' }}
					spacing={1}
					width='100%'
					height={'100%'}
					useFlexGap
					flexWrap='wrap'
					justifyContent={'space-between'}
				>
					<DashboardChartsCard
						title='Property Types'
						variant='pie'
						data={getPropertyTypePieChartData()}
						loading={isOrganizationMetricsLoading}
					/>
					<DashboardChartsCard
						title='Properties Overview'
						variant='bar'
						data={getPropertyCountBarChartData()}
						loading={isOrganizationMetricsLoading}
					/>

				</Stack>
				<Stack
					direction={{ sm: 'row', md: 'row', xs: 'column' }}
					spacing={1}
					width='100%'
					height={'100%'}
					useFlexGap
					flexWrap='wrap'
					justifyContent={'space-between'}
				>
					<DashboardChartsCard
						title='Monthly Revenue'
						variant='line'
						data={getTotalRevenueBarChartData().seriesData}
						loading={isOrganizationMetricsLoading}
						fullWidth={true}
						orgSettings={user?.orgSettings}
						subTitle={`${formatCurrencyNumberShort(getTotalRevenueBarChartData().totalRevenue, user?.orgSettings)}`}
						chipText={`${getLocaleFormat(user?.orgSettings, getTotalRevenueBarChartData().averagePercentage, 'percent')}`}
						chipIcon={getChipIcon(getTotalRevenueBarChartData().overallIndicator)}
						chipVariant={getTotalRevenueBarChartData().overallIndicator === IndicatorOptions.POSITIVE ? 'upTrend' : getTotalRevenueBarChartData().overallIndicator === IndicatorOptions.NEGATIVE ? 'downTrend' : 'neutralTrend'}
					/>

				</Stack>
				{renderActivities()}
			</Stack>
		</>
	);
};
export default DashBoard;
