import {
	Box,
	Card,
	Chip,
	Typography,
	Stack,
	CardContent,
	CardMedia,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Bungalow, HandCoins, FloorPlan } from '../Icons/CustomIcons';
import { styles } from './style';
import { Stackedimages } from '../StackedImages/Stackedimages';
import { FC, useState } from 'react';
import { MEASUREMENTS } from '../../helpers/utils';
import { find } from 'lodash';
import defaultPropertyImage from '../../assets/images/defaultPropertyImage.png';
import { DynamicCarousel, DynamicModal, DynamicModalProps } from '@klubiq/ui-components';
import { UnitImageType } from '../../shared/type';

type UnitCardPropType = {
	propertyImage?: string;
	propertyName: string;
	propertyAddress: string;
	propertyId?: string | number;
	numberOfUnits: string;
	rent: string;
	totalArea?: string;
	buildingType?: string;
	additionalImages: UnitImageType[];
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
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [openCarousel, setOpenCarousel] = useState(false);
	const handleOpenCarousel = () => {
		setOpenCarousel(true);
	};
	const carouselModalConfig = (): DynamicModalProps => {
		return {
			open: openCarousel,
			onClose: () => setOpenCarousel(false),
			headerAlign: 'center',
			contentAlign: 'center',
			contentDirection: 'column',
			borderRadius: 2,
			maxWidth: 'xs',
			fullScreenOnMobile: true,
			sx: {
				height: 'auto',
				width: 'auto',
				backgroundColor: '#fff',
		
			},
			children:<Box sx={{
				width: 'auto',
				height: 'auto',
				padding: 1,
			}}>
				 <DynamicCarousel images={additionalImages.map((image, index) => 
				({ src: image.url, alt: image.fileName || `${propertyName}-image-${index}`, caption: image.fileName || `${propertyName} - ${propertyAddress}` }))} 
				variant='dots'
				showThumbnails={true}
				autoPlay={isMobile}
				interval={isMobile ? 5000 : 0}
				sx={{
					paddingBottom: 1,
				}}
				/>
			</Box>
		} as DynamicModalProps;
	};
	const hasOnlyMainImage = additionalImages.length === 1 && additionalImages?.[0]?.isMain;
	return (
		<>
			<Card sx={styles.mainCardContainerStyle}>
				<Stack direction={'row'} sx={styles.stacks.main}>
					<CardContent sx={styles.cardContents.mainImage}>
						<CardMedia
							component={'img'}
							sx={{...styles.mainPictureStyle, cursor: hasOnlyMainImage ? 'pointer' : 'default'}}
							alt='property picture'
							image={propertyImage || additionalImages.find((img) => img.isMain)?.url || defaultPropertyImage}
							onClick={hasOnlyMainImage ? () => handleOpenCarousel() : undefined}
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
													{totalArea.split(' ')[0] || 0}{' '}
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
								{additionalImages.map((img, index) => {
									if(hasOnlyMainImage){
										return null;
									}
									return (
										<Stackedimages
											key={`${index}-${img.url}`}
											image={img.url}
											topOffset={8 * index}
											leftOffset={7 * index}
											zIndex={additionalImages?.length - index}
											onClick={() => handleOpenCarousel()}
										/>
									);
									
								})}
							</Box>	
						</CardContent>}
					</Stack>
				</Stack>
			</Card>
			<DynamicModal {...carouselModalConfig()} />
		</>
	);
};
