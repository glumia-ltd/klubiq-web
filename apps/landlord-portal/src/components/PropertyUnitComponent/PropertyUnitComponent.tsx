import {
	Grid,
	Breadcrumbs,
	SvgIcon,
	Typography,
	Button,
	Chip,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import { Container, Box } from '@mui/system';
import AddFieldCard from '../AddFieldsComponent/AddFieldCard';
import { styles } from './style';
import { HomeIcon } from '../Icons/HomeIcon';
import { MaintenanceIcon } from '../Icons/MaintenanceIcon';
import { Overview } from '../Overview/Overview';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import { TenantAndLeaseTable } from '../TenantAndLeaseTable/TenantAndLeaseTable';
import { UnitsTable } from '../TenantAndLeaseTable/UnitsTable';
import { UnitCard } from '../UnitCard/UnitCard';
import UnitInfoCard from '../UnitInfoComponent/UnitInfoCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { FC, useState } from 'react';
import { HouseIcon, TenantIcon, VacantHomeIcon } from '../Icons/CustomIcons';
import propertyImage from '../../assets/images/propertyImage.png';
import addMaintenance from '../../assets/images/addMaintenance.svg';
import { MaintenanceTableComponent } from '../MaintenaceTableComponent/MaintenanceTableComponent';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';

type PropertyUnitComponentType = {
	handleHomeClick?: () => void;
	handleTabChange?: (
		event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => void;
	handleNavigation?: (path?: string) => void;
	handleMaintenanceTabChange?: (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => void;
	currentProperty: any;
	propertyType: 'Single' | 'Multi';
	tenantTableBodyRows?: any;
	tenantColumns?: any;
	leaseTableBodyRows?: any;
	maintenanceTableColumns?: any;
	maintenanceTableBodyRows?: any;
	documentTableColumns?: any;
	documentTableBodyRows?: any;
};

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];

const allTabs = ['Overview', 'Lease', 'Maintenance', 'Document'];
const totalMaintenanceRequests = 3;

export const PropertyUnitComponent: FC<PropertyUnitComponentType> = ({
	handleHomeClick,
	currentProperty,
	tenantTableBodyRows,
	propertyType,
	handleTabChange,
	handleNavigation,
	handleMaintenanceTabChange,
	tenantColumns,
	leaseTableBodyRows,
	maintenanceTableBodyRows,
	maintenanceTableColumns,
	documentTableBodyRows,
	documentTableColumns,
}) => {
	const [tabValue, setTabValue] = useState<number>(0);
	const [maintenanceTabValue, setMaintenanceTabValue] = useState<number>(0);

	const propertyAddress = `${currentProperty?.address?.addressLine1} ${currentProperty?.address?.addressLine2 || ''}, ${currentProperty?.address?.city}, ${currentProperty?.address?.state}`;

	const maintenanceTabs = [
		`Active Request (${totalMaintenanceRequests})`,
		'All Requests',
	];

	const unitInfoData = [
		{
			label: 'UNIT',
			value: currentProperty?.unitCount || 0,
			imgSrc: HouseIcon,
		},
		{
			label: 'VACANT UNIT',
			value: currentProperty?.vacantUnitCount || 0,
			valueColor: 'green',
			imgSrc: VacantHomeIcon,
		},
		{
			label: 'TENANT',
			value: currentProperty?.totalTenants || 0,
			imgSrc: TenantIcon,
		},
	];

	return (
		<Container maxWidth={'xl'} sx={styles.container}>
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
						<SvgIcon
							sx={styles.iconStyle}
							component={HomeIcon}
							inheritViewBox
							onClick={handleHomeClick}
						/>
						<Typography fontWeight={700} sx={styles.textStyle}>
							{currentProperty?.name}
						</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid sx={styles.actionButtonContainerStyle}>
					<Button variant='propertyButton' sx={styles.actionButtonStyle}>
						<Typography fontWeight={500}>Action</Typography>
						<MoreVertIcon />
					</Button>
				</Grid>
				<Chip
					// sx={styles.chipStyle}
					label={currentProperty?.purpose?.displayText || 'For sale'}
					variant={
						currentProperty?.purpose?.name?.toLowerCase() === 'rent'
							? 'rent'
							: 'sale'
					}
				/>
				<Grid sx={styles.firstCardContainer}>
					<UnitCard
						propertyImage={propertyImage}
						propertyName={currentProperty?.name || ''}
						propertyAddress={propertyAddress}
						propertyId={currentProperty?.id}
						numberOfUnits={currentProperty?.isMultiUnit ? 'Multi' : 'Single'}
						rent={`₦ ${currentProperty?.totalRent}`}
						totalArea={`${currentProperty?.area?.value || 'NA'} ${currentProperty?.area?.unit || ''}`}
						buildingType={currentProperty?.type?.name}
						additionalImages={stackedImages}
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
							<UnitInfoCard data={unitInfoData} />
						</Grid>

						<Overview initialText={currentProperty?.description} />

						<h1>TODO: Complete highlights component</h1>

						{/* Single unit table and add cards */}

						{
							<Grid sx={styles.addfieldStyle}>
								{tabValue !== 1 && (
									<>
										{tenantTableBodyRows.length > 0 && (
											<TenantAndLeaseTable
												title='Tenant'
												buttonText='Add Tenant'
												handleAdd={handleNavigation}
												columns={tenantColumns}
												tableBodyRows={tenantTableBodyRows}
											/>
										)}

										{!tenantTableBodyRows?.length && (
											<AddFieldCard
												heading={'Add Tenant'}
												subtext={'Add tenants to your property'}
												description={'Add Tenant'}
												handleAdd={handleNavigation}
											/>
										)}
									</>
								)}

								{!leaseTableBodyRows?.length && (
									<AddFieldCard
										heading={'Add Lease'}
										subtext={'Add lease to your property'}
										description={'Add Lease'}
										handleAdd={handleNavigation}
									/>
								)}
							</Grid>
						}
					</Grid>
				)}

				{/* Multi unit */}

				{propertyType === 'Multi' && (
					<Grid>
						<Grid sx={styles.unitInfoCardStyle}>
							<UnitInfoCard data={unitInfoData} />
						</Grid>

						<Overview initialText={currentProperty?.description} />

						<Grid sx={styles.addfieldStyle}>
							{currentProperty?.units?.length > 0 && (
								<UnitsTable
									title='Units'
									handleAdd={handleNavigation}
									buttonText='Add Unit'
									tableBodyRows={currentProperty?.units}
								/>
							)}
							{currentProperty?.units?.length > 0 ? null : (
								<AddFieldCard
									heading={'Add Unit'}
									subtext={'Add units to this property'}
									description={'Add Unit'}
									handleAdd={handleNavigation}
								/>
							)}
						</Grid>
					</Grid>
				)}

				{/* MAINTENANCE TAB */}

				{tabValue === 2 && <MaintenanceTableComponent maintenanceData={[]} />}

				{/* DOCUMENT TAB */}

				{tabValue === 3 && <DocumentTableComponent documentTableData={[]} />}
			</Grid>
		</Container>
	);
};
