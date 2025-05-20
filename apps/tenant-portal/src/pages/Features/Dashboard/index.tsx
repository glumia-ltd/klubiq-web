import { RootState } from '@/store';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TenantDashboard = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Typography variant='h6'>Welcome {user.firstname}</Typography>
			<Card>
				<CardContent>
					<Typography variant='body2'>
						Your account has been created successfully. You can now start using the app.
					</Typography>
					<Divider />
					<Typography variant='subtitle2'>
						Name: {user.firstname} {user.lastname}
					</Typography>
					<Typography variant='subtitle2'>
						Email: {user.email}
					</Typography>
					<Typography variant='subtitle2'>
						Phone: {user.phone}
					</Typography>
					<Typography variant='subtitle2'>
						Address: {user.address}
					</Typography>
					<Typography variant='subtitle2'>
						City: {user.city}
					</Typography>
					<Typography variant='subtitle2'>
						State: {user.state}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
};

export default TenantDashboard;
