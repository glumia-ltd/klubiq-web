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
import editImage from '../../assets/images/edit.svg';
import { styles } from './style';
import { useEffect, useRef, useState } from 'react';

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];
const allTabs = ['Overview', 'Lease', 'Maintenance', 'Document'];

const PropertyPage = () => {
	const [tabValue, setTabValue] = useState<number>(0);
	const [needsTruncation, setNeedsTruncation] = useState<boolean>(false);
	const [truncateText, setTruncateText] = useState<boolean>(true);

	const overviewContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (overviewContentRef.current) {
			const element = overviewContentRef.current;

			setNeedsTruncation(element.scrollHeight > element.clientHeight);
		}
	}, [truncateText]);

	const handleTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setTabValue(newValue);
	};

	const toggleTextView = () => {
		setTruncateText((prev) => !prev);
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

				<Grid container sx={styles.overviewStyle}>
					<Typography variant='h3'>Overview</Typography>
					<img
						src={editImage}
						alt='edit image '
						style={styles.editImageStyle}
					/>

					<Grid sx={styles.overviewTextContainer}>
						<Typography
							ref={overviewContentRef}
							sx={{
								overflow: 'hidden',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: truncateText ? 2 : 'none',
								textOverflow: 'clip',
								...styles.overviewContent,
							}}
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat laboris nisi ut aliquip ex
							ea commodo comm Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat laboris nisi ut
							aliquip ex ea commodo commodo
						</Typography>

						<Button onClick={toggleTextView} sx={styles.buttonStyle}>
							{truncateText ? 'Read more' : 'Hide Text'}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</ViewPort>
	);
};

export default PropertyPage;
