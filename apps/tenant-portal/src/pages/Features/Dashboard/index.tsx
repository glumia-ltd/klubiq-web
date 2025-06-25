import { RootState } from '@/store';
import { Box, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { PageHeader, DBInfoCard, DBInfoCardProps, ActivityCard, ActivityItem } from '@klubiq/ui-components';
import {
	CalendarMonth,
	CheckCircle,
	MonetizationOn,
	AttachMoney,
	WarningAmber
} from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

const TenantDashboard = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	// const navigate = useNavigate();

	const tenantRentMetrics: DBInfoCardProps[] = [
		{
			icon: <MonetizationOn />,
			amount: '$68k',
			label: 'Monthly Rent',
			badgeText: 'Due Sep 1',
			badgeColor: '#F1F5F9',
			variant: 'custom',
			backgroundColor: '#EEF2FF',
		},
		{
			icon: <CalendarMonth />,
			amount: '238 days',
			label: 'Days remaining',
			badgeText: 'until lease ends',
			badgeColor: '#F1F5F9',
			variant: 'custom',
			backgroundColor: '#EEF2FF',
		},
		{
			icon: <CheckCircle />,
			amount: '98%',
			label: 'On-time Payments',
			badgeText: 'since move-in',
			badgeColor: '#F1F5F9',
			variant: 'custom',
			backgroundColor: '#EEF2FF',
		},
		
	];

	const RecentActivityCardItems: ActivityItem[] = [
		{
			id: 1,
			title: 'Rent Payment Processed',
			content: (
				<Stack
					direction='row'
					spacing={2}
					sx={{
						border: '1px solid #E2E8F0',
						backgroundColor: 'white',
						borderRadius: '8px',
						boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
						p: {
							md: '17px',
						},
					}}
				>
					<Stack
						sx={{
							backgroundColor: 'white',
							borderRadius: '8px',
							border: '1px solid #F1F5F9',
							p: '9px',
							boxShadow: '0 1px 2px 2px rgba(0, 0, 0, 0.05)',
						}}
					>
						<AttachMoney sx={{ color: '#637DF1' }} />
					</Stack>
					<Stack direction='column'>
						<Typography
							variant='h4'
							sx={{ fontSize: '14px', fontWeight: '500' }}
						>
							Rent Payment Processed
						</Typography>

						<Typography
							variant='subtitle2'
							sx={{ fontSize: '12px', fontWeight: 'normal', color: '#64748B' }}
						>
							Pool maintenance schedule • Aug 15, 2023
						</Typography>
					</Stack>
				</Stack>
			),
			subtitle: '₦450,000',
			key: 'Hello',
			icon: <MonetizationOn />,
			timestamp: 'Aug 1, 2023',
			PaletteColor: 'primary',
		},
	];

	const PaymentUpdatesActivityCardItems: ActivityItem[] = [
		{
			id: 1,
			title: 'Rent Payment Processed',
			content: (
				<Stack
					direction='row'
					spacing={2}
					sx={{
						border: '1px solid #FEE685',
						backgroundColor: '#FFFBEB',
						borderRadius: '8px',
						p: {
							md: '17px',
						},
					}}
				>
					<WarningAmber sx={{ color: '#E17100' }} />
					<Stack direction='column'>
						<Typography
							variant='h4'
							sx={{ fontSize: '14px', fontWeight: '500', color: '#7B3306' }}
						>
							Rent Payment Processed
						</Typography>

						<Typography
							variant='subtitle2'
							sx={{ fontSize: '12px', fontWeight: 'normal', color: '#BB4D00' }}
						>
							Pool maintenance schedule • Aug 15, 2023
						</Typography>
					</Stack>
				</Stack>
			),
			subtitle: '₦450,000',
			key: 'Hello',
			icon: <MonetizationOn />,
			timestamp: 'Aug 1, 2023',
			PaletteColor: 'warning',
		},
	];

	const renderRightContent = () => {
		return (
			<Stack direction='column' alignItems='end'>
				<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
					Current Home
				</Typography>
				<Typography
					variant='h4'
					sx={{ textWrap: 'wrap', wordBreak: 'break-word', fontSize: '20px' }}
				>
					{user.lastname} Villa
				</Typography>
				<Typography
					variant='subtitle2'
					sx={{ textWrap: 'wrap', wordBreak: 'break-word', fontWeight: 'normal' }}
				>
					Block 1B, Flat 1
				</Typography>
			</Stack>
		);
	};
	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
		>
			<PageHeader
				title={<Typography variant='h4'>Welcome {user.firstname}</Typography>}
				subtitle={
					<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
						Here is your dashboard
					</Typography>
				}
				variant='compact'
				rightContent={renderRightContent()}
				sx={{
					color: 'white',
					background: 'linear-gradient(45deg, #615FFF, #9810FA)',
				}}
			/>
			<Stack
				direction={{ sm: 'row', md: 'row', xs: 'column' }}
				spacing={2}
				width='100%'
				useFlexGap
				flexWrap='wrap'
				justifyContent={'space-between'}
			>
				{tenantRentMetrics.map((metric) => (
					<DBInfoCard
						key={metric.label}
						{...metric}
						sx={{
							maxWidth: {
								xs: '100%',
								sm: 'calc(50% - 8px)',
								md: 'calc(33.333% - 10.667px)',
							},
							width: '100%',
							height: '100%',
						}}
					/>
				))}
			</Stack>

			<Stack
				direction={{ sm: 'row', md: 'row', xs: 'column' }}
				spacing={4}
				width='100%'
				useFlexGap
				flexWrap='wrap'
				justifyContent={'space-between'}
			>
				<ActivityCard
					items={RecentActivityCardItems}
					variant='custom'
					title='Recent Activity'
					viewAllLink='/'
					sx={{
						maxWidth: {
							xs: '100%',
							sm: 'calc(50% - 16px)',
						},
						width: '100%',
						height: '100%',
					}}
				/>
				<ActivityCard
					items={PaymentUpdatesActivityCardItems}
					variant='custom'
					title='Property Updates'
					viewAllLink='/'
					sx={{
						maxWidth: {
							xs: '100%',
							sm: 'calc(50% - 16px)',
						},
						width: '100%',
						height: '100%',
					}}
				/>
			</Stack>
		</Box>
	);
};

export default TenantDashboard;
