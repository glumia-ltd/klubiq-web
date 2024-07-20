import {
	Box,
	Breadcrumbs,
	Button,
	Chip,
	Grid,
	SvgIcon,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ViewPort from '../../components/Viewport/ViewPort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import propertyImage from '../../assets/images/propertyImage.png';
import bungalow from '../../assets/images/Bungalow.svg';
import handCoins from '../../assets/images/HandCoins.svg';
import floorplan from '../../assets/images/Floorplan.svg';
import { Stackedimages } from '../../components/StackedImages/Stackedimages';
import { styles } from './style';
import { useState } from 'react';

const PropertyPage = () => {
	const [tabValue, setTabValue] = useState<number>(0);

	const handleTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setTabValue(newValue);
	};
	return (
		<ViewPort>
			<Grid sx={styles.container}>
				<Grid>
					<Breadcrumbs
						separator={
							<ArrowForwardIosIcon
								sx={{
									...styles.iconStyle,
									...styles.arrowIconStyle,
								}}
							/>
						}
						aria-label='breadcrumb'
						sx={styles.breadCrumbStyle}
					>
						<SvgIcon
							sx={styles.iconStyle}
							component={HomeIcon}
							inheritViewBox
						/>
						<Typography fontWeight={700} sx={styles.textStyle}>
							{' '}
							Landmark Estate{' '}
						</Typography>
					</Breadcrumbs>
				</Grid>

				<Grid sx={styles.actionButtonContainerStyle}>
					<Button sx={styles.actionButtonStyle}>
						<Typography fontWeight={500}>Action</Typography>
						<MoreVertIcon />
					</Button>
				</Grid>

				<Chip sx={styles.chipStyle} label={'For Rent'} />

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
									Landmark Estate
									<Typography sx={styles.reducedTextStyle}>
										<LocationOnOutlinedIcon />
										Engineering Close,off Idowu Street, Victoria Island
									</Typography>
								</Typography>

								<Grid sx={styles.propertyIdStyle}>
									<Typography variant='h6'>Property ID:</Typography>
									<Typography>123456</Typography>
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

										<Typography variant='h6'>Single</Typography>
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

										<Typography variant='h6'>₦0.0</Typography>
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

										<Typography variant='h6'>350 sqm</Typography>
									</Grid>
								</Grid>
							</Grid>

							<Grid sx={styles.additionalChipStyle}>
								<Chip sx={styles.additionalChipText} label={'Duplex'} />
							</Grid>
						</Grid>

						<Box sx={styles.stackedImagesContainer}>
							{[propertyImage, propertyImage, propertyImage, propertyImage].map(
								(property, index) => {
									return (
										<Stackedimages
											key={`${index}-${property}`}
											image={property}
											topOffset={8 * index}
											leftOffset={7 * index}
											zIndex={4 - index}
										/>
									);
								},
							)}
						</Box>
					</Grid>

					<Grid sx={styles.tabStyle}>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							aria-label='navigation tabs'
						>
							<Tab label='Overview' />
							<Tab label='lease' />
							<Tab label='Maintenance' />
							<Tab label='Document' />
						</Tabs>
					</Grid>
				</Grid>
			</Grid>
		</ViewPort>
	);
};

export default PropertyPage;
