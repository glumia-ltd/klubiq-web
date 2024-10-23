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

const Datas = [
	{
		name: 'Rent',
		amount: '500,000',
	},

	{
		name: 'Due On',
		amount: '2nd of every month',
	},
	{
		name: 'Payment Period',
		amount: 'Monthly',
	},
	{
		name: 'Next Payment',
		amount: '06/02/2024',
	},
	{
		name: 'Tenant',
	},
	{
		name: 'Lease Expires',
		amount: '20 days',
	},
];
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
			{/* <Container maxWidth='xl' sx={styles.container}> */}
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
						{/* <img src={LeaseIcon} alt='icon' /> */}
						<LeaseIcon sx={{ cursor: 'pointer' }} />
						<ArrowForwardIosIcon sx={styles.topIcon} />
						<Typography sx={styles.detailsText}> Lease Detail</Typography>
					</Stack>

					<Stack>
						<Button
							variant='contained'
							sx={styles.actionButton}
							// onClick={handleAddProperties}
						>
							Action
							<MoreVertIcon />
						</Button>
					</Stack>
				</Stack>

				{/* chip stack */}

				<Stack direction={'row'} fontWeight={600}>
					<Chip
						label={'Active'}
						color={'success'}
						variant='outlined'
						sx={styles.chip}
					/>
				</Stack>

				{/* Lease property card */}
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
						value={`${data?.rentDueOn}`}
						name='Due On'
						status={data?.status}
					/>
					<MiniCard
						value={data?.paymentFrequency}
						name='Payment Period'
						status={data?.status}
					/>
					<MiniCard
						value={data?.nextPaymentDate}
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
					{/* <DocumentUploadCard /> */}
					<LeaseDocumentTable documentTableData={documentTableData} />
				</Stack>
			</Stack>
			{/* </Container> */}
		</>
	);
};

export default LeaseDetails;