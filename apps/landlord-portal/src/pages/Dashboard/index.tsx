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
import ReportCard from './ReportCard';
import DashStyle from './DashStyle';
import TableChart from './TableChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext } from 'react';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
	labels: ['Occupied', 'Vacant', 'Maintenace'],
	datasets: [
		{
			backgroundColor: ['#6EC03C', '#D108A5', '#0088F0'],

			data: [21, 0, 0],
		},

		{
			backgroundColor: ['#6EC03C', '#D108A5', '#0088F0'],
			data: [0, 90, 0],
		},
		{
			backgroundColor: ['#6EC03C', '#D108A5', '#0088F0'],
			data: [0, 0, 7],
		},
	],
};

const DashBoard = () => {
	const { mode } = useContext(ThemeContext);
	return (
		<Container
			maxWidth={'xl'}
			sx={{
				overflow: 'auto',
			}}
		>
			<Grid
				container
				spacing={1}
				sx={{
					padding: {
						xs: '0.5rem',
						sm: '0.5rem',
						md: '1rem',
						lg: '1rem',
						xl: '1.5rem',
					},
				}}
			>
				<Grid container item spacing={1} xs={12} sm={8} md={8} lg={9}>
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
								>
									Total Properties{' '}
								</Typography>{' '}
								<Typography
									fontSize={{ sm: '24px', md: '14px', lg: '24px', xl: '40px' }}
									fontWeight={800}
									lineHeight={'44px'}
									variant='dashboardTypography'
								>
									160
								</Typography>
							</Box>

							<Doughnut
								data={data}
								options={{
									responsive: true,
									plugins: {
										legend: {
											display: true,
											position: 'left',
											labels: {
												usePointStyle: true,
												boxHeight: 10,
												boxWidth: 10,

												font: {
													size: 12,
												},
												textAlign: 'left',
											},
										},
									},
								}}
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
								₦150,280.11
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
									color='#17B26A'
									border={'1px solid #17B26A'}
									justifyContent={'center'}
									borderRadius={'20px'}
									padding={'10px'}
									// width={'70px'}
									height={'24px'}
									display='flex'
									mr={{ xs: '15px', md: '5px', lg: '15px' }}
									sx={{ backgroundColor: 'rgba(236,253,243)' }}
								>
									<ArrowUpwardIcon
										sx={{
											color: '#17B26A',
											fontSize: '14px',
											marginRight: '2px',
										}}
									/>
									10%
								</Typography>
								<Typography
									fontSize='14px'
									lineHeight={'20px'}
									fontWeight={400}
								>
									{' '}
									Up from yesterday
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
								<CalendarTodayIcon
									sx={{
										color: '#FF0000',
										fontSize: {
											xs: '29px',
											sm: '20px',
											md: '17px',
											lg: '29px',
											xl: '29px',
										},
									}}
								/>{' '}
								₦0
							</Typography>
							<Typography
								fontSize='14px'
								lineHeight={'20px'}
								fontWeight={400}
								mt={'2rem'}
							>
								{' '}
								0 overdue
							</Typography>{' '}
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
								20
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
									color='#17B26A'
									border={'1px solid #17B26A'}
									justifyContent={'center'}
									borderRadius={'20px'}
									padding={'10px'}
									width={'70px'}
									height={'24px'}
									display='flex'
									mr={'15px'}
									sx={{ backgroundColor: 'rgba(236,253,243)' }}
								>
									<ArrowUpwardIcon
										sx={{
											color: '#17B26A',
											fontSize: '14px',
											marginRight: '2px',
										}}
									/>
									5.46%
								</Typography>

								<Typography
									fontSize='14px'
									lineHeight={'20px'}
									fontWeight={400}
									// mt="10px"
								>
									{' '}
									Since last month
								</Typography>
							</Box>
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
									fontSize={{ sm: '24px', md: '14px', lg: '24px', xl: '40px' }}
									fontWeight={800}
									lineHeight={'44px'}
									mr={'30px'}
									variant='dashboardTypography'
								>
									23%
								</Typography>

								<Typography
									fontSize='14px'
									lineHeight={'20px'}
									fontWeight={500}
									alignItems={'center'}
									justifyContent={'center'}
									textAlign={'center'}
									color='#FF0000'
									border={'1px solid #FF0000'}
									borderRadius={'20px'}
									padding={'2px'}
									width={'54px'}
									height={'24px'}
									display='flex'
									sx={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
								>
									<ArrowDownwardIcon
										sx={{
											color: '#FF0000',
											fontSize: '15px',
											marginRight: '2px',
										}}
									/>
									2%
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
											₦91,00.42{' '}
										</Typography>

										<TrendingUpIcon sx={{ color: '#17B26A' }} />
										<Typography
											fontSize='14px'
											lineHeight={'20px'}
											fontWeight={500}
											// textAlign='left'
											color='#17B26A'
											mr={'1rem'}
										>
											6.6%
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
											₦91,420.9{' '}
										</Typography>

										<TrendingUpIcon sx={{ color: '#17B26A' }} />
										<Typography
											fontSize='14px'
											lineHeight={'20px'}
											fontWeight={500}
											// textAlign='left'
											color='#17B26A'
										>
											8.1%
										</Typography>
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
				</Grid>

				<Grid container item xs={12} sm={4} md={4} lg={3}>
					<ReportCard />
				</Grid>

				<Grid
					container
					// item
					// xs={12}
					// md={12}
					// lg={12}
					sx={{
						background: mode === ThemeMode.LIGHT ? '#FFFFFF' : '#161616',
						borderRadius: '20px',
						padding: {
							xs: '20px',
							sm: '20px',
							md: '24px',
							lg: '25px',
							xl: '25px',
						},
						marginTop: '0.5rem',
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
								// marginTop: '5px',
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
								₦278,625.92{' '}
							</Typography>

							<Typography
								sx={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
								fontSize='14px'
								lineHeight={'20px'}
								fontWeight={500}
								alignItems={'center'}
								justifyContent={'center'}
								textAlign={'center'}
								color='#FF0000'
								border={'1px solid #FF0000'}
								borderRadius={'20px'}
								padding={'2px'}
								width={'54px'}
								height={'24px'}
								display='flex'
							>
								<ArrowDownwardIcon
									sx={{
										color: '#FF0000',
										fontSize: '15px',
										marginRight: '2px',
									}}
								/>
								2%
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
						// width='484px'
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
			</Grid>
		</Container>
	);
};
export default DashBoard;
