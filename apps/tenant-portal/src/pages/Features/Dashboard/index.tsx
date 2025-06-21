import { RootState } from '@/store';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { PageHeader, DBInfoCard, DBInfoCardProps } from '@klubiq/ui-components';
import {
	CalendarMonth,
	CheckCircle,
	MonetizationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TenantDashboard = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	const tenantRentMetrics: DBInfoCardProps[] = [
		{
			icon: <MonetizationOn />,
			amount: '$68k',
			label: 'Monthly Rent',
			badgeText: 'Due Sep 1',
			badgeColor: '#000000',
			variant: 'custom',
			backgroundColor: '#ffe0e0',
		},
		{
			icon: <CalendarMonth />,
			amount: '238 days',
			label: 'Days remaining',
			badgeText: 'until lease ends',
			badgeColor: '#fff',
			variant: 'custom',
			backgroundColor: '#e0ffe0',
		},
		{
			icon: <CheckCircle />,
			amount: '98%',
			label: 'On-time Payments',
			badgeText: 'since move-in',
			badgeColor: '#fff',
			variant: 'custom',
			backgroundColor: '#e0e0ff',
		},
		
	];
	const renderRightContent = () => {
		return (
			<Stack direction='column' spacing={2}>
				<Typography variant='subtitle2'>
					Name: {user.firstname} {user.lastname}
				</Typography>
				<Typography variant='h4' sx={{ textWrap: 'wrap', wordBreak: 'break-word' }}>Email: {user.email}</Typography>
			</Stack>
		);
	};
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
			<PageHeader
				title={<Typography variant='h3'>Welcome {user.firstname}</Typography>}
				subtitle={<Typography variant='h6'>Here is your dashboard</Typography>}
				variant='compact'
				rightContent={renderRightContent()}
				actions={<Button variant='klubiqTextButton' onClick={() => {
					navigate('/login');
				}}>Logout</Button>}
				sx={{
					color: 'white',
					background: 'linear-gradient(45deg, #615FFF, #9810FA)',
				}}
			/>
			<Stack 
				direction={{ sm: 'row', md: 'row', xs: 'column' }}
				spacing={2}
				width="100%"
				useFlexGap
				flexWrap="wrap"
				justifyContent={'space-between'}
			>
				{tenantRentMetrics.map((metric) => (
					<DBInfoCard 
						key={metric.label} 
						{...metric} 
						sx={{ maxWidth: {xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 10.667px)'},
							width: '100%',
							height: '100%', }}
					/>
				))}
			</Stack>
		</Box>
	);
};

export default TenantDashboard;
