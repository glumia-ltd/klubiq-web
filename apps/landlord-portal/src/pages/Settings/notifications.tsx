import { Typography, useMediaQuery, useTheme, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationItem from './NotificationItems';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import {
	useGetNotificationPreferenceQuery,
	useUpdateNotificationPreferenceMutation,
} from '../../store/AuthStore/authApiSlice';
import { useDispatch } from 'react-redux';
import { screenMessages } from '../../helpers/screen-messages';
export const Notifications = () => {
	const { data} = useGetNotificationPreferenceQuery();
	const [updatePreference] =
		useUpdateNotificationPreferenceMutation();
	const dispatch = useDispatch();
	const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		if (data) {
			setSwitchStates({
				leaseRenewals: data.leaseRenewals ?? false,
				paymentReminders: data.paymentReminders ?? false,
				maintenanceRequests: data.maintenanceRequests ?? false,
				newTenantApplications: data.newTenantApplications ?? false,
				email: data.email ?? false,
				push: data.push ?? false,
				sms: data.sms ?? false,
			});
		}
	}, [data]);

	const notificationPreferences = [
		{
			id: 'leaseRenewals',
			title: 'Lease Renewals',
			description: 'Get notified about upcoming lease renewals',
		},
		{
			id: 'paymentReminders',
			title: 'Payment Reminder',
			description: 'Receive reminders for upcoming payments',
		},
		{
			id: 'maintenanceRequests',
			title: 'Maintenance Request',
			description: 'Get notified about new maintenance requests',
		},
		{
			id: 'newTenantApplications',
			title: 'New tenant application',
			description: 'Receive notifications for new tenant applications',
		},
	];

	const notificationChannels = [
		{
			id: 'email',
			title: 'Email Notification',
			description: 'Get notified about upcoming lease renewals',
			icon: <MailIcon sx={{ color: theme.palette.primary.main }} />,
		},
		{
			id: 'push',
			title: 'Push Notification',
			description: 'Receive reminders for upcoming payments',
			icon: <NotificationsIcon sx={{ color: theme.palette.success.main }} />,
		},
		{
			id: 'sms',
			title: 'SMS Notification',
			description: 'Get notified about new maintenance requests',
			icon: <SmsIcon sx={{ color: theme.palette.secondary.main }} />,
		},
	];

	const handleToggle = async (id: string, value: boolean) => {
		setSwitchStates((prev) => ({
			...prev,
			[id]: value,
		}));

		try {
			await updatePreference({
				...switchStates,
				[id]: value,
			}).unwrap();
			dispatch(
				openSnackbar({
					message: screenMessages.settings.notificationPreference.success,
					severity: 'success',
					isOpen: true,
					duration: 2000,
				}),
			);
		} catch (err) {
			dispatch(
				openSnackbar({
					message: screenMessages.settings.notificationPreference.error,
					severity: 'success',
					isOpen: true,
					duration: 2000,
				}),
			); setSwitchStates((prev) => ({
				...prev,
				[id]: !value,
			}));
		}
	};

	

	return (
		<Box sx={{ width: '100%', height: '100%', px: isMobile ? 2 : 7, py: 2 }}>
			<Stack
				direction="column"
				gap={3}
				alignItems="flex-start"
				justifyContent="space-between"
			>
				<Typography variant="h5">Notifications</Typography>
				<Typography variant="body1">
					Choose what notifications you want to receive and how
				</Typography>

				<Card sx={{ p: 2, mb: 2, width: '100%' }}>
					<Typography variant="h5">Notification Preferences</Typography>
					{notificationPreferences.map((item) => (
						<NotificationItem
							key={item.id}
							{...item}
							checked={switchStates[item.id] ?? false}
							onToggle={handleToggle}
						/>
					))}
				</Card>

				<Card sx={{ p: 2, mb: 2, width: '100%' }}>
					<Typography variant="h5">Notification Channels</Typography>
					{notificationChannels.map((item) => (
						<NotificationItem
							key={item.id}
							{...item}
							checked={switchStates[item.id] ?? false}
							onToggle={handleToggle}
						/>
					))}
				</Card>

				
			</Stack>
		</Box>
	);
};

export default Notifications;
