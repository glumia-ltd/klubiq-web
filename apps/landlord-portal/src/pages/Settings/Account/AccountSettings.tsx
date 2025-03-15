import React, { useState } from 'react';

import { Typography, Button, Stack } from '@mui/material';
import AccountTab from './AccountTab';
import Profile from './Profile';
import { styles } from './styles';

const AccountSettings: React.FC = () => {
	const [activeTab, setActiveTab] = useState(0);
	const tabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	return (
		<Stack spacing={2} sx={styles.AccountContainer}>
			<Typography variant='h4' gutterBottom sx={styles.headingText}>
				Account Settings
			</Typography>
			<Typography variant='subtitle1' gutterBottom sx={styles.subHeadingText}>
				Update your photo and personal details here.
			</Typography>
			<Stack direction='row'>
				<AccountTab activeTab={activeTab} onChange={tabChange} />
			</Stack>

			{activeTab === 0 && <Profile />}

			<Stack direction='row' justifyContent='space-between' mt={3}>
				<Button variant='outlined'>Cancel</Button>
				<Button variant='contained'>Save</Button>
			</Stack>
		</Stack>
	);
};

export default AccountSettings;
