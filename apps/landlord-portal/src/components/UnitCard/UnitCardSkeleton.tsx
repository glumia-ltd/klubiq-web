import { Box, Card, Grid, Skeleton } from '@mui/material';
import { styles } from './style';
import { FC } from 'react';

type UnitCardProp = {
	numberOfUnits: string;
	totalArea?: string;
};

const UnitCardSkeleton: FC<UnitCardProp> = ({
	numberOfUnits,
	totalArea,
}) => {
	return (
		<>
			<Card sx={styles.mainCardContainerStyle} >
				<Grid spacing={2} sx={styles.mainCardStyle}>
					<Skeleton variant='rounded' sx={styles.skelPic} />
					<Grid sx={styles.propertyDetailsStyle}>
						<Grid sx={styles.propertyHeaderStyle}>
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
								<Skeleton variant='rectangular' width='100px' />
								<Skeleton width='100px' />
							</Box>

							<Grid sx={styles.propertyIdStyle}>
								<Skeleton variant='rectangular' width='90px' height='10px' />
							</Grid>
						</Grid>

						<Grid sx={styles.additionalInfoContainer}>
							<Grid sx={styles.additionalInfo}>
								<Grid sx={styles.additionalInfoText}>
									<Skeleton variant='rectangular' width='90px' height='10px' />
									<Skeleton variant='rectangular' width='90px' height='10px' />
								</Grid>
							</Grid>

							<Grid sx={styles.additionalInfo}>
								<Grid sx={styles.additionalInfoText}>
									<Skeleton variant='rectangular' width='90px' height='10px' />
									<Skeleton variant='rectangular' width='90px' height='10px' />
								</Grid>
							</Grid>

							{numberOfUnits !== 'Multi' && totalArea && (
								<Grid sx={styles.additionalInfo}>
									<Grid sx={styles.additionalInfoText}>
										<Skeleton
											variant='rectangular'
											width='90px'
											height='10px'
										/>
										<Skeleton
											variant='rectangular'
											width='90px'
											height='10px'
										/>
									</Grid>
								</Grid>
							)}
						</Grid>

						<Grid sx={styles.additionalChipStyle}>
							<Skeleton width='100px' height='30px' />
						</Grid>
					</Grid>

					<Box sx={styles.stackedImagesContainer}>
						<Skeleton width='100px' height='167px' />;
					</Box>
				</Grid>
			</Card>
		</>
	);
};

export default UnitCardSkeleton;
