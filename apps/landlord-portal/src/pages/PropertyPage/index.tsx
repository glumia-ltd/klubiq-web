import {
	Breadcrumbs,
	Button,
	Chip,
	Grid,
	SvgIcon,
	Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ViewPort from '../../components/Viewport/ViewPort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UnitCard } from '../../components/UnitCard/UnitCard';
import { TabsComponent } from '../../components/TabsComponent/TabsComponent';
import propertyImage from '../../assets/images/propertyImage.png';
import { styles } from './style';
import { useState } from 'react';

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];
const allTabs = ['Overview', 'Lease', 'Maintenance', 'Document'];

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
							Landmark Estate
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

				<UnitCard
					propertyImage={propertyImage}
					propertyName='Landmark Estate'
					propertyAddress='Engineering Close,off Idowu Street,  Victoria Island'
					propertyId='123456'
					numberOfUnits='Single'
					rent='₦0.0'
					totalArea='350 sqm'
					buildingType='Duplex'
					additionalImages={stackedImages}
				/>

				<TabsComponent
					handleTabChange={handleTabChange}
					tabValue={tabValue}
					allTabs={allTabs}
				/>
			</Grid>
		</ViewPort>
	);
};

export default PropertyPage;
