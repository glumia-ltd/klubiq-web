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
	Stack,
	Link,
} from '@mui/material';
import AddFieldCard from '../AddFieldsComponent/AddFieldCard';
import { styles } from './style';
import { Overview } from '../Overview/Overview';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import { TenantAndLeaseTable } from '../TenantAndLeaseTable/TenantAndLeaseTable';
import { UnitsTable } from '../TenantAndLeaseTable/UnitsTable';
import { UnitCard } from '../UnitCard/UnitCard';
import UnitInfoCard from '../UnitInfoComponent/UnitInfoCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC, useMemo, useRef, useState } from 'react';
import {
	HouseIcon,
	TenantIcon,
	VacantHomeIcon,
	HomeIcon,
} from '../Icons/CustomIcons';
import propertyImage from '../../assets/images/propertyImage.png';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import { getLocaleFormat } from '../../helpers/utils';
import { PropertiesActionsPrompts } from '../Dialogs/PropertiesActionsPrompts';
import { useLazyGetUnitLeasesQuery } from '../../store/LeaseStore/leaseApiSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
	DynamicTable,
	TableColumn,
	DynamicAvatar,
} from '@klubiq/ui-components';
import { PROPERTY_CONSTANTS } from '../../helpers/constanta';
import { PropertyUnitComponentProps } from '../../page-tytpes/properties/detail-page.types';
import { usePropertyActions } from '../../hooks/page-hooks/properties.hooks';
import { PropertyDataType } from '../../shared/type';

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];
interface TenantsTableData {
	tableColumns: TableColumn[];
	rows: Array<{
		id: string;
		tenant: {
			name?: string | null;
			image?: string | null;
		};
		phone?: string | null;
		email?: string | null;
		isPrimaryTenant: boolean;
		moveInDate?: string | null;
		moveOutDate?: string | null;
	}>;
}

