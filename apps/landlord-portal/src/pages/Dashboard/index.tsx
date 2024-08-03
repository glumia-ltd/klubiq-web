import {
	Container,
	Grid,
	Card,
	Typography,
	Box,
	TextField,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReportCard from './ReportCard';
import DashStyle from './DashStyle';
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

ChartJS.register(ArcElement, Tooltip, Legend);

const POSITIVE = 'positive';
const NEGATIVE = 'negative';
const NEUTRAL = 'neutral';

const DashBoard = () => {
	const { mode } = useContext(ThemeContext);

	const [dashboardMetrics, setDashboardMetrics] =
		useState<DashboardMetricsType | null>(null);

	const indicatorColor = (changeIndicator?: string) =>
		changeIndicator === POSITIVE
			? '#17B26A'
			: changeIndicator === NEGATIVE
				? '#FF0000'
				: '#49a0e3';

	const indicatorBackground = (changeIndicator?: string) =>
		changeIndicator === POSITIVE
			? 'rgba(236,253,243)'
			: changeIndicator === NEGATIVE
				? 'rgba(255, 0, 0, 0.1)'
				: '#c2daed';

	const indicatorText = (changeIndicator?: string) =>
		changeIndicator === POSITIVE
			? 'Up from yesterday'
			: changeIndicator === NEGATIVE
				? 'Down from yesterday'
				: 'No changes from yesterday';

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
			} = await api.get(dashboardEndpoints.getKlubiqMetrics());

			setDashboardMetrics(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getDashboardMetrics();
	}, []);

	const showChangeArrow = (changeIndicator?: string) => {
		if (changeIndicator === POSITIVE) {
			return (
				<ArrowUpwardIcon
					sx={{
						color: '#17B26A',
						fontSize: '14px',
						marginRight: '2px',
					}}
				/>
			);
		} else if (changeIndicator === NEGATIVE) {
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

	const showTrendArrow = (changeIndicator?: string) => {
		if (changeIndicator === POSITIVE) {
			return <TrendingUpIcon sx={{ color: '#17B26A' }} />;
		} else if (changeIndicator === NEGATIVE) {
			return <TrendingDownIcon sx={{ color: '#FF0000' }} />;
		} else {
			return null;
		}
	};

	return (
		<ViewPort>
			<Container
				maxWidth={'xl'}
				sx={{
					overflow: 'auto',
					paddingTop: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
					paddingBottom: { xs: '0.5rem', sm: '0.5rem', md: '1rem', lg: '1rem' },
				}}
			>
				<Grid container spacing={2}>
					<Grid container item spacing={2} xs={12} sm={8} md={8} lg={9}>
						<Grid item xs={12} sm={6} md={4} lg={4}>
							<Card sx={DashStyle.cardStyle}>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<Typography
										fontSize='14px'
										lineHeight={'20px'}
										fontWeight={500}
										mb={{ sm: '0.5rem', md: '0.5rem', lg: '1rem' }}
										textAlign='left'
									>
										Total Properties{' '}
									</Typography>{' '}
									<Typography
										fontSize={{
											sm: '24px',
											md: '14px',
											lg: '24px',
											xl: '40px',
										}}
										fontWeight={800}
										lineHeight={'44px'}
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
							<Card sx={DashStyle.cardStyleTwo}>
								<Typography
									fontSize='14px'
									lineHeight={'20px'}
									fontWeight={500}
									mb={{ sm: '0.5rem', md: '0.5rem', lg: '1rem' }}
									textAlign='left'
								>
									Today's Revenue
								</Typography>

								<Typography
									fontSize={{ sm: '24px', md: '14px', lg: '24px', xl: '40px' }}
									fontWeight={800}
									lineHeight={'44px'}
									variant='dashboardTypography'
								>
									₦{dashboardMetrics?.transactionMetrics.todaysRevenue || 0}
								</Typography>
								<Box
									sx={{
										display: 'flex',
										textAlign: 'center',
										marginTop: { xs: '35px', md: '28px', lg: '35px' },
										alignItems: 'center',
									}}
								>
									<Typography
										fontSize='14px'
										lineHeight={'20px'}
										fontWeight={500}
										alignItems={'center'}
										color={indicatorColor(
											dashboardMetrics?.transactionMetrics
												.dailyRevenueChangeIndicator,
										)}
										border={`1px solid ${indicatorColor(dashboardMetrics?.transactionMetrics.dailyRevenueChangeIndicator)}`}
										justifyContent={'center'}
										borderRadius={'20px'}
										padding={'10px'}
										height={'24px'}
										display='flex'
										mr={{ xs: '15px', md: '5px', lg: '15px' }}
										sx={{
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
							<Card sx={DashStyle.cardStyleTwo}>
								<Typography
									fontSize='14px'
									lineHeight={'20px'}
									fontWeight={500}
									mb={'1rem'}
									textAlign='left'
								>
									Rent Overdue
								</Typography>
								<Box display={'flex'} alignItems={'center'}>
									<CalendarTodayIcon
										sx={{
											color: '#FF0000',
											gap: '10px',
											width: '24px',
											height: ' 24px',
											padding: '4px',
										}}
									/>{' '}
									<Typography
										fontSize={{
											xs: '24px',
											sm: '24px',
											md: '14px',
											lg: '24px',
											xl: '40px',
										}}
										fontWeight={800}
										lineHeight={'44px'}
										variant='dashboardTypography'
										alignItems={'center'}
									>
										₦
										{dashboardMetrics?.propertyMetrics.rentOverdue
											?.overDueRentSum || 0}
									</Typography>
								</Box>
								<Typography
									fontSize='14px'
									lineHeight={'20px'}
									fontWeight={400}
									mt={'2rem'}
								>
									{dashboardMetrics?.propertyMetrics.rentOverdue
										?.overDueLeaseCount || 0}{' '}
									overdue
								</Typography>{' '}
							</Card>
						</Grid>

						<Grid item xs={12} sm={12} md={8} lg={8}>
							<Card sx={DashStyle.cardStyleThree}>
								<Typography
									fontSize='14px'
									lineHeight={'20px'}
									fontWeight={500}
									mb={'1rem'}
									textAlign='left'
								>
									Occupancy Rate{' '}
								</Typography>{' '}
								<Box
									sx={{
										display: 'flex',
										textAlign: 'center',
										alignItems: 'center',
										marginBottom: '1rem',
									}}
								>
									<Typography
										fontSize={{
											sm: '24px',
											md: '14px',
											lg: '24px',
											xl: '40px',
										}}
										fontWeight={800}
										lineHeight={'44px'}
										mr={'30px'}
										variant='dashboardTypography'
									>
										{dashboardMetrics?.propertyMetrics.occupancyRate || 0}%
									</Typography>

									<Typography
										fontSize='14px'
										lineHeight={'20px'}
										fontWeight={500}
										alignItems={'center'}
										justifyContent={'center'}
										textAlign={'center'}
										color={indicatorColor(
											dashboardMetrics?.propertyMetrics
												.occupancyRateChangeIndicator,
										)}
										border={`1px solid ${indicatorColor(dashboardMetrics?.propertyMetrics.occupancyRateChangeIndicator)}`}
										borderRadius={'20px'}
										padding={'2px'}
										width={'54px'}
										height={'24px'}
										display='flex'
										sx={{
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
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										textAlign: 'left',
										marginTop: '12px',
									}}
								>
									<Box>
										<Typography
											fontSize='14px'
											lineHeight={'20px'}
											fontWeight={500}
											mb={'0.5rem'}
											textAlign='left'
										>
											Total expenses{' '}
										</Typography>{' '}
										<Box
											style={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<Typography
												fontSize={{
													xs: '14px',
													sm: '24px',
													md: '14px',
													lg: '24px',
													xl: '40px',
												}}
												fontWeight={800}
												lineHeight={'44px'}
												mr={'1rem'}
												variant='dashboardTypography'
											>
												₦{dashboardMetrics?.transactionMetrics.totalExpenses}
											</Typography>

											{showTrendArrow(
												dashboardMetrics?.revenueMetrics.changeIndicator,
											)}

											<Typography
												fontSize='14px'
												lineHeight={'20px'}
												fontWeight={500}
												color='#17B26A'
												mr={'1rem'}
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
										<Typography
											fontSize='14px'
											lineHeight={'20px'}
											fontWeight={500}
											mb={'0.5rem'}
											textAlign='left'
										>
											Net cash flow{' '}
										</Typography>{' '}
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<Typography
												fontSize={{
													xs: '14px',
													sm: '24px',
													md: '14px',
													lg: '24px',
													xl: '40px',
												}}
												fontWeight={800}
												lineHeight={'44px'}
												mr={'1.2rem'}
												variant='dashboardTypography'
											>
												₦{dashboardMetrics?.transactionMetrics.netCashFlow}
											</Typography>

											{showTrendArrow(
												dashboardMetrics?.revenueMetrics.changeIndicator,
											)}
											<Typography
												fontSize='14px'
												lineHeight={'20px'}
												fontWeight={500}
												color='#17B26A'
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
							<Card sx={DashStyle.cardStyleFour}>
								<Typography
									fontSize='14px'
									lineHeight={'20px'}
									fontWeight={500}
									mb={'1rem'}
									textAlign='left'
								>
									Maintenance
								</Typography>
								<Typography
									fontSize={{ sm: '24px', md: '14px', lg: '24px', xl: '40px' }}
									fontWeight={800}
									lineHeight={'44px'}
									variant='dashboardTypography'
								>
									{dashboardMetrics?.propertyMetrics.maintenanceUnits || 0}
								</Typography>
								<Box
									sx={{
										display: 'flex',
										textAlign: 'center',
										marginTop: { xs: '35px', md: '28px', lg: '20px' },
										alignItems: 'center',
									}}
								>
									<Typography
										fontSize='14px'
										lineHeight={'20px'}
										fontWeight={500}
										alignItems={'center'}
										color={indicatorColor(
											dashboardMetrics?.propertyMetrics
												.maintenanceUnitsChangeIndicator,
										)}
										border={`1px solid ${indicatorColor(
											dashboardMetrics?.propertyMetrics
												.maintenanceUnitsChangeIndicator,
										)}`}
										justifyContent={'center'}
										borderRadius={'20px'}
										padding={'10px'}
										width={'70px'}
										height={'24px'}
										display='flex'
										mr={'15px'}
										sx={{
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

									<Typography
										fontSize='14px'
										lineHeight={'20px'}
										fontWeight={400}
									>
										{' '}
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
						background: mode === ThemeMode.LIGHT ? '#FFFFFF' : '#161616',
						borderRadius: '20px',
						padding: {
							xs: '24px',
							sm: '20px',
							md: '24px',
							lg: '24px',
							xl: '24px',
						},
						marginTop: '1rem',
						transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

						boxShadow:
							mode === ThemeMode.LIGHT
								? '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
								: '0px 0px 25px 0px rgba(211, 217, 223, 0.25)',
					}}
				>
					<Grid item xs={12} sm={12} md={7}>
						<Typography
							fontSize='14px'
							lineHeight={'20px'}
							fontWeight={500}
							mb={'.5rem'}
							textAlign='left'
						>
							Total Revenue{' '}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								textAlign: 'center',
								alignItems: 'center',
							}}
						>
							<Typography
								lineHeight={'44px'}
								fontSize={{ sm: '24px', md: '14px', lg: '24px', xl: '40px' }}
								fontWeight={800}
								mr='15px'
								variant='dashboardTypography'
							>
								{' '}
								₦{dashboardMetrics?.revenueMetrics.totalRevenueLast12Months}
							</Typography>

							<Typography
								sx={{
									backgroundColor: indicatorBackground(
										dashboardMetrics?.revenueMetrics.changeIndicator,
									),
								}}
								fontSize='14px'
								lineHeight={'20px'}
								fontWeight={500}
								alignItems={'center'}
								justifyContent={'center'}
								textAlign={'center'}
								color={indicatorColor(
									dashboardMetrics?.revenueMetrics.changeIndicator,
								)}
								border={`1px solid ${indicatorColor(
									dashboardMetrics?.revenueMetrics.changeIndicator,
								)}`}
								borderRadius={'20px'}
								padding={'2px'}
								width={'54px'}
								height={'24px'}
								display='flex'
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
						/>{' '}
						<Box
							sx={{
								border: '1px solid ',
								padding: '8px, 12px, 8px, 12px',
								width: '45px',
								height: '35px',
								borderRadius: '8px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginLeft: { xs: '0', sm: '13rem', md: '0' },
							}}
						>
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
