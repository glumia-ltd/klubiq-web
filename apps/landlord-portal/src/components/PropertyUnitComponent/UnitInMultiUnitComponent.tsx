import { Grid, Breadcrumbs, Typography, Button, Chip } from '@mui/material';
// import { Container } from '@mui/system';
import AddFieldCard from '../AddFieldsComponent/AddFieldCard';
import { styles } from './style';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import { TenantAndLeaseTable } from '../TenantAndLeaseTable/TenantAndLeaseTable';
import { UnitCard } from '../UnitCard/UnitCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC, useState } from 'react';
import { HomeIcon } from '../Icons/CustomIcons';
import propertyImage from '../../assets/images/propertyImage.png';
// import { MaintenanceTableComponent } from '../MaintenaceTableComponent/MaintenanceTableComponent';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { PropertyDataType } from '../../shared/type';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { getLocaleFormat } from '../../helpers/utils';

type PropertyUnitComponentType = {
	handleNavigation?: (path?: string) => void;
	currentProperty: PropertyDataType;
	tenantTableBodyRows?: any;
};

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];

const leaseColumns = [
	{ id: '1', label: 'Tenant' },
	{ id: '2', label: 'Status' },
	{ id: '3', label: 'Rent Amount' },
	{ id: '4', label: 'Start Date' },
	{ id: '5', label: 'End Date' },
];
const allTabs = ['Overview', 'Lease', 'Document'];

export const UnitInMultiUnitComponent: FC<PropertyUnitComponentType> = ({
	currentProperty,
	tenantTableBodyRows,
	handleNavigation,
}) => {
	const navigate = useNavigate();
	const [tabValue, setTabValue] = useState<number>(0);

	const location = useLocation();

	const currentUnitId = location.pathname.split('/').at(-1);
	const { orgSettings } = useSelector(getAuthState);
	const currentUnitInformation = currentProperty?.units?.find(
		(unit) => unit.id === currentUnitId,
	);

	const leaseTableBodyRows = currentUnitInformation?.lease ? [currentUnitInformation.lease] : [];

	const handleHomeClick = (position: number) => {
		navigate(position);
	};
	const handleAddLease = () => {
		navigate(`/leases/add-lease?property=${currentProperty?.uuid}&unit=${currentUnitId}`);
	};
	const handleAddTenant = () => {
		navigate(`/tenants/invite-tenant`, {
			state: {
				mode: 'onboarding',
				propertyDetails: {
					propertyName: currentProperty?.name,
					unitId: currentUnitId,
					unitNumber: currentUnitInformation?.unitNumber,
				},
				returnPath: `/properties/${currentProperty?.uuid}/units/${currentUnitId}`,
			},
		});
	};

	const propertyAddress = `${currentProperty?.address?.addressLine1} ${currentProperty?.address?.addressLine2 || ''}, ${currentProperty?.address?.city}, ${currentProperty?.address?.state}`;

	const mainImage =
		currentProperty?.images && currentProperty?.images.length > 1
			? currentProperty?.images?.find((image) => image.isMain)
			: currentProperty?.images && currentProperty?.images[0];

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
						<HomeIcon
							sx={styles.iconStyle}
							onClick={() => handleHomeClick(-2)}
						/>

						<Typography
							sx={styles.textStyle}
							onClick={() => handleHomeClick(-1)}
						>
							{currentProperty?.name}
						</Typography>

						<Typography fontWeight={700} sx={styles.textStyle}>
							{currentUnitInformation?.unitNumber}
						</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid sx={styles.actionButtonContainerStyle}>
					<Button variant='propertyButton' sx={styles.actionButtonStyle}>
						<Typography fontWeight={500}>Action</Typography>
						<MoreVertIcon />
					</Button>
				</Grid>
				{currentProperty?.purpose && (
					<Chip
						label={currentProperty?.purpose?.displayText || 'For sale'}
						variant={
							currentProperty?.purpose?.name?.toLowerCase() === 'rent'
								? 'rent'
								: 'sale'
						}
					/>
				)}
				<Grid sx={styles.firstCardContainer}>
					<UnitCard
						propertyImage={mainImage?.url}
						propertyName={currentProperty?.name || ''}
						propertyAddress={propertyAddress}
						propertyId={currentProperty?.id}
						numberOfUnits={currentProperty?.isMultiUnit ? 'Multi' : 'Single'}
						rent={`${getLocaleFormat(orgSettings, +(currentUnitInformation?.rentAmount ?? 0), 'currency')}`}
						buildingType={currentProperty?.type?.name}
						additionalImages={stackedImages}
					/>

					{
						<TabsComponent
							handleTabChange={handleTabChange}
							tabValue={tabValue}
							allTabs={allTabs}
						/>
					}
				</Grid>

				{(tabValue === 0 || tabValue === 1) && (
					<Grid>
						{
							<Grid sx={styles.addfieldStyle}>
								{tabValue !== 1 && (
									<>
										{tenantTableBodyRows?.length > 0 && (
											<TenantAndLeaseTable
												title='Tenant'
												buttonText='Add Tenant'
												handleAdd={handleNavigation}
												columns={leaseColumns}
												tableBodyRows={tenantTableBodyRows}
											/>
										)}

										{!tenantTableBodyRows?.length && (
											<AddFieldCard
												heading={'Add Tenant'}
												subtext={'Add tenants to your property'}
												description={'Add Tenant'}
												handleAdd={handleAddTenant}
											/>
										)}
									</>
								)}

								{!leaseTableBodyRows?.length && (
									<AddFieldCard
										heading={'Add Lease'}
										subtext={'Add lease to your property'}
										description={'Add Lease'}
										handleAdd={handleAddLease}
									/>
								)}

								{tabValue === 1 && leaseTableBodyRows?.length > 0 && (
									<TenantAndLeaseTable
										title='Lease'
										buttonText='Add Lease'
										handleAdd={handleAddLease}
										columns={leaseColumns}
										tableBodyRows={leaseTableBodyRows}
									/>
								)}
							</Grid>
						}
					</Grid>
				)}

				{/* {tabValue === 2 && <MaintenanceTableComponent maintenanceData={[]} />} */}

				{tabValue === 2 && <DocumentTableComponent documentTableData={[]} />}
			</Grid>
		</>
		// </Container>
	);
};
