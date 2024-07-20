import { Box, Chip, Grid, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import bungalow from '../../assets/images/Bungalow.svg';
import handCoins from '../../assets/images/HandCoins.svg';
import floorplan from '../../assets/images/Floorplan.svg';
import { styles } from './style';
import { Stackedimages } from '../StackedImages/Stackedimages';
import { FC } from 'react';

type UnitCardPropType = {
	propertyImage: string;
	propertyName: string;
	propertyAddress: string;
	propertyId: string;
	numberOfUnits: string;
	rent: string;
	totalArea: string;
	buildingType: string;
	additionalImages: string[];
};

export const UnitCard: FC<UnitCardPropType> = ({
	propertyImage,
	propertyName,
	propertyAddress,
	propertyId,
	numberOfUnits,
	rent,
	totalArea,
	buildingType,
	additionalImages,
}) => {
	return (
		<>
			<Grid sx={styles.mainCardContainerStyle}>
				<Grid sx={styles.mainCardStyle}>
					<img
						src={propertyImage}
						style={styles.mainPictureStyle}
						alt='property picture'
					/>

					<Grid sx={styles.propertyDetailsStyle}>
						<Grid sx={styles.propertyHeaderStyle}>
							<Typography sx={styles.propertyHeaderText} variant='h2'>
								{propertyName}
								<Typography sx={styles.reducedTextStyle}>
									<LocationOnOutlinedIcon />
									{propertyAddress}
								</Typography>
							</Typography>

							<Grid sx={styles.propertyIdStyle}>
								<Typography variant='h6'>Property ID:</Typography>
								<Typography>{propertyId}</Typography>
							</Grid>
						</Grid>

						<Grid sx={styles.additionalInfoContainer}>
							<Grid sx={styles.additionalInfo}>
								<img
									src={bungalow}
									alt='bungalow icon'
									style={styles.additionalInfoPicture}
								/>
								<Grid sx={styles.additionalInfoText}>
									<Typography>Number of Units</Typography>

									<Typography variant='h6'>{numberOfUnits}</Typography>
								</Grid>
							</Grid>

							<Grid sx={styles.additionalInfo}>
								<img
									src={handCoins}
									alt='bungalow icon'
									style={styles.additionalInfoPicture}
								/>
								<Grid sx={styles.additionalInfoText}>
									<Typography>Rent</Typography>

									<Typography variant='h6'>{rent}</Typography>
								</Grid>
							</Grid>

							<Grid sx={styles.additionalInfo}>
								<img
									src={floorplan}
									alt='bungalow icon'
									style={styles.additionalInfoPicture}
								/>
								<Grid sx={styles.additionalInfoText}>
									<Typography>Total Area</Typography>

									<Typography variant='h6'>{totalArea}</Typography>
								</Grid>
							</Grid>
						</Grid>

						<Grid sx={styles.additionalChipStyle}>
							<Chip sx={styles.additionalChipText} label={buildingType} />
						</Grid>
					</Grid>

					<Box sx={styles.stackedImagesContainer}>
						{additionalImages.map((property, index) => {
							return (
								<Stackedimages
									key={`${index}-${property}`}
									image={property}
									topOffset={8 * index}
									leftOffset={7 * index}
									zIndex={additionalImages?.length - index}
								/>
							);
						})}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};