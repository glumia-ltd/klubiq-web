import {
	Container,
	Grid,
	Card,
	Typography,
	Box,
	Button,
	Stack,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import ReportCard from './ReportCard';
import TableChart from './TableChart';
import { useContext, useState } from 'react';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { PropertiesGuage } from '../../components/PropertiesGuage';
import { dashboardEndpoints } from '../../helpers/endpoints';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { api } from '../../api';
import { styles } from './style';
import {
	indicatorColor,
	indicatorBackground,
	indicatorText,
	showChangeArrow,
	showTrendArrow,
} from './dashboardUtils';
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { AxiosRequestConfig } from 'axios';
import DashBoardSkeleton from './DashBoardSkeleton';
import {
	useGetDashboardMetricsQuery,
	useGetRevenueReportDataQuery,
} from '../../store/DashboardStore/dashboardApiSlice';
import { getData } from '../../services/indexedDb';
import { get } from 'lodash';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';

const DashBoard = () => {
	const { user } = useSelector(getAuthState);
	const { mode } = useContext(ThemeContext);
	const [firstDay, setFirstDay] = useState<Dayjs>(
		dayjs().subtract(11, 'months'),
	);
	const [secondDay, setSecondDay] = useState<Dayjs>(dayjs());

	const dispatch = useDispatch();

	const { data: dashboardMetrics, isLoading: isDashboardMetricsLoading } =
		useGetDashboardMetricsQuery();

	const startDate = firstDay?.format('YYYY-MM-DD');
	const endDate = secondDay?.format('YYYY-MM-DD');

	const {
		data: revenueReport,
		//error,
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
	const AVGLEASEDURATION = dashboardMetrics?.leaseMetrics?.avgLeaseDuration;
	const ACTIVELEASECOUNT = dashboardMetrics?.leaseMetrics?.activeLeaseCount;
	const ACTIVELEASEFORPERIODCHANGEDIFFERENCE =
		dashboardMetrics?.leaseMetrics?.activeLeaseForPeriodPercentageDifference;
	const ACTIVELEASEFORPERIODCHANGEINDICATOR =
		dashboardMetrics?.leaseMetrics?.activeLeaseForPeriodChangeIndicator;

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
	const getLocaleFormat = (
		numberVal: number,
		style: 'currency' | 'percent' | 'unit' | 'decimal',
	) => {
		let currencyCode = '';
		let countryCode = '';
		let lang = '';
		if (!user.orgSettings) {
			const orgSettings = getData('org-settings', 'client-config');
			currencyCode = get(orgSettings, 'currency', '');
			countryCode = get(orgSettings, 'countryCode', '');
			lang = get(orgSettings, 'language', '');
		}
		currencyCode = get(user, 'orgSettings.currency', '');
		countryCode = get(user, 'orgSettings.countryCode', '');
		lang = get(user, 'orgSettings.language', '');
		if (!currencyCode || !countryCode || !lang) {
			currencyCode = 'NGN';
			countryCode = 'NG';
			lang = 'en';
		}
		const localCurrencyVal = new Intl.NumberFormat(`${lang}-${countryCode}`, {
			style: `${style}`,
			currency: `${currencyCode}`,
			currencyDisplay: 'symbol',
		}).format(numberVal);
		return localCurrencyVal;
	};
	const getCurrencySymbol = () => {
		if (!user.orgSettings) {
			const orgSettings = getData('org-settings', 'client-config');
			const currencySymbol = get(orgSettings, 'currencySymbol', '');
			return currencySymbol;
		}
		const currencySymbol = get(user, 'orgSettings.currencySymbol', '');
		return currencySymbol;
	};

	return (
		<>
			{isDashboardMetricsLoading ? (
				<DashBoardSkeleton />
			) : (
				<Container maxWidth={'xl'} sx={styles.containerStyle}>
					<Grid container spacing={2}>
						<Grid container item spacing={2} xs={12} sm={12} md={12} lg={9}>
							{/* PROPERTIES */}
							<Grid item xs={12} sm={12} md={4} lg={4}>
								<Card sx={styles.cardStyle}>
									<Stack sx={styles.boxStyle} direction={'row'}>
										<Typography sx={styles.typoStyle}>
											Total Properties{' '}
										</Typography>{' '}
										<Typography
											sx={styles.valueTextStyle}
											variant='dashboardTypography'
										>
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
										<Typography sx={styles.typoStyle}>
											Occupancy Rate
										</Typography>
									</Stack>

									<Typography
										sx={styles.occupancyTextStyle}
										variant='dashboardTypography'
									>
										{getLocaleFormat(OCCUPANCYRATE || 0, 'percent')}
									</Typography>

									<Stack
										sx={styles.changeArrowBoxStyle}
										direction={'row'}
										spacing={2}
									>
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
											{getLocaleFormat(
												OCCUPANCYRATEPERCENTAGEDIFFERENCE || 0,
												'percent',
											)}
										</Typography>
										<Typography sx={styles.overdueTypo}>
											{indicatorText(OCCUPANCYRATECHANGEINDICATOR)}
										</Typography>
									</Stack>
								</Card>
							</Grid>
							{/* RENT OVERDUE */}
							<Grid item xs={12} sm={6} md={4} lg={4}>
								<Card sx={styles.cardStyleTwo}>
									<Stack sx={styles.boxStyle} direction={'row'}>
										<Typography sx={styles.typoStyle}>Rent Overdue</Typography>
									</Stack>

									<Box display={'flex'} alignItems={'center'}>
										<CalendarTodayIcon sx={styles.calendarTodayStyle} />
										<Typography
											sx={styles.overdueTextStyle}
											variant='dashboardTypography'
										>
											{getLocaleFormat(OVERDUERENTSUM || 0.0, 'currency')}
										</Typography>
									</Box>
									<Typography sx={styles.overdueTypo}>
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
												<Typography sx={styles.typoStyle}>
													Total Revenue MTD
												</Typography>
												<Box
													sx={{
														...styles.boxStyle,
														display: 'flex',
														alignItems: 'flex-start',
													}}
												>
													<Typography
														sx={styles.overdueTextStyle}
														mr={'1rem'}
														variant='dashboardTypography'
													>
														{getLocaleFormat(TOTALREVENUE || 0.0, 'currency')}
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
															TOTALREVENUEPERCENTAGEDIFFERENCE || 0.0,
															'percent',
														)}
													</Typography>
												</Box>
											</Stack>

											<Stack direction={'column'} spacing={1}>
												<Typography sx={styles.typoStyle}>
													Total Expenses MTD
												</Typography>
												<Box
													sx={{
														...styles.boxStyle,
														display: 'flex',
														alignItems: 'flex-start',
													}}
												>
													<Typography
														sx={styles.overdueTextStyle}
														mr={'1rem'}
														variant='dashboardTypography'
													>
														{getLocaleFormat(TOTALEXPENSES || 0.0, 'currency')}
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
															TOTALEXPENSESPERCENTAGEDIFFERENCE || 0.0,
															'percent',
														)}
													</Typography>
												</Box>
											</Stack>
										</Stack>
										<Stack
											direction={'row'}
											spacing={2}
											sx={styles.totalExpensesStyle}
										>
											<Stack direction={'column'} spacing={1}>
												<Typography sx={styles.typoStyle}>
													Net Cash Flow
												</Typography>
												<Box display={'flex'} justifyContent={'space-between'}>
													<Typography
														sx={styles.overdueTextStyle}
														mr={'1rem'}
														variant='dashboardTypography'
													>
														{getLocaleFormat(NETCASHFLOW || 0.0, 'currency')}
														{/* {NETCASHFLOW && NETCASHFLOW > 0
														? `₦${NETCASHFLOW?.toFixed(2) || 0.0}`
														: NETCASHFLOW && NETCASHFLOW < 0
															? `- ₦${(-1 * NETCASHFLOW).toFixed(2)}`
															: `₦0.00`} */}
													</Typography>

													{showTrendArrow(NETCASHFLOWCHANGEINDICATOR)}
													<Typography
														sx={{
															...styles.typoStyle,
															color: indicatorColor(NETCASHFLOWCHANGEINDICATOR),
														}}
													>
														{getLocaleFormat(
															NETCASHFLOWPERCENTAGEDIFFERENCE || 0.0,
															'percent',
														)}
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
												<Typography sx={styles.overdueTypo}>
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
													<Typography sx={styles.leaseMetricsTextStyle}>
														Active Lease
														{ACTIVELEASECOUNT && ACTIVELEASECOUNT > 1
															? 's'
															: ''}{' '}
													</Typography>
												</Stack>
												<Stack direction={'row'}>
													<Typography
														sx={styles.leaseMetricsValues}
														variant='dashboardTypography'
													>
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
													<Typography sx={styles.leaseMetricsTextStyle}>
														Lease
														{EXPIRINGLEASEFORPERIODCOUNT &&
														EXPIRINGLEASEFORPERIODCOUNT > 1
															? 's'
															: ''}{' '}
														Expiring Soon
													</Typography>
												</Stack>
												<Stack direction={'row'}>
													<Typography
														sx={styles.leaseMetricsValues}
														variant='dashboardTypography'
													>
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
													<Typography sx={styles.leaseMetricsTextStyle}>
														Tenant
														{TENANTCOUNT && TENANTCOUNT > 1 ? 's' : ''}{' '}
													</Typography>
												</Stack>
												<Stack direction={'row'}>
													<Typography
														sx={styles.leaseMetricsValues}
														variant='dashboardTypography'
													>
														{TENANTCOUNT || 0}
													</Typography>
												</Stack>
											</Stack>
										</Card>

										{/* <Card
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
													<FunctionsOutlinedIcon
														fontSize='small'
														sx={{
															color: '#0088F0',
														}}
													/>
													<Typography sx={styles.leaseMetricsTextStyle}>
														Average Lease Duration
													</Typography>
												</Stack>
												<Stack direction={'row'}>
													<Typography
														sx={styles.overdueTextStyle}
														variant='dashboardTypography'
													>
														{AVGLEASEDURATION || 0}
														{' days'}
													</Typography>
												</Stack>
											</Stack>
										</Card> */}
									</Stack>

									{/* <Typography sx={styles.typoStyle}>Active Lease</Typography>
									<Typography
										sx={styles.overdueTextStyle}
										variant='dashboardTypography'
									>
										{ACTIVELEASECOUNT || 0}
									</Typography>
									<Box sx={styles.changeArrowBoxStyle}>
										<Typography
											sx={{
												...styles.changeTypographyStyle,
												color: indicatorColor(
													ACTIVELEASEFORPERIODCHANGEINDICATOR,
												),
												border: `1px solid ${indicatorColor(
													ACTIVELEASEFORPERIODCHANGEINDICATOR,
												)}`,
												backgroundColor: indicatorBackground(
													ACTIVELEASEFORPERIODCHANGEINDICATOR,
												),
											}}
										>
											{showChangeArrow(ACTIVELEASEFORPERIODCHANGEINDICATOR)}
											{getLocaleFormat(
												ACTIVELEASEFORPERIODCHANGEDIFFERENCE || 0.0,
												'percent',
											)}
										</Typography>

										<Typography sx={{ ...styles.overdueTypo, mt: 0 }}>
											Since last month
										</Typography>
									</Box> */}
								</Card>
							</Grid>
						</Grid>

						<Grid container item xs={12} sm={12} md={12} lg={3}>
							<ReportCard />
						</Grid>
					</Grid>

					<Grid
						container
						rowSpacing={2}
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
							<Stack direction={'column'} spacing={2}>
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
											{getLocaleFormat(
												revenueReport?.totalRevenueLast12Months || 0.0,
												'currency',
											)}
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
											{getLocaleFormat(
												revenueReport?.percentageDifference || 0,
												'percent',
											)}
										</Typography>
									</Box>
								)}
							</Stack>
						</Grid>

						<Grid
							item
							xs={12}
							sm={12}
							md={7}
							lg={5}
							xl={5}
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
									currencySymbol={getCurrencySymbol()}
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
