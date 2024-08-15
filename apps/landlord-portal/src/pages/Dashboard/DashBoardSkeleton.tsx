import { Grid, Skeleton, Container, Box } from '@mui/material';
import { styles } from './style';

const DashBoardSkeleton = () => {
	return (
		<Container maxWidth={'xl'} sx={styles.skeletonCon}>
			<Grid container spacing={2}>
				<Grid container item spacing={2} xs={12} sm={8} md={8} lg={9}>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Box sx={styles.cardStyle}>
							<Box sx={styles.boxStyle}>
								<Skeleton variant='text' sx={styles.typoStyle} width='35%' />
								<Skeleton
									variant='text'
									sx={styles.valueTextStyle}
									width='50%'
								/>
							</Box>
							<Box sx={styles.boxStyle}>
								<div>
									<Skeleton
										variant='text'
										sx={styles.valueTextStyle}
										width='70px'
										height={15}
									/>
									<Skeleton
										variant='text'
										sx={styles.valueTextStyle}
										width='70px'
										height={15}
									/>{' '}
									<Skeleton
										variant='text'
										sx={styles.valueTextStyle}
										width='70px'
										height={15}
									/>{' '}
									<Skeleton
										variant='text'
										sx={styles.valueTextStyle}
										width='70px'
										height={15}
									/>
								</div>
								<div>
									<Skeleton variant='circular' width={100} height={100} />
								</div>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Box sx={styles.cardStyle} mt='15px'>
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
						</Box>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Box sx={styles.cardStyle} mt='15px'>
							<Skeleton
								variant='text'
								height={10}
								width='100%'
								sx={styles.typoStyle}
							/>{' '}
							<Box display={'flex'} alignItems={'center'}>
								<Skeleton
									variant='rectangular'
									style={styles.calendarTodayStyle}
								/>
								<Skeleton variant='text' height={30} width='45%' />
							</Box>
							<Box mt='2.5rem'>
								<Skeleton variant='text' height={10} width='80%' />
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12} sm={12} md={8} lg={8}>
						<Box sx={styles.cardStyleThree} mt='15px'>
							<Skeleton variant='text' height={15} width='100%' />
							<Box sx={styles.occupancyBoxStyle} mt={'25px'}>
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
							<Box sx={styles.totalExpensesStyle}>
								<Box>
									<Skeleton variant='text' height={12} width='80%' />
									<Box sx={{ ...styles.boxStyle, alignItems: 'flex-start' }}>
										<Skeleton variant='text' height={25} width='240px' />

										<Skeleton variant='text' height={15} width='50px' />
									</Box>
								</Box>

								<Box>
									<Skeleton variant='text' height={12} width='80%' />
									<Box display={'flex'} justifyContent={'space-between'}>
										<Skeleton variant='text' height={20} width='240px' />
										<Skeleton variant='text' height={15} width='50px' />
									</Box>
								</Box>
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={4} mt='15px'>
						<Box sx={styles.cardStyleFour}>
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
						</Box>
					</Grid>
				</Grid>

				<Grid container item xs={12} sm={4} md={4} lg={3}>
					<Skeleton
						variant='rectangular'
						sx={styles.cardStyleFive}
						width='100%'
					/>
				</Grid>
			</Grid>

			<Grid container>
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
					<Skeleton variant='rectangular' height={25} width='25%' />
					<Skeleton variant='text' height={15} width='5%' />
					<Skeleton variant='rectangular' height={25} width='25%' />

					<Skeleton variant='rectangular' height={25} width='8%' />
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
