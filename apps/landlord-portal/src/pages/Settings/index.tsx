import React, { useState } from 'react';
import { Box, Typography, Card, Stack } from '@mui/material';
import SettingsSwitch from './SettingsSwitch';
import { styles } from './style';
import AccountSettings from './Account/AccountSettings';
import NotificationPage from './Notification/Notification';

const Setting: React.FC = () => {
	const [activeTab, setActiveTab] = useState(0);
	const tabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};
	return (
		<Stack spacing={2}>
			<Stack spacing={1} sx={styles.headerDiv}>
				<Typography sx={styles.headerText}>Settings</Typography>
				<Typography sx={styles.subHeaderText}>
					Update your photo and personal details here.
				</Typography>
			</Stack>

			<Card sx={styles.contentContainer}>
				<Stack
					spacing={{ xs: 1, sm: 2, md: 6 }}
					sx={styles.contentContainer2}
					direction={'row'}
				>
					<SettingsSwitch activeTab={activeTab} onChange={tabChange} />
					{activeTab === 0 && <AccountSettings />}
					{activeTab === 1 && <NotificationPage />}
				</Stack>
			</Card>
		</Stack>
	);
};

export default Setting;
