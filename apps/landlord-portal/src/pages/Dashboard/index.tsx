import { Container, Grid, Card, Typography, Box, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import ReportCard from './ReportCard';
import TableChart from './TableChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { PropertiesGuage } from '../../components/PropertiesGuage';
import ViewPort from '../../components/Viewport/ViewPort';
import { dashboardEndpoints } from '../../helpers/endpoints';
import { DashboardMetricsType, RevenueReportType } from '../../type';
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
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { AxiosRequestConfig } from 'axios';
import DashBoardSkeleton from './DashBoardSkeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoard = () => {
	const { mode } = useContext(ThemeContext);
	const [firstDay, setFirstDay] = useState<Dayjs | null>(
		dayjs().subtract(11, 'months'),
	);
	const [secondDay, setSecondDay] = useState<Dayjs | null>(dayjs());
	const [revenueReport, setRevenueReport] = useState<RevenueReportType | null>(
		null,
	);

	const [loading, setLoading] = useState<boolean>(true);

	const dispatch = useDispatch();

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

	const getDashboardMetrics = async () => {
		try {
			const {
				data: { data },
			} = await api.get(dashboardEndpoints.getDashboardMetrics());

			setDashboardMetrics(data);

			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	const getRevenueReportData = async () => {
		if (!firstDay?.isValid() || !secondDay?.isValid()) {
			setRevenueReport(null);
			return;
		}

		const startDate = firstDay?.format('YYYY-MM-DD');
		const endDate = secondDay?.format('YYYY-MM-DD');
		try {
			const {
				data: { data },
			} = await api.get(
				dashboardEndpoints.getRevenueReport(startDate, endDate),
			);
			setRevenueReport(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getDashboardMetrics();
	}, []);

	useEffect(() => {
		if (firstDay && secondDay) {
			if (secondDay.subtract(6, 'months').isBefore(firstDay)) {
				dispatch(
					openSnackbar({
						message: 'Your selected date range is less than 6 months! ',
						severity: 'info',
						isOpen: true,
					}),
				);
				setFirstDay(null);
				setSecondDay(null);

				return;
			} else {
				getRevenueReportData();
			}
		} else if (!firstDay && !secondDay) {
			setRevenueReport(null);
		}
	}, [firstDay, secondDay]);

	const handleDownload = async () => {
		if (!firstDay?.isValid() || !secondDay?.isValid()) {
			return;
		}
		const headers = { 'Content-Type': 'blob' };

		const config: AxiosRequestConfig = {
			method: 'POST',
			responseType: 'arraybuffer',
			headers,
		};

		const startDate = firstDay?.format('YYYY-MM-DD');
		const endDate = secondDay?.format('YYYY-MM-DD');

		try {
			const response = await api.post<ArrayBuffer>(
				dashboardEndpoints.downloadReport(),
				{
					startDate,
					endDate,
				},
				config,
			);

			const outputFilename = `${crypto.randomUUID()}_revenue_report.xlsx`;
			const url = URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', outputFilename);
			document.body.appendChild(link);
			link.click();

			dispatch(
				openSnackbar({
					message:
						"Sit back and relax – your report is being processed. It will download automatically when it's ready for you.",
					severity: 'info',
					isOpen: true,
				}),
			);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<ViewPort>
			{loading ? (
				<DashBoardSkeleton />
			) : (
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
										₦{todaysRevenue.toFixed(2)}
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
											₦{rentOverdue?.overDueRentSum.toFixed(2)}
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
											<Box
												sx={{ ...styles.boxStyle, alignItems: 'flex-start' }}
											>
												<Typography
													sx={styles.overdueTextStyle}
													mr={'1rem'}
													variant='dashboardTypography'
												>
													₦{totalExpenses.toFixed(2)}
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
											<Typography sx={styles.typoStyle}>
												Net cash flow
											</Typography>
											<Box display={'flex'} justifyContent={'space-between'}>
												<Typography
													sx={styles.overdueTextStyle}
													mr={'1rem'}
													variant='dashboardTypography'
												>
													{netCashFlow && netCashFlow > 0
														? `₦${netCashFlow.toFixed(2)}`
														: netCashFlow && netCashFlow < 0
															? `- ₦${(-1 * netCashFlow!).toFixed(2)}`
															: `₦0.00`}
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
									₦
									{revenueReport
										? revenueReport.totalRevenueLast12Months.toFixed(2)
										: totalRevenueLast12Months.toFixed(2)}
								</Typography>

								<Typography
									sx={{
										...styles.changeTypographyStyle,
										backgroundColor: indicatorBackground(
											revenueReport
												? revenueReport.changeIndicator
												: changeIndicator,
										),
										color: indicatorColor(
											revenueReport
												? revenueReport.changeIndicator
												: changeIndicator,
										),
										border: `1px solid ${indicatorColor(
											revenueReport
												? revenueReport.changeIndicator
												: changeIndicator,
										)}`,
									}}
								>
									{showChangeArrow(
										revenueReport
											? revenueReport.changeIndicator
											: changeIndicator,
									)}
									{revenueReport
										? revenueReport.percentageDifference.toFixed(1)
										: percentageDifference.toFixed(1)}
									%
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
								sx={styles.downloadButtonStyle}
								variant='outlined'
								onClick={handleDownload}
							>
								<SaveAltOutlinedIcon sx={{ color: 'text.primary' }} />
							</Button>
						</Grid>

						<Grid item xs={12} sm={12} md={12} lg={12} mt={'10px'}>
							<TableChart
								seriesData={
									revenueReport
										? revenueReport?.revenueChart?.seriesData
										: revenueChart?.seriesData
								}
								maxRevenue={
									revenueReport
										? revenueReport?.maxRevenue
										: revenueMetrics?.maxRevenue
								}
								xAxisData={
									revenueReport
										? revenueReport?.revenueChart?.xAxisData
										: revenueChart?.xAxisData
								}
							/>
						</Grid>
					</Grid>
				</Container>
			)}
		</ViewPort>
	);
};
export default DashBoard;
