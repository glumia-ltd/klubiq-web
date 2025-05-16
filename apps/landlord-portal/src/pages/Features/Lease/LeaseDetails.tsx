import { Stack, Button, Chip } from '@mui/material';
import { styles } from './style';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LeasePropertyCard from '../../../components/LeaseCards/LeasePropertyCard';
import MiniCard from '../../../components/LeaseCards/MiniCard';
// import DocumentUploadCard from '../../components/LeaseCards/DocumentUploadCard';
import { LeaseDocumentTable } from './LeaseDocumentTable';
import { useGetSingleLeaseByIdQuery } from '../../../store/LeaseStore/leaseApiSlice';
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


const LeaseDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useSelector(getAuthState);
	const { updateBreadcrumb } = useDynamicBreadcrumbs();
	const timeDateOptions = {
		dateStyle: DateStyle.FULL,
		hour12: true,
	};
	const currentLeaseId = location.pathname.split('/')[2]!;

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
						<Button variant='klubiqMainButton'>
							Action
							<MoreVertIcon />
						</Button>
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
					<MiniCard value={leaseData?.tenants?.length?.toString() ?? '0'} name='Tenant' status={leaseData?.status} />
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
		</>
	);
};

export default LeaseDetails;
