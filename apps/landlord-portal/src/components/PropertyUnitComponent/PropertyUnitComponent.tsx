import {
	Grid,
	Breadcrumbs,
	Typography,
	Button,
	Chip,
	Paper,
	MenuList,
	MenuItem,
	ClickAwayListener,
	Grow,
	Popper,
} from '@mui/material';
// import { Container } from '@mui/system';
import AddFieldCard from '../AddFieldsComponent/AddFieldCard';
import { styles } from './style';
// import { HomeIcon } from '../Icons/HomeIcon';
import { Overview } from '../Overview/Overview';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import { TenantAndLeaseTable } from '../TenantAndLeaseTable/TenantAndLeaseTable';
import { UnitsTable } from '../TenantAndLeaseTable/UnitsTable';
import { UnitCard } from '../UnitCard/UnitCard';
import UnitInfoCard from '../UnitInfoComponent/UnitInfoCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC, useRef, useState } from 'react';
import {
	HouseIcon,
	TenantIcon,
	VacantHomeIcon,
	HomeIcon,
} from '../Icons/CustomIcons';
import propertyImage from '../../assets/images/propertyImage.png';
import { MaintenanceTableComponent } from '../MaintenaceTableComponent/MaintenanceTableComponent';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';
import { useNavigate } from 'react-router-dom';
import { PropertyDataType } from '../../shared/type';

type PropertyUnitComponentType = {
	handleNavigation?: (path?: string) => void;
	currentProperty: PropertyDataType;
	tenantTableBodyRows?: any;
	tenantColumns?: any;
	leaseTableBodyRows?: any;
};

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];

const allTabs = ['Overview', 'Lease', 'Maintenance', 'Document'];

export const PropertyUnitComponent: FC<PropertyUnitComponentType> = ({
	currentProperty,
	tenantTableBodyRows,
	handleNavigation,
	tenantColumns,
	leaseTableBodyRows,
}) => {
	const navigate = useNavigate();
	const [tabValue, setTabValue] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(false);

	const propertyType = currentProperty?.isMultiUnit ? 'Multi' : 'Single';

	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleHomeClick = () => {
		navigate(-1);
	};

	const handleClose = (value?: string) => {
		// if (
		// 	anchorRef.current &&
		// 	anchorRef.current.contains(event.target as HTMLElement)
		// ) {
		// 	return;
		// }

		console.log(value);

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const propertyAddress = `${currentProperty?.address?.addressLine1} ${currentProperty?.address?.addressLine2 || ''}, ${currentProperty?.address?.city}, ${currentProperty?.address?.state}`;

	const mainImage =
		currentProperty?.images && currentProperty?.images.length > 1
			? currentProperty?.images?.find((image) => image.isMain)
			: currentProperty?.images && currentProperty?.images[0];

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

						<Typography fontWeight={700} sx={styles.textStyle}>
							{currentProperty?.name}
						</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid sx={styles.actionButtonContainerStyle}>
					<Button
						ref={anchorRef}
						variant='propertyButton'
						sx={styles.actionButtonStyle}
						onClick={handleToggle}
					>
						<Typography fontWeight={500}>Action</Typography>
						<MoreVertIcon />
					</Button>

					<Popper
						open={open}
						anchorEl={anchorRef.current}
						role={undefined}
						placement='bottom-start'
						transition
						disablePortal
						sx={{ minWidth: '160px', zIndex: 10 }}
					>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin:
										placement === 'bottom-start' ? 'left top' : 'left bottom',
								}}
							>
								<Paper>
									<ClickAwayListener onClickAway={() => setOpen(false)}>
										<MenuList
											id='composition-menu'
											aria-labelledby='composition-button'
											onKeyDown={handleListKeyDown}
										>
											<MenuItem
												onClick={() => handleClose('Edit')}
												value='Edit'
											>
												Edit{' '}
											</MenuItem>
											<MenuItem
												onClick={() => handleClose('Delete')}
												value='Delete'
											>
												Delete{' '}
											</MenuItem>
											<MenuItem
												onClick={() => handleClose('Logout')}
												value='Logout'
											>
												Logout
											</MenuItem>
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>
				</Grid>
				<Chip
					label={currentProperty?.purpose?.displayText || 'For sale'}
					variant={
						currentProperty?.purpose?.name?.toLowerCase() === 'rent'
							? 'rent'
							: 'sale'
					}
				/>
				<Grid sx={styles.firstCardContainer}>
					<UnitCard
						propertyImage={mainImage?.url}
						propertyName={currentProperty?.name || ''}
						propertyAddress={propertyAddress}
						propertyId={currentProperty?.id}
						numberOfUnits={currentProperty?.isMultiUnit ? 'Multi' : 'Single'}
						rent={`₦ ${currentProperty?.totalRent}`}
						totalArea={
							currentProperty?.isMultiUnit
								? ''
								: `${currentProperty?.area?.value} ${currentProperty?.area?.unit}`
						}
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

						{/* Single unit table and add cards */}

						{
							<Grid sx={styles.addfieldStyle}>
								{tabValue !== 1 && (
									<>
										{tenantTableBodyRows?.length > 0 && (
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
							{currentProperty?.units && currentProperty?.units?.length > 0 && (
								<UnitsTable
									title='Units'
									handleAdd={handleNavigation}
									buttonText='Add Unit'
									tableBodyRows={currentProperty?.units}
								/>
							)}
							{currentProperty?.units &&
							currentProperty?.units?.length > 0 ? null : (
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
		</>
		// </Container>
	);
};
