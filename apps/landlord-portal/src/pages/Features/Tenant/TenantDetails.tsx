import { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
	Typography,
	Stack,
	Card,
	Box,
	IconButton,
	Button,
} from '@mui/material';
import { formatDate } from '../../../helpers/utils';
import fileIcon from '../../../assets/images/Phone.svg';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTenantActions } from '../../../hooks/page-hooks/tenant-hooks';
import { DynamicTable } from '@klubiq/ui-components';
import bukky from '../../../assets/images/aisha.jpg';
import HistoryTable from '../Lease/HistoryTable';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import * as KlubiqIcons from '../../../components/Icons/CustomIcons';
import { styles } from './styles';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { useDynamicBreadcrumbs } from '../../../hooks/useDynamicBreadcrumbs';
import { useGetSingleTenantByIdQuery } from '../../../store/TenantStore/tenantApiSlice';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { LeaseDetail, TenantInfo } from '../../../shared/type';
import { TenantDocumentRow } from '../../../shared/type';
import { BreadcrumbItem } from '../../../context/BreadcrumbContext/BreadcrumbContext';

const TenantDetails = () => {
	const { tableSx, tableStyles } = useTenantActions();
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const currentTenantId = location.pathname.split('/')[2]!;
	const { data: tenantData } = useGetSingleTenantByIdQuery({
		id: id || currentTenantId || '',
	});
	console.log('id', id, currentTenantId);
	useEffect(() => {
		const newBreadcrumbs: Record<string, BreadcrumbItem> = {
			feature: {
				label: 'Tenants',
				icon: (
					<ViewListOutlinedIcon
						key={1}
						aria-label='Tenant'
						onClick={() => navigate(`/tenants`)}
					/>
				),
				showIcon: true,
				isSectionRoot: true,
				path: '/tenants',
			},
		};
		if (currentTenantId) {
			newBreadcrumbs['feature-details'] = {
				label: `Tenant Details${tenantData?.profile?.firstName ? `: ${tenantData?.profile?.firstName}` : ''}`, // Prefer a human-readable name if available
				path: `/tenant/${currentTenantId}`,
				icon: null,
				showIcon: false,
			};
		}
		newBreadcrumbs['feature-details-sub'] = {};
		updateBreadcrumb(newBreadcrumbs);
	}, [tenantData?.name, currentTenantId, location.pathname]);
	console.log('tenantData', tenantData);
	const tenant: TenantInfo = {
		name: `${tenantData?.profile?.fullName ?? ''}`,
		phone: tenantData?.profile?.phoneNumber ?? 'N/A',
		email: tenantData?.profile?.email ?? 'N/A',
		since: tenantData?.profile?.updatedDate
			? formatDate(tenantData.profile.updatedDate)
			: 'N/A',
		image: tenantData?.profile?.profilePicUrl || bukky,
	};
	// const rows: TenantDocumentRow[] = [
	// 	{ name: 'Maintenance fee', dueDate: 'March 13, 2025' },
	// 	{ name: 'Insurance fee', dueDate: 'April 4, 2024' },
	// 	{ name: 'Landmark House unit 1 Lease payment', dueDate: 'March 13, 2025' },
	// 	{ name: 'Landmark House unit 2 Lease payment', dueDate: 'April 4, 2024' },
	// ];

	const columns = [
		{
			key: 'name',
			label: 'Name',
			render: (row: { name: string }) => (
				<Box sx={styles.tableDiv} display='flex' alignItems='center'>
					<img src={fileIcon} alt='file icon' />
					<Typography sx={styles.cellText} ml='25px'>
						{row.name}
					</Typography>
				</Box>
			),
		},
		{ key: 'dueDate', label: 'Due Date' },
	];

	const leaseDetails: LeaseDetail[] =
		tenantData?.activeleases?.map(
			(lease: { leaseStart: any; leaseEnd: any; rentAmount: any }) => ({
				name: `Lease from ${lease.leaseStart} to ${lease.leaseEnd}`,
				amount: lease.rentAmount || 'N/A',
			}),
		) || [];

	const rows: TenantDocumentRow[] =
		tenantData?.leases?.map(
			(lease: { paymentFrequency: any; nextDueDate: any }) => ({
				name: `Lease Payment (${lease.paymentFrequency})`,
				dueDate: lease.nextDueDate || 'N/A',
			}),
		) || [];
	return (
		<Stack spacing={2}>
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
					<Button variant='contained' sx={styles.actionButton}>
						Action
						<MoreVertIcon />
					</Button>
				</Stack>
			</Stack>
			<Stack direction='row' spacing={1} sx={styles.detailsCard}>
				<Card sx={styles.detailsCard}>
					<Stack
						direction='row'
						spacing={0}
						justifyContent='space-between'
						alignItems='center'
					>
						<Stack direction='row' spacing={3}>
							<img src={tenant.image} alt='tenant' style={styles.imageStyle} />
							<Stack direction='column' spacing={5}>
								<Stack direction='row' spacing={3} sx={styles.firstBox}>
									<Typography sx={styles.nameText}>{tenant.name}</Typography>
									<IconButton>
										<KlubiqIcons.EditIcon sx={styles.iconStyleTwo} />
										<Typography sx={styles.boxText}>Edit</Typography>
									</IconButton>
								</Stack>
								<Stack direction='row' spacing={2}>
									<Box sx={styles.tenBox}>
										<MailOutlinedIcon sx={styles.iconStyleTwo} />
										<Typography sx={styles.boxText}>{tenant.phone}</Typography>
									</Box>
									<Box sx={styles.tenBox}>
										<MailOutlinedIcon sx={styles.iconStyleTwo} />
										<Typography sx={styles.boxText}>{tenant.email}</Typography>
									</Box>
								</Stack>
							</Stack>
						</Stack>
						<Stack direction='column' spacing={1}>
							<Typography sx={styles.detailsText}>Tenant Since</Typography>
							<Typography sx={styles.boxText}>{tenant.since}</Typography>
						</Stack>
					</Stack>
				</Card>
			</Stack>
			<Stack direction='row' sx={styles.detailsCard}>
				<Card sx={styles.detailsCard}>
					<Stack direction='column' spacing={3}>
						<Stack direction='column' spacing={1}>
							<Stack direction='row' spacing={2} sx={styles.firstBox}>
								<Typography sx={styles.nameText2}>Current Lease</Typography>
								<Typography sx={styles.cardTwoText}>
									{tenantData?.activeleases?.[0]?.propertyName || 'N/A'} | Unit{' '}
									{tenantData?.activeleases?.[0]?.unit || 'N/A'}
								</Typography>
							</Stack>
							<Typography sx={styles.typo3}>
								{tenantData?.activeleases?.[0]?.propertyAddress || 'N/A'}
							</Typography>
						</Stack>
						<Box display='flex' justifyContent='space-between'>
							{leaseDetails.map((item, index) => (
								<Box key={index}>
									<Typography sx={styles.typo2}>{item.name}</Typography>
									<Typography sx={styles.nameText}>{item.amount}</Typography>
								</Box>
							))}
						</Box>
					</Stack>
				</Card>
			</Stack>
			<Stack spacing={1} sx={styles.detailsCard}>
				<HistoryTable />
			</Stack>
			<Stack spacing={1} sx={styles.detailsCard}>
				<DynamicTable
					header='Tenant Documents'
					subHeader='Keep track of all documents related to this property in one place.'
					columns={columns}
					rows={rows}
					styles={tableStyles}
					colors={tableSx}
				/>
			</Stack>
		</Stack>
	);
};

export default TenantDetails;
