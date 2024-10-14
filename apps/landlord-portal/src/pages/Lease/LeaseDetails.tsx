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
			<Container maxWidth='xl' sx={styles.container}>
				<Stack spacing={5}>
					<Stack
						direction={'row'}
						spacing={{ xs: 1, sm: 1, md: 1 }}
						sx={styles.detailsBox}
					>
						<img src={LeaseIcon} alt='icon' />
						<ArrowForwardIosIcon sx={styles.topIcon} />
						<Typography sx={styles.detailsText}> Lease Detail</Typography>
					</Stack>
					<Stack
						direction={'row'}
						spacing={{ xs: 1, sm: 2, md: 2 }}
						sx={styles.buttonContainer}
					>
						<Button
							variant='contained'
							sx={styles.actionButton}
							// onClick={handleAddProperties}
						>
							Action
							<MoreVertIcon />
						</Button>
					</Stack>
					<Stack direction={'row'}>
						<Chip
							label={'Active'}
							color={'success'}
							variant='outlined'
							sx={styles.chip}
						/>
					</Stack>
					<Stack direction={'row'} spacing={{ xs: 1, sm: 2, md: 8 }}>
						<LeasePropertyCard />
					</Stack>
					<Box
						sx={{
							justifyContent: 'space-between',
							alignItems: 'center',
							display: 'flex',
						}}
					>
						{Datas.map((Data) => (
							<MiniCard Amount={Data.amount} Name={Data.name} />
						))}
					</Box>
					<Stack direction={'row'} spacing={{ xs: 1, sm: 2, md: 8 }}>
						<DocumentUploadCard />
					</Stack>
				</Stack>
			</Container>
		</>
	);
};

export default LeaseDetails;
