import {
	Grid,
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
	Box,
	TextField,
	Backdrop,
	CircularProgress,
} from '@mui/material';
import AddFieldCard from '../AddFieldsComponent/AddFieldCard';
import { styles } from './style';
import { Overview } from '../Overview/Overview';
import { TabsComponent } from '../TabsComponent/TabsComponent';
import { UnitsTable } from '../TenantAndLeaseTable/UnitsTable';
import dayjs from 'dayjs';
import { UnitCard } from '../UnitCard/UnitCard';
import UnitInfoCard from '../UnitInfoComponent/UnitInfoCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { HouseIcon, TenantIcon, VacantHomeIcon } from '../Icons/CustomIcons';
import { DocumentTableComponent } from '../DocumentTableComponent/DocumentTableComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getLocaleFormat } from '../../helpers/utils';
import { PropertiesActionsPrompts } from '../Dialogs/PropertiesActionsPrompts';
import { useLazyGetUnitLeasesQuery } from '../../store/LeaseStore/leaseApiSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
	DynamicTable,
	TableColumn,
	DynamicAvatar,
	DynamicBreadcrumb,
	DynamicModalProps,
	DynamicModal,
	AmenityItem,
	AmenityCard,
	getAmenityIcon,
} from '@klubiq/ui-components';
import { PROPERTY_CONSTANTS } from '../../helpers/constants';
import {
	LeaseTableData,
	PropertyUnitComponentProps,
	TenantsTableData,
} from '../../page-tytpes/properties/detail-page.types';
import { usePropertyActions } from '../../hooks/page-hooks/properties.hooks';
import { LeaseType, PropertyDataType } from '../../shared/type';
import { statusColors } from '../../page-tytpes/leases/list-page.type';
import { ViewList } from '@mui/icons-material';
import { useTheme } from '@mui/system';
import UnitForm from '../Forms/UnitForm';
import { useDeleteUnitMutation } from '../../store/PropertyPageStore/propertyApiSlice';
import UploadUnitImagesForm from '../Forms/UploadUnitImagesForm';
import { screenMessages } from '../../helpers/screen-messages';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';

