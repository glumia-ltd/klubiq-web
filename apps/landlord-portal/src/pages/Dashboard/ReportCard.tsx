import { Button, Typography, Box, Avatar } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import user from '../../assets/manImage.svg';
const CardData = [
	{ name: 'feyi', id: '1' },
	{ name: 'Dayo', id: '2' },
	{ name: 'feyi', id: '3' },
	{ name: 'ife', id: '4' },
	{ name: 'Amaka', id: '5' },
];

const ReportCard = () => {
	return (
		<Box overflow={'auto'} height='370px'>
			<Box
				sx={{
					display: { xs: 'flex', md: 'block', lg: 'flex' },
					justifyContent: {
						xs: 'space-between',
						md: 'flex-end',
						lg: 'space-between',
						xl: 'space-between',
					},
					alignItems: 'center',
					marginBottom: '8px',
				}}
			>
				<Typography fontWeight={'800px'} fontSize={'16px'} lineHeight={'20px'}>
					Report
				</Typography>
				<Button
					disableTouchRipple
					sx={{
						border: 'none',
						// backgroundColor: 'transparent',
						// textAlign:"left",
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
				<Box key={index} mb={2}>
					<Box
						sx={{
							display: { xs: 'flex', sm: 'box', md: 'flex', lg: 'flex' },
							alignItems: 'center',
							justifyContent: {
								xs: 'space-between',
								sm: 'left',
								md: 'left',
								lg: 'left',
								xl: 'left',
							},
							marginLeft: '10px',
						}}
					>
						<Avatar alt='user' src={user} />
						<Box sx={{ textAlign: 'left' }}>
							<Typography
								textTransform={'capitalize'}
								// textAlign={{ xs: 'right', sm: 'left', md: 'left', lg: 'right' }}
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
								View{' '}
							</Button>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default ReportCard;
