import { Grid, Skeleton, Box, Card, CardContent } from '@mui/material';
import { styles } from './styles';
import { data } from './data';
import style from '../../components/PropertyCard/CardStyle';
const PropertiesSkeleton = () => {
	return (
		<Grid container spacing={1} sx={styles.container}>
			{/* <Grid item xs={12} sx={styles.firstDiv}>
				<Skeleton variant='rectangular' height={20} width='20px' />
				<Skeleton variant='rectangular' sx={styles.buttonBorder} />
			</Grid>
			<Grid item xs={12}>
				<Skeleton variant='rectangular' sx={styles.inputStyle2} />
			</Grid>
			<Grid item xs={6} sx={styles.filterContainers}>
				<Skeleton variant='rectangular' sx={styles.borders} width='200px' />
				<Skeleton variant='rectangular' sx={styles.borders} width='200px' />
				<Skeleton
					variant='rectangular'
					sx={styles.borders}
					height={45}
					width='200px'
				/>
				<Skeleton
					variant='rectangular'
					sx={styles.borders}
					height={45}
					width='350px'
				/>
				<Skeleton
					variant='rectangular'
					sx={styles.borders}
					height={45}
					width='350px'
				/>
			</Grid> */}

			<Grid container spacing={1.5} mt={3} pl={0.5}>
				{data.map((_, idx) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
						<Card sx={style.cardContainerColumn}>
							<CardContent
								sx={{
									padding: '1.5rem 1rem',
								}}
							>
								<Skeleton
									variant='rectangular'
									style={styles.skeletonText}
									width='50%'
								/>

								<Skeleton variant='rectangular' style={styles.skeletonImage} />
								<Skeleton variant='rectangular' style={styles.skeletonText} />
								<Skeleton
									variant='rectangular'
									style={styles.skeletonText}
									width='70%'
								/>
								<Skeleton
									variant='rectangular'
									style={styles.skeletonText}
									width='60%'
								/>
								<Skeleton
									variant='rectangular'
									style={styles.skeletonText}
									width='55%'
								/>
								<Skeleton
									variant='rectangular'
									style={styles.skeletonText}
									width='35%'
								/>
								<Skeleton variant='rectangular' height={2} width='100%' />

								<Box display={'flex'} justifyContent={'flex-end'} mt='10px'>
									<Skeleton
										variant='rectangular'
										style={styles.skeletonText}
										width='40%'
									/>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}{' '}
			</Grid>
		</Grid>
	);
};

export default PropertiesSkeleton;
