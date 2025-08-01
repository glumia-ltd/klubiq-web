import {
	Grid,
	Skeleton,
	Box,
	Card,
	Stack,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { styles } from './style';
import { useContext } from 'react';
import { ThemeMode } from '../../../context/ThemeContext/themeTypes';
import { ThemeContext } from '../../../context/ThemeContext/ThemeContext';
import { DBInfoCard } from '@klubiq/ui-components';
const DashBoardSkeleton = () => {
	const { mode } = useContext(ThemeContext);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<Grid
				container
				spacing={2}
				direction={{ lg: 'row', xs: 'column-reverse' }}
			>
				<Grid container item spacing={2} xs={12} sm={12} md={12} lg={9}>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<Card sx={styles.cardStyle}>
							<Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
								<Stack direction={'row'} sx={styles.boxStyle}>
									<Skeleton
										variant='text'
										sx={styles.valueTextStyle}
										width='50%'
									/>
									<Skeleton
										variant='text'
										sx={styles.valueTextStyle}
										width='5%'
									/>
								</Stack>
								<Stack direction={'row'} spacing={2} sx={styles.boxStyle}>
									<Box width={'50%'}>
										<Skeleton
											variant='text'
											sx={styles.valueTextStyle}
											width='100%'
										/>
										<Skeleton
											variant='text'
											sx={styles.valueTextStyle}
											width='100%'
										/>
										<Skeleton
											variant='text'
											sx={styles.valueTextStyle}
											width='100%'
										/>
									</Box>
									<Box width={'50%'} justifyItems={'end'}>
										<Skeleton variant='circular' width={100} height={100} />
									</Box>
								</Stack>
							</Stack>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Card sx={styles.cardStyleTwo}>
							<Stack
								direction={'column'}
								spacing={2}
								sx={{
									width: '100%',
									height: '100%',
									justifyContent: 'space-between',
								}}
							>
								<Skeleton
									variant='text'
									width='100%'
									sx={styles.valueTextStyle}
								/>
								<Skeleton
									variant='text'
									width='100%'
									sx={styles.valueTextStyle}
								/>
								<Box sx={styles.changeArrowBoxStyle}>
									<Skeleton
										variant='rounded'
										height={20}
										width='15%'
										sx={styles.icons}
									/>

									<Skeleton
										variant='text'
										sx={styles.valueTextStyle}
										width='85%'
									/>
								</Box>
							</Stack>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Card sx={styles.cardStyleTwo}>
							<Stack
								direction={'column'}
								spacing={2}
								sx={{
									width: '100%',
									height: '100%',
									justifyContent: 'space-between',
								}}
							>
								<Skeleton
									variant='text'
									width='100%'
									sx={styles.valueTextStyle}
								/>
								<Skeleton
									variant='text'
									width='100%'
									sx={styles.valueTextStyle}
								/>
								<Skeleton
									variant='text'
									width='100%'
									sx={styles.valueTextStyle}
								/>
							</Stack>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={8} lg={8}>
						<Card sx={styles.cardStyleThree}>
							<Stack
								direction={'row'}
								spacing={2}
								sx={{
									width: '100%',
									height: '100%',
									justifyContent: 'space-between',
								}}
							>
								<Stack
									direction={'column'}
									width={'50%'}
									justifyContent={'space-between'}
								>
									<Skeleton
										variant='text'
										width='100%'
										sx={styles.valueTextStyle}
									/>
									<Skeleton
										variant='text'
										width='100%'
										sx={styles.valueTextStyle}
									/>
									<Skeleton
										variant='text'
										width='100%'
										sx={styles.valueTextStyle}
									/>
								</Stack>
								<Stack
									direction={'column'}
									spacing={2}
									width={'50%'}
									justifyContent={'space-between'}
								>
									<Skeleton
										variant='text'
										width='100%'
										sx={styles.valueTextStyle}
									/>
									<Skeleton
										variant='text'
										width='100%'
										sx={styles.valueTextStyle}
									/>
									<Skeleton
										variant='text'
										width='100%'
										sx={styles.valueTextStyle}
									/>
								</Stack>
							</Stack>
						</Card>
					</Grid>

					<Grid item xs={12} sm={6} md={4} lg={4}>
						<Card sx={styles.cardStyleFour}>
							<Stack
								direction={'column'}
								spacing={2}
								sx={{
									width: '100%',
									height: '100%',
									justifyContent: 'space-between',
								}}
							>
								<Skeleton
									variant='text'
									width='100%'
									height={40}
									sx={styles.valueTextStyle}
								/>
								<Skeleton
									variant='text'
									width='100%'
									height={40}
									sx={styles.valueTextStyle}
								/>
								<Skeleton
									variant='text'
									width='100%'
									height={40}
									sx={styles.valueTextStyle}
								/>
							</Stack>
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
				p={2}
				sx={{
					...styles.totalRevenueStyle,
					background: mode === ThemeMode.LIGHT ? '#FFFFFF' : '#161616',
					boxShadow:
						mode === ThemeMode.LIGHT
							? '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
							: '0px 0px 25px 0px rgba(211, 217, 223, 0.25)',
				}}
			>
				<Grid item xs={12} sm={12} md={12}>
					<Skeleton variant='text' width='20%' sx={styles.valueTextStyle} />
					<Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
						<Skeleton
							variant='text'
							width='30%'
							height={50}
							sx={styles.valueTextStyle}
						/>
						<Stack
							direction={'row'}
							spacing={2}
							sx={{ width: '50%', justifyContent: 'flex-end' }}
						>
							<Skeleton
								variant='text'
								height={50}
								width={'30%'}
								sx={styles.valueTextStyle}
							/>
							<Skeleton
								variant='text'
								height={50}
								width={'5%'}
								sx={styles.valueTextStyle}
							/>
						</Stack>
					</Stack>
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
					<Stack
						direction={'row'}
						p={2}
						spacing={2}
						sx={{
							width: '80%',
							height: '100%',
							justifyContent: 'space-around',
						}}
					>
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
						<Skeleton variant='rounded' height={400} width='3%' />
					</Stack>
				</Grid>
			</Grid>

			<Stack direction={'column'} gap={3}>
				{/* Greeting Section */}
				<Stack direction={'row'} gap={1} alignItems={'flex-start'}>
					<Skeleton variant='text' width='15' />
					<Skeleton variant='text' width='15' />
				</Stack>
				{/* Comparative Metrics Section will be here TODO: Add Comparative Metrics Section */}
				<Stack
					direction={{ sm: 'row', md: 'row', xs: 'column' }}
					spacing={2}
					width='100%'
					useFlexGap
					flexWrap='wrap'
					justifyContent={'space-between'}
				>
					{Array.from({ length: 4 }).map((_, idx) => (
						<DBInfoCard
							key={idx}
							loading={true}
							amount={0}
							label={''}
							sx={{
								maxWidth: {
									xs: '100%',
									sm: 'calc(50% - 8px)',
									md: 'calc(33.333% - 10.667px)',
								},
								width: '100%',
								height: '100%',
							}}
						/>
					))}
				</Stack>
			</Stack>
		</>
	);
};

export default DashBoardSkeleton;
