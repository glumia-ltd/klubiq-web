import { RootState } from '@/store';
import {
	Box,
	Button,
	Menu,
	MenuItem,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
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
	ArrowDropDown,
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
import { useEffect, useState } from 'react';
import { LeaseInsights } from './type';
// import { useNavigate } from 'react-router-dom';

const TenantDashboard = () => {
	const theme = useTheme();
	const { user } = useSelector((state: RootState) => state.auth);
	const { data: leaseInsights, isLoading: isLeaseInsightsLoading } =
		useGetLeaseInsightsQuery();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const { data: notifications, isLoading: isNotificationsLoading } =
		useGetNotificationsQuery(
			user.uuid ? { userId: user.uuid, isRead: false } : skipToken,
		);
	const [selectedLeaseInsight, setSelectedLeaseInsight] =
		useState<LeaseInsights | null>(null);

	const tenantRentMetrics: DBInfoCardProps[] = selectedLeaseInsight
		? [
				{
					icon: <MonetizationOn />,
					amount: `₦${formatNumberShort(selectedLeaseInsight?.rentAmount || 0)}`,
					label: `${selectedLeaseInsight?.paymentFrequency} Rent`,
					badgeText: `Due on ${formatDate(selectedLeaseInsight?.nextDueDate || '', 'MMM D, YYYY')}`,
					badgeColor: selectedLeaseInsight?.isOverdue
						? theme.palette.error.main
						: theme.palette.success.main,
					badgeBackground: theme.palette.grey[100],
					variant: 'custom',
					backgroundColor: '#EEF2FF',
				},
				{
					icon: <CalendarMonth />,
					amount: `${selectedLeaseInsight?.daysRemaining} days`,
					label: 'Days remaining',
					badgeText: 'until lease ends',
					badgeColor: theme.palette.success.main,
					badgeBackground: theme.palette.grey[100],
					variant: 'custom',
					backgroundColor: '#EEF2FF',
				},
				{
					icon: <CheckCircle />,
					amount: `${selectedLeaseInsight?.onTimeRentPaymentPercentage}%`,
					label: 'On-time Payments',
					badgeText: 'since move-in',
					badgeColor: theme.palette.success.main,
					badgeBackground: theme.palette.grey[100],
					variant: 'custom',
					backgroundColor: '#EEF2FF',
				},
			]
		: [];

	useEffect(() => {
		setSelectedLeaseInsight(leaseInsights?.[0] || null);
	}, [leaseInsights]);

	const amenityCardItems: AmenityItem[] = (
		selectedLeaseInsight?.amenities ?? []
	).map((amenity, idx) => ({
		id: idx,
		title: amenity,
		icon: getAmenityIcon(amenity),
		available: true,
		backgroundColor: '#F8FAFC',
	}));

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

	const renderRightContent = () => {
		return (
			<Stack
				direction='column'
				spacing={1}
				alignItems={{ xs: 'start', sm: 'end' }}
			>
				<Box>
					{leaseInsights?.length && leaseInsights?.length > 1 && (
						<>
							<Button variant='klubiqMainButton' endIcon={<ArrowDropDown />} sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText }} onClick={handleOpen}>
								Select Home
							</Button>
							<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
								{leaseInsights?.map((li, idx) => (
									<MenuItem
										key={idx}
										onClick={() => {
											setSelectedLeaseInsight(li);
											handleClose();
										}}
									>
										{li.propertyName}, {li.unitNumber}
									</MenuItem>
								))}
							</Menu>
						</>
					)}
				</Box>

				<Stack direction='column'
				alignItems={{ xs: 'start', sm: 'end' }}>
					<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
						Current Home
					</Typography>
					<Typography
						variant='h4'
						sx={{ textWrap: 'wrap', wordBreak: 'break-word', fontSize: '20px' }}
					>
						{selectedLeaseInsight?.propertyName},{' '}
						{selectedLeaseInsight?.unitNumber}
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
						{selectedLeaseInsight?.propertyAddress}
					</Typography>
				</Stack>
			</Stack>
		);
	};
	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}
		>
			{selectedLeaseInsight && (
				<>
					<PageHeader
						title={
							<Typography variant='h4'>Welcome {user.firstname}</Typography>
						}
						subtitle={
							selectedLeaseInsight?.isOverdue ? (
								<>
									<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
										You have {selectedLeaseInsight?.missedPayments} missed
										payments.
									</Typography>
									<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
										Your rent is overdue by{' '}
										{Math.abs(selectedLeaseInsight?.rentDueInDays || 0)} days.
									</Typography>
								</>
							) : (
								<Typography variant='subtitle2' sx={{ fontWeight: 'normal' }}>
									Your next rent payment is due in{' '}
									{selectedLeaseInsight?.rentDueInDays} days
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
				</>
			)}

			{amenityCardItems.length > 0 && (
				<AmenityCard
					items={amenityCardItems}
					spacing={2}
					sx={{
						backgroundColor: '',
					}}
				/>
			)}
		</Box>
	);
};

export default TenantDashboard;
