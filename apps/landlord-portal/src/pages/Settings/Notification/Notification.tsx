import React from 'react';
import {
	Box,
	Typography,
	Stack,
	FormControlLabel,
	Checkbox,
	Divider,
} from '@mui/material';
import NotificationCheckbox from '../../../components/NotificationCheckBox';
import { styles } from '../style';
// import styles from '../../components/Dialogs/style';
const Notificaton: React.FC = () => {
	return (
		<Box sx={styles.notificationContainer}>
			<Typography variant='h4' gutterBottom sx={styles.headingText}>
				Notifications
			</Typography>
			<Typography variant='body1' gutterBottom sx={styles.subHeadingText}>
				Update your photo and personal details here.
			</Typography>

			<Box mb={4}>
				<Stack
					direction='row'
					sx={{
						justifyContent: 'flex-end',
						alignItems: 'flex-end',
					}}
					spacing={2}
				>
					<FormControlLabel
						control={<Checkbox />}
						label='In App'
						labelPlacement='top'
					/>
					<FormControlLabel
						control={<Checkbox />}
						label='Email'
						labelPlacement='top'
					/>
				</Stack>
				<Divider sx={{ mt: 2 }} />
			</Box>
			<NotificationCheckbox
				title='Security'
				// description='Notification about all login activity'
				options={[
					{
						label: 'Notification about all login activity',
						inApp: false,
						email: false,
					},
				]}
			/>

			<NotificationCheckbox
				title='Communication'
				// description='Notification about new messages'
				options={[
					{
						label: 'Notification about new messages',
						inApp: true,
						email: false,
					},
				]}
			/>

			<NotificationCheckbox
				title='Lease'
				description='Notifications about lease updates, notices, and insurance'
				options={[
					{
						label: 'Notify when lease is expiring',
						inApp: true,
						email: false,
						configurableDays: true,
						days: 100,
					},
					{
						label: 'Notify when lease/notice is signed',
						inApp: true,
						email: false,
					},
					{
						label: 'Notify me when all tenants have signed a document',
						inApp: true,
						email: false,
					},
					{
						label: 'Notify me when any tenant signs a document',
						inApp: true,
						email: false,
					},
				]}
			/>

			<NotificationCheckbox
				title='Notifications sent to Tenant'
				description='Notifications about lease updates, notices, and insurance'
				options={[
					{
						label: 'Notify tenants the day an invoice is due',
						inApp: true,
						email: false,
					},
					{
						label: 'Notify tenants when the day an invoice is due',
						inApp: true,
						email: false,
					},
					{
						label: 'Notify tenants when an unpaid invoice is due soon',
						inApp: true,
						email: false,
						configurableDays: true,
						days: 3,
					},
					{
						label: 'Notify tenants when a lease is expiring soon',
						inApp: true,
						email: false,
						configurableDays: true,
						days: 100,
					},
					{
						label: 'Notify tenants when a tenant signs a document',
						inApp: true,
						email: false,
					},
				]}
			/>

			<NotificationCheckbox
				title='Notifications from us'
				// description='Receive the latest news and updates from us'
				options={[
					{
						label: 'Receive the latest news and updates from us',
						inApp: true,
						email: false,
					},
				]}
			/>
		</Box>
	);
};

export default Notificaton;
