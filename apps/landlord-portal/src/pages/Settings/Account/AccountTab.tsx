import React from 'react';
import { Tabs, Tab } from '@mui/material';
type AccountTabProps = {
	activeTab: number;
	onChange: (event: React.SyntheticEvent, newValue: number) => void;
};

const AccountTab = ({ activeTab, onChange }: AccountTabProps) => {
	return (
		<Tabs
			value={activeTab}
			onChange={onChange}
			variant='fullWidth'
			scrollButtons='auto'
			sx={{ mb: 3, width: '100%' }}
		>
			<Tab label='Profile' />
			<Tab label='Preferences' />
			<Tab label='Notification' />
			<Tab label='Security' />
			<Tab label='Tab 5' />
		</Tabs>
	);
};

export default AccountTab;
