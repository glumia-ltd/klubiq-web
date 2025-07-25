import {
	Grid,
	Card,
	Typography,
	Box,
	Button,
	Stack,
	Skeleton,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
// import ReportCard from './ReportCard';
import TableChart from './TableChart';
import { PropertiesGuage } from '../../../components/PropertiesGuage';
import { styles } from './style';
import {
	indicatorColor,
	indicatorText,
	showChangeArrow,
	showTrendArrow,
	IndicatorOptions,
} from './dashboardUtils';
import DashBoardSkeleton from './DashBoardSkeleton';
import { getLocaleFormat } from '../../../helpers/utils';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { getCurrencySymbol } from '../../../helpers/utils';
import { useDashboardActions } from '../../../hooks/page-hooks/dashboard.hooks';
import { Activity } from '../../../shared/type';
import { ActivityCard, ActivityItem } from '@klubiq/ui-components';
// import { useNavigate } from 'react-router-dom';
import { truncate } from 'lodash';
// import { FileCopy, Home, } from '@mui/icons-material';

const DashBoard = () => {
	const {
		handleDownload,
		firstDay,
		setFirstDay,
		user,
		secondDay,
		setSecondDay,
		greeting,
		isDashboardMetricsLoading,
		dashboardMetrics,
		isRevenueReportLoading,
		revenueReport,
		organizationActivities,
		isOrganizationActivitiesLoading,
		organizationActivitiesError,
	} = useDashboardActions();

	//const { mode } = useContext(ThemeContext);
    const theme = useTheme();
	// const navigate = useNavigate();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const TOTALUNITS = dashboardMetrics?.propertyMetrics?.totalUnits;
	//const TOTALPROPERTIES = dashboardMetrics?.propertyMetrics?.totalProperties;

	const OVERDUERENTSUM = dashboardMetrics?.rentsOverDueSummary?.overDueRentSum;

	const OVERDUELEASECOUNT =
		dashboardMetrics?.rentsOverDueSummary?.overDueLeaseCount;

	const OCCUPANCYRATE = dashboardMetrics?.propertyMetrics?.occupancyRate;

	const OCCUPANCYRATECHANGEINDICATOR =
		dashboardMetrics?.propertyMetrics?.occupancyRateChangeIndicator;

	const OCCUPANCYRATEPERCENTAGEDIFFERENCE =
		dashboardMetrics?.propertyMetrics?.occupancyRatePercentageDifference;

	const MAINTENANCEUNITS = dashboardMetrics?.propertyMetrics?.maintenanceUnits;

	const TOTALREVENUE = dashboardMetrics?.transactionMetrics?.totalRevenue;

	const TOTALREVENUECHANGEINDICATOR =
		dashboardMetrics?.transactionMetrics?.totalRevenueChangeIndicator;

	const TOTALREVENUEPERCENTAGEDIFFERENCE =
		dashboardMetrics?.transactionMetrics?.totalRevenuePercentageDifference;

	const TOTALEXPENSES = dashboardMetrics?.transactionMetrics?.totalExpenses;

	const TOTALEXPENSESCHANGEINDICATOR =
		dashboardMetrics?.transactionMetrics?.totalExpensesChangeIndicator;

	const TOTALEXPENSESPERCENTAGEDIFFERENCE =
		dashboardMetrics?.transactionMetrics?.totalExpensesPercentageDifference;

	const NETCASHFLOW = dashboardMetrics?.transactionMetrics?.netCashFlow;

	const NETCASHFLOWCHANGEINDICATOR =
		dashboardMetrics?.transactionMetrics?.netCashFlowChangeIndicator;

	const NETCASHFLOWPERCENTAGEDIFFERENCE =
		dashboardMetrics?.transactionMetrics?.netCashFlowPercentageDifference;

	const EXPIRINGLEASEFORPERIODCOUNT =
		dashboardMetrics?.leaseMetrics?.expiringLeaseForPeriodCount;
	const TENANTCOUNT = dashboardMetrics?.leaseMetrics?.tenantCount;
	const ACTIVELEASECOUNT = dashboardMetrics?.leaseMetrics?.activeLeaseCount;
	const guageData = {
		occupied: dashboardMetrics?.propertyMetrics?.occupiedUnits || 0,
		vacant: dashboardMetrics?.propertyMetrics?.vacantUnits || 0,
		maintenance: MAINTENANCEUNITS || 0,
	};
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
		} else if (activity.action.includes('deleted') || activity.action.includes('removed')) {
			return 'error';
		} else if (activity.action.includes('viewed')) {
			return 'primary';
		}

		return 'info';
	}
	const renderActivities = () => {
		if (isOrganizationActivitiesLoading) {
			return <Skeleton variant='rounded' width='50px' />;
		}
		if (organizationActivitiesError) {
			return <Typography variant='caption'>Unable to load activities</Typography>;
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
		return (
			<ActivityCard title={<Typography variant='h6' fontWeight={600} gutterBottom={false}>Recent Activities</Typography>} maxItems={5} items={activityItems} variant='alerts' 
			sx={{ width: '100%', backgroundColor: '', overflow: 'auto', borderRadius: 3, minHeight: '386px', maxHeight: '436px' }}
			loading={isOrganizationActivitiesLoading}
			// viewAllLink={'/activities'}
			// onViewAllClick={() => {
			// 	navigate('/activities');
			// }}
			/>
		);
	};
	return (
		<>
			<Grid item xs={12}>
				{user && user?.firstName ? (
					<Typography
						variant='h4'
						sx={{
							mb: 3,
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
			</Grid>
			{isDashboardMetricsLoading ? (
				<DashBoardSkeleton />
			) : (
				<Stack gap={2} direction={'column'} justifyContent={'space-between'}>
					<Grid
						container
						spacing={2}
						direction={{ lg: 'row', xs: 'column-reverse' }}
						
					>
						<Grid container item spacing={2} xs={12} sm={12} md={12} lg={9}>
							{/* PROPERTIES */}
							<Grid item xs={12} sm={12} md={4} lg={4}>
								<Card sx={styles.cardStyle}>
									<Stack sx={styles.boxStyle} direction={'row'}>
										<Typography variant='subtitle2'>Total Units </Typography>{' '}
										<Typography variant='dashboardTypography'>
											{TOTALUNITS || 0}
										</Typography>
									</Stack>
									<Box sx={styles.guageBoxStyle}>
										<PropertiesGuage
											data={guageData}
											width={null}
											height={100}
											colors={['#6EC03C', '#D108A5', '#0088F0']}
											legend={true}
											legendPosition='left'
										/>
									</Box>
								</Card>
							</Grid>
							{/* OCCUPANCY RATE */}
							<Grid item xs={12} sm={6} md={4} lg={4}>
								<Card sx={styles.cardStyleTwo}>
									<Stack sx={styles.boxStyle} direction={'row'}>
										<Typography variant='subtitle2'>Occupancy Rate</Typography>
									</Stack>

									<Typography variant='dashboardTypography'>
										{getLocaleFormat(
											user?.orgSettings,
											OCCUPANCYRATE || 0,
											'percent',
										) || <Skeleton variant='rounded' width='50px' />}
									</Typography>

									<Stack
										sx={styles.changeArrowBoxStyle}
										direction={'row'}
										spacing={2}
									>
										<Typography
											variant={
												OCCUPANCYRATECHANGEINDICATOR ===
												IndicatorOptions.POSITIVE
													? 'upTrendIndicator'
													: OCCUPANCYRATECHANGEINDICATOR ===
														  IndicatorOptions.NEGATIVE
														? 'downTrendIndicator'
														: 'neutralTrendIndicator'
											}
											sx={styles.changeTypographyStyle}
										>
											{showChangeArrow(OCCUPANCYRATECHANGEINDICATOR)}
											{getLocaleFormat(
												user?.orgSettings,
												OCCUPANCYRATEPERCENTAGEDIFFERENCE || 0,
												'percent',
											) || <Skeleton variant='rounded' width='50px' />}
										</Typography>
										<Typography variant='caption'>
											{indicatorText(OCCUPANCYRATECHANGEINDICATOR)}
										</Typography>
									</Stack>
								</Card>
							</Grid>
							{/* RENT OVERDUE */}
							<Grid item xs={12} sm={6} md={4} lg={4}>
								<Card sx={styles.cardStyleTwo}>
									<Stack sx={styles.boxStyle} direction={'row'}>
										<Typography variant='subtitle2'>Rent Overdue</Typography>
									</Stack>

									<Box display={'flex'} alignItems={'center'}>
										<CalendarTodayIcon sx={styles.calendarTodayStyle} />
										<Typography variant='dashboardTypography'>
											{getLocaleFormat(
												user?.orgSettings,
												OVERDUERENTSUM || 0.0,
												'currency',
											) || <Skeleton variant='rounded' width='50px' />}
										</Typography>
									</Box>
									<Typography variant='caption'>
										{OVERDUELEASECOUNT || 0}
										<span style={{ marginLeft: '5px' }}>overdue</span>
									</Typography>
								</Card>
							</Grid>
							{/* REVENUE AND EXPENSES */}
							<Grid item xs={12} sm={6} md={8} lg={8}>
								<Card sx={styles.cardStyleThree}>
									<Stack
										spacing={2}
										direction={'column'}
										sx={{
											height: '100%',
											width: '100%',
											justifyContent: 'space-between',
										}}
									>
										{/* Revenue & Expenses Stack */}
										<Stack
											direction={'row'}
											spacing={2}
											sx={{
												justifyContent: 'space-between',
												alignItems: 'center',
												width: '100%',
											}}
										>
											<Stack direction={'column'} spacing={1}>
												<Typography variant='subtitle2'>
													Total Revenue
												</Typography>
												<Typography variant='caption'>This month</Typography>
												<Box
													sx={{
														...styles.boxStyle,
														display: 'flex',
														alignItems: 'flex-start',
													}}
												>
													<Typography mr={'1rem'} variant='dashboardTypography'>
														{getLocaleFormat(
															user?.orgSettings,
															TOTALREVENUE || 0.0,
															'currency',
														) || <Skeleton variant='rounded' width='50px' />}
													</Typography>

													{showTrendArrow(TOTALREVENUECHANGEINDICATOR)}

													<Typography
														sx={{
															...styles.typoStyle,
															color: indicatorColor(
																TOTALREVENUECHANGEINDICATOR,
															),
														}}
													>
														{getLocaleFormat(
															user?.orgSettings,
															TOTALREVENUEPERCENTAGEDIFFERENCE || 0.0,
															'percent',
														) || <Skeleton variant='rounded' width='50px' />}
													</Typography>
												</Box>
											</Stack>

											<Stack direction={'column'} spacing={1}>
												<Typography variant='subtitle2'>
													Total Expenses
												</Typography>
												<Typography variant='caption'>This month</Typography>
												<Box
													sx={{
														...styles.boxStyle,
														display: 'flex',
														alignItems: 'flex-start',
													}}
												>
													<Typography mr={'1rem'} variant='dashboardTypography'>
														{getLocaleFormat(
															user?.orgSettings,
															TOTALEXPENSES || 0.0,
															'currency',
														) || <Skeleton variant='rounded' width='50px' />}
													</Typography>

													{showTrendArrow(TOTALEXPENSESCHANGEINDICATOR)}

													<Typography
														sx={{
															...styles.typoStyle,
															color: indicatorColor(
																TOTALEXPENSESCHANGEINDICATOR,
															),
														}}
													>
														{getLocaleFormat(
															user?.orgSettings,
															TOTALEXPENSESPERCENTAGEDIFFERENCE || 0.0,
															'percent',
														) || <Skeleton variant='rounded' width='50px' />}
													</Typography>
												</Box>
											</Stack>
										</Stack>
										{/* Net Cash flow stack */}
										<Stack
											direction={'row'}
											spacing={2}
											sx={styles.totalExpensesStyle}
										>
											<Stack direction={'column'} spacing={1}>
												<Typography variant='subtitle2'>
													Net Cash Flow
												</Typography>
												<Box display={'flex'} justifyContent={'space-between'}>
													<Typography mr={'1rem'} variant='dashboardTypography'>
														{getLocaleFormat(
															user?.orgSettings,
															NETCASHFLOW || 0.0,
															'currency',
														) || <Skeleton variant='rounded' width='50px' />}
													</Typography>

													{showTrendArrow(NETCASHFLOWCHANGEINDICATOR)}
													<Typography
														sx={{
															...styles.typoStyle,
															color: indicatorColor(NETCASHFLOWCHANGEINDICATOR),
														}}
													>
														{getLocaleFormat(
															user?.orgSettings,
															NETCASHFLOWPERCENTAGEDIFFERENCE || 0.0,
															'percent',
														) || <Skeleton variant='rounded' width='50px' />}
													</Typography>
												</Box>
											</Stack>
											<Stack
												direction={'column'}
												spacing={2}
												sx={{
													display: 'flex',
													alignItems: 'flex-end',
													justifyContent: 'flex-end',
												}}
											>
												<Typography variant='caption'>
													{indicatorText(NETCASHFLOWCHANGEINDICATOR)}
												</Typography>
											</Stack>
										</Stack>
									</Stack>
								</Card>
							</Grid>
							{/* MAINTENANCE SECTION */}
							<Grid item xs={12} sm={6} md={4} lg={4}>
								<Card sx={styles.cardStyleFour}>
									<Stack
										direction={'column'}
										spacing={1}
										sx={{
											height: '100%',
											width: '100%',
											justifyContent: 'space-between',
										}}
									>
										<Card
											variant='outlined'
											sx={{ width: '100%', p: 1, borderRadius: '10px' }}
										>
											<Stack
												direction={'row'}
												sx={{
													justifyContent: 'space-between',
													alignItems: 'center',
													width: '100%',
												}}
											>
												<Stack
													direction={'row'}
													spacing={1}
													sx={{
														alignItems: 'center',
													}}
												>
													<TaskOutlinedIcon
														fontSize='small'
														sx={{
															color: '#6EC03C',
														}}
													/>
													<Typography variant='caption'>
														Active Lease
														{ACTIVELEASECOUNT && ACTIVELEASECOUNT > 1
															? 's'
															: ''}{' '}
													</Typography>
												</Stack>
												<Stack direction={'row'}>
													<Typography variant='dashboardTypography'>
														{ACTIVELEASECOUNT || 0}
													</Typography>
												</Stack>
											</Stack>
										</Card>

										<Card
											variant='outlined'
											sx={{ width: '100%', p: 1, borderRadius: '10px' }}
										>
											<Stack
												direction={'row'}
												sx={{
													justifyContent: 'space-between',
													alignItems: 'center',
													width: '100%',
												}}
											>
												<Stack
													direction={'row'}
													spacing={1}
													sx={{
														alignItems: 'center',
													}}
												>
													<PendingActionsOutlinedIcon
														fontSize='small'
														sx={{
															color: '#D108A5',
														}}
													/>
													<Typography variant='caption'>
														Lease
														{EXPIRINGLEASEFORPERIODCOUNT &&
														EXPIRINGLEASEFORPERIODCOUNT > 1
															? 's'
															: ''}{' '}
														Expiring Soon
													</Typography>
												</Stack>
												<Stack direction={'row'}>
													<Typography variant='dashboardTypography'>
														{EXPIRINGLEASEFORPERIODCOUNT || 0}
													</Typography>
												</Stack>
											</Stack>
										</Card>

										<Card
											variant='outlined'
											sx={{ width: '100%', p: 1, borderRadius: '10px' }}
										>
											<Stack
												direction={'row'}
												sx={{
													justifyContent: 'space-between',
													alignItems: 'center',
													width: '100%',
												}}
											>
												<Stack
													direction={'row'}
													spacing={1}
													sx={{
														alignItems: 'center',
													}}
												>
													<GroupAddOutlinedIcon
														fontSize='small'
														sx={{
															color: '#0088F0',
														}}
													/>
													<Typography variant='caption'>
														Tenant
														{TENANTCOUNT && TENANTCOUNT > 1 ? 's' : ''}{' '}
													</Typography>
												</Stack>
												<Stack direction={'row'}>
													<Typography variant='dashboardTypography'>
														{TENANTCOUNT || 0}
													</Typography>
												</Stack>
											</Stack>
										</Card>
									</Stack>
								</Card>
							</Grid>
						</Grid>
						<Grid container item xs={12} sm={12} md={12} lg={3}>
						{renderActivities()}
							{/* <ReportCard title='Activities'>{renderActivities()}</ReportCard> */}
						</Grid>
					</Grid>

					<Grid
						container
						sx={{
							...styles.totalRevenueStyle,
							
						}}
					>
						<Card
							sx={{
								...styles.totalRevenueCardStyle,
							}}
						>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<Stack direction={'column'} gap={2} alignItems={'flex-start'}>
									<Typography variant='subtitle2'>Total Revenue </Typography>
									{!isRevenueReportLoading && (
										<Stack
											alignItems={isMobile ? 'flex-start' : 'center'}
											direction={isMobile ? 'column' : 'row'}
											justifyContent={'space-between'}
											width={'100%'}
											gap={isMobile ? 2 : 0}
										>
											<Stack direction={'row'} gap={1} justifyContent={'flex-start'}  alignItems={'center'}>
												<Typography variant='dashboardTypography'>
													{getLocaleFormat(
														user?.orgSettings,
														revenueReport?.totalRevenueLast12Months || 0.0,
														'currency',
													) || <Skeleton variant='rounded' width='50px' />}
												</Typography>

												<Typography
													variant={
														revenueReport?.changeIndicator ===
														IndicatorOptions.POSITIVE
															? 'upTrendIndicator'
															: revenueReport?.changeIndicator ===
																  IndicatorOptions.NEGATIVE
																? 'downTrendIndicator'
																: 'neutralTrendIndicator'
													}
													sx={styles.changeTypographyStyle}
												>
													{showChangeArrow(revenueReport?.changeIndicator)}
													{getLocaleFormat(
														user?.orgSettings,
														revenueReport?.percentageDifference || 0,
														'percent',
													) || <Skeleton variant='rounded' width='50px' />}
												</Typography>
											</Stack>
											<Stack
												direction={'row'}
												gap={1}
												alignItems={'center'}
												justifyContent={'flex-end'}
											>
												<DatePicker
													defaultValue={dayjs().subtract(11, 'months')}
													value={firstDay}
													maxDate={
														!secondDay
															? dayjs().subtract(11, 'months')
															: secondDay.subtract(11, 'months')
													}
													onChange={(date) => {
														setFirstDay(dayjs(date));
														setSecondDay(dayjs(date).add(11, 'months'));
													}}
													format='DD/MM/YYYY'
													slotProps={{
														inputAdornment: {
															position: 'start',
														},
													}}
												/>
												<TrendingFlatIcon sx={{ fontSize: '30px' }} />
												<DatePicker
													defaultValue={dayjs()}
													value={secondDay}
													maxDate={dayjs()}
													onChange={(date) => {
														setSecondDay(dayjs(date));
														setFirstDay(dayjs(date).subtract(11, 'months'));
													}}
													format='DD/MM/YYYY'
													slotProps={{
														inputAdornment: {
															position: 'start',
														},
													}}
												/>

												<Button
													variant='klubiqOutlinedButton'
													onClick={handleDownload}
												>
													<SaveAltOutlinedIcon sx={{ color: 'text.primary' }} />
												</Button>
											</Stack>
										</Stack>
									)}
								</Stack>
							</Grid>

							<Grid item xs={12} sm={12} md={12} lg={12} mt={'10px'}>
								{!isRevenueReportLoading && (
									<TableChart
										seriesData={revenueReport?.revenueChart?.seriesData || []}
										maxRevenue={revenueReport?.maxRevenue || 0}
										xAxisData={revenueReport?.revenueChart?.xAxisData}
										currencySymbol={
											getCurrencySymbol(user.orgSettings?.settings) as string
										}
									/>
								)}
							</Grid>
						</Card>
					</Grid>
				</Stack>
			)}
		</>
	);
};
export default DashBoard;
