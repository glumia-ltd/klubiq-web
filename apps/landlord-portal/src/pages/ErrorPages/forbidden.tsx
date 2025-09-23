import { SettingsApplications } from '@mui/icons-material';
import { Typography, Stack, Card, CardContent, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Card
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					maxHeight: '300px',
					borderRadius: 3,
					padding: 1,
					maxWidth: '500px',
				}}
			>
				<CardContent>
					<Stack
						direction={'column'}
						spacing={2}
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							height: '100vh',
						}}
					>
						<SettingsApplications color='warning' sx={{ fontSize: 60 }} />
						<Typography variant='h4' textAlign={'center'}>Forbidden!</Typography>
						<Typography variant='body1' textAlign={'center'}>
							You don't have permission to access this page.
						</Typography>

						<Button fullWidth variant='klubiqMainButton' onClick={() => navigate(-1)}>
							Go Back
						</Button>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Forbidden;
