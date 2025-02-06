import { Stack, Button, Typography, Chip } from '@mui/material';
import { styles } from './style';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LeaseIcon } from '../../components/Icons/CustomIcons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LeasePropertyCard from '../../components/LeaseCards/LeasePropertyCard';
import MiniCard from '../../components/LeaseCards/MiniCard';
// import DocumentUploadCard from '../../components/LeaseCards/DocumentUploadCard';
import { LeaseDocumentTable } from './LeaseDocumentTable';
import { useGetSingleLeaseByIdQuery } from '../../store/LeaseStore/leaseApiSlice';
import { useLocation } from 'react-router-dom';
import { getCurrencySymbol } from '../../helpers/utils';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import dayjs from 'dayjs';

const LeaseDetails = () => {
	const location = useLocation();
	const { user } = useSelector(getAuthState);

	const currentLeaseId = location.pathname.split('/')[2]!;

	const { data } = useGetSingleLeaseByIdQuery({ id: currentLeaseId || '' });

	const documentTableData = {
		column: [
			{ id: 'name', label: 'Name' },
			{ id: 'date', label: 'Date' },
		],
		row: [{ name: 'Maintenance Fee', date: 'second' }],
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
					<Stack direction='row' sx={{ alignItems: 'center' }} spacing={2}>
						<LeaseIcon sx={{ cursor: 'pointer' }} />
						<ArrowForwardIosIcon sx={styles.topIcon} />
						<Typography sx={styles.detailsText}> Lease Detail</Typography>
					</Stack>

					<Stack>
						<Button variant='contained' sx={styles.actionButton}>
							Action
							<MoreVertIcon />
						</Button>
					</Stack>
				</Stack>

				<Stack direction={'row'} fontWeight={600}>
					<Chip
						label={'Active'}
						color={'success'}
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
						propertyName={data?.propertyName}
						isMultiUnitProperty={data?.isMultiUnitProperty}
						propertyAddress={data?.propertyAddress}
						propertyType={data?.propertyType}
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
							sm: 'wrap',
							md: 'wrap',
							lg: 'nowrap',
							xl: 'nowrap',
						},
					}}
				>
					<MiniCard
						value={`${getCurrencySymbol(user)}${data?.rentAmount}`}
						name='Rent'
						status={data?.status}
					/>
					<MiniCard
						dangerouslySetInnerHTML={data?.rentDueOn}
						name='Due On'
						status={data?.status}
					/>
					<MiniCard
						value={data?.paymentFrequency}
						name='Payment Period'
						status={data?.status}
					/>
					<MiniCard
						value={
							data?.nextPaymentDate
								? dayjs(data.nextPaymentDate).format('DD-MM-YYYY')
								: ''
						}
						name='Next Payment'
						status={data?.status}
					/>
					<MiniCard value={''} name='Tenant' status={data?.status} />
					<MiniCard
						value={`${data?.daysToLeaseExpires} day${Number(data?.daysToLeaseExpires) > 1 ? 's' : ''}`}
						name='Lease Expires'
						status={data?.status}
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
