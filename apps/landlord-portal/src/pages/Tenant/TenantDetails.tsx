import { styles } from '../Lease/style';
import {
	// Container,
	Stack,
	Typography,
	Card,
	Box,
	IconButton,
} from '@mui/material';
import bukky from '../../assets/images/bukky.png';
import * as KlubiqIcons from '../../components/Icons/CustomIcons';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { HistoryTable } from '../Lease/HistoryTable';
import TenantDocument from '../Tenant/TenantDocument';

const TenantDetails = () => {
	const Datas = [
		{
			name: 'Monthly Rent',
			amount: '500,000',
		},

		{
			name: 'Start Date ',
			amount: '06/02/2024',
		},
		{
			name: 'End Date ',
			amount: '06/02/2028',
		},
		{
			name: 'Late Payment',
			amount: '2 ',
		},
	];
	return (
		// <Container maxWidth='xl' sx={styles.container}>
		<>
			<Stack spacing={4}>
				<Stack direction={'row'} spacing={{ xs: 1, sm: 1, md: 1 }}>
					<Card sx={styles.detailsCard}>
						<Stack
							direction={'row'}
							spacing={0}
							sx={{
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Stack direction={'row'} spacing={3}>
								<img
									src={bukky}
									alt='tenant picture'
									style={styles.imageStyle}
								/>
								<Stack direction={'column'} spacing={5}>
									<Stack direction={'row'} spacing={3} sx={styles.firstBox}>
										<Typography sx={styles.nameText}>Aisha Rohni</Typography>
										<IconButton>
											<KlubiqIcons.EditIcon sx={styles.iconStyleTwo} />{' '}
											<Typography sx={styles.boxText}>Edit</Typography>
										</IconButton>
									</Stack>

									<Stack direction={'row'} spacing={2}>
										<Box sx={styles.tenBox}>
											<MailOutlinedIcon sx={styles.iconStyleTwo} />
											<Typography sx={styles.boxText}> 08132557699</Typography>
										</Box>
										<Box sx={styles.tenBox}>
											<MailOutlinedIcon sx={styles.iconStyleTwo} />
											<Typography sx={styles.boxText}>
												{' '}
												aishar@yahoo.com
											</Typography>
										</Box>
									</Stack>
								</Stack>
							</Stack>
							<Stack direction={'column'} spacing={1}>
								<Typography sx={styles.detailsText}>Tenant Since</Typography>
								<Typography sx={styles.boxText}> 06/02/2024</Typography>
							</Stack>
						</Stack>
					</Card>
				</Stack>

				<Stack direction={'row'}>
					<Card sx={styles.detailsCard}>
						<Stack direction={'column'} spacing={3}>
							<Stack direction={'column'} spacing={1}>
								<Stack direction={'row'} spacing={2} sx={styles.firstBox}>
									<Typography sx={styles.nameText2}>Current Lease</Typography>
									<Typography sx={styles.cardTwoText}>
										Orchid House | Unit O
									</Typography>
								</Stack>
								<Typography sx={styles.typo3}>
									4, Shaw Road (Onilegbale Road) Ikoyi
								</Typography>
							</Stack>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								{Datas.map((Data) => (
									<Box>
										<Typography sx={styles.typo2}>{Data.name}</Typography>
										<Typography sx={styles.nameText}>{Data.amount}</Typography>
									</Box>
								))}
							</Box>
						</Stack>
					</Card>
				</Stack>

				<Stack direction={'row'} spacing={{ xs: 1, sm: 1, md: 1 }}>
					<Card sx={styles.detailsCard}>
						<Stack
							direction={'row'}
							spacing={0}
							sx={{
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<HistoryTable />
						</Stack>
					</Card>
				</Stack>
				<Stack direction={'row'} spacing={{ xs: 1, sm: 1, md: 1 }}>
					<Card sx={styles.detailsCard}>
						<Stack
							direction={'row'}
							spacing={0}
							sx={{
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<TenantDocument />
						</Stack>
					</Card>
				</Stack>
			</Stack>
		</>
		// </Container>
	);
};

export default TenantDetails;
