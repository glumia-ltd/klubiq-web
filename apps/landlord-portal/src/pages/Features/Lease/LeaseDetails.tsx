import {
	Stack,
	Button,
	Chip,
	MenuList,
	MenuItem,
	ClickAwayListener,
	Grow,
	Popper,
	Paper,
} from '@mui/material';
import { useState, useRef } from 'react';
import { styles } from './style';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LeasePropertyCard from '../../../components/LeaseCards/LeasePropertyCard';
import MiniCard from '../../../components/LeaseCards/MiniCard';
// import DocumentUploadCard from '../../components/LeaseCards/DocumentUploadCard';
import { LeaseDocumentTable } from './LeaseDocumentTable';
import { useGetOrgPropertiesViewListQuery, useGetSingleLeaseByIdQuery } from '../../../store/LeaseStore/leaseApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	DateStyle,
	getLocaleDateFormat,
	getLocaleFormat,
} from '../../../helpers/utils';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { useEffect } from 'react';
import { BreadcrumbItem } from '../../../context/BreadcrumbContext/BreadcrumbContext';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { useDynamicBreadcrumbs } from '../../../hooks/useDynamicBreadcrumbs';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { statusColors } from '../../../page-tytpes/leases/list-page.type';
import { TenantDialog } from '../../../components/CustomFormComponents/TenantDialog';
import { DynamicTanstackFormProps, KlubiqFormV1, DynamicModal, DynamicModalProps } from '@klubiq/ui-components';


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
const LeaseDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useSelector(getAuthState);
	const [open, setOpen] = useState<boolean>(false);
	const [openAddTenants, setOpenAddTenants] = useState<boolean>(false);
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const timeDateOptions = {
		dateStyle: DateStyle.FULL,
		hour12: true,
	};
	const initialValues = {
		tenantsIds: [],
		primaryTenantId: '',
	}

	const modalConfig  =  (header: string): DynamicModalProps => {
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
	}
	
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

	const { data: leaseData } = useGetSingleLeaseByIdQuery({
		id: currentLeaseId || '',
	});

	const documentTableData = {
		column: [
			{ id: 'name', label: 'Name' },
			{ id: 'date', label: 'Date' },
		],
		row: [{ name: 'Maintenance Fee', date: 'second' }],
	};
 
	const onAddTenantsSubmit = async (values: any) => {
		console.log(values);
	}
	const getSelectedTenants = (values: any) => {
		const selectedTenants = tenantsQueryResult.tenants.filter((tenant: { id: string; }) => values?.tenantsIds?.includes(tenant.id)) || []; 
		return selectedTenants.map((tenant: { id: string; firstName: string; lastName: string; email: string; companyName?: string; }) => ({
			label: `${tenant.companyName || ''} ${tenant.companyName && (tenant.firstName || tenant.lastName) ? ' - ' : ''}${tenant.firstName} ${tenant.lastName}`,
			value: tenant.id,
		}));
	}
	const addTenantsFormConfig: DynamicTanstackFormProps = {
		initialValues: initialValues,
		fields: [
			{
				name: 'tenantsIds',
				label: 'Select Tenants',
				type: 'checkbox-group',
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
				options: (values: any) => {
					return getSelectedTenants(values);
				},
			},
			
		],
		onSubmit: onAddTenantsSubmit,
		submitButtonText: 'Add Tenants',
		showTopBackButton: false,
		showBackdrop: true,
		backdropText: 'Please wait while we add tenants...',
		verticalAlignment: 'top',
		horizontalAlignment: 'center',
	}

	const handleAddTenants = () => {
		setOpenAddTenants(true);
	}

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
												{ leaseData?.status !== 'Terminated' && leaseData?.status !== 'Expired' && leaseData?.status !== 'Archived' && <MenuItem
													onClick={handleAddTenants}
													sx={{ padding: '10px' }}
													divider
												>
													Add Tenant(s)
												</MenuItem>}
												{ !leaseData?.isArchived && <MenuItem
													// onClick={handleArchiveLease}
													sx={{ padding: '10px' }}
													divider
												>
													Archive Lease
												</MenuItem>}
												<MenuItem
													// onClick={handleEditLease}
													sx={{ padding: '10px' }}
													divider
												>
													Edit Lease
												</MenuItem>
												{ leaseData?.status !== 'Terminated' && <MenuItem
													// onClick={handleTerminateLease}
													sx={{ padding: '10px' }}
												>
													Terminate Lease
												</MenuItem>}
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</Stack>
				</Stack>

				<Stack direction={'row'} fontWeight={600}>
					<Chip
						label={leaseData?.status}
						color={statusColors[leaseData?.status ?? ''] as any}
						variant='outlined'
						sx={styles.chip}
					/>
				</Stack>

				<Stack
					direction={'row'}
					spacing={{ xs: 1, sm: 2, md: 8 }}
					sx={{ width: '100%' }}
				>
					<LeasePropertyCard
						propertyName={leaseData?.propertyName ?? ''}
						isMultiUnitProperty={leaseData?.isMultiUnitProperty ?? false}
						propertyAddress={leaseData?.propertyAddress ?? ''}
						propertyType={leaseData?.propertyType ?? ''}
						tenants={leaseData?.tenants ?? []}
					/>
				</Stack>

				<Stack
					spacing={2}
					useFlexGap
					direction={{ xs: 'column', sm: 'row' }}
					sx={{
						justifyContent: 'space-between',
						width: '100%',
						flexWrap: {
							xs: 'nowrap',
							sm: 'nowrap',
							md: 'nowrap',
							lg: 'nowrap',
							xl: 'nowrap',
						},
					}}
				>
					<MiniCard
						value={`${getLocaleFormat(user?.orgSettings, +(leaseData?.rentAmount ?? 0), 'currency')}`}
						name='Rent'
						status={leaseData?.status}
					/>
					<MiniCard
						dangerouslySetInnerHTML={leaseData?.rentDueOn}
						name='Due On'
						status={leaseData?.status}
					/>
					<MiniCard
						value={leaseData?.paymentFrequency}
						name='Payment Period'
						status={leaseData?.status}
					/>
					<MiniCard
						value={
							leaseData?.nextPaymentDate
								? getLocaleDateFormat(
										user?.orgSettings,
										leaseData.nextPaymentDate,
										timeDateOptions,
									)
								: 'N/A'
						}
						name='Next Payment'
						status={leaseData?.status}
					/>
					<MiniCard
						value={leaseData?.tenants?.length?.toString() ?? '0'}
						name='Tenant'
						status={leaseData?.status}
					/>
					<MiniCard
						value={`${leaseData?.daysToLeaseExpires} day${Number(leaseData?.daysToLeaseExpires) > 1 ? 's' : ''}`}
						name='Lease Expires'
						status={leaseData?.status}
					/>
				</Stack>
				<Stack
					direction={'row'}
					spacing={{ xs: 1, sm: 2, md: 8 }}
					sx={{ width: '100%' }}
				>
					<LeaseDocumentTable documentTableData={documentTableData} />
				</Stack>
			</Stack>
			<DynamicModal {...modalConfig('Add Tenants')} />
		</>
	);
};

export default LeaseDetails;
