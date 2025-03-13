import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styles } from './style';
type SwitchProp = {
	activeTab: number;
	onChange: (event: React.SyntheticEvent, newValue: number) => void;
};
const SettingsSwitch: React.FC<SwitchProp> = ({ activeTab, onChange }) => {
	return (
		<Box sx={styles.switchContainer}>
			<Tabs
				value={activeTab}
				onChange={onChange}
				sx={{ borderRight: 1, borderColor: '0.5px solid ', height: '100%' }}
				orientation='vertical'
				textColor='inherit'
				TabIndicatorProps={{
					style: { display: 'none' },
				}}
			>
				<Tab label='Account Settings' sx={styles.activeButton} />
				<Tab label='Notifications' sx={styles.activeButton} />
			</Tabs>
		</Box>
	);
};

export default SettingsSwitch;
