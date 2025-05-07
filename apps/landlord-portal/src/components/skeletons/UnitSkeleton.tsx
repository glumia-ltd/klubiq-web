import { Grid, Breadcrumbs, Button, Chip, Skeleton } from '@mui/material';
// import { Container } from '@mui/system';
import { styles } from '../PropertyUnitComponent/style';
// import { HomeIcon } from '../Icons/HomeIcon';
import { Overview } from '../Overview/Overview';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC, useState } from 'react';
import UnitCardSkeleton from '../UnitCard/UnitCardSkeleton';
import InfoCardSkeleton from '../UnitInfoComponent/InfoCardSkeleton';
import FieldCardSkeleton from '../AddFieldsComponent/FieldCardSkeleton';
import TableSkeleton from '../TenantAndLeaseTable/TableSkeleton';
import {
	HouseIcon,
	TenantIcon,
	VacantHomeIcon,
	HomeIcon,
} from '../Icons/CustomIcons';
import { MaintenanceTableComponent } from '../MaintenaceTableComponent/MaintenanceTableComponent';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';
import { useNavigate } from 'react-router-dom';
import { PropertyDataType } from '../../shared/type';

type UnitComponentType = {
	currentProperty?: PropertyDataType;
	tenantTableBodyRows?: any;
	tenantColumns?: any;
	leaseTableBodyRows?: any;
};

const allTabs = ['Overview', 'Lease', 'Document'];

export const UnitSkeleton: FC<UnitComponentType> = ({
	currentProperty,
	tenantTableBodyRows,
	leaseTableBodyRows,
}) => {
	const navigate = useNavigate();
	const [tabValue, setTabValue] = useState<number>(0);

	const propertyType = currentProperty?.isMultiUnit ? 'Multi' : 'Single';

	const handleHomeClick = () => {
		navigate(-1);
	};

	const unitInfoData = [
		{
			label: 'UNIT',
			imgSrc: HouseIcon,
		},
		{
			label: 'VACANT UNIT',
			imgSrc: VacantHomeIcon,
		},
		{
			label: 'TENANT',
			imgSrc: TenantIcon,
		},
	];

	const handleTabChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		setTabValue(newValue);
	};

	return (
		// <Container maxWidth={'xl'} sx={styles.container}>
		<>
			<Grid>
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
						<HomeIcon sx={styles.iconStyle} onClick={handleHomeClick} />

						<Skeleton variant='rectangular' width='90px' height='10px' />
					</Breadcrumbs>
				</Grid>
				<Grid sx={styles.actionButtonContainerStyle}>
					<Button variant='propertyButton' sx={styles.actionButtonStyle}>
						<Skeleton variant='rectangular' width='30px' height='10px' />
						<MoreVertIcon />
					</Button>
				</Grid>
				{currentProperty?.purpose ? (
						<Chip
						label={currentProperty?.purpose?.displayText || 'For sale'}
						variant={
							currentProperty?.purpose?.name?.toLowerCase() === 'rent'
								? 'rent'
								: 'sale'
						}
					/>) : (<Skeleton width='50px' height='20px' />) }

				<Grid sx={styles.firstCardContainer}>
					<UnitCardSkeleton
						numberOfUnits={currentProperty?.isMultiUnit ? 'Multi' : 'Single'}
					/>

					{/* Render conditionally based on property type */}

					{propertyType === 'Single' && (
						<TabsComponent
							handleTabChange={handleTabChange}
							tabValue={tabValue}
							allTabs={allTabs}
						/>
					)}
				</Grid>

				{/* SINGLE UNIT OVERVIEW AND LEASE CONTENTS */}
				{propertyType === 'Single' && (tabValue === 0 || tabValue === 1) && (
					<Grid>
						<Grid sx={styles.unitInfoCardStyle}>
							<InfoCardSkeleton data={unitInfoData} />
						</Grid>

						<Overview initialText={currentProperty?.description} />

						{/* Single unit table and add cards */}

						{
							<Grid sx={styles.addfieldStyle}>
								{tabValue !== 1 && (
									<>
										{tenantTableBodyRows?.length > 0 && (
											<TableSkeleton tableBodyRows={tenantTableBodyRows} />
										)}

										{!tenantTableBodyRows?.length && <FieldCardSkeleton />}
									</>
								)}

								{!leaseTableBodyRows?.length && <FieldCardSkeleton />}
							</Grid>
						}
					</Grid>
				)}

				{/* Multi unit */}

				{propertyType === 'Multi' && (
					<Grid>
						<Grid sx={styles.unitInfoCardStyle}>
							<InfoCardSkeleton data={unitInfoData} />
						</Grid>

						<Overview initialText={currentProperty?.description} />

						<Grid sx={styles.addfieldStyle}>
							{currentProperty?.units && currentProperty?.units?.length > 0 && (
								<TableSkeleton tableBodyRows={currentProperty?.units} />
							)}
							{currentProperty?.units &&
							currentProperty?.units?.length > 0 ? null : (
								<FieldCardSkeleton />
							)}
						</Grid>
					</Grid>
				)}

				{/* MAINTENANCE TAB */}

				{tabValue === 2 && <MaintenanceTableComponent maintenanceData={[]} />}

				{/* DOCUMENT TAB */}

				{tabValue === 3 && <DocumentTableComponent documentTableData={[]} />}
			</Grid>
		</>
		// </Container>
	);
};