export const PropertyUnitComponent: FC<PropertyUnitComponentProps> = ({
	currentProperty,
	multiUnitMode = false,
	multiUnitNumber = '',
	unitId = '',
}) => {
	if (!currentProperty) return null;

	const location = useLocation();
	const navigate = useNavigate();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const { user } = useSelector(getAuthState);
	const theme = useTheme();
	const currentUUId = location.pathname.split('/')[2]!;
	const propertyType = currentProperty?.isMultiUnit ? 'Multi' : 'Single';
	const dispatch = useDispatch();
	// State management
	const [confirmUnitNumber, setConfirmUnitNumber] = useState<string>('');
	const [tabValue, setTabValue] = useState<number>(0);
	const [routeMap, setRouteMap] = useState({});
	const [open, setOpen] = useState<boolean>(false);
	const [openUnitAction, setOpenUnitAction] = useState<boolean>(false);
	const [openUnitDialog, setOpenUnitDialog] = useState<boolean>(false);
	const [unitDialogType, setUnitDialogType] = useState<string>('add');
	const [openDeleteUnitDialog, setOpenDeleteUnitDialog] =
		useState<boolean>(false);
	const [openAddImagesDialog, setOpenAddImagesDialog] =
		useState<boolean>(false);
	const [leaseTableBodyRows, setLeaseTableBodyRows] = useState<any>([]);
	const [openArchivePropertyDialog, setOpenArchivePropertyDialog] =
		useState<boolean>(false);
	const [openDeletePropertyDialog, setOpenDeletePropertyDialog] =
		useState<boolean>(false);

	// API hooks
	const [deleteUnit, { isLoading: isDeletingUnit }] = useDeleteUnitMutation();
	const [getUnitLeases, { isLoading: isLoadingUnitLeases }] =
		useLazyGetUnitLeasesQuery();

	// Computed values
	const propertyAddress = useMemo(() => {
		const { addressLine1, addressLine2, city, state } =
			currentProperty?.address || {};
		return `${addressLine1} ${addressLine2 || ''}, ${city}, ${state}`;
	}, [currentProperty?.address]);

	const mainImage = useMemo(() => {
		if (!currentProperty?.images?.length) return null;
		return currentProperty.images.length > 1
			? currentProperty.images.find((image) => image.isMain)
			: currentProperty.images[0];
	}, [currentProperty?.images]);

	const unitInfoData = useMemo(
		() => [
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
		],
		[currentProperty],
	);

	// Custom hooks
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

	// Helper functions
	const getUnitData = (
		unitNumber: string | undefined,
		unitId: string | undefined,
	) => {
		return currentProperty?.units?.find(
			(unit) => unit.unitNumber === unitNumber && unit.id === unitId,
		);
	};

	const getUnitAmenities = () => {
		if (unitId && multiUnitNumber) {
			return getUnitData(multiUnitNumber, unitId)?.amenities;
		} else if (!currentProperty?.isMultiUnit) {
			return currentProperty?.units?.[0]?.amenities;
		}
		return [];
	};

	const getTenantTableData = (property: PropertyDataType): TenantsTableData => {
		const tableColumns: TableColumn[] = [
			{
				key: 'tenant',
				label: 'Tenant',
				align: 'left',
				render: (rowData) => (
					<Stack direction='row' alignItems='center' spacing={2}>
						{rowData.tenant && (
							<>
								<DynamicAvatar
									items={[rowData.tenant]}
									size='medium'
									showName={false}
								/>
								<Typography variant='body2'>{rowData.tenant.name}</Typography>
							</>
						)}
					</Stack>
				),
			},
			{ key: 'phone', label: 'Phone', align: 'left' },
			{
				key: 'email',
				label: 'Email',
				render: (rowData) => (
					<Link
						href={`mailto:${rowData.email}`}
						underline='none'
						variant='body2'
					>
						{rowData.email}
					</Link>
				),
				align: 'left',
			},
			{ key: 'moveInDate', label: 'Move In Date', align: 'left' },
			{ key: 'moveOutDate', label: 'Move Out Date', align: 'left' },
			{
				key: 'isPrimaryTenant',
				label: 'Primary Tenant',
				render: (rowData) => (
					<Stack direction='row' sx={styles.primaryTenantStyle} spacing={1}>
						{rowData.isPrimaryTenant && <CheckCircleIcon color='success' />}
						<Typography variant='body2'>
							{rowData.isPrimaryTenant ? 'Yes' : 'No'}
						</Typography>
					</Stack>
				),
				align: 'left',
			},
		];

		const rows =
			property?.units?.[0]?.tenants?.map((tenant) => ({
				id: String(tenant.id),
				tenant: {
					name: `${tenant.profile.companyName || ''} ${tenant.profile.firstName || ''} ${tenant.profile.lastName || ''}`,
					image: tenant.profile?.profilePicUrl ?? null,
					background: theme.palette.mode === 'dark' ? 'dark' : 'light',
				},
				phone: tenant.profile?.phoneNumber ?? null,
				email: tenant.profile?.email ?? '',
				isPrimaryTenant: tenant.isPrimaryTenant,
				moveInDate:
					dayjs(property?.units?.[0]?.lease?.startDate).format('ll') ?? null,
				moveOutDate:
					dayjs(property?.units?.[0]?.lease?.endDate).format('ll') ?? null,
			})) ?? [];

		return { tableColumns, rows };
	};

	const getLeaseTableData = (leases: LeaseType[]): LeaseTableData => {
		const tableColumns: TableColumn[] = [
			{
				key: 'tenants',
				label: 'Tenant',
				align: 'left',
				render: (rowData: any) => (
					<Stack direction='row' alignItems='center' spacing={2}>
						{rowData?.tenants && rowData?.tenants.length > 0 && (
							<>
								<DynamicAvatar
									items={rowData.tenants}
									size='medium'
									showName={false}
								/>
								{rowData.tenants.length === 1 && (
									<Typography variant='body2'>
										{rowData.tenants[0].name}
									</Typography>
								)}
							</>
						)}
					</Stack>
				),
			},
			{ key: 'rentAmount', label: 'Rent Amount', align: 'left' },
			{ key: 'startDate', label: 'Start Date', align: 'left' },
			{ key: 'endDate', label: 'End Date', align: 'left' },
			{
				key: 'status',
				label: 'Status',
				align: 'left',
				render: (rowData: any) => (
					<Chip
						label={rowData.status}
						color={statusColors[rowData.status] as any}
						variant='outlined'
					/>
				),
			},
		];

		const rows =
			leases?.map((lease) => ({
				id: lease.id,
				tenants:
					lease?.tenants?.map((tenant) => ({
						name: `${tenant.profile.companyName || ''} ${tenant.profile.firstName || ''} ${tenant.profile.lastName || ''}`,
						image: tenant.profile?.profilePicUrl ?? '',
					})) || [],
				rentAmount: `${getLocaleFormat(user?.orgSettings, +(lease?.rentAmount ?? 0), 'currency')}`,
				startDate: dayjs(lease?.startDate).format('ll'),
				endDate: dayjs(lease?.endDate).format('ll'),
				status: lease?.status ?? '',
			})) ?? [];

		return { tableColumns, rows };
	};

	// Event handlers
	const handleDeleteUnitConfirmation = async () => {
		if (confirmUnitNumber === multiUnitNumber) {
			try {
				const resp = await deleteUnit({
					propertyUuid: currentUUId,
					unitIds: [unitId],
				}).unwrap();
				dispatch(
					openSnackbar({
						message: screenMessages.unit.delete.success,
						severity: 'success',
						isOpen: true,
						duration: 5000,
					}),
				);
				setOpenDeleteUnitDialog(false);
				navigate(`/properties/${currentUUId}`);
			} catch (error) {
				const errorMessage = (error as any)?.message;
				console.error('Failed to delete unit:', errorMessage);
				dispatch(
					openSnackbar({
						message: screenMessages.unit.delete.error,
						severity: 'error',
						isOpen: true,
						duration: 7000,
					}),
				);
				throw error;
			}
		}
	};

	// Modal configurations
	const createModalConfig = (
		open: boolean,
		onClose: () => void,
		header: string,
		children: React.ReactNode,
		footer?: React.ReactNode,
	): DynamicModalProps => ({
		headerText: header,
		open: open,
		onClose: onClose,
		headerAlign: 'center',
		contentAlign: 'center',
		contentDirection: 'column',
		borderRadius: 2,
		maxWidth: 'sm',
		fullScreenOnMobile: true,
		sx: {
			height: 'auto',
			border: '2px solid',
			borderColor:
				theme.palette.mode === 'dark'
					? theme.palette.divider
					: theme.palette.background.paper,
		},
		children,
		footer,
	});

	const unitModalConfig = createModalConfig(
		openUnitDialog,
		() => setOpenUnitDialog(false),
		unitDialogType === 'add' ? 'Add Unit' : `Edit Unit: ${multiUnitNumber}`,
		<Stack
			direction='column'
			spacing={2}
			justifyContent='center'
			alignItems='center'
			sx={{ width: '100%', height: '100%' }}
		>
			<UnitForm
				propertyId={currentProperty?.uuid}
				categoryId={currentProperty?.category?.id!}
				unit={
					multiUnitNumber && unitId
						? getUnitData(multiUnitNumber, unitId)
						: undefined
				}
				onClose={() => setOpenUnitDialog(false)}
			/>
		</Stack>,
	);

	const deleteUnitModalConfig = createModalConfig(
		openDeleteUnitDialog,
		() => setOpenDeleteUnitDialog(false),
		`Unit Name: ${multiUnitNumber}`,
		<Stack
			sx={{
				width: '100%',
				height: 'auto',
				paddingTop: 2,
				gap: 2,
				alignItems: 'flex-start',
				justifyContent: 'center',
			}}
		>
			<Typography variant='body1'>
				Are you sure you want to delete this unit?
			</Typography>
			<Typography variant='body1'>
				Deleting this unit will delete all leases and transactions associated
				with it.
			</Typography>
			<Typography variant='body1'>This action cannot be undone.</Typography>
			<Stack
				sx={{
					width: '100%',
					height: 'auto',
					paddingTop: 2,
					gap: 2,
					alignItems: 'flex-start',
					justifyContent: 'center',
				}}
			>
				<Typography variant='h6'>
					Type the Unit Name to confirm delete:
				</Typography>
				<TextField
					value={confirmUnitNumber}
					onChange={(e) => setConfirmUnitNumber(e.target.value)}
					fullWidth
					sx={{ width: '100%' }}
				/>
			</Stack>
		</Stack>,
		<Stack direction='row' spacing={2}>
			<Button
				variant='klubiqOutlinedButton'
				color='primary'
				onClick={() => setOpenDeleteUnitDialog(false)}
			>
				Cancel
			</Button>
			<Button
				variant='contained'
				color='error'
				onClick={handleDeleteUnitConfirmation}
				disabled={confirmUnitNumber !== multiUnitNumber}
			>
				{isDeletingUnit ? 'Deleting...' : 'Delete Unit'}
			</Button>
			<Backdrop
				sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
				open={isDeletingUnit}
			>
				<CircularProgress color='inherit' />
				<Typography variant='h6' color='inherit'>
					Deleting unit...
				</Typography>
			</Backdrop>
		</Stack>,
	);

	const uploadUnitImagesModalConfig = createModalConfig(
		openAddImagesDialog,
		() => setOpenAddImagesDialog(false),
		`Unit Name: ${multiUnitNumber}`,
		<Stack
			sx={{
				width: '100%',
				height: 'auto',
				paddingTop: 2,
				gap: 2,
				alignItems: 'flex-start',
				justifyContent: 'center',
			}}
		>
			<UploadUnitImagesForm
				propertyId={currentProperty?.uuid}
				unit={getUnitData(multiUnitNumber, unitId)!}
				onClose={() => setOpenAddImagesDialog(false)}
			/>
		</Stack>,
	);

	// Memoized data
	const tenantTableData = useMemo(
		() => getTenantTableData(currentProperty),
		[currentProperty],
	);
	const leaseTableData = useMemo(
		() => getLeaseTableData(leaseTableBodyRows),
		[leaseTableBodyRows],
	);
	const amenityCardItems: AmenityItem[] =
		getUnitAmenities()?.map((amenity: string, idx: number) => ({
			id: idx,
			title: amenity,
			icon: getAmenityIcon(amenity),
			available: true,
		})) || [];

	const handleTabChange = async (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		if (
			newValue === 1 &&
			currentProperty?.units?.[0]?.id &&
			!isLoadingUnitLeases
		) {
			try {
				const res = await getUnitLeases({
					id: currentProperty.units[0].id,
				}).unwrap();
				setLeaseTableBodyRows(res);
			} catch (error) {
				console.error('Failed to fetch unit leases:', error);
			}
		}
		setTabValue(newValue);
	};

	const handleArchiveProperty = () => setOpenArchivePropertyDialog(true);
	const handleDeleteProperty = () => setOpenDeletePropertyDialog(true);
	const handleEditProperty = () =>
		navigate(`/properties/${currentUUId}/edit`, {
			state: { returnPath: `/properties/${currentUUId}` },
		});
	const handleAddLease = () =>
		navigate(`/leases/add-lease?property=${currentUUId}`);
	const handleLeaseDetailClick = (lease: LeaseType) =>
		navigate(`/leases/${lease.id}`);
	const handleAddUnit = () => {
		setUnitDialogType('add');
		setOpenUnitDialog(true);
	};
	const handleEditUnit = () => {
		setUnitDialogType('edit');
		setOpenUnitDialog(true);
	};
	const handleDeleteUnit = () => setOpenDeleteUnitDialog(true);
	const handleAddImages = () => setOpenAddImagesDialog(true);

	const handleInviteTenant = (header?: string) => {
		navigate(`/tenants/invite-tenant`, {
			state: {
				mode: 'onboarding',
				propertyDetails: {
					propertyName: currentProperty?.name,
					unitId: currentProperty?.units?.[0]?.id,
					unitNumber: currentProperty?.units?.[0]?.unitNumber,
					propertyId: currentUUId,
				},
				returnPath: `/properties/${currentUUId}`,
				formHeader: header,
			},
		});
	};

	const viewTenant = (id: string) => navigate(`/tenants/${id}`);

	const handleAddTenant = (
		currentProperty: PropertyDataType | null,
		leaseId: string | null = null,
	) => {
		const returnPath = `/properties/${currentUUId}`;
		const unit = currentProperty?.units?.[0];
		const state = {
			mode: 'create' as const,
			returnPath,
			...(currentProperty && {
				leaseAndUnitDetails: {
					leaseId: leaseId || unit?.lease?.id,
					unitId: unit?.id,
					unitNumber: unit?.unitNumber,
					propertyId: currentProperty.id,
					propertyName: currentProperty.name,
				},
			}),
		};
		navigate('/tenants/add-tenant', { state });
	};

	const handleArchiveDialogButtonAction = (event: any) => {
		if (event === 'Cancel') {
			setOpenArchivePropertyDialog(false);
		} else {
			handleArchivePropertyRequest();
		}
	};

	const handleDeleteDialogButtonAction = (event: any) => {
		if (event === 'Cancel') {
			setOpenDeletePropertyDialog(false);
		} else {
			handleDeletePropertyRequest();
		}
	};

	const handleListKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Tab' || event.key === 'Escape') {
			event.preventDefault();
			setOpen(false);
		}
	};

	const handleToggle = () => setOpen((prevOpen) => !prevOpen);
	const handleToggleUnitAction = () =>
		setOpenUnitAction((prevOpen) => !prevOpen);

	// Render functions
	const renderUnitCard = () => {
		const commonProps = {
			propertyImage: mainImage?.url,
			propertyName: currentProperty?.name || '',
			propertyAddress,
			buildingType: currentProperty?.type?.name,
			additionalImages: currentProperty?.images || [],
		};

		if (multiUnitMode) {
			const unitData = getUnitData(multiUnitNumber, unitId);
			return (
				<UnitCard
					{...commonProps}
					propertyId={multiUnitNumber}
					numberOfUnits={`${currentProperty?.units?.length}`}
					rent={getLocaleFormat(
						user?.orgSettings,
						+(unitData?.rentAmount || 0) || 0,
						'currency',
					)}
					variant='unit'
					additionalImages={
						unitData?.images || []
					}
					totalArea={`${unitData?.area?.value} ${unitData?.area?.unit}`}
				/>
			);
		}

		return (
			<UnitCard
				{...commonProps}
				propertyId={currentProperty?.id}
				numberOfUnits={
					currentProperty?.isMultiUnit
						? `${currentProperty.unitCount}`
						: 'Single'
				}
				rent={getLocaleFormat(
					user?.orgSettings,
					+currentProperty?.totalRent || 0,
					'currency',
				)}
				variant='property'
				marketValue={getLocaleFormat(
					user?.orgSettings,
					+currentProperty?.marketValue || 0,
					'currency',
				)}
				sellingPrice={getLocaleFormat(
					user?.orgSettings,
					+currentProperty?.sellingPrice || 0,
					'currency',
				)}
				totalArea={
					currentProperty?.isMultiUnit
						? ''
						: `${currentProperty?.area?.value} ${currentProperty?.area?.unit}`
				}
				purpose={currentProperty?.purpose?.name}
			/>
		);
	};

	const renderTabsContent = (tabValue: number) => (
		<Stack direction='column' spacing={2} width={'100%'}>
			{!multiUnitMode && <UnitInfoCard data={unitInfoData} />}
			{tabValue === 0 && (
				<Stack
					spacing={2}
					mt={2}
					direction={'column'}
					width={'100%'}
					justifyContent={'center'}
				>
					{!multiUnitMode && (
						<Overview
							initialText={currentProperty?.description}
							propertyUuid={currentProperty?.uuid}
						/>
					)}
					<Stack spacing={2} direction={'column'}>
						{currentProperty?.units?.[0]?.tenants?.length ? (
							<DynamicTable
								colors={tableSx}
								styles={tableStyles}
								header='Tenant'
								buttonLabel='Add Tenant'
								columns={tenantTableData.tableColumns}
								rows={tenantTableData.rows}
								onButtonClick={() => handleInviteTenant('Add Tenant')}
								onRowClick={(rowData) => viewTenant(rowData.id)}
							/>
						) : (
							<AddFieldCard
								heading={
									currentProperty?.units?.[0]?.lease
										? 'Add Tenant'
										: 'Invite Tenant'
								}
								subtext={'Add tenant to your property'}
								description={
									currentProperty?.units?.[0]?.lease
										? 'Add Tenant'
										: 'Invite Tenant'
								}
								handleAdd={
									currentProperty?.units?.[0]?.lease
										? () => handleAddTenant(currentProperty)
										: () => handleInviteTenant('Invite Tenant')
								}
							/>
						)}
						{!currentProperty?.units?.[0]?.lease && (
							<AddFieldCard
								heading='Add Lease'
								subtext='Create a lease for your property'
								description='Add Lease'
								handleAdd={handleAddLease}
							/>
						)}
					</Stack>
				</Stack>
			)}
			{tabValue === 1 && (
				<Stack
					spacing={2}
					mt={2}
					direction={'column'}
					width={'100%'}
					justifyContent={'center'}
				>
					{leaseTableBodyRows?.length > 0 ? (
						<DynamicTable
							colors={tableSx}
							styles={tableStyles}
							header='Leases'
							columns={leaseTableData.tableColumns}
							rows={leaseTableData.rows}
							onRowClick={(rowData) => handleLeaseDetailClick(rowData)}
						/>
					) : (
						<AddFieldCard
							heading='Add Lease'
							subtext='Create a lease for your property'
							description='Add Lease'
							handleAdd={handleAddLease}
						/>
					)}
				</Stack>
			)}
		</Stack>
	);

	const renderActionMenu = (isMultiUnit: boolean) => {
		const menuItems = isMultiUnit
			? [
				{ label: 'Add / Delete Images', onClick: handleAddImages,  divider: true },
				{ label: 'Edit Unit', onClick: handleEditUnit, divider: true },
				{ label: 'Delete Unit', onClick: handleDeleteUnit },
				]
			: [
					{
						label: 'Add Unit',
						onClick: handleAddUnit,
						divider: true,
					},
					{
						label: 'Archive Property',
						onClick: handleArchiveProperty,
						divider: true,
						disabled: currentProperty?.isArchived,
					},
					{ label: 'Delete Property', onClick: handleDeleteProperty, divider: true, },
					{
						label: 'Edit Property',
						onClick: handleEditProperty,
						
					},
					
				];

		return (
			<Grid item xs={12} sx={styles.actionButtonContainerStyle}>
				<Button
					ref={anchorRef}
					variant='klubiqMainButton'
					onClick={isMultiUnit ? handleToggleUnitAction : handleToggle}
					endIcon={<MoreVertIcon />}
				>
					Action
				</Button>
				<Popper
					open={isMultiUnit ? openUnitAction : open}
					anchorEl={anchorRef.current}
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
										{menuItems.map((item, index) => (
											<MenuItem
												key={index}
												onClick={item.onClick}
												sx={{ padding: '10px' }}
												divider={item.divider}
												disabled={item.disabled}
											>
												{item.label}
											</MenuItem>
										))}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</Grid>
		);
	};

	// Effects
	useEffect(() => {
		setRouteMap({
			'/properties': { path: '/properties', slug: '', icon: <ViewList /> },
			'/properties/:id': {
				path: '/properties/:id',
				slug: currentProperty?.name || 'property-details',
				dynamic: true,
			},
			'/properties/:id/:id': {
				path: '/properties/:id/unit/:id',
				slug: multiUnitNumber || 'unit-details',
				dynamic: true,
			},
		});
	}, [multiUnitNumber, currentProperty, multiUnitMode]);

	return (
		<>
			<Stack direction='column' spacing={2} width={'100%'}>
				<Box>
					<DynamicBreadcrumb
						currentPath={location.pathname.replace(`/unit`, '')}
						routeMap={routeMap}
						onNavigate={(path) => navigate(path)}
					/>
				</Box>

				{renderActionMenu(multiUnitMode)}

				<Grid item xs={12}>
					{currentProperty?.purpose?.displayText && (
						<Chip
							label={currentProperty?.purpose?.displayText}
							variant={
								!currentProperty?.isArchived
									? currentProperty?.purpose?.name?.toLowerCase() === 'rent'
										? 'rent'
										: 'sale'
									: 'archived'
							}
						/>
					)}
				</Grid>

				<Stack direction='column' spacing={2} width={'100%'}>
					{renderUnitCard()}
					{amenityCardItems.length > 0 && (
						<AmenityCard
							title={<Typography variant='h4'>Amenities</Typography>}
							spacing={2}
							sx={{ mt: 2, backgroundColor: '' }}
							items={amenityCardItems}
						/>
					)}
					{(propertyType === 'Single' || multiUnitMode) && (
						<TabsComponent
							handleTabChange={handleTabChange}
							tabValue={tabValue}
							allTabs={PROPERTY_CONSTANTS.tabs}
						/>
					)}
				</Stack>

				{propertyType === 'Single' &&
					(tabValue === 0 || tabValue === 1) &&
					renderTabsContent(tabValue)}

				{propertyType === 'Multi' && !multiUnitMode && (
					<Stack direction='column' spacing={2} width={'100%'}>
						<UnitInfoCard data={unitInfoData} />
						<Overview
							initialText={currentProperty?.description}
							propertyUuid={currentProperty?.uuid}
						/>
						<Grid sx={styles.addfieldStyle}>
							{currentProperty?.units?.length &&
								currentProperty?.units?.length > 0 && (
									<UnitsTable
										title='Units'
										handleAdd={handleAddUnit}
										buttonText='Add Unit'
										tableBodyRows={currentProperty.units}
									/>
								)}
						</Grid>
					</Stack>
				)}

				{propertyType === 'Multi' &&
					multiUnitMode &&
					renderTabsContent(tabValue)}

				{tabValue === 2 && <DocumentTableComponent documentTableData={[]} />}

				<PropertiesActionsPrompts
					open={openArchivePropertyDialog}
					progress={progress}
					title={progress ? 'Archive in progress' : 'Attention!'}
					content='Are you sure you want to archive this property?'
					rightButtonContent='Archive Property'
					handleDialogButtonAction={(e) =>
						handleArchiveDialogButtonAction(e.target.value)
					}
				/>

				<PropertiesActionsPrompts
					open={openDeletePropertyDialog}
					progress={progress}
					title={progress ? 'Deleting this property' : 'Delete Property'}
					content='Are you sure you want to delete this property? Unit, all leases, and related transactions will be deleted!'
					rightButtonContent='Delete Property'
					handleDialogButtonAction={(e) =>
						handleDeleteDialogButtonAction(e.target.value)
					}
				/>
			</Stack>

			<DynamicModal {...unitModalConfig} />
			<DynamicModal {...deleteUnitModalConfig} />
			<DynamicModal {...uploadUnitImagesModalConfig} />
		</>
	);
};
