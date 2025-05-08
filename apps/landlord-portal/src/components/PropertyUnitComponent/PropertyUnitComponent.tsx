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
import {
	HouseIcon,
	TenantIcon,
	VacantHomeIcon,
	HomeIcon,
} from '../Icons/CustomIcons';
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
import { PROPERTY_CONSTANTS } from '../../helpers/constants';
import {
	LeaseTableData,
	PropertyUnitComponentProps,
	TenantsTableData,
} from '../../page-tytpes/properties/detail-page.types';
import { usePropertyActions } from '../../hooks/page-hooks/properties.hooks';
import { LeaseType, PropertyDataType } from '../../shared/type';
import propertyImage from '../../assets/images/propertyImage.png';
import { Breadcrumb } from '../Breadcrumb/index';
import { useDynamicBreadcrumbs } from '../../hooks/useDynamicBreadcrumbs';
import { BreadcrumbItem } from '../../context/BreadcrumbContext/BreadcrumbContext';
import { statusColors } from '../../page-tytpes/leases/list-page.type';
import SharedStyles from '../../styles/shared-style';

const stackedImages = [
	propertyImage,
	propertyImage,
	propertyImage,
	propertyImage,
];

export const PropertyUnitComponent: FC<PropertyUnitComponentProps> = ({
	currentProperty,
	multiUnitMode = false,
	multiUnitNumber = '',
}) => {
	if (!currentProperty) {
		return null;
	}
	const location = useLocation();
	const navigate = useNavigate();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const { user } = useSelector(getAuthState);

	const currentUUId = location.pathname.split('/')[2]!;
	const propertyType = currentProperty?.isMultiUnit ? 'Multi' : 'Single';

	const [tabValue, setTabValue] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(false);
	const [leaseTableBodyRows, setLeaseTableBodyRows] = useState<any>([]);
	const [openArchivePropertyDialog, setOpenArchivePropertyDialog] =
		useState<boolean>(false);
	const [openDeletePropertyDialog, setOpenDeletePropertyDialog] =
		useState<boolean>(false);

	const [getUnitLeases, { isLoading: isLoadingUnitLeases }] =
		useLazyGetUnitLeasesQuery();
	const propertyAddress = useMemo(() => {
		const { addressLine1, addressLine2, city, state } =
			currentProperty?.address || {};
		return `${addressLine1} ${addressLine2 || ''}, ${city}, ${state}`;
	}, [currentProperty?.address]);
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

	const mainImage = useMemo(() => {
		if (!currentProperty?.images?.length) {
			return null;
		}
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
			{
				key: 'phone',
				label: 'Phone',
				align: 'left',
			},
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
			{
				key: 'moveInDate',
				label: 'Move In Date',
				align: 'left',
			},
			{
				key: 'moveOutDate',
				label: 'Move Out Date',
				align: 'left',
			},
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
				id: tenant.id,
				tenant: {
					name: `${tenant.profile.firstName} ${tenant.profile.lastName}`,
					image: tenant.profile?.profilePicUrl ?? null,
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
			{
				key: 'rentAmount',
				label: 'Rent Amount',
				align: 'left',
			},
			{
				key: 'startDate',
				label: 'Start Date',
				align: 'left',
			},
			{
				key: 'endDate',
				label: 'End Date',
				align: 'left',
			},
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
						name:
							`${tenant.profile.firstName} ${tenant.profile.lastName}` ||
							'Tenant',
						image: tenant.profile?.profilePicUrl ?? '',
					})) || [],
				rentAmount: `${getLocaleFormat(user?.orgSettings, +(lease?.rentAmount ?? 0), 'currency')}`,
				startDate: dayjs(lease?.startDate).format('ll'),
				endDate: dayjs(lease?.endDate).format('ll'),
				status: lease?.status ?? '',
			})) ?? [];

		return { tableColumns, rows };
	};

	const tenantTableData = useMemo(
		() => getTenantTableData(currentProperty),
		[currentProperty],
	);
	const leaseTableData = useMemo(
		() => getLeaseTableData(leaseTableBodyRows),
		[leaseTableBodyRows],
	);

	const handleTabChange = async (
		_event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => {
		if (
			newValue === 1 &&
			currentProperty?.units?.[0]?.id &&
			!isLoadingUnitLeases
			//&&!currentProperty?.isMultiUnit
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
	const handleEditProperty = () => navigate(`/properties/${currentUUId}/edit`);
	const handleAddLease = () =>
		navigate(`/leases/add-lease?property=${currentUUId}`);
	const handleLeaseDetailClick = (lease: LeaseType) =>
		navigate(`/leases/${lease.id}`);
	const handleAddUnit = () => navigate(`/properties/${currentUUId}/unit`);

	const handleInviteTenant = () => {
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

	const handleAddTenant = (
		currentProperty: PropertyDataType | null,
		leaseId: string | null = null,
	) => {
		const returnPath = `/properties/${currentUUId}`;
		const unit = currentProperty?.units?.[0];
		const state = {
			mode: 'new-tenant' as const,
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

	const renderUnitCard = () => {
		const commonProps = {
			propertyImage: mainImage?.url,
			propertyName: currentProperty?.name || '',
			propertyAddress,
			buildingType: currentProperty?.type?.name,
			additionalImages: stackedImages,
		};

		if (multiUnitMode) {
			return (
				<UnitCard
					{...commonProps}
					propertyId={multiUnitNumber}
					numberOfUnits={`${currentProperty?.units?.length}`}
					rent={getLocaleFormat(
						user?.orgSettings,
						+(currentProperty?.units?.[0]?.rentAmount || 0),
						'currency',
					)}
					totalArea={`${currentProperty?.units?.[0]?.area?.value} ${currentProperty?.units?.[0]?.area?.unit}`}
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
				totalArea={
					currentProperty?.isMultiUnit
						? ''
						: `${currentProperty?.area?.value} ${currentProperty?.area?.unit}`
				}
			/>
		);
	};
	const renderTabsContent = (tabValue: number) => {
		return (
			<Grid item xs={12}>
				{!multiUnitMode && (
					<Grid sx={styles.unitInfoCardStyle}>
						<UnitInfoCard data={unitInfoData} />
					</Grid>
				)}

				{tabValue === 0 && (
					<>
						<Overview initialText={currentProperty?.description} />
						<Grid sx={styles.addfieldStyle}>
							{currentProperty?.units?.[0]?.tenants?.length ? (
								<DynamicTable
									colors={tableSx}
									styles={tableStyles}
									header='Tenant'
									buttonLabel='Add Tenant'
									columns={tenantTableData.tableColumns}
									rows={tenantTableData.rows}
									onButtonClick={() => handleAddTenant(null)}
									onRowClick={(rowData) => {
										console.log('Tenant clicked:', rowData);
									}}
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
											: handleInviteTenant
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
						</Grid>
					</>
				)}
				{tabValue === 1 && (
					<Grid sx={styles.addfieldStyle}>
						{leaseTableBodyRows?.length > 0 ? (
							<DynamicTable
								colors={tableSx}
								styles={tableStyles}
								header='Lease'
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
					</Grid>
				)}
			</Grid>
		);
	};

	useEffect(() => {
		const newBreadcrumbs: Record<string, BreadcrumbItem> = {
			feature: {
				label: 'Properties',
			icon: (
				<HomeIcon
					key={1}
					sx={SharedStyles.iconStyle}
					aria-label='Properties'
					onClick={() => navigate(`/properties`)}
				/>
			),
				showIcon: true,
				isSectionRoot: true,
				path: '/leases',
			},
		};

		if (currentUUId) {
			newBreadcrumbs['feature-details'] = {
				label: currentProperty?.name,
				path: `/properties/${currentUUId}`,
				icon: null,
				showIcon: false,
			};
		}
		if (multiUnitNumber) {
			const unitUUId = location.pathname.split('/')[4]!;
			const path = `/properties/${currentUUId}/units/${unitUUId}`;
			newBreadcrumbs['feature-details-sub'] = {
				label: multiUnitNumber,
				path,
				icon: null,
				showIcon: false,
			};
		}
		updateBreadcrumb(newBreadcrumbs);
	}, [currentProperty?.name, currentUUId, multiUnitMode, multiUnitNumber]);
	useEffect(() => {
		return () => {
		  // Clear breadcrumbs on unmount
		  updateBreadcrumb({});
		};
	  }, []); 
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Breadcrumb />
			</Grid>

			<Grid item xs={12} sx={styles.actionButtonContainerStyle}>
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
											sx={{ padding: '10px' }}
											divider
										>
											Archive Property
										</MenuItem>
										<MenuItem
											onClick={handleEditProperty}
											sx={{ padding: '10px' }}
											divider
										>
											Edit Property
										</MenuItem>
										<MenuItem
											onClick={handleDeleteProperty}
											sx={{ padding: '10px' }}
										>
											Delete Property
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</Grid>

			<Grid item xs={12}>
				<Chip
					label={currentProperty?.purpose?.displayText || 'For sale'}
					variant={
						currentProperty?.purpose?.name?.toLowerCase() === 'rent'
							? 'rent'
							: 'sale'
					}
				/>
			</Grid>

			<Grid item xs={12} sx={styles.firstCardContainer}>
				{renderUnitCard()}
				{(propertyType === 'Single' || multiUnitMode) && (
					<TabsComponent
						handleTabChange={handleTabChange}
						tabValue={tabValue}
						allTabs={PROPERTY_CONSTANTS.tabs}
					/>
				)}
			</Grid>

			{propertyType === 'Single' &&
				(tabValue === 0 || tabValue === 1) &&
				renderTabsContent(tabValue)}

			{/* Multi Unit Section */}
			{propertyType === 'Multi' && !multiUnitMode && (
				<Grid item xs={12}>
					<Grid sx={styles.unitInfoCardStyle}>
						<UnitInfoCard data={unitInfoData} />
					</Grid>

					<Overview initialText={currentProperty?.description} />

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
				</Grid>
			)}

			{propertyType === 'Multi' && multiUnitMode && renderTabsContent(tabValue)}

			{/* Document Tab */}
			{tabValue === 2 && <DocumentTableComponent documentTableData={[]} />}

			{/* Dialogs */}
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
		</Grid>
	);
};
