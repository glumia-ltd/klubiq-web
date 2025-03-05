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
// import { MaintenanceTableComponent } from '../MaintenaceTableComponent/MaintenanceTableComponent';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { PropertyDataType } from '../../shared/type';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getLocaleFormat } from '../../helpers/utils';
import {
	useArchivePropertyMutation,
	useDeletePropertyMutation,
} from '../../store/PropertyPageStore/propertyApiSlice';
import { PropertiesActionsPrompts } from '../Dialogs/PropertiesActionsPrompts';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';

type PropertyUnitComponentType = {
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

const allTabs = ['Overview', 'Lease', 'Document'];

export const PropertyUnitComponent: FC<PropertyUnitComponentType> = ({
	currentProperty,
	tenantTableBodyRows,
	tenantColumns,
	leaseTableBodyRows,
}) => {
	const location = useLocation();
	const dispatch = useDispatch();

	const currentUUId = location.pathname.split('/')[2]!;

	const navigate = useNavigate();
	const [tabValue, setTabValue] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(false);
	const [openArchivePropertyDialog, setOpenArchivePropertyDialog] =
		useState<boolean>(false);
	const [openDeletePropertyDialog, setOpenDeletePropertyDialog] =
		useState<boolean>(false);
	const [progress, setProgress] = useState<boolean>(false);

	const [archiveProperty] = useArchivePropertyMutation();
	const [deleteProperty] = useDeletePropertyMutation();

	const { user } = useSelector(getAuthState);

	const propertyType = currentProperty?.isMultiUnit ? 'Multi' : 'Single';

	const propertyAddress = `${currentProperty?.address?.addressLine1} ${currentProperty?.address?.addressLine2 || ''}, ${currentProperty?.address?.city}, ${currentProperty?.address?.state}`;

	const anchorRef = useRef<HTMLButtonElement>(null);

	const handleHomeClick = () => {
		navigate(-1);
	};

	const handleArchiveProperty = () => {
		setOpenArchivePropertyDialog(true);
	};

	const handleDeleteProperty = () => {
		setOpenDeletePropertyDialog(true);
	};

	const handleEditProperty = () => {
		navigate(`/properties/${currentUUId}/edit`);
	};

	const handleAddLease = () => {
		navigate(`/lease/add-lease?property=${currentUUId}`);
	};

	const handleAddTenant = () => {
		navigate(`/properties/${currentUUId}/tenant`);
	};

	const handleAddUnit = () => {
		navigate(`/properties/${currentUUId}/unit`);
	};

	const handleArchivePropertyRequest = async () => {
		if (currentUUId) {
			try {
				setProgress(true);
				await archiveProperty({ uuid: currentUUId }).unwrap();
				setOpenArchivePropertyDialog(false);
				setOpen(false);
				setProgress(false);
				dispatch(
					openSnackbar({
						message: 'You have successfully archived this property!',
						severity: 'success',
						isOpen: true,
					}),
				);
				navigate('/properties');
			} catch (e) {
				console.log(e);
			}
		} else {
			setOpenArchivePropertyDialog(false);
		}
	};

	const handleDeletePropertyRequest = async () => {
		if (currentUUId) {
			try {
				setProgress(true);
				await deleteProperty({
					uuid: currentUUId,
					address: propertyAddress,
					name: currentProperty?.name,
					unitCount: currentProperty?.unitCount,
				}).unwrap();
				setOpenDeletePropertyDialog(false);
				setOpen(false);
				setProgress(false);
				dispatch(
					openSnackbar({
						message: 'You have successfully deleted this property!',
						severity: 'success',
						isOpen: true,
					}),
				);
				navigate('/properties');
			} catch (e) {
				console.log(e);
				setProgress(false);
				setOpen(false);
				setOpenDeletePropertyDialog(false);
				dispatch(
					openSnackbar({
						message: 'Error deleting this property',
						severity: 'error',
						isOpen: true,
					}),
				);
			}
		} else {
			setOpenDeletePropertyDialog(false);
		}
	};

	const handleArchiveDialogButtonAction = (event: any) => {
		if (event === 'Cancel') {
			setOpenArchivePropertyDialog(false);
		} else {
			handleArchivePropertyRequest();
		}
	};

	const handleDeleteeDialogButtonAction = (event: any) => {
		if (event === 'Cancel') {
			setOpenDeletePropertyDialog(false);
		} else {
			handleDeletePropertyRequest();
		}
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
												onClick={handleArchiveProperty}
												value='Archive'
												sx={{ padding: '10px' }}
												divider
											>
												Archive Property
											</MenuItem>

											<MenuItem
												onClick={handleEditProperty}
												value='Edit'
												sx={{ padding: '10px' }}
												divider
											>
												Edit Property
											</MenuItem>

											<MenuItem
												onClick={handleDeleteProperty}
												value='Delete'
												sx={{ padding: '10px' }}
											>
												Delete Property{' '}
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
						numberOfUnits={
							currentProperty?.isMultiUnit
								? `${currentProperty.unitCount}`
								: 'Single'
						}
						rent={`${getLocaleFormat(user, +currentProperty?.totalRent || 0, 'currency')} `}
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
												handleAdd={handleAddTenant}
												columns={tenantColumns}
												tableBodyRows={tenantTableBodyRows}
											/>
										)}

										{!tenantTableBodyRows?.length &&
											leaseTableBodyRows?.length && (
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
									handleAdd={handleAddUnit}
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
									handleAdd={handleAddUnit}
								/>
							)}
						</Grid>
					</Grid>
				)}

				{/* MAINTENANCE TAB */}

				{/* {tabValue === 2 && <MaintenanceTableComponent maintenanceData={[]} />} */}

				{/* DOCUMENT TAB */}

				{tabValue === 2 && <DocumentTableComponent documentTableData={[]} />}
			</Grid>
			<PropertiesActionsPrompts
				open={openArchivePropertyDialog}
				progress={progress}
				title={`${progress ? 'Archive in progress' : 'Attention!'}`}
				content='Are you sure you want to archive this property?'
				rightButtonContent='Archive Property'
				handleDialogButtonAction={(e) =>
					handleArchiveDialogButtonAction(e.target.value)
				}
			/>
			<PropertiesActionsPrompts
				open={openDeletePropertyDialog}
				progress={progress}
				title={`${progress ? 'Deleting this property' : 'Delete Property'}`}
				content='Are you sure you want to delete this property? Unit, all leases, and related transactions will be deleted!'
				rightButtonContent='Delete Property'
				handleDialogButtonAction={(e) =>
					handleDeleteeDialogButtonAction(e.target.value)
				}
			/>
		</>
		// </Container>
	);
};
