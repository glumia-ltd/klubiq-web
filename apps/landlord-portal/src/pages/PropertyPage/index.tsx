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
import UnitInfoCard from '../../components/UnitInfoComponent/UnitInfoCard';
import AddFieldCard from '../../components/AddFieldsComponent/AddFieldCard';
import { UnitCard } from '../../components/UnitCard/UnitCard';
import { TabsComponent } from '../../components/TabsComponent/TabsComponent';
import { Overview } from '../../components/Overview/Overview';
import propertyImage from '../../assets/images/propertyImage.png';
import HouseIcon from '../../assets/images/home.svg';
import IconTwo from '../../assets/images/home2.svg';
import IconThree from '../../assets/images/people.svg';
import IconFour from '../../assets/images/lasthouse.svg';
import { styles } from './style';
import { useState } from 'react';

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];
const allTabs = ['Overview', 'Lease', 'Maintenance', 'Document'];

const initialText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat laboris nisi ut aliquip exea commodo comm Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat laboris nisi ut aliquip ex ea commodo commodo`;

const data = [
	{
		label: 'UNIT',
		value: 1,
		imgSrc: HouseIcon,
	},
	{
		label: 'VACANT UNIT',
		value: 1,
		valueColor: 'green',
		imgSrc: IconTwo,
	},
	{
		label: 'TENANT',
		value: 0,
		imgSrc: IconThree,
	},
	{
		label: 'MAINTENANCE REQUEST',
		value: 0,
		valueColor: 'red',
		imgSrc: IconFour,
	},
];

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

				<Grid sx={styles.firstCardContainer}>
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

				{/* OVERVIEW CONTENT */}
				<Grid>
					<Grid sx={styles.unitInfoCardStyle}>
						<UnitInfoCard data={data} />
					</Grid>

					<Overview initialText={initialText} />

					<Grid sx={styles.addfieldStyle}>
						<AddFieldCard
							heading={'Add Tenant'}
							subtext={'Add tenants to your property'}
							description={'Add Tenant'}
						/>
						<AddFieldCard
							heading={'Add Lease'}
							subtext={'Add lease to your property'}
							description={'Add Lease'}
						/>
					</Grid>
				</Grid>
			</Grid>
		</ViewPort>
	);
};

export default PropertyPage;
