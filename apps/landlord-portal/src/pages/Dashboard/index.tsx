import {
	Container,
	Grid,
	Card,
	Typography,
	Box,
	TextField,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

import ReportCard from './ReportCard';
import TableChart from './TableChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { PropertiesGuage } from '../../components/PropertiesGuage';
import ViewPort from '../../components/Viewport/ViewPort';
import { dashboardEndpoints } from '../../helpers/endpoints';
import { DashboardMetricsType } from '../../type';
import { api } from '../../api';
import { styles } from './style';
import {
	indicatorColor,
	indicatorBackground,
	indicatorText,
	showChangeArrow,
	showTrendArrow,
	initialDashboardMetrics,
} from './dashboardUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoard = () => {
	const { mode } = useContext(ThemeContext);

	const [dashboardMetrics, setDashboardMetrics] =
		useState<DashboardMetricsType>(initialDashboardMetrics);

	const { propertyMetrics, transactionMetrics, revenueMetrics } =
		dashboardMetrics;

	const {
		maintenanceUnits,
		maintenanceUnitsChangeIndicator,
		maintenanceUnitsLastMonth,
		maintenanceUnitsPercentageDifference,
		multiUnits,
		occupancyRate,
		occupancyRateChangeIndicator,
		occupancyRateLastMonth,
		occupancyRatePercentageDifference,
		occupiedUnits,
		rentOverdue,
		singleUnits,
		totalProperties,
		totalUnits,
		vacantUnits,
	} = propertyMetrics;

	const {
		dailyRevenueChangeIndicator,
		dailyRevenuePercentageDifference,
		netCashFlow,
		netCashFlowChangeIndicator,
		netCashFlowLastMonth,
		netCashFlowPercentageDifference,
		todaysRevenue,
		totalExpenses,
		totalExpensesChangeIndicator,
		totalExpensesPercentageDifference,
	} = transactionMetrics;

	const {
		changeIndicator,
		maxRevenue,
		monthlyRevenues,
		percentageDifference,
		revenueChart,
		totalRevenueLast12Months,
	} = revenueMetrics;

	const guageData = {
		occupied: occupiedUnits || 0,
		vacant: vacantUnits || 0,
		maintenance: maintenanceUnits || 0,
	};

	const seriesData = revenueChart.seriesData;

	const getDashboardMetrics = async () => {
		try {
			const {
				data: { data },
			} = await api.get(dashboardEndpoints.getDashboardMetrics());

			setDashboardMetrics(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getDashboardMetrics();
	}, []);

	return (
		<ViewPort>
			<Container maxWidth={'xl'} sx={styles.containerStyle}>
				<Grid container spacing={2}>
					<Grid container item spacing={2} xs={12} sm={8} md={8} lg={9}>
						<Grid item xs={12} sm={6} md={4} lg={4}>
							<Card sx={styles.cardStyle}>
								<Box sx={styles.boxStyle}>
									<Typography sx={styles.typoStyle}>
										Total Properties{' '}
									</Typography>{' '}
									<Typography
										sx={styles.valueTextStyle}
										variant='dashboardTypography'
									>
										{totalUnits || 0}
									</Typography>
								</Box>
								<PropertiesGuage
									data={guageData}
									width={null}
									height={100}
									colors={['#6EC03C', '#D108A5', '#0088F0']}
									legend={true}
									legendPosition='left'
								/>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={4}>
							<Card sx={styles.cardStyleTwo}>
								<Typography sx={styles.typoStyle}>Today's Revenue</Typography>

								<Typography
									sx={styles.revenueTextStyle}
									variant='dashboardTypography'
								>
									{' '}
									₦
									{todaysRevenue && todaysRevenue > 0
										? todaysRevenue.toFixed(2)
										: todaysRevenue || 0}
								</Typography>
								<Box sx={styles.changeArrowBoxStyle}>
									<Typography
										sx={{
											...styles.changeTypographyStyle,
											color: indicatorColor(dailyRevenueChangeIndicator),
											border: `1px solid ${indicatorColor(dailyRevenueChangeIndicator)}`,

											backgroundColor: indicatorBackground(
												dailyRevenueChangeIndicator,
											),
										}}
									>
										{showChangeArrow(dailyRevenueChangeIndicator)}
										{dailyRevenuePercentageDifference.toFixed(1)}%
									</Typography>
									<Typography
										fontSize='14px'
										lineHeight={'20px'}
										fontWeight={400}
									>
										{indicatorText(dailyRevenueChangeIndicator)}
									</Typography>
								</Box>
							</Card>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={4}>
							<Card sx={styles.cardStyleTwo}>
								<Typography sx={styles.typoStyle}>Rent Overdue</Typography>
								<Box display={'flex'} alignItems={'center'}>
									<CalendarTodayIcon sx={styles.calendarTodayStyle} />
									<Typography
										sx={styles.overdueTextStyle}
										variant='dashboardTypography'
									>
										₦{rentOverdue?.overDueRentSum || 0}
									</Typography>
								</Box>
								<Typography sx={styles.overdueTypo}>
									{rentOverdue?.overDueLeaseCount || 0}
									<span style={{ marginLeft: '5px' }}>overdue</span>
								</Typography>
							</Card>
						</Grid>

						<Grid item xs={12} sm={12} md={8} lg={8}>
							<Card sx={styles.cardStyleThree}>
								<Typography sx={styles.typoStyle}>Occupancy Rate </Typography>{' '}
								<Box sx={styles.occupancyBoxStyle}>
									<Typography
										sx={styles.occupancyTextStyle}
										variant='dashboardTypography'
									>
										{occupancyRate?.toFixed(1) || 0}%
									</Typography>

									<Typography
										sx={{
											...styles.changeTypographyStyle,
											color: indicatorColor(occupancyRateChangeIndicator),
											border: `1px solid ${indicatorColor(occupancyRateChangeIndicator)}`,
											backgroundColor: indicatorBackground(
												occupancyRateChangeIndicator,
											),
										}}
									>
										{showChangeArrow(occupancyRateChangeIndicator)}
										{occupancyRatePercentageDifference.toFixed(1) || 0}%
									</Typography>
								</Box>
								<Box sx={styles.totalExpensesStyle}>
									<Box>
										<Typography sx={styles.typoStyle}>
											Total expenses
										</Typography>
										<Box sx={{ ...styles.boxStyle, alignItems: 'flex-start' }}>
											<Typography
												sx={styles.overdueTextStyle}
												mr={'1rem'}
												variant='dashboardTypography'
											>
												₦
												{totalExpenses && totalExpenses > 0
													? totalExpenses.toFixed(2)
													: totalExpenses}
											</Typography>

											{showTrendArrow(totalExpensesChangeIndicator)}

											<Typography
												sx={{
													...styles.typoStyle,
													color: indicatorColor(totalExpensesChangeIndicator),
												}}
											>
												{totalExpensesPercentageDifference.toFixed(1)}%
											</Typography>
										</Box>
									</Box>

									<Box>
										<Typography sx={styles.typoStyle}>Net cash flow</Typography>
										<Box display={'flex'} justifyContent={'space-between'}>
											<Typography
												sx={styles.overdueTextStyle}
												mr={'1rem'}
												variant='dashboardTypography'
											>
												{netCashFlow && netCashFlow > 0
													? `₦${netCashFlow.toFixed(2)}`
													: `- ₦${(-1 * netCashFlow!).toFixed(2)}`}
											</Typography>

											{showTrendArrow(netCashFlowChangeIndicator)}
											<Typography
												sx={{
													...styles.typoStyle,
													color: indicatorColor(netCashFlowChangeIndicator),
												}}
											>
												{netCashFlowPercentageDifference.toFixed(1)}%
											</Typography>
										</Box>
									</Box>
								</Box>
							</Card>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={4}>
							<Card sx={styles.cardStyleFour}>
								<Typography sx={styles.typoStyle}>Maintenance</Typography>
								<Typography
									sx={styles.overdueTextStyle}
									variant='dashboardTypography'
								>
									{maintenanceUnits || 0}
								</Typography>
								<Box sx={styles.changeArrowBoxStyle}>
									<Typography
										sx={{
											...styles.changeTypographyStyle,
											color: indicatorColor(maintenanceUnitsChangeIndicator),
											border: `1px solid ${indicatorColor(
												maintenanceUnitsChangeIndicator,
											)}`,
											backgroundColor: indicatorBackground(
												maintenanceUnitsChangeIndicator,
											),
										}}
									>
										{showChangeArrow(maintenanceUnitsChangeIndicator)}
										{maintenanceUnitsPercentageDifference.toFixed(1)}%
									</Typography>

									<Typography sx={{ ...styles.overdueTypo, mt: 0 }}>
										Since last month
									</Typography>
								</Box>
							</Card>
						</Grid>
					</Grid>

					<Grid container item xs={12} sm={4} md={4} lg={3}>
						<ReportCard />
					</Grid>
				</Grid>

				<Grid
					container
					sx={{
						...styles.totalRevenueStyle,
						background: mode === ThemeMode.LIGHT ? '#FFFFFF' : '#161616',
						boxShadow:
							mode === ThemeMode.LIGHT
								? '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
								: '0px 0px 25px 0px rgba(211, 217, 223, 0.25)',
					}}
				>
					<Grid item xs={12} sm={12} md={7}>
						<Typography sx={styles.typoStyle}>Total Revenue </Typography>
						<Box display={'flex'} textAlign={'center'} alignItems={'center'}>
							<Typography
								sx={styles.occupancyTextStyle}
								variant='dashboardTypography'
							>
								₦{totalRevenueLast12Months.toFixed(2)}
							</Typography>

							<Typography
								sx={{
									...styles.changeTypographyStyle,
									backgroundColor: indicatorBackground(changeIndicator),
									color: indicatorColor(changeIndicator),
									border: `1px solid ${indicatorColor(changeIndicator)}`,
								}}
							>
								{showChangeArrow(changeIndicator)}
								{percentageDifference.toFixed(1)}%
							</Typography>
						</Box>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={5}
						alignItems={'center'}
						justifyContent={{ xs: 'left', sm: 'left', md: 'space-between' }}
						display={'flex'}
					>
						<TextField type='date' size='medium' name='Date' value='date' />{' '}
						<TrendingFlatIcon sx={{ fontSize: '30px' }} />
						<TextField
							sx={{
								height: '44px',
								marginRight: { xs: '5px', sm: '30px', md: '0' },
							}}
							type='date'
							size='medium'
							name='Date'
							value='date'
						/>
						<Box sx={styles.downloadButtonStyle}>
							<SaveAltOutlinedIcon />
						</Box>
					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={12} mt={'10px'}>
						<TableChart
							seriesData={seriesData}
							maxRevenue={revenueMetrics?.maxRevenue}
							xAxisData={[
								'Jan',
								'Feb',
								'Mar',
								'Apr',
								'May',
								'Jun',
								'Jul',
								'Aug',
								'Sep',
								'Oct',
								'Nov',
								'Dec',
							]}
						/>
					</Grid>
				</Grid>
			</Container>
		</ViewPort>
	);
};
export default DashBoard;
