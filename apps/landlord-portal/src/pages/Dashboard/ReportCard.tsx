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
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '8px',
				}}
			>
				<Typography fontWeight={'800px'} fontSize={'16px'} lineHeight={'20px'}>
					Report
				</Typography>
				<Button disableTouchRipple>
					<AddCircleRoundedIcon />
					<Typography fontWeight={'500px'} fontSize={'14x'} lineHeight={'20px'}>
						Add Report
					</Typography>
				</Button>
			</Box>

			{CardData.map((data, index) => (
				<Box
					key={index}
					sx={{
						display: 'flex',
						marginBottom: '15px',
						alignItems: 'center',
						padding: '.3rem',
					}}
				>
					<Avatar
						alt='user'
						src={user}
						sx={{ border: '1px solid red', marginRight: '15px' }}
					/>

					<Typography textTransform={'capitalize'} textAlign={'right'}>
						{data.name} sent a report
					</Typography>
				</Box>
			))}
		</Box>
	);
};

export default ReportCard;
