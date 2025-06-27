import React, { useEffect, useMemo } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
	Typography,
	Stack,
	Card,
	Box,
	// IconButton,
	Chip,
	// useTheme,
	// useMediaQuery,
	CardContent,
} from '@mui/material';
// import dayjs from 'dayjs';
import * as KlubiqIcons from '../../../components/Icons/CustomIcons';
import {
	InfoCard,
	// DynamicAvatar,
	PageDetail,
} from '@klubiq/ui-components';
// import { styles } from './styles';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { useDynamicBreadcrumbs } from '../../../hooks/useDynamicBreadcrumbs';
import { useGetSingleTenantByIdQuery } from '../../../store/TenantStore/tenantApiSlice';
// import { TenantInfo } from '../../../shared/type';
import { BreadcrumbItem } from '../../../context/BreadcrumbContext/BreadcrumbContext';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { formatDate, getLocaleFormat } from '../../../helpers/utils';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';

interface TenantDetails {
	name: string;
	companyName: string;
	phone: string;
	email: string;
	active: boolean;
	image: string;
	properties: {
		name: string;
		address: string;
		unitNumber: string;
		unitId: string;
	}[];
	leases: {
		property?: string;
		unit?: string;
		id: string;
		startDate: string;
		endDate: string;
		rentAmount: string;
		paymentFrequency: string;
	}[];
	paymentStatus: {
		property?: string;
		unit?: string;
		status: string;
		lastPaymentDate: string;
	}[];
	documents: {
		name: string;
		dateAdded: string;
		onDownload: () => void;
	}[];
}

const TenantDetailsNew = () => {
	const { user } = useSelector(getAuthState);
	// const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const currentTenantId = location.pathname.split('/')[2]!;
	const { data: tenantData, isLoading } = useGetSingleTenantByIdQuery({
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
				path: `/tenants/${currentTenantId}`,
				icon: null,
				showIcon: false,
			};
		}
		newBreadcrumbs['feature-details-sub'] = {};
		updateBreadcrumb(newBreadcrumbs);
	}, [tenantData?.firstName, currentTenantId, location.pathname]);
	console.log('tenantData', tenantData);
	const tenantDetails: TenantDetails = useMemo(() => {
		const { profile, activeLeases, documents } = tenantData || {};

		const mapLeaseData = (lease: any) => ({
			name: lease.propertyName,
			address: lease.propertyAddress,
			unitNumber: lease.unit?.unitNumber,
			unitId: lease.unit?.id,
		});

		const mapLeaseInfo = (lease: any) => ({
			id: lease.id,
			startDate: lease.leaseStart,
			endDate: lease.leaseEnd,
			rentAmount: lease.rentAmount,
			paymentFrequency: lease.paymentFrequency,
			property: activeLeases.length > 1 ? lease.propertyName : '',
			unit: activeLeases.length > 1 ? lease.unit?.unitNumber : '',
		});

		const mapPaymentStatus = (lease: any) => ({
			leaseName: lease.propertyName,
			status: lease.paymentStatus || null,
			lastPaymentDate: lease.lastPaymentDate || null,
			property: activeLeases.length > 1 ? lease.propertyName : '',
			unit: activeLeases.length > 1 ? lease.unit?.unitNumber : '',
		});

		const mapDocuments = (document: any) => ({
			name: document.name,
			dateAdded: document.dateAdded,
			onDownload: () => alert('Downloading Document...'),
		});

		return {
			name: profile?.fullName || '',
			companyName: profile?.companyName || '',
			phone: profile?.phoneNumber || '',
			email: profile?.email || '',
			active: profile?.isActive ?? true,
			image: profile?.profilePicUrl || '',
			properties: activeLeases?.map(mapLeaseData) || [],
			leases: activeLeases?.map(mapLeaseInfo) || [],
			paymentStatus: activeLeases?.map(mapPaymentStatus) || [],
			documents: documents?.map(mapDocuments) || [],
		};
	}, [tenantData]);
	console.log('tenantDetails', tenantDetails);
	// const tenant: TenantInfo = {
	// 	name: (() => {
	// 		const fullName = tenantData?.profile?.fullName?.trim();
	// 		const companyName = tenantData?.profile?.companyName?.trim();
	// 		return fullName || companyName;
	// 	})(),
	// 	phone: tenantData?.profile?.phoneNumber || '',
	// 	email: tenantData?.profile?.email || '',
	// 	active: tenantData?.profile?.isActive || true,
	// 	image: tenantData?.profile?.profilePicUrl || '',
	// };
	// const documents = [
	// 	{
	// 		name: 'Rental Application Form',
	// 		dateAdded: 'Jan 10, 2023',
	// 		onDownload: () => alert('Downloading Rental Application...'),
	// 	},
	// 	{
	// 		name: 'Credit Report',
	// 		dateAdded: 'Jan 10, 2023',
	// 		onDownload: () => alert('Downloading Credit Report...'),
	// 	},
	// ];
	// const InfoRow: React.FC<{
	// 	label: string;
	// 	value?: React.ReactNode;
	// 	icon?: React.ReactNode;
	// 	labelColor?: string;
	// }> = ({ label, value, icon, labelColor }) => (
	// 	<Stack
	// 		direction='row'
	// 		justifyContent='space-between'
	// 		alignItems='center'
	// 		spacing={1}
	// 	>
	// 		<Stack direction='row' spacing={1} alignItems='center' flex={1}>
	// 			{icon && <Box sx={{ color: 'text.secondary' }}>{icon}</Box>}
	// 			<Typography variant='body2' color={labelColor ?? 'text.secondary'}>
	// 				{label}
	// 			</Typography>
	// 		</Stack>

	// 		{value && (
	// 			<Box>
	// 				{typeof value === 'string' || typeof value === 'number' ? (
	// 					<Typography variant='body2'>{value}</Typography>
	// 				) : (
	// 					value
	// 				)}
	// 			</Box>
	// 		)}
	// 	</Stack>
	// );
	// interface DocumentItem {
	// 	name: string;
	// 	dateAdded: string;
	// 	onDownload?: () => void;
	// }

	// interface DocumentCardProps {
	// 	documents: DocumentItem[];
	// }

	// const DocumentCard: React.FC<DocumentCardProps> = ({ documents }) => {
	// 	return (
	// 		<Stack spacing={1}>
	// 			{documents.map((doc, index) => (
	// 				<Card variant='outlined' key={index}>
	// 					<Stack
	// 						direction='row'
	// 						justifyContent='space-between'
	// 						alignItems='center'
	// 						spacing={0}
	// 						padding={1}
	// 					>
	// 						<Stack direction={'row'} spacing={2} alignItems='center'>
	// 							<Box
	// 								sx={{
	// 									display: 'inline-flex',
	// 									alignItems: 'center',
	// 									justifyContent: 'center',
	// 									p: 1,
	// 									borderRadius: 2,
	// 									bgcolor: '#E3F2FD',
	// 									boxShadow: 1,
	// 								}}
	// 							>
	// 								<KlubiqIcons.DescriptionIconCustom fontSize='small' />
	// 							</Box>{' '}
	// 							<Stack direction={'column'} spacing={0}>
	// 								<Typography variant='body2'>{doc.name}</Typography>
	// 								<Typography variant='caption' color='text.secondary'>
	// 									{doc.dateAdded}
	// 								</Typography>
	// 							</Stack>
	// 						</Stack>
	// 						<Stack direction='row' spacing={1} alignItems='center'>
	// 							<IconButton
	// 								size='small'
	// 								onClick={doc.onDownload}
	// 								sx={{ p: 0.5 }}
	// 								aria-label='download'
	// 							>
	// 								<KlubiqIcons.DownloadIconCustom fontSize='small' />
	// 							</IconButton>
	// 						</Stack>
	// 					</Stack>
	// 				</Card>
	// 			))}
	// 		</Stack>
	// 	);
	// };
	const renderPropertyInfo = (
		properties: TenantDetails['properties'],
		title: string,
		icon: React.ReactNode,
	) => {
		if (!properties || properties.length === 0) {
			return null;
		}

		return (
			<Card elevation={0}>
				<CardContent>
					<Typography variant='h6' fontWeight={600} mb={2}>
						{title}
					</Typography>
					<Stack spacing={2}>
						{properties.map((property, index) => (
							<Card elevation={0} key={index} sx={{ borderRadius: 2, backgroundColor: 'background.default' }}>
								<CardContent>
									<Stack
										direction='column'
										key={index}
										justifyContent='space-between'
										alignItems='flex-start'
										gap={1}
									>
										<Stack
											direction='row'
											alignItems='center'
											justifyContent='flex-start'
											spacing={1.5}
										>
											{icon && (
												<Box sx={{ color: 'text.secondary', display: 'flex' }}>
													{icon}
												</Box>
											)}
											<Typography variant='body2'>{property.name}</Typography>
										</Stack>
										<Typography variant='body1' sx={{ textAlign: 'left' }}>
											Unit {property.unitNumber}
										</Typography>
									</Stack>
								</CardContent>
							</Card>
						))}
					</Stack>
				</CardContent>
			</Card>
		);
	};

	const renderLeaseInfo = (leases: TenantDetails['leases']) => {
		if (!leases || leases.length === 0) {
			return null;
		}

		return (
			<Card elevation={0}>
				<CardContent>
					<Typography variant='h6' fontWeight={600} mb={2}>
						Lease Information
					</Typography>
					<Stack spacing={2}>
						{leases.map((lease, index) => (
							<InfoCard
								key={index}
								title={`${lease.property ? lease.property + ':' + lease.unit : ''}`}
								items={[
									{
										id: `lease-${index}-start-date`,
										label: 'Start Date',
										value: formatDate(lease.startDate),
										icon: (
											<KlubiqIcons.CalendarIcon
												fontSize='small'
												color='action'
											/>
										),
									},
									{
										id: `lease-${index}-end-date`,
										label: 'End Date',
										value: formatDate(lease.endDate),
										icon: (
											<KlubiqIcons.CalendarIcon
												fontSize='small'
												color='action'
											/>
										),
									},
									{
										id: `lease-${index}-rent-amount`,
										label: 'Rent',
										value: (
											<span>
												{getLocaleFormat(
													user?.orgSettings,
													+(lease.rentAmount || 0),
													'currency',
												)}{' '}
												[{lease.paymentFrequency}]
											</span>
										),
										icon: (
											<KlubiqIcons.MoneyIcon fontSize='small' color='action' />
										),
									},
								]}
							/>
						))}
					</Stack>
				</CardContent>
			</Card>
		);
	};

	const renderPaymentStatusInfo = (
		paymentStatus: TenantDetails['paymentStatus'],
	) => {
		if (!paymentStatus || paymentStatus.length === 0) {
			return null;
		}

		return (
			<Card elevation={0}>
				<CardContent>
					<Typography variant='h6' fontWeight={600} mb={2}>
						Payment Status
					</Typography>
					<Stack spacing={2}>
						{paymentStatus.map((payment, index) => (
							<InfoCard
								key={index}
								title={`${payment.property ? payment.property + ':' + payment.unit : ''}`}
								items={[
									{
										id: `lease-${index}-start-date`,
										label: 'Status',
										value: (
											<Chip
												label={payment.status === 'Paid' ? 'Paid' : 'Unpaid'}
												color={payment.status === 'Paid' ? 'success' : 'error'}
												size='small'
											/>
										),
										icon: (
											<KlubiqIcons.RoundedCheckIcon
												fontSize='small'
												color={payment.status === 'Paid' ? 'success' : 'error'}
											/>
										),
									},
									{
										id: `lease-${index}-end-date`,
										label: 'End Date',
										value: formatDate(payment.lastPaymentDate),
										icon: (
											<KlubiqIcons.CalendarIcon
												fontSize='small'
												color='action'
											/>
										),
									},
								]}
							/>
						))}
					</Stack>
				</CardContent>
			</Card>
		);
	};
	return (
		// <Stack gap={2} justifyContent={'space-between'}>
		// 	<Stack
		// 		direction={'row'}
		// 		sx={{
		// 			justifyContent: 'space-between',
		// 			alignItems: 'center',
		// 			width: '100%',
		// 		}}
		// 	>
		// 		<Breadcrumb />
		// 		{/* <Stack>
		// 			<Button variant='klubiqMainButton' >
		// 				Message
		// 			</Button>
		// 		</Stack> */}
		// 	</Stack>
		// 	<Card sx={styles.detailsCard}>
		// 		<Stack
		// 			direction='row'
		// 			gap={2}
		// 			alignItems={'center'}
		// 			justifyContent={'flex-start'}
		// 		>
		// 			<DynamicAvatar
		// 				showName={false}
		// 				items={[
		// 					{
		// 						image: tenant.image || '',
		// 						id: '',
		// 						variant: 'square',
		// 						name: tenant.name,
		// 					},
		// 				]}
		// 				size={isMobile ? 'medium' : 'large'}
		// 			/>
		// 			<Stack gap={1} direction='column'>
		// 				<Typography variant='h4'>{tenant.name}</Typography>
		// 				<Stack direction='row' gap={1} alignItems='center'>
		// 					<KlubiqIcons.EmailIcon fontSize='small' color='action' />
		// 					<Typography
		// 						variant='body2'
		// 						color='text.secondary'
		// 						sx={{ wordBreak: 'break-word' }}
		// 					>
		// 						{tenant.email}{' '}
		// 					</Typography>
		// 					<Chip size='small' label={'active'} color={'info'} />
		// 				</Stack>
		// 				<Stack direction='row' gap={1} alignItems='center'>
		// 					<KlubiqIcons.PhoneIcon color='action' />
		// 					<Typography
		// 						variant='body2'
		// 						fontSize='small'
		// 						color='text.secondary'
		// 					>
		// 						{tenant.phone}
		// 					</Typography>
		// 				</Stack>
		// 			</Stack>
		// 		</Stack>
		// 	</Card>
		// 	<Card sx={styles.detailsCard}>
		// 		<Stack direction='column'>
		// 			<Stack spacing={1.5}>
		// 				<Typography variant='h4'>Property Information</Typography>
		// 				<InfoRow
		// 					icon={<KlubiqIcons.HomeIcon fontSize='small' color='action' />}
		// 					label={tenantData?.activeLeases?.[0]?.propertyName || 'N/A'}
		// 					labelColor='text.primary'
		// 				/>

		// 				<InfoRow
		// 					label={`Unit: ${tenantData?.activeLeases?.[0]?.unit?.unitNumber || 'N/A'}`}
		// 				/>
		// 			</Stack>
		// 		</Stack>
		// 	</Card>

		// 	<Card sx={styles.detailsCard}>
		// 		<Stack direction='column'>
		// 			<Stack spacing={1.5}>
		// 				<Typography variant='h4'>Lease Information</Typography>

		// 				<InfoRow
		// 					label='Start Date'
		// 					value={
		// 						tenantData?.activeLeases?.[0]?.leaseStart
		// 							? dayjs(tenantData?.activeLeases?.[0]?.leaseStart).format(
		// 									'll',
		// 								)
		// 							: 'N/A'
		// 					}
		// 					icon={
		// 						<KlubiqIcons.CalendarIcon fontSize='small' color='action' />
		// 					}
		// 				/>
		// 				<InfoRow
		// 					label='End Date'
		// 					value={
		// 						tenantData?.activeLeases?.[0]?.leaseStart
		// 							? dayjs(tenantData?.activeLeases?.[0]?.leaseStart).format(
		// 									'll',
		// 								)
		// 							: 'N/A'
		// 					}
		// 					icon={
		// 						<KlubiqIcons.CalendarIcon fontSize='small' color='action' />
		// 					}
		// 				/>
		// 				<InfoRow
		// 					label='Rent'
		// 					value={
		// 						tenantData?.activeLeases?.[0]?.rentAmount
		// 							? tenantData?.activeLeases?.[0]?.rentAmount
		// 							: 'N/A'
		// 					}
		// 					icon={<KlubiqIcons.MoneyIcon fontSize='small' color='action' />}
		// 				/>
		// 			</Stack>
		// 		</Stack>
		// 	</Card>

		// 	<Card sx={styles.detailsCard}>
		// 		<Stack direction='column'>
		// 			<Stack spacing={1.5}>
		// 				<Typography variant='h4'>Payment Status</Typography>
		// 				<InfoRow
		// 					label='Status'
		// 					value={<Chip label='Paid' color='success' size='small' />}
		// 					icon={
		// 						<KlubiqIcons.RoundedCheckIcon
		// 							fontSize='small'
		// 							color='success'
		// 						/>
		// 					}
		// 				/>

		// 				<InfoRow
		// 					label='Last Payment Date'
		// 					value={
		// 						tenantData?.activeLeases?.[0]?.leaseStart
		// 							? dayjs(tenantData?.activeLeases?.[0]?.leaseEnd).format('ll')
		// 							: 'N/A'
		// 					}
		// 					icon={
		// 						<KlubiqIcons.CalendarIcon fontSize='small' color='action' />
		// 					}
		// 				/>
		// 			</Stack>
		// 		</Stack>
		// 	</Card>

		// 	<Stack direction='row' spacing={2}>
		// 		<Card sx={styles.detailsCard}>
		// 			<Stack direction='column' spacing={3}>
		// 				<Typography variant='h4'>Application Document</Typography>
		// 				<DocumentCard documents={documents} />
		// 			</Stack>
		// 		</Card>
		// 	</Stack>

		// </Stack>
		<Stack gap={2} justifyContent={'space-between'}>
			<Breadcrumb />
			<Box sx={{ width: '100%' }}>
				<PageDetail
					loading={isLoading}
					variant='tenant-detail'
					headerData={{
						avatar: [
							{
								image: tenantDetails.image,
								id: '',
								variant: 'square',
								name: tenantDetails.name,
							},
						],
						companyName: tenantDetails.companyName,
						name: tenantDetails.name,
						email: tenantDetails.email,
						phone: tenantDetails.phone,
						status: tenantDetails.active ? 'Active' : 'Inactive',
					}}
					showTabs={false}
					displayMode='container'
					detailSections={[
						{
							id: 'property-info',
							type: 'custom',
							content: renderPropertyInfo(
								tenantDetails.properties,
								'Property Information',
								<KlubiqIcons.HomeIcon fontSize='small' color='action' />,
							),
						},
						{
							id: 'lease-info',
							type: 'custom',
							content: renderLeaseInfo(tenantDetails.leases),
						},
						{
							id: 'payment-status-info',
							type: 'custom',
							content: renderPaymentStatusInfo(tenantDetails.paymentStatus),
						},
						...tenantDetails.documents.map((document, index) => ({
							id: `document-${index}`,
							type: 'infoCard' as const,
							title: index === 0 ? 'Application Document' : '',
							items: [
								{
									id: `document-${index}-name`,
									label: 'Name',
									value: document.name,
									icon: (
										<KlubiqIcons.DescriptionIconCustom
											fontSize='small'
											color='action'
										/>
									),
								},
								{
									id: `document-${index}-date-added`,
									label: 'Date Added',
									value: formatDate(document.dateAdded),
									icon: (
										<KlubiqIcons.CalendarIcon fontSize='small' color='action' />
									),
								},
							],
						})),
					]}
				/>
			</Box>
		</Stack>
	);
};

export default TenantDetailsNew;
