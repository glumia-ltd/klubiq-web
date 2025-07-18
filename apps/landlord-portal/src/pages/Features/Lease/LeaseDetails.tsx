import {
	Stack,
	Button,
	MenuList,
	MenuItem,
	ClickAwayListener,
	Grow,
	Popper,
	Paper,
	Box,
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	useAddTenantsMutation,
	useGetOrgPropertiesViewListQuery,
	useGetSingleLeaseByIdQuery,
} from '../../../store/LeaseStore/leaseApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	DateStyle,
	getLocaleDateFormat,
	getLocaleFormat,
} from '../../../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { BreadcrumbItem } from '../../../context/BreadcrumbContext/BreadcrumbContext';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { useDynamicBreadcrumbs } from '../../../hooks/useDynamicBreadcrumbs';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { TenantDialog } from '../../../components/CustomFormComponents/TenantDialog';
import {
	DynamicTanstackFormProps,
	KlubiqFormV1,
	DynamicModal,
	DynamicModalProps,
	PageDetail,
	LeaseStatus,
	AvatarItem,
} from '@klubiq/ui-components';
import { UserProfile } from '../../../shared/auth-types';
import { HourglassBottom, Payments, PendingActions, People, Timeline, Today } from '@mui/icons-material';
import { consoleLog } from '../../../helpers/debug-logger';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import { screenMessages } from '../../../helpers/screen-messages';

function renderTenantSelectField(fieldApi: any, fieldConfig: any, form: any) {
	return (
		<TenantDialog
			field={{
				fieldConfig: {
					...fieldConfig,
					options: Array.isArray(fieldConfig.options)
						? fieldConfig.options.map(
								(opt: {
									value: string | number;
									label: string;
									email: string;
								}) => ({
									...opt,
									value: String(opt.value),
									label: `${opt.label}`,
								}),
							)
						: typeof fieldConfig.options === 'function'
							? fieldConfig
									.options(form.getValues())
									.map(
										(opt: {
											value: string | number;
											label: string;
											email: string;
										}) => ({
											...opt,
											value: String(opt.value),
											label: `${opt.label}`,
										}),
									)
							: [],
				},
				state: fieldApi.state,
				handleChange: fieldApi.handleChange,
			}}
			form={form}
		/>
	);
}

const useMenuStatus = (status?: string, isArchived?: boolean) => ({
	canAddTenant:
		status !== 'Terminated' && status !== 'Expired' && status !== 'Archived',
	canArchive: !isArchived,
	canEdit: true,
	canTerminate: status !== 'Terminated' && status !== 'Expired',
	canRenew: status !== 'Active' && status !== 'Expiring',
});

const LeaseDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useSelector(getAuthState);
	const dispatch = useDispatch();
	const [open, setOpen] = useState<boolean>(false);
	const [openAddTenants, setOpenAddTenants] = useState<boolean>(false);
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const [addTenants] = useAddTenantsMutation();
	const timeDateOptions = {
		dateStyle: DateStyle.FULL,
		hour12: true,
	};
	const initialValues = {
		tenantsIds: [],
		primaryTenantId: '',
	};

	const modalConfig = (header: string): DynamicModalProps => {
		return {
			open: openAddTenants,
			onClose: () => setOpenAddTenants(false),
			headerText: header,
			headerAlign: 'center',
			contentAlign: 'center',
			contentDirection: 'column',
			borderRadius: 1,
			maxWidth: 'sm',
			fullScreenOnMobile: true,
			children: <KlubiqFormV1 {...addTenantsFormConfig} />,
			sx: {
				height: 'auto',
			},
		} as DynamicModalProps;
	};

	const tenantsQueryResult = useGetOrgPropertiesViewListQuery(
		{ orgId: user?.organizationUuid },
		{
			selectFromResult: ({ data, isLoading: loading }) => ({
				tenants: data?.tenants ? [...data.tenants] : [],
				isLoading: loading,
			}),
		},
	);
	const currentLeaseId = location.pathname.split('/')[2]!;
	const handleToggle = () => setOpen((prevOpen) => !prevOpen);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const { data: leaseData, isLoading: leaseLoading, refetch: refetchLeaseData } =
		useGetSingleLeaseByIdQuery({
			id: currentLeaseId || '',
		});


	const onAddTenantsSubmit = async (values: any) => {
		console.log(values);
		const { tenantsIds, primaryTenantId } = values;
		const secondaryTenants = tenantsIds.filter((tenantId: string) => tenantId !== primaryTenantId);
		const body = {
			primaryTenant: {id: primaryTenantId || tenantsIds[0], isPrimary: true},
			secondaryTenants
		}
		consoleLog('body', body);
		try{
			await addTenants({ leaseId: currentLeaseId, body }).unwrap();
			dispatch(
				openSnackbar({
					message: screenMessages.tenant.add.success,
					severity: 'success',
					isOpen: true,
					duration: 5000,
				}),
			);
			setOpenAddTenants(false);
			await refetchLeaseData();
		} catch (error) {
			consoleLog('error', error);
			throw error;
		}
	
	};
	const getSelectedTenants = (values: any) => {
		const selectedTenants =
			tenantsQueryResult.tenants.filter((tenant: { id: string }) =>
				values?.tenantsIds?.includes(tenant.id),
			) || [];
		return selectedTenants.map(
			(tenant: {
				id: string;
				firstName: string;
				lastName: string;
				email: string;
				companyName?: string;
			}) => ({
				label: `${tenant.companyName || ''} ${tenant.companyName && (tenant.firstName || tenant.lastName) ? ' - ' : ''}${tenant.firstName} ${tenant.lastName}`,
				value: tenant.id,
			}),
		);
	};
	const addTenantsFormConfig: DynamicTanstackFormProps = {
		initialValues: initialValues,
		fields: [
			{
				name: 'tenantsIds',
				label: 'Select Tenants',
				type: 'checkbox-group',
				required: true,
				options: tenantsQueryResult.tenants.map(
					(tenant: {
						firstName: string;
						lastName: string;
						email: string;
						id: string;
						companyName?: string;
					}) => ({
						label: `${tenant.companyName || ''} ${tenant.companyName && (tenant.firstName || tenant.lastName) ? ' - ' : ''}${tenant.firstName} ${tenant.lastName}`,
						value: tenant.id,
						email: tenant.email,
					}),
				),
				customComponent: renderTenantSelectField,
			},
			{
				name: 'primaryTenantId',
				label: 'Select Primary Tenant',
				type: 'select',
				required: (values: any) => {
					return values.tenantsIds.length > 1;
				},
				showIf: (values: any) => {
					return values.tenantsIds.length > 1;
				},

				options: (values: any) => {
					return getSelectedTenants(values);
				},
			},
			{
				name: 'leaseId',
				type: 'hidden',
				disabled: true,
				defaultValue: currentLeaseId,
				label: ''
			}
		],
		onSubmit: onAddTenantsSubmit,
		submitButtonText: 'Add Tenants',
		showTopBackButton: false,
		showBackdrop: true,
		backdropText: 'Please wait while we add tenants...',
		verticalAlignment: 'top',
		horizontalAlignment: 'center',
	};

	const handleAddTenants = () => {
		setOpenAddTenants(true);
	};

	useEffect(() => {
		const newBreadcrumbs: Record<string, BreadcrumbItem> = {
			feature: {
				label: 'Leases',
				icon: (
					<ViewListOutlinedIcon
						key={1}
						aria-label='Leases'
						onClick={() => navigate(`/leases`)}
					/>
				),
				showIcon: true,
				isSectionRoot: true,
				path: '/leases',
			},
		};
		// Add the current lease as the second breadcrumb
		if (currentLeaseId) {
			newBreadcrumbs['feature-details'] = {
				label: `Lease Details${leaseData?.name ? `: ${leaseData?.name}` : ''}`, // Prefer a human-readable name if available
				path: `/leases/${currentLeaseId}`,
				icon: null,
				showIcon: false,
			};
		}
		newBreadcrumbs['feature-details-sub'] = {};
		updateBreadcrumb(newBreadcrumbs);
	}, [leaseData?.name, currentLeaseId, location.pathname]);

	// Helper for menu status
	const { canAddTenant, canArchive, canEdit, canTerminate } = useMenuStatus(
		leaseData?.status,
		leaseData?.isArchived,
	);
	const renderHeaderAvatar = (): AvatarItem[] => {
		return (
			leaseData?.tenants?.map((tenant: { profile: UserProfile }) => ({
				image: tenant.profile.profilePicUrl || '',
				id: tenant.profile.profileUuid || '',
				variant: 'circle',
				name: `${tenant.profile.firstName || ''} ${tenant.profile.lastName || ''} ${tenant.profile.companyName || ''}`,
			})) || []
		);
	};
	return (
		<>
			<Stack
				sx={{
					justifyContent: 'center',
					alignItems: 'flex-start',
					width: '100%',
				}}
				spacing={5}
			>
				{/* Header stack */}
				<Stack
					direction={'row'}
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Breadcrumb />
					<Stack>
						<Button
							ref={anchorRef}
							variant='klubiqMainButton'
							onClick={handleToggle}
							endIcon={<MoreVertIcon />}
						>
							Action
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
												// onKeyDown={handleListKeyDown}
											>
												{canAddTenant && (
													<MenuItem
														onClick={handleAddTenants}
														sx={{ padding: '10px' }}
														divider
													>
														Add Tenant(s)
													</MenuItem>
												)}
												{canArchive && (
													<MenuItem
														// onClick={handleArchiveLease}
														sx={{ padding: '10px' }}
														divider
													>
														Archive Lease
													</MenuItem>
												)}
												{canEdit && (
													<MenuItem
														// onClick={handleEditLease}
														sx={{ padding: '10px' }}
														divider
													>
														Edit Lease
													</MenuItem>
												)}
												{canTerminate && (
													<MenuItem
														// onClick={handleTerminateLease}
														sx={{ padding: '10px' }}
													>
														Terminate Lease
													</MenuItem>
												)}
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</Stack>
				</Stack>
				<Box sx={{ width: '100%' }}>
					<PageDetail
						loading={leaseLoading}
						variant='lease-detail'
						headerData={{
							avatar: renderHeaderAvatar(),
							name: leaseData?.name ?? '',
							email: '',
							phone: '',
							status: '',
							showAvatarNames: true,
							leaseDetailsHeaderData: {
								leaseStatus: leaseData?.status as LeaseStatus,
								propertyName: `${leaseData?.propertyName} ${leaseData?.unitNumber ? `- ${leaseData?.unitNumber}` : ''}`,
								unitType: leaseData?.isMultiUnitProperty
									? 'Multi-Unit'
									: 'Single-Unit',
								propertyType: leaseData?.propertyType ?? '',
								unitNumber: leaseData?.unitNumber ?? '',
								address: leaseData?.propertyAddress ?? '',
							},
						}}
						showTabs={false}
						displayMode='container'
						detailSections={[
							{
								id: 'lease-dates',
								type: 'infoCard' as const,
								title: '',
								items: [
									{
										id: 'lease-start-date',
										label: 'Start Date',
										value: leaseData?.startDate ? getLocaleDateFormat(user?.orgSettings, leaseData.startDate, timeDateOptions) : '',
										icon: <Today fontSize='small' color='action' />,
									},
									{
										id: 'lease-end-date',
										label: 'End Date',
										value: leaseData?.endDate ? getLocaleDateFormat(user?.orgSettings, leaseData.endDate, timeDateOptions) : '',
										icon: <Today fontSize='small' color='action' />,
									}
								]
							},
							{
								id: 'lease-details',
								type: 'infoCard' as const,
								title: 'Lease Details',
								items: [
									{
										id: 'lease-expires',
										label: 'Lease Expires',
										value: leaseData?.daysToLeaseExpires && leaseData?.daysToLeaseExpires > 0 ? `${leaseData?.daysToLeaseExpires} day${Number(leaseData?.daysToLeaseExpires) > 1 ? 's' : ''}` : 'Expired',
										icon: <HourglassBottom fontSize='small' color='action' />,
									},
									{
										id: 'next-payment-date',
										label: 'Next Payment Date',
										value: leaseData?.nextPaymentDate
											? getLocaleDateFormat(
													user?.orgSettings,
													leaseData.nextPaymentDate,
													timeDateOptions,
												)
											: '',
										icon: <Today fontSize='small' color='action' />,
									},
									{
										id: 'payment-frequency',
										label: 'Payment Frequency',
										value: leaseData?.paymentFrequency ?? '',
										icon: <Timeline fontSize='small' color='action' />,
									},
									{
										id: 'rent-amount',
										label: 'Rent Amount',
										value: `${getLocaleFormat(user?.orgSettings, +(leaseData?.rentAmount ?? 0), 'currency')}`,
										icon: <Payments fontSize='small' color='action' />,
									},
									{
										id: 'rent-due-on',
										label: 'Rent Due On',
										value: <div dangerouslySetInnerHTML={{ __html: leaseData?.rentDueOn ?? '' }} />,
										icon: <PendingActions fontSize='small' color='action' />,
									},
									{
										id: 'tenants',
										label: 'Number of Tenants',
										value: leaseData?.tenants?.length?.toString() ?? '0',
										icon: <People fontSize='small' color='action' />,
									},
								],
							},
						]}
					/>
				</Box>
			</Stack>

			<DynamicModal {...modalConfig('Add Tenants')} />
		</>
	);
};

export default LeaseDetails;
