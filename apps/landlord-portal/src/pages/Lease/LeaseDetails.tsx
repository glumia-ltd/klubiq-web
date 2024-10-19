import { Container, Stack, Button, Typography, Chip, Box } from '@mui/material';
import { styles } from './style';
// import { useEffect, useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LeaseIcon from '../../assets/images/Lease.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LeasePropertyCard from '../../components/LeaseCards/LeasePropertyCard';
import MiniCard from '../../components/LeaseCards/MiniCard';
import DocumentUploadCard from '../../components/LeaseCards/DocumentUploadCard';
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
						<img src={LeaseIcon} alt='icon' />
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
					<LeasePropertyCard />
				</Stack>

				<Stack
					spacing={2}
					useFlexGap
					direction={{ xs: 'column', sm: 'row' }}
					sx={{
						justifyContent: 'space-between',
						width: '100%',
						flexWrap: { xs: 'nowrap', sm: 'wrap', md: 'wrap' },
					}}
				>
					{Datas.map((Data) => (
						<MiniCard Amount={Data.amount} Name={Data.name} />
					))}
				</Stack>
				<Stack
					direction={'row'}
					spacing={{ xs: 1, sm: 2, md: 8 }}
					sx={{ width: '100%' }}
				>
					<DocumentUploadCard />
				</Stack>
			</Stack>
			{/* </Container> */}
		</>
	);
};

export default LeaseDetails;
