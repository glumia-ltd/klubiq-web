import React, { useEffect, useMemo, useState } from 'react';
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
import { DynamicBreadcrumb, InfoCard, PageDetail } from '@klubiq/ui-components';
// import { styles } from './styles';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { useDynamicBreadcrumbs } from '../../../hooks/useDynamicBreadcrumbs';
import { useGetSingleTenantByIdQuery } from '../../../store/TenantStore/tenantApiSlice';
// import { TenantInfo } from '../../../shared/type';
import { BreadcrumbItem } from '../../../context/BreadcrumbContext/BreadcrumbContext';
import { formatDate, getLocaleFormat } from '../../../helpers/utils';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { ViewList } from '@mui/icons-material';
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

const TenantDetails = () => {
	const { user } = useSelector(getAuthState);
	// const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const [routeMap, setRouteMap] = useState({});
	const currentTenantId = location.pathname.split('/')[2]!;
	const { data: tenantData, isLoading } = useGetSingleTenantByIdQuery({
		id: id || currentTenantId || '',
	});
	
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
		setRouteMap({
			'/tenants': {
				path: '/tenants',
				slug: '',
				icon: <ViewList />,
			},
			'/tenants/:id': {
				path: '/tenants/:id',
				slug:
					`${tenantData?.profile?.firstName} ${tenantData?.profile?.lastName}` +
					(tenantData?.profile?.companyName ? ` (${tenantData?.profile?.companyName})` : ''),
				dynamic: true,
			},
		});
	}, [tenantData?.profile?.firstName, tenantData?.profile?.lastName, tenantData?.profile?.companyName, currentTenantId, location.pathname]);
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
							<Card
								elevation={0}
								sx={{ borderRadius: 2, backgroundColor: 'background.default' }}
							>
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
										label: 'Payment Date',
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
											<Typography variant='body2'>
												{getLocaleFormat(
													user?.orgSettings,
													+(lease.rentAmount || 0),
													'currency',
												)}{' '}
												/ {lease.paymentFrequency}
											</Typography>
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
		<Stack gap={2} justifyContent={'space-between'}>
			<DynamicBreadcrumb
				currentPath={location.pathname}
				routeMap={routeMap}
				onNavigate={(path) => navigate(path)}
			/>
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
								name: tenantDetails.name, // optional but helpful
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

export default TenantDetails;
