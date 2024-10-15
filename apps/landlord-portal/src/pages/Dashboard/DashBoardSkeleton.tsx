import { Grid, Skeleton, Container, Box, Card, Stack } from '@mui/material';
import { styles } from './style';
import { useContext } from 'react';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
const DashBoardSkeleton = () => {
	const { mode } = useContext(ThemeContext);

	return (
		<Container maxWidth={'xl'} sx={styles.containerStyle}>
			<Grid container spacing={2}>
				<Grid container item spacing={2} xs={12} sm={12} md={12} lg={9}>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<Card sx={styles.cardStyle}>
							<Stack direction={'column'} spacing={2}>
								<Stack direction={'row'} sx={styles.boxStyle}>
									<Skeleton variant='text' sx={styles.typoStyle} width='35%' />
									<Skeleton
										variant='text'
										sx={styles.valueTextStyle}
										width='50%'
									/>
								</Stack>
								<Stack direction={'row'} sx={styles.boxStyle}>
									<div>
										<Skeleton
											variant='text'
											sx={styles.valueTextStyle}
											width='5rem'
											height={15}
										/>
										<Skeleton
											variant='text'
											sx={styles.valueTextStyle}
											width='5rem'
											height={15}
										/>{' '}
										<Skeleton
											variant='text'
											sx={styles.valueTextStyle}
											width='5rem'
											height={15}
										/>{' '}
										<Skeleton
											variant='text'
											sx={styles.valueTextStyle}
											width='5rem'
											height={15}
										/>
									</div>
									<div>
										<Skeleton variant='circular' width={100} height={100} />
									</div>
								</Stack>
							</Stack>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Card sx={styles.cardStyleTwo}>
							<Box>
								<Skeleton
									variant='text'
									height={15}
									width='40%'
									sx={styles.typoStyle}
								/>
								<Skeleton
									variant='text'
									height={30}
									width='100%'
									sx={styles.typoStyle}
								/>
							</Box>

							<Box sx={styles.changeArrowBoxStyle}>
								<Skeleton
									variant='rounded'
									height={20}
									width='20%'
									sx={styles.icons}
								/>

								<Skeleton variant='text' height={10} width='60%' />
							</Box>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Card sx={styles.cardStyleTwo}>
							<Skeleton
								variant='text'
								height={10}
								width='40%'
								sx={styles.typoStyle}
							/>{' '}
							<Box display={'flex'} alignItems={'center'}>
								<Skeleton
									variant='rectangular'
									style={styles.calendarTodayStyle}
								/>
								<Skeleton variant='text' height={30} width='35%' />
							</Box>
							<Box mt='2.5rem'>
								<Skeleton variant='text' height={10} width='43%' />
							</Box>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={8} lg={8}>
						<Card sx={styles.cardStyleThree}>
							<Skeleton variant='text' height={15} width='40%' />
							<Box sx={styles.occupancyBoxStyle}>
								<Skeleton
									variant='text'
									height={20}
									width='30%'
									sx={styles.icons}
								/>
								<Skeleton
									variant='rounded'
									height={20}
									width='10%'
									sx={styles.icons}
								/>{' '}
							</Box>
							<Box sx={styles.totalExpensesStyle} mt='150px'>
								<Box>
									<Skeleton variant='text' height={12} width='80%' />
									<Box
										sx={{ ...styles.boxStyle, alignItems: 'flex-start' }}
										mt='25px'
									>
										<Skeleton variant='text' height={25} width='240px' />

										<Skeleton variant='text' height={15} width='50px' />
									</Box>
								</Box>

								<Box>
									<Skeleton variant='text' height={12} width='80%' />
									<Box
										display={'flex'}
										justifyContent={'space-between'}
										mt='25px'
									>
										<Skeleton variant='text' height={20} width='240px' />
										<Skeleton variant='text' height={15} width='50px' />
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Card sx={styles.cardStyleFour}>
							<Box>
								<Skeleton
									variant='text'
									height={10}
									width='100%'
									sx={styles.typoStyle}
								/>
								<Skeleton
									variant='text'
									height={30}
									width='100%'
									sx={styles.typoStyle}
								/>
							</Box>

							<Box sx={styles.changeArrowBoxStyle}>
								<Skeleton
									variant='rounded'
									height={20}
									width='20%'
									sx={styles.icons}
								/>

								<Skeleton variant='text' height={10} width='60%' />
							</Box>
						</Card>
					</Grid>
				</Grid>

				<Grid container item xs={12} sm={12} md={12} lg={3}>
					<Card sx={styles.cardStyleFive}>
						<Skeleton variant='rounded' width='100%' height='100%' />
					</Card>
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
					<Skeleton variant='text' height={15} width='20%' />
					<Box
						display={'flex'}
						textAlign={'center'}
						alignItems={'center'}
						mt='10px'
					>
						<Skeleton
							variant='text'
							height={15}
							width='30%'
							sx={styles.icons}
						/>

						<Skeleton
							variant='rounded'
							height={20}
							width='6%'
							sx={styles.icons}
						/>
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
					<Skeleton variant='rounded' height={35} width='35%' />
					<Skeleton variant='text' height={15} width='5%' />
					<Skeleton variant='rounded' height={35} width='35%' />

					<Skeleton variant='rounded' height={25} width='8%' />
				</Grid>

				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					lg={12}
					mt={'10px'}
					display={'flex'}
					justifyContent={'center'}
				>
					<Skeleton variant='rounded' height={400} width='70%' />
				</Grid>
			</Grid>
		</Container>
	);
};

export default DashBoardSkeleton;
