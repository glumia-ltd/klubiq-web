import React, { useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
	Typography,
	Stack,
	Card,
	Box,
	IconButton,
	Chip,
	Button,
} from '@mui/material';
import { statusColors } from '../../../page-tytpes/leases/list-page.type';
import dayjs from 'dayjs';
import * as KlubiqIcons from '../../../components/Icons/CustomIcons';
import { DynamicAvatar } from '@klubiq/ui-components';
import { styles } from './styles';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { useDynamicBreadcrumbs } from '../../../hooks/useDynamicBreadcrumbs';
import { useGetSingleTenantByIdQuery } from '../../../store/TenantStore/tenantApiSlice';
import { TenantInfo } from '../../../shared/type';
import { BreadcrumbItem } from '../../../context/BreadcrumbContext/BreadcrumbContext';
import { Breadcrumb } from '../../../components/Breadcrumb';
const TenantDetailsNew = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const currentTenantId = location.pathname.split('/')[2]!;
	const { data: tenantData } = useGetSingleTenantByIdQuery({
		id: id || currentTenantId || '',
	});
	console.log('id', id, currentTenantId, tenantData);
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
	}, [tenantData?.firstName, currentTenantId, location.pathname]);
	console.log('tenantData', tenantData);
	const tenant: TenantInfo = {
		name: (() => {
			const fullName = tenantData?.profile?.fullName?.trim();
			const companyName = tenantData?.profile?.companyName?.trim();
			const isInvalid = (val?: string) =>
				!val ||
				val.toLowerCase() === 'null' ||
				val.toLowerCase() === 'null null';

			if (!isInvalid(fullName)) return fullName!;
			if (!isInvalid(companyName)) return companyName!;
			return 'N/A';
		})(),
		phone: tenantData?.profile?.phoneNumber || 'N/A',
		email: tenantData?.profile?.email ?? 'N/A',
		since: tenantData?.profile?.updatedDate
			? dayjs(tenantData?.profile?.updatedDate).format('ll')
			: 'N/A',
		image:
			tenantData?.profile?.profilePicUrl || 'https://via.placeholder.com/150',
	};
	const documents = [
		{
			name: 'Rental Application Form',
			dateAdded: 'Jan 10, 2023',
			onDownload: () => alert('Downloading Rental Application...'),
		},
		{
			name: 'Credit Report',
			dateAdded: 'Jan 10, 2023',
			onDownload: () => alert('Downloading Credit Report...'),
		},
	];
	const InfoRow: React.FC<{
		label: string;
		value?: React.ReactNode;
		icon?: React.ReactNode;
		labelColor?: string;
	}> = ({ label, value, icon, labelColor }) => (
		<Stack
			direction='row'
			justifyContent='space-between'
			alignItems='center'
			spacing={1}
		>
			<Stack direction='row' spacing={1} alignItems='center' flex={1}>
				{icon && <Box sx={{ color: 'text.secondary' }}>{icon}</Box>}
				<Typography variant='body2' color={labelColor ?? 'text.secondary'}>
					{label}
				</Typography>
			</Stack>

			{value && (
				<Box>
					{typeof value === 'string' || typeof value === 'number' ? (
						<Typography variant='body2'>{value}</Typography>
					) : (
						value
					)}
				</Box>
			)}
		</Stack>
	);
	interface DocumentItem {
		name: string;
		dateAdded: string;
		onDownload?: () => void;
	}

	interface DocumentCardProps {
		documents: DocumentItem[];
	}

	const DocumentCard: React.FC<DocumentCardProps> = ({ documents }) => {
		return (
			<Stack spacing={1}>
				{documents.map((doc, index) => (
					<Card elevation={1} variant='outlined' key={index}>
						<Stack
							direction='row'
							justifyContent='space-between'
							alignItems='center'
							spacing={0}
							padding={1}
						>
							<Stack direction={'row'} spacing={2} alignItems='center'>
								<Box
									sx={{
										display: 'inline-flex',
										alignItems: 'center',
										justifyContent: 'center',
										p: 1,
										borderRadius: 2,
										bgcolor: '#E3F2FD',
										boxShadow: 1,
									}}
								>
									<KlubiqIcons.DescriptionIconCustom fontSize='small' />
								</Box>{' '}
								<Stack direction={'column'} spacing={0}>
									<Typography variant='body2'>{doc.name}</Typography>
									<Typography variant='caption' color='text.secondary'>
										{doc.dateAdded}
									</Typography>
								</Stack>
							</Stack>
							<Stack direction='row' spacing={1} alignItems='center'>
								<IconButton
									size='small'
									onClick={doc.onDownload}
									sx={{ p: 0.5 }}
									aria-label='download'
								>
									<KlubiqIcons.DownloadIconCustom fontSize='small' />
								</IconButton>
							</Stack>
						</Stack>
					</Card>
				))}
			</Stack>
		);
	};

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
					<Button variant='klubiqMainButton' >
						Message
					</Button>
				</Stack>
			</Stack>
			<Card sx={styles.detailsCard}>
				<Stack direction='row' spacing={4} alignItems={'center'}>
					<Stack direction='row'>
						<DynamicAvatar
							items={[
								{
									image: tenant.image,
									id: '',
								},
							]}
							variant='square'
							size='large'
						/>
					</Stack>
					<Stack spacing={1}>
						<Typography sx={styles.nameText2}>{tenant.name}</Typography>
						<Stack direction='row' spacing={1} alignItems='center'>
							<KlubiqIcons.EmailIcon fontSize='small' color='action' />
							<Typography variant='body2' color='text.secondary'>
								{tenant.email}
							</Typography>
						</Stack>
						<Stack direction='row' spacing={1} alignItems='center'>
							<KlubiqIcons.PhoneIcon color='action' />
							<Typography
								variant='body2'
								fontSize='small'
								color='text.secondary'
							>
								{tenant.phone}
							</Typography>
						</Stack>
					</Stack>
					<Chip
						label={tenantData?.activeLeases?.[0]?.unit?.status || 'N/A'}
						color={
							(statusColors[
								tenantData?.activeLeases?.[0]?.unit?.status
							] as any) || 'info'
						}
					/>
				</Stack>
			</Card>
			<Card sx={styles.detailsCard}>
				<Stack direction='column'>
					<Stack spacing={1.5}>
						<Typography sx={styles.nameText2}>Property Information</Typography>
						<InfoRow
							icon={<KlubiqIcons.HomeIcon fontSize='small' color='action' />}
							label={tenantData?.activeLeases?.[0]?.propertyName || 'N/A'}
							labelColor='text.primary'
						/>

						<InfoRow
							label={`Unit: ${tenantData?.activeLeases?.[0]?.unit?.unitNumber || 'N/A'}`}
						/>
					</Stack>
				</Stack>
			</Card>

			<Card sx={styles.detailsCard}>
				<Stack direction='column'>
					<Stack spacing={1.5}>
						<Typography sx={styles.nameText2}>Lease Information</Typography>

						<InfoRow
							label='Start Date'
							value={
								tenantData?.activeLeases?.[0]?.leaseStart
									? dayjs(tenantData?.activeLeases?.[0]?.leaseStart).format(
											'll',
										)
									: 'N/A'
							}
							icon={
								<KlubiqIcons.CalendarIcon fontSize='small' color='action' />
							}
						/>
						<InfoRow
							label='End Date'
							value={
								tenantData?.activeLeases?.[0]?.leaseStart
									? dayjs(tenantData?.activeLeases?.[0]?.leaseStart).format(
											'll',
										)
									: 'N/A'
							}
							icon={
								<KlubiqIcons.CalendarIcon fontSize='small' color='action' />
							}
						/>
						<InfoRow
							label='Rent'
							value={
								tenantData?.activeLeases?.[0]?.rentAmount
									? tenantData?.activeLeases?.[0]?.rentAmount
									: 'N/A'
							}
							icon={<KlubiqIcons.MoneyIcon fontSize='small' color='action' />}
						/>
					</Stack>
				</Stack>
			</Card>

			<Card sx={styles.detailsCard}>
				<Stack direction='column'>
					<Stack spacing={1.5}>
						<Typography sx={styles.nameText2}>Payment Status</Typography>
						<InfoRow
							label='Status'
							value={<Chip label='Paid' color='success' size='small' />}
							icon={
								<KlubiqIcons.RoundedCheckIcon
									fontSize='small'
									color='success'
								/>
							}
						/>

						<InfoRow
							label='Last Payment Date'
							value={
								tenantData?.activeLeases?.[0]?.leaseStart
									? dayjs(tenantData?.activeLeases?.[0]?.leaseEnd).format('ll')
									: 'N/A'
							}
							icon={
								<KlubiqIcons.CalendarIcon fontSize='small' color='action' />
							}
						/>
					</Stack>
				</Stack>
			</Card>

			<Stack direction='row' spacing={2}>
				<Card sx={styles.detailsCard}>
					<Stack direction='column' spacing={3}>
						<Typography sx={styles.nameText2}>Application Document</Typography>
						<DocumentCard documents={documents} />
					</Stack>
				</Card>
			</Stack>
		</Stack>
	);
};

export default TenantDetailsNew;