export const PropertyUnitComponent: FC<PropertyUnitComponentProps> = ({
	currentProperty,
}) => {
	if (!currentProperty) {
		return null;
	}
	const location = useLocation();

	const currentUUId = location.pathname.split('/')[2]!;

	const navigate = useNavigate();
	const [tabValue, setTabValue] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(false);
	const [leaseTableBodyRows, setLeaseTableBodyRows] = useState<any>([]);
	const [openArchivePropertyDialog, setOpenArchivePropertyDialog] =
		useState<boolean>(false);
	const [openDeletePropertyDialog, setOpenDeletePropertyDialog] =
		useState<boolean>(false);
	const getTenantTableData = (property: PropertyDataType): TenantsTableData => {
		const tableColumns: TableColumn[] = [
			{
				key: 'tenant',
				label: 'Tenant',
				align: 'center',
				render: (rowData: any) => (
					<Stack direction='row' alignItems='center' spacing={2}>
						<DynamicAvatar
							items={[rowData.tenant]}
							size='medium'
							showName={false}
						/>
						<Typography variant='body2'>{rowData.tenant.name}</Typography>
					</Stack>
				),
			},
			{
				key: 'phone',
				label: 'Phone',
				align: 'center',
			},
			{
				key: 'email',
				label: 'Email',
				render: (rowData: any) => (
					<Link
						href={`mailto:${rowData.email}`}
						underline='none'
						variant='body2'
					>
						{rowData.email}
					</Link>
				),
				align: 'center',
			},
			{
				key: 'moveInDate',
				label: 'Move In Date',
				align: 'center',
			},
			{
				key: 'moveOutDate',
				label: 'Move Out Date',
				align: 'center',
			},
			{
				key: 'isPrimaryTenant',
				label: 'Primary Tenant',
				render: (rowData: any) => (
					<Stack direction='row' alignItems='center' spacing={1}>
						{rowData.isPrimaryTenant && (
							// sourcery skip: dont-self-assign-variables
							<CheckCircleIcon color='success' />
						)}
						<Typography variant='body2'>
							{rowData.isPrimaryTenant ? 'Yes' : 'No'}
						</Typography>
					</Stack>
				),
				align: 'center',
			},
		];
		const rows =
			property?.units?.[0]?.tenants?.map((tenant) => ({
				id: tenant.id,
				tenant: {
					name: `${tenant.profile.firstName} ${tenant.profile.lastName}`,
					image: tenant.profile?.profilePicUrl ?? null,
				},
				phone: tenant.profile?.phoneNumber ?? null,
				email: tenant.profile?.email ?? null,
				isPrimaryTenant: tenant.isPrimaryTenant,
				moveInDate: property?.units?.[0]?.lease?.startDate ?? null,
				moveOutDate: property?.units?.[0]?.lease?.endDate ?? null,
			})) ?? [];
		return { tableColumns, rows };
	};
	const propertyAddress = useMemo(() => {
		const { addressLine1, addressLine2, city, state } =
			currentProperty?.address || {};
		return `${addressLine1} ${addressLine2 || ''}, ${city}, ${state}`;
	}, [currentProperty?.address]);
	const tenantTableData = useMemo(
		() => getTenantTableData(currentProperty),
		[currentProperty],
	);

	const { orgSettings } = useSelector(getAuthState);
	const {
		progress,
		handleArchivePropertyRequest,
		handleDeletePropertyRequest,
		tableSx,
		tableStyles,
	} = usePropertyActions(
		currentUUId,
		currentProperty,
		propertyAddress,
		setOpenDeletePropertyDialog,
		setOpenArchivePropertyDialog,
		setOpen,
	);

	const propertyType = currentProperty?.isMultiUnit ? 'Multi' : 'Single';
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [getUnitLeases, { isLoading: isLoadingUnitLeases }] =
		useLazyGetUnitLeasesQuery();
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
		navigate(`/leases/add-lease?property=${currentUUId}`);
	};

	const handleAddTenant = () => {
		navigate(`/tenants/invite-tenant`, {
			state: {
				mode: 'onboarding',
				propertyDetails: {
					propertyName: currentProperty?.name,
					unitId: currentProperty?.units?.[0]?.id,
					unitNumber: currentProperty?.units?.[0]?.unitNumber,
				},
				returnPath: `/properties/${currentUUId}`,
			},
		});
	};

	const handleAddUnit = () => {
		navigate(`/properties/${currentUUId}/unit`);
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
		if (
			newValue === 1 &&
			currentProperty?.units?.[0]?.id != null &&
			!isLoadingUnitLeases &&
			!currentProperty?.isMultiUnit
		) {
			getUnitLeases({ id: currentProperty.units[0].id })
				.unwrap()
				.then((res) => {
					setLeaseTableBodyRows(res);
				});
		}
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
						rent={`${getLocaleFormat(orgSettings, +currentProperty?.totalRent || 0, 'currency')} `}
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
							allTabs={PROPERTY_CONSTANTS.tabs}
						/>
					)}
				</Grid>

				{/* SINGLE UNIT OVERVIEW AND LEASE CONTENTS */}
				{propertyType === 'Single' && (tabValue === 0 || tabValue === 1) && (
					<Grid>
						<Grid sx={styles.unitInfoCardStyle}>
							<UnitInfoCard data={unitInfoData} />
						</Grid>

						{tabValue === 0 && (
							<>
								<Overview initialText={currentProperty?.description} />
								<Grid sx={styles.addfieldStyle}>
									{currentProperty?.units?.[0]?.tenants &&
									currentProperty?.units?.[0]?.tenants?.length > 0 ? (
										
										<DynamicTable
												colors={tableSx}
												styles={tableStyles}
												header='Tenant'
												buttonLabel='Add Tenant'
												columns={tenantTableData.tableColumns}
												rows={tenantTableData.rows || []}
												onButtonClick={handleAddTenant}
												onRowClick={(rowData: any) => {
													alert(`We will link this to tenant page later.clicked: ${JSON.stringify(rowData)}`);
												}}
											/>
									) : (
										<>
											{currentProperty?.units?.[0]?.lease ? (
												<AddFieldCard
													heading={'Add Tenant'}
													subtext={'Add tenant to your property'}
													description={'Add Tennt'}
													handleAdd={handleAddTenant}
												/>
											) : (
												<AddFieldCard
													heading={'Invite Tenant'}
													subtext={'Invite tenant to your property'}
													description={'Invite Tennt'}
													handleAdd={handleAddTenant}
												/>
											)}
										</>
									)}
									{!currentProperty?.units?.[0]?.lease && (
										<AddFieldCard
											heading={'Add Lease'}
											subtext={'Create a lease for your property'}
											description={'Add Lease'}
											handleAdd={handleAddLease}
										/>
									)}
								</Grid>
							</>
						)}

						{tabValue === 1 && (
							<Grid sx={styles.addfieldStyle}>
								<>
									{leaseTableBodyRows && leaseTableBodyRows.length > 0 && (
										<TenantAndLeaseTable
											title='Lease'
											buttonText='Add Tenant'
											handleAdd={handleAddTenant}
											columns={PROPERTY_CONSTANTS.leaseTableColumns}
											tableBodyRows={leaseTableBodyRows}
										/>
									)}
								</>
							</Grid>
						)}
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
							{/* {currentProperty?.units &&
							currentProperty?.units?.length > 0 ? null : (
								<AddFieldCard
									heading={'Add Unit'}
									subtext={'Add units to this property'}
									description={'Add Unit'}
									handleAdd={handleAddUnit}
								/>
							)} */}
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
