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
import { dashboardEndpoints } from '../../helpers/endpoints';
import { api } from '../../api';
import { styles } from './style';
import {
	indicatorColor,
	indicatorBackground,
	indicatorText,
	showChangeArrow,
	showTrendArrow,
} from './dashboardUtils';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { AxiosRequestConfig } from 'axios';
import DashBoardSkeleton from './DashBoardSkeleton';
import {
	useGetDashboardMetricsQuery,
	useGetRevenueReportDataQuery,
} from '../../store/DashboardStore/dashboardApiSlice';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoard = () => {
	const { mode } = useContext(ThemeContext);
	const [firstDay, setFirstDay] = useState<Dayjs>(
		dayjs().subtract(11, 'months'),
	);
	const [secondDay, setSecondDay] = useState<Dayjs>(dayjs());

	const dispatch = useDispatch();

	const { data: dashboardMetrics, isLoading: isDasboardMetricsLoading } =
		useGetDashboardMetricsQuery();

	const startDate = firstDay?.format('YYYY-MM-DD');
	const endDate = secondDay?.format('YYYY-MM-DD');

	const {
		data: revenueReport,
		error,
		isLoading: isRevenueReportLoading,
	} = useGetRevenueReportDataQuery({ startDate, endDate });

	const TOTALUNITS = dashboardMetrics?.propertyMetrics?.totalUnits;

	const OVERDUERENTSUM =
		dashboardMetrics?.propertyMetrics?.rentOverdue?.overDueRentSum;

	const OVERDUELEASECOUNT =
		dashboardMetrics?.propertyMetrics?.rentOverdue?.overDueLeaseCount;

	const OCCUPANCYRATE = dashboardMetrics?.propertyMetrics?.occupancyRate;

	const OCCUPANCYRATECHANGEINDICATOR =
		dashboardMetrics?.propertyMetrics?.occupancyRateChangeIndicator;

	const OCCUPANCYRATEPERCENTAGEDIFFERENCE =
		dashboardMetrics?.propertyMetrics?.occupancyRatePercentageDifference;

	const MAINTENANCEUNITS = dashboardMetrics?.propertyMetrics?.maintenanceUnits;

	const MAINTENANCEUNITSCHANGEINDICATOR =
		dashboardMetrics?.propertyMetrics?.maintenanceUnitsChangeIndicator;

	const MAINTENANCEUNITSPERCENTAGEDIFFERENCE =
		dashboardMetrics?.propertyMetrics?.maintenanceUnitsPercentageDifference;

	const TODAYSREVENUE = dashboardMetrics?.transactionMetrics?.todaysRevenue;

	const DAILYREVENUECHANGEINDICATOR =
		dashboardMetrics?.transactionMetrics?.dailyRevenueChangeIndicator;

	const DAILYREVENUEPERCENTAGEDIFFERENCE =
		dashboardMetrics?.transactionMetrics?.dailyRevenuePercentageDifference;

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

	const guageData = {
		occupied: dashboardMetrics?.propertyMetrics?.occupiedUnits || 0,
		vacant: dashboardMetrics?.propertyMetrics?.vacantUnits || 0,
		maintenance: MAINTENANCEUNITS || 0,
	};

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
			const response = await api.post(
				dashboardEndpoints.downloadReport(),
				{ startDate, endDate },
				config,
			);

			const outputFilename = `${crypto.randomUUID()}_revenue_report.xlsx`;
			const url = URL.createObjectURL(
				new Blob([response?.data], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				}),
			);

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
					duration: 2000,
				}),
			);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			{isDasboardMetricsLoading ? (
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
											{TOTALUNITS || 0}
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
										₦{TODAYSREVENUE?.toFixed(2) || 0.0}
									</Typography>
									<Box sx={styles.changeArrowBoxStyle}>
										<Typography
											sx={{
												...styles.changeTypographyStyle,
												color: indicatorColor(DAILYREVENUECHANGEINDICATOR),
												border: `1px solid ${indicatorColor(DAILYREVENUECHANGEINDICATOR)}`,

												backgroundColor: indicatorBackground(
													DAILYREVENUECHANGEINDICATOR,
												),
											}}
										>
											{showChangeArrow(DAILYREVENUECHANGEINDICATOR)}
											{DAILYREVENUEPERCENTAGEDIFFERENCE?.toFixed(1) || 0.0}%
										</Typography>
										<Typography
											fontSize='14px'
											lineHeight={'20px'}
											fontWeight={400}
										>
											{indicatorText(DAILYREVENUECHANGEINDICATOR)}
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
											₦{OVERDUERENTSUM?.toFixed(2) || 0.0}
										</Typography>
									</Box>
									<Typography sx={styles.overdueTypo}>
										{OVERDUELEASECOUNT || 0}
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
											{OCCUPANCYRATE?.toFixed(1) || 0}%
										</Typography>

										<Typography
											sx={{
												...styles.changeTypographyStyle,
												color: indicatorColor(OCCUPANCYRATECHANGEINDICATOR),
												border: `1px solid ${indicatorColor(OCCUPANCYRATECHANGEINDICATOR)}`,
												backgroundColor: indicatorBackground(
													OCCUPANCYRATECHANGEINDICATOR,
												),
											}}
										>
											{showChangeArrow(OCCUPANCYRATECHANGEINDICATOR)}
											{OCCUPANCYRATEPERCENTAGEDIFFERENCE?.toFixed(1) || 0}%
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
													₦{TOTALEXPENSES?.toFixed(2) || 0.0}
												</Typography>

												{showTrendArrow(TOTALEXPENSESCHANGEINDICATOR)}

												<Typography
													sx={{
														...styles.typoStyle,
														color: indicatorColor(TOTALEXPENSESCHANGEINDICATOR),
													}}
												>
													{TOTALEXPENSESPERCENTAGEDIFFERENCE?.toFixed(1) || 0.0}
													%
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
													{NETCASHFLOW && NETCASHFLOW > 0
														? `₦${NETCASHFLOW?.toFixed(2) || 0.0}`
														: NETCASHFLOW && NETCASHFLOW < 0
															? `- ₦${(-1 * NETCASHFLOW).toFixed(2)}`
															: `₦0.00`}
												</Typography>

												{showTrendArrow(NETCASHFLOWCHANGEINDICATOR)}
												<Typography
													sx={{
														...styles.typoStyle,
														color: indicatorColor(NETCASHFLOWCHANGEINDICATOR),
													}}
												>
													{NETCASHFLOWPERCENTAGEDIFFERENCE?.toFixed(1) || 0.0}%
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
										{MAINTENANCEUNITS || 0}
									</Typography>
									<Box sx={styles.changeArrowBoxStyle}>
										<Typography
											sx={{
												...styles.changeTypographyStyle,
												color: indicatorColor(MAINTENANCEUNITSCHANGEINDICATOR),
												border: `1px solid ${indicatorColor(
													MAINTENANCEUNITSCHANGEINDICATOR,
												)}`,
												backgroundColor: indicatorBackground(
													MAINTENANCEUNITSCHANGEINDICATOR,
												),
											}}
										>
											{showChangeArrow(MAINTENANCEUNITSCHANGEINDICATOR)}
											{MAINTENANCEUNITSPERCENTAGEDIFFERENCE?.toFixed(1) || 0.0}%
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
							{!isRevenueReportLoading && (
								<Box
									display={'flex'}
									textAlign={'center'}
									alignItems={'center'}
								>
									<Typography
										sx={styles.occupancyTextStyle}
										variant='dashboardTypography'
									>
										₦{revenueReport?.totalRevenueLast12Months?.toFixed(2)}
									</Typography>

									<Typography
										sx={{
											...styles.changeTypographyStyle,
											backgroundColor: indicatorBackground(
												revenueReport?.changeIndicator,
											),
											color: indicatorColor(revenueReport?.changeIndicator),
											border: `1px solid ${indicatorColor(
												revenueReport?.changeIndicator,
											)}`,
										}}
									>
										{showChangeArrow(revenueReport?.changeIndicator)}
										{revenueReport?.percentageDifference?.toFixed(1)}%
									</Typography>
								</Box>
							)}
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
							{!isRevenueReportLoading && (
								<TableChart
									seriesData={revenueReport?.revenueChart?.seriesData || []}
									maxRevenue={revenueReport?.maxRevenue || 0}
									xAxisData={revenueReport?.revenueChart?.xAxisData}
								/>
							)}
						</Grid>
					</Grid>
				</Container>
			)}
		</>
	);
};
export default DashBoard;
