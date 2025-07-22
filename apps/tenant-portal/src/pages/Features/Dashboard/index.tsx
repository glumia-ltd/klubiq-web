import { RootState } from '@/store';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import {
	PageHeader,
	DBInfoCard,
	DBInfoCardProps,
	ActivityItem,
	ActivityCard,
	AmenityItem,
	AmenityCard,
	getAmenityIcon,
} from '@klubiq/ui-components';
import {
	CalendarMonth,
	CheckCircle,
	MonetizationOn,
	Notifications,
	// AttachMoney,
	// WarningAmber
} from '@mui/icons-material';
import { useGetLeaseInsightsQuery } from '@/store/GlobalStore/insightsApi.slice';
import { formatDate, formatNumberShort } from '@/helpers/utils';
import { useGetNotificationsQuery } from '@/store/GlobalStore/notificationsApi.slice';
import { skipToken } from '@reduxjs/toolkit/query';
// import { useNavigate } from 'react-router-dom';

const TenantDashboard = () => {
	const theme = useTheme();
	const { user } = useSelector((state: RootState) => state.auth);
	const { data: leaseInsights, isLoading: isLeaseInsightsLoading } =
		useGetLeaseInsightsQuery();
	const { data: notifications, isLoading: isNotificationsLoading } = useGetNotificationsQuery(
		user.uuid ? { userId: user.uuid, isRead: false } : skipToken
	);
	console.log(notifications);
	const tenantRentMetrics: DBInfoCardProps[] = [
		{
			icon: <MonetizationOn />,
			amount: `₦${formatNumberShort(leaseInsights?.rentAmount || 0)}`,
			label: `${leaseInsights?.paymentFrequency} Rent`,
			badgeText: `Due on ${formatDate(leaseInsights?.nextDueDate || '', 'MMM D, YYYY')}`,
			badgeColor: leaseInsights?.isOverdue
				? theme.palette.error.main
				: theme.palette.success.main,
			badgeBackground: theme.palette.grey[100],
			variant: 'custom',
			backgroundColor: '#EEF2FF',
		},
		{
			icon: <CalendarMonth />,
			amount: `${leaseInsights?.daysRemaining} days`,
			label: 'Days remaining',
			badgeText: 'until lease ends',
			badgeColor: theme.palette.success.main,
			badgeBackground: theme.palette.grey[100],
			variant: 'custom',
			backgroundColor: '#EEF2FF',
		},
		{
			icon: <CheckCircle />,
			amount: `${leaseInsights?.onTimeRentPaymentPercentage}%`,
			label: 'On-time Payments',
			badgeText: 'since move-in',
			badgeColor: theme.palette.success.main,
			badgeBackground: theme.palette.grey[100],
			variant: 'custom',
			backgroundColor: '#EEF2FF',
		},
	];

	const amenityCardItems: AmenityItem[] = leaseInsights?.amenities?.map((amenity, idx) => ({
		id: idx,
		title: amenity,
		icon: getAmenityIcon(amenity),
		available: true,
	})) || [];

	const notificationCardItems: ActivityItem[] =
		notifications?.map((notification, idx) => ({
			id: idx,
			title: notification.title,
			content: <></>,
			subtitle: notification.message,
			icon: <Notifications />,
			timestamp: notification.createdAt,
			PaletteColor: 'primary',
		})) || [];
	// const RecentActivityCardItems: ActivityItem[] = [
	// 	{
	// 		id: 1,
	// 		title: 'Rent Payment Processed',
	// 		content: (
	// 			<Stack
	// 				direction='row'
	// 				spacing={2}
	// 				sx={{
	// 					border: '1px solid #E2E8F0',
	// 					backgroundColor: 'white',
	// 					borderRadius: '8px',
	// 					boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
	// 					p: {
	// 						md: '17px',
	// 					},
	// 				}}
	// 			>
	// 				<Stack
	// 					sx={{
	// 						backgroundColor: 'white',
	// 						borderRadius: '8px',
	// 						border: '1px solid #F1F5F9',
	// 						p: '9px',
	// 						boxShadow: '0 1px 2px 2px rgba(0, 0, 0, 0.05)',
	// 					}}
	// 				>
	// 					<AttachMoney sx={{ color: '#637DF1' }} />
	// 				</Stack>
	// 				<Stack direction='column'>
	// 					<Typography
	// 						variant='h4'
	// 						sx={{ fontSize: '14px', fontWeight: '500' }}
	// 					>
	// 						Rent Payment Processed
	// 					</Typography>

	// 					<Typography
	// 						variant='subtitle2'
	// 						sx={{ fontSize: '12px', fontWeight: 'normal', color: '#64748B' }}
	// 					>
	// 						Pool maintenance schedule • Aug 15, 2023
	// 					</Typography>
	// 				</Stack>
	// 			</Stack>
	// 		),
	// 		subtitle: '₦450,000',
	// 		key: 'Hello',
	// 		icon: <MonetizationOn />,
	// 		timestamp: 'Aug 1, 2023',
	// 		PaletteColor: 'primary',
	// 	},
	// ];

	// const PaymentUpdatesActivityCardItems: ActivityItem[] = [
	// 	{
	// 		id: 1,
	// 		title: 'Rent Payment Processed',
	// 		content: (
	// 			<Stack
	// 				direction='row'
	// 				spacing={2}
	// 				sx={{
	// 					border: '1px solid #FEE685',
	// 					backgroundColor: '#FFFBEB',
	// 					borderRadius: '8px',
	// 					p: {
	// 						md: '17px',
	// 					},
	// 				}}
	// 			>
	// 				<WarningAmber sx={{ color: '#E17100' }} />
	// 				<Stack direction='column'>
	// 					<Typography
	// 						variant='h4'
	// 						sx={{ fontSize: '14px', fontWeight: '500', color: '#7B3306' }}
	// 					>
	// 						Rent Payment Processed
	// 					</Typography>

	// 					<Typography
	// 						variant='subtitle2'
	// 						sx={{ fontSize: '12px', fontWeight: 'normal', color: '#BB4D00' }}
	// 					>
	// 						Pool maintenance schedule • Aug 15, 2023
	// 					</Typography>
	// 				</Stack>
	// 			</Stack>
	// 		),
	// 		subtitle: '₦450,000',
	// 		key: 'Hello',
	// 		icon: <MonetizationOn />,
	// 		timestamp: 'Aug 1, 2023',
	// 		PaletteColor: 'warning',
	// 	},
	// ];

	const renderRightContent = () => {
		return (
			<Stack direction='column' alignItems={{ xs: 'start', sm: 'end' }}>
				<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
					Current Home
				</Typography>
				<Typography
					variant='h4'
					sx={{ textWrap: 'wrap', wordBreak: 'break-word', fontSize: '20px' }}
				>
					{leaseInsights?.propertyName}, {leaseInsights?.unitNumber}
				</Typography>
				<Typography
					variant='subtitle2'
					sx={{
						textWrap: 'wrap',
						wordBreak: 'break-word',
						fontWeight: 'normal',
					}}
					textAlign={{ xs: 'left', sm: 'right' }}
				>
					{leaseInsights?.propertyAddress}
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
					leaseInsights?.isOverdue ? (
						<>
							<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
								You have {leaseInsights?.missedPayments} missed payments.
							</Typography>
							<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
								Your rent is overdue by {leaseInsights?.rentDueInDays} days.
							</Typography>
						</>
					) : (
						<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
							Your next rent payment is due in {leaseInsights?.rentDueInDays}{' '}
							days
						</Typography>
					)
				}
				variant='custom'
				rightContent={renderRightContent()}
				sx={{
					color: 'white',
					background: 'linear-gradient(45deg, #615FFF, #9810FA)',
				}}
				loading={isLeaseInsightsLoading}
			/>
			<Stack
				direction={{ sm: 'row', md: 'row', xs: 'column' }}
				spacing={2}
				width='100%'
				useFlexGap
				flexWrap='wrap'
				justifyContent={'space-between'}
			>
				{tenantRentMetrics.map((metric, idx) => (
					<DBInfoCard
						loading={isLeaseInsightsLoading}
						key={idx}
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
				direction={{ xs: 'column', sm: 'row' }}
				justifyContent={{ xs: 'start', sm: 'space-between' }}
				alignItems={{ xs: 'start', sm: 'center' }}
				spacing={2}
				width='100%'
			>
				<ActivityCard
					items={[]}
					loading={isNotificationsLoading}
					title='Recent Activity'
					variant='alerts'
					viewAllLink='/activities'
				/>
				<ActivityCard
					items={notificationCardItems || []}
					loading={isNotificationsLoading}
					title='Property Updates'
					variant='cards'
					viewAllLink='/notifications'
				/>
			</Stack>

			{amenityCardItems.length > 0 && (
				<AmenityCard items={amenityCardItems} />
			)}
		</Box>
	);
};

export default TenantDashboard;
