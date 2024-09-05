import { Box, Card, Chip, Grid, Skeleton } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Bungalow, HandCoins, FloorPlan } from '../Icons/CustomIcons';
import { styles } from './style';
import { FC } from 'react';

type UnitCardProp = {
	numberOfUnits: string;
	totalArea?: string;
	buildingType?: string;
};

const UnitCardSkeleton: FC<UnitCardProp> = ({
	numberOfUnits,
	totalArea,
	buildingType,
}) => {
	return (
		<>
			<Card sx={styles.mainCardContainerStyle}>
				<Grid sx={styles.mainCardStyle}>
					<Skeleton variant='rounded' sx={styles.skelPic} />
					<Grid sx={styles.propertyDetailsStyle}>
						<Grid sx={styles.propertyHeaderStyle}>
							<Box>
								<Skeleton variant='rectangular' width='232px' />
								<Box sx={{ display: 'flex' }}>
									<LocationOnOutlinedIcon />
									<Skeleton width='150px' />
								</Box>
							</Box>

							<Grid sx={styles.propertyIdStyle}>
								<Skeleton variant='rectangular' width='90px' height='10px' />
							</Grid>
						</Grid>

						<Grid sx={styles.additionalInfoContainer}>
							<Grid sx={styles.additionalInfo}>
								<Bungalow />
								<Grid sx={styles.additionalInfoText}>
									<Skeleton variant='rectangular' width='90px' height='10px' />
									<Skeleton variant='rectangular' width='90px' height='10px' />
								</Grid>
							</Grid>

							<Grid sx={styles.additionalInfo}>
								<HandCoins />
								<Grid sx={styles.additionalInfoText}>
									<Skeleton variant='rectangular' width='90px' height='10px' />
									<Skeleton variant='rectangular' width='90px' height='10px' />
								</Grid>
							</Grid>

							{numberOfUnits !== 'Multi' && totalArea && (
								<Grid sx={styles.additionalInfo}>
									<FloorPlan />
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
							<Chip
								sx={styles.additionalChipText}
								label={buildingType}
								variant='propertyType'
							/>
						</Grid>
					</Grid>

					<Box sx={styles.stackedImagesContainer}>
						<Skeleton width='120px' height='167px' />;
					</Box>
				</Grid>
			</Card>
		</>
	);
};

export default UnitCardSkeleton;
