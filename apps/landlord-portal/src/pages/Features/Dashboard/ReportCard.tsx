// import { Button, Typography, Box, Avatar, Card } from '@mui/material';
// import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// import user from '../../assets/manImage.svg';
import { styles } from './style';
import { Typography, Card } from '@mui/material';
// const CardData = [
// 	{ name: 'feyi', id: '1' },
// 	{ name: 'Dayo', id: '2' },
// 	{ name: 'feyi', id: '3' },
// 	{ name: 'ife', id: '4' },
// 	{ name: 'Amaka', id: '5' },
// ];

const ReportCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
	return (
		<Card sx={styles.cardStyleFive}>
			<Typography variant='h6'>{title}</Typography>
			{children}

			{/* <Box
				sx={{
					display: { xs: 'flex', md: 'flex', lg: 'flex' },
					justifyContent: {
						xs: 'space-between',
						md: 'space-between',
						lg: 'space-between',
						xl: 'space-between',
					},
					alignItems: 'center',
					marginBottom: '18px',
				}}
			>
				<Typography fontWeight={'800px'} fontSize={'16px'} lineHeight={'20px'}>
					Report
				</Typography>
				<Button
					disableTouchRipple
					sx={{
						border: 'none',

						'&:hover': {
							background: 'none',
						},
					}}
				>
					<AddCircleRoundedIcon />
					<Typography fontWeight={'500px'} fontSize={'14x'} lineHeight={'20px'}>
						Add Report
					</Typography>
				</Button>
			</Box>

			{CardData.map((data, index) => (
				<Box key={index} mb={1} textAlign={'center'}>
					<Box
						sx={{
							display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' },
							alignItems: 'left',
						}}
					>
						<Box mr={{ xs: '2.5rem', sm: '0.5rem', md: '0.5rem', lg: '3rem' }}>
							<Avatar
								alt='user'
								sx={{ width: '50px', height: '50px' }}
								src={user}
							/>
						</Box>
						<Box>
							<Typography
								textTransform={'capitalize'}
								textAlign={{
									xs: 'center',
									sm: 'center',
									md: 'center',
									lg: 'right',
								}}
								// ml={{ md: '10px', lg: '25px' }}
							>
								{data.name} sent a report
							</Typography>
							<Button
								sx={{
									backgroundColor: 'transparent',
									'&:hover': {
										background: 'none',
									},
								}}
								disableTouchRipple
							>
								<Typography>View</Typography>
							</Button>
						</Box>
					</Box>
				</Box>
			))} */}
		</Card>
	);
};

export default ReportCard;
