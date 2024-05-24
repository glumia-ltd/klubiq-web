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
// import { PieChart } from '@mui/x-charts/PieChart';
import DashStyle from './DashStyle';
import TableChart from './TableChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
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
	return (
		<Container
			maxWidth={'xl'}
			sx={{
				flexGrow: 1,
				// padding: '14px',
				overflow: 'auto',
			}}
		>
			<Grid container spacing={1} sx={{ padding: '3rem' }}>
				<Grid container item spacing={1} xs={12} sm={9} md={9} lg={9}>
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
								mb={'1rem'}
								textAlign='left'
							>
								Today's Revenue
							</Typography>

							<Typography
								fontSize={{ sm: '24px', md: '14px', lg: '24px', xl: '40px' }}
								fontWeight={800}
								lineHeight={'44px'}
							>
								₦150,280.11
							</Typography>
							<Box
								sx={{
									display: 'flex',
									textAlign: 'center',
									marginTop: '35px',
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
								fontSize={{ sm: '24px', md: '14px', lg: '24px', xl: '40px' }}
								fontWeight={800}
								lineHeight={'44px'}
							>
								<CalendarTodayIcon sx={{ color: '#FF0000' }} /> ₦0
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
							>
								20
							</Typography>
							<Box
								sx={{
									display: 'flex',
									textAlign: 'center',
									marginTop: '20px',
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
												sm: '24px',
												md: '14px',
												lg: '24px',
												xl: '40px',
											}}
											fontWeight={800}
											lineHeight={'44px'}
											mr={'1rem'}
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
												sm: '24px',
												md: '14px',
												lg: '24px',
												xl: '40px',
											}}
											fontWeight={800}
											lineHeight={'44px'}
											mr={'1.2rem'}
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

				<Grid container item xs={12} sm={3} md={3}>
					<Card sx={DashStyle.cardStyleFive}>
						<ReportCard />
					</Card>
				</Grid>
				<Grid container sx={DashStyle.tableGridOne}>
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
								// width={'64px'}
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
						xs={7}
						sm={12}
						md={5}
						alignItems={'center'}
						justifyContent={{ sm: 'left', md: 'space-between' }}
						display={'flex'}
						// width='484px'
					>
						<TextField type='date' size='medium' name='Date' value='date' />{' '}
						<TrendingFlatIcon sx={{ fontSize: '30px' }} />
						<TextField
							sx={{
								// width: '180px',
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
								border: '1px solid black',
								padding: '8px, 16px, 8px, 16px',
								width: '58px',
								height: '48px',
								borderRadius: '8px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<SaveAltOutlinedIcon />
						</Box>
					</Grid>

					<Grid item xs={6} sm={12} md={12} lg={12} mt={'10px'}>
						<Card
							elevation={0}
							sx={{
								// minWidth: { xs: '300px', sm: '500px', md: '700px' },
								margin: { xs: '', sm: '', md: 'auto' },
							}}
						>
							<TableChart />
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};
export default DashBoard;
