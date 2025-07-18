import {
	Box,
	Card,
	Chip,
	Typography,
	Stack,
	CardContent,
	CardMedia,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Bungalow, HandCoins, FloorPlan } from '../Icons/CustomIcons';
import { styles } from './style';
import { Stackedimages } from '../StackedImages/Stackedimages';
import { FC } from 'react';
import { MEASUREMENTS } from '../../helpers/utils';
import { find } from 'lodash';
import defaultPropertyImage from '../../assets/images/defaultPropertyImage.png';

type UnitCardPropType = {
	propertyImage?: string;
	propertyName: string;
	propertyAddress: string;
	propertyId?: string | number;
	numberOfUnits: string;
	rent: string;
	totalArea?: string;
	buildingType?: string;
	additionalImages: string[];
	variant?: 'property' | 'unit';
	marketValue?: string;
	sellingPrice?: string;
	purpose?: string;
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
	variant = 'property',
	marketValue,
	sellingPrice,
	purpose,
}) => {
	return (
		<>
			<Card sx={styles.mainCardContainerStyle}>
				<Stack direction={'row'} sx={styles.stacks.main}>
					<CardContent sx={styles.cardContents.mainImage}>
						<CardMedia
							component={'img'}
							sx={styles.mainPictureStyle}
							alt='property picture'
							image={propertyImage || defaultPropertyImage}
						></CardMedia>
					</CardContent>
					<Stack direction={'row'} sx={styles.stacks.secondary}>
						<CardContent sx={styles.cardContents.propertyDetail}>
							<Stack
								direction={'column'}
								spacing={4}
								sx={styles.stacks.propertyDetail}
							>
								<Stack
									direction={{ xs: 'column', sm: 'row' }}
									sx={styles.stacks.propertyDetail.dataStack}
									spacing={{ xs: 2, sm: 1 }}
								>
									<Stack direction={'column'} spacing={2}>
										<Typography variant='h4'>
											{propertyName}
										</Typography>
										<Typography sx={styles.reducedTextStyle}>
											<LocationOnOutlinedIcon />
											{propertyAddress}
										</Typography>
									</Stack>
									<Stack direction={'row'} spacing={1}>
										<Typography variant='h6'>{variant === 'property' ? 'Property ID:' : 'Unit:'}</Typography>
										<Typography>{propertyId}</Typography>
									</Stack>
								</Stack>
								<Stack
									direction={{ xs: 'column', sm: 'row' }}
									gap={{ xs: 2, sm: 2 }}
									flexWrap={'wrap'}
									alignItems={{xs: 'flex-start', sm: 'center'}}
									sx={styles.stacks.propertyDetail.dataStack}
								>
									{variant === 'property' && <Stack
										direction={'row'}
										spacing={2}
										sx={{ alignItems: 'center' }}
									>
										<Bungalow />
										<Stack direction={'column'} spacing={2}>
											<Typography>Number of Units</Typography>

											<Typography variant='h6'>{numberOfUnits}</Typography>
										</Stack>
									</Stack>}
									{rent && <Stack
										direction={'row'}
										spacing={2}
										sx={{ alignItems: 'center' }}
									>
										<HandCoins />
										<Stack direction={'column'} spacing={2}>
											<Typography>Rent</Typography>

											<Typography variant='h6'>{rent}</Typography>
										</Stack>
									</Stack>}
									{purpose?.toLowerCase().includes('sale') && sellingPrice && <Stack
										direction={'row'}
										spacing={2}
										sx={{ alignItems: 'center' }}
									>
										<HandCoins />
										<Stack direction={'column'} spacing={2}>
											<Typography>Selling Price</Typography>

											<Typography variant='h6'>{sellingPrice}</Typography>
										</Stack>
									</Stack>}
									{purpose?.toLowerCase().includes('sale') && marketValue && <Stack
										direction={'row'}
										spacing={2}
										sx={{ alignItems: 'center' }}
									>
										<HandCoins />
										<Stack direction={'column'} spacing={2}>
											<Typography>Market Value</Typography>

											<Typography variant='h6'>{marketValue}</Typography>
										</Stack>
									</Stack>}
									{numberOfUnits !== 'Multi' && totalArea && (
										<Stack
											direction={'row'}
											spacing={2}
											sx={{ alignItems: 'center' }}
										>
											<FloorPlan />
											<Stack direction={'column'} spacing={2}>
												<Typography>Total Area</Typography>

												<Typography variant='h6'>
													{totalArea.split(' ')[0]}{' '}
													{
														find(MEASUREMENTS, {
															unit: totalArea.split(' ')[1],
														})?.symbol
													}
												</Typography>
											</Stack>
										</Stack>
									)}
								</Stack>
								<Chip
									sx={styles.additionalChipText}
									label={buildingType}
									variant='propertyType'
								/>
							</Stack>
						</CardContent>
						{additionalImages.length > 0 && <CardContent>
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
						</CardContent>}
					</Stack>
				</Stack>
			</Card>
		</>
	);
};

{
	/* <Card sx={styles.mainCardContainerStyle}>
	<Grid >
		<img
			src={propertyImage || defaultPropertyImage}
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
					<Bungalow />
					<Grid sx={styles.additionalInfoText}>
						<Typography>Number of Units</Typography>

						<Typography variant='h6'>{numberOfUnits}</Typography>
					</Grid>
				</Grid>

				<Grid sx={styles.additionalInfo}>
					<HandCoins />
					<Grid sx={styles.additionalInfoText}>
						<Typography>Rent</Typography>

						<Typography variant='h6'>{rent}</Typography>
					</Grid>
				</Grid>

				{numberOfUnits !== 'Multi' && totalArea && (
					<Grid sx={styles.additionalInfo}>
						<FloorPlan />
						<Grid sx={styles.additionalInfoText}>
							<Typography>Total Area</Typography>

							<Typography variant='h6'>
								{totalArea.split(' ')[0]}{' '}
								{find(MEASUREMENTS, { unit: totalArea.split(' ')[1] })?.symbol}
							</Typography>
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
</Card>; */
}
