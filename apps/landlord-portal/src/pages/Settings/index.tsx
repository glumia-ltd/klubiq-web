import React, { useState } from 'react';
import { DynamicTabItem, DynamicTabs } from '@klubiq/ui-components';
import { Card, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Profile from './profile';
import Account from './account';
import Notifications from './notifications';
import Security from './security';
import Subscription from './subscription';
import { tabSx, contentCardSx } from './settingsStyle';

const Setting: React.FC = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const tabStyles = tabSx(theme);
	const settingsTabs: DynamicTabItem[] = [
		{
			id: 'profile',
			label: 'Profile',
			contentNode: (
				<Card sx={contentCardSx}>
					<Profile />
				</Card>
			),
			sx: {
				mt: isMobile ? 0 : 3,
				...tabStyles,
			},
		},
		{
			id: 'account',
			label: 'Account',
			contentNode: (
				<Card sx={contentCardSx}>
					<Account />
				</Card>
			),
			sx: {
				...tabStyles,
			},
		},
		{
			id: 'notifications',
			label: 'Notifications',
			contentNode: (
				<Card sx={contentCardSx}>
					<Notifications />
				</Card>
			),
			sx: {
				...tabStyles,
			},
		},
		{
			id: 'security',
			label: 'Security',
			contentNode: (
				<Card sx={contentCardSx}>
					<Security />
				</Card>
			),
			sx: {
				...tabStyles,
			},
		},
		{
			id: 'subscription',
			label: 'Subscription',
			contentNode: (
				<Card sx={contentCardSx}>
					<Subscription />
				</Card>
			),
			sx: {
				...tabStyles,
			},
		},
	];
	const [activeTab, setActiveTab] = useState<{
		index: number;
		item: DynamicTabItem;
	}>({
		index: 0,
		item: settingsTabs[0] as DynamicTabItem,
	});
	const tabChange = (index: number, item: DynamicTabItem) => {
		setActiveTab({ index, item });
	};
	return (
		// <Card variant='outlined' sx={{ width: '100%', p: 2, height: '100vh', borderRadius: 2 }}>

		// 	</Card>
		<DynamicTabs
			useTabContentDivider={false}
			activeTabIndicator={{
				indicatorSx: {
					height: '100%',
					maxHeight: 0,
					width: '100%',
					maxWidth: 0,
				},
			}}
			tabItems={settingsTabs}
			tabOrientation={isMobile ? 'horizontal' : 'vertical'}
			tabPosition={isMobile ? 'top' : 'left'}
			value={activeTab.index}
			onChange={tabChange}
			tabButtonSx={{
				justifyContent: isMobile ? 'center' : 'flex-start',
				alignItems: isMobile ? 'center' : 'flex-start',
			}}
		/>
	);
};

export default Setting;
