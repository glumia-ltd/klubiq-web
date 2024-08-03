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

	const data = {
		occupied: dashboardMetrics?.propertyMetrics.occupiedUnits || 0,
		vacant: dashboardMetrics?.propertyMetrics.vacantUnits || 0,
		maintenance: dashboardMetrics?.propertyMetrics.maintenanceUnits || 0,
	};

	console.log(dashboardMetrics);

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
										{dashboardMetrics?.propertyMetrics.totalProperties || 0}
									</Typography>
								</Box>
								<PropertiesGuage
									data={data}
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
									₦{dashboardMetrics?.transactionMetrics.todaysRevenue || 0}
								</Typography>
								<Box sx={styles.changeArrowBoxStyle}>
									<Typography
										sx={{
											...styles.changeTypographyStyle,
											color: indicatorColor(
												dashboardMetrics?.transactionMetrics
													.dailyRevenueChangeIndicator,
											),
											border: `1px solid ${indicatorColor(dashboardMetrics?.transactionMetrics.dailyRevenueChangeIndicator)}`,

											backgroundColor: indicatorBackground(
												dashboardMetrics?.transactionMetrics
													.dailyRevenueChangeIndicator,
											),
										}}
									>
										{showChangeArrow(
											dashboardMetrics?.transactionMetrics
												.dailyRevenueChangeIndicator,
										)}
										{
											dashboardMetrics?.transactionMetrics
												.dailyRevenuePercentageDifference
										}
										%
									</Typography>
									<Typography
										fontSize='14px'
										lineHeight={'20px'}
										fontWeight={400}
									>
										{indicatorText(
											dashboardMetrics?.transactionMetrics
												.dailyRevenueChangeIndicator,
										)}
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
										₦
										{dashboardMetrics?.propertyMetrics.rentOverdue
											?.overDueRentSum || 0}
									</Typography>
								</Box>
								<Typography sx={styles.overdueTypo}>
									{dashboardMetrics?.propertyMetrics.rentOverdue
										?.overDueLeaseCount || 0}
									overdue
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
										{dashboardMetrics?.propertyMetrics.occupancyRate || 0}%
									</Typography>

									<Typography
										sx={{
											...styles.changeTypographyStyle,
											color: indicatorColor(
												dashboardMetrics?.propertyMetrics
													.occupancyRateChangeIndicator,
											),
											border: `1px solid ${indicatorColor(dashboardMetrics?.propertyMetrics.occupancyRateChangeIndicator)}`,
											backgroundColor: indicatorBackground(
												dashboardMetrics?.propertyMetrics
													.occupancyRateChangeIndicator,
											),
										}}
									>
										{showChangeArrow(
											dashboardMetrics?.propertyMetrics
												.occupancyRateChangeIndicator,
										)}
										{dashboardMetrics?.propertyMetrics
											.occupancyRatePercentageDifference || 0}
										%
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
												₦{dashboardMetrics?.transactionMetrics.totalExpenses}
											</Typography>

											{showTrendArrow(
												dashboardMetrics?.revenueMetrics.changeIndicator,
											)}

											<Typography
												sx={{
													...styles.typoStyle,
													color: indicatorColor(
														dashboardMetrics?.transactionMetrics
															.totalExpensesChangeIndicator,
													),
												}}
											>
												{
													dashboardMetrics?.transactionMetrics
														.totalExpensesPercentageDifference
												}
												%
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
												₦{dashboardMetrics?.transactionMetrics.netCashFlow}
											</Typography>

											{showTrendArrow(
												dashboardMetrics?.revenueMetrics.changeIndicator,
											)}
											<Typography
												sx={{
													...styles.typoStyle,
													color: indicatorColor(
														dashboardMetrics?.transactionMetrics
															.netCashFlowChangeIndicator,
													),
												}}
											>
												{
													dashboardMetrics?.transactionMetrics
														.netCashFlowPercentageDifference
												}
												%
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
									{dashboardMetrics?.propertyMetrics.maintenanceUnits || 0}
								</Typography>
								<Box sx={styles.changeArrowBoxStyle}>
									<Typography
										sx={{
											...styles.changeTypographyStyle,
											color: indicatorColor(
												dashboardMetrics?.propertyMetrics
													.maintenanceUnitsChangeIndicator,
											),
											border: `1px solid ${indicatorColor(
												dashboardMetrics?.propertyMetrics
													.maintenanceUnitsChangeIndicator,
											)}`,
											backgroundColor: indicatorBackground(
												dashboardMetrics?.propertyMetrics
													.maintenanceUnitsChangeIndicator,
											),
										}}
									>
										{showChangeArrow(
											dashboardMetrics?.propertyMetrics
												.maintenanceUnitsChangeIndicator,
										)}
										{
											dashboardMetrics?.propertyMetrics
												.maintenanceUnitsPercentageDifference
										}
										%
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
								₦{dashboardMetrics?.revenueMetrics.totalRevenueLast12Months}
							</Typography>

							<Typography
								sx={{
									...styles.changeTypographyStyle,
									backgroundColor: indicatorBackground(
										dashboardMetrics?.revenueMetrics.changeIndicator,
									),
									color: indicatorColor(
										dashboardMetrics?.revenueMetrics.changeIndicator,
									),
									border: `1px solid ${indicatorColor(
										dashboardMetrics?.revenueMetrics.changeIndicator,
									)}`,
								}}
							>
								{showChangeArrow(
									dashboardMetrics?.revenueMetrics.changeIndicator,
								)}
								{dashboardMetrics?.revenueMetrics.percentageDifference}%
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
						<TableChart />
					</Grid>
				</Grid>
			</Container>
		</ViewPort>
	);
};
export default DashBoard;
