/* eslint-disable no-unused-vars */
import { Grid, Tab, Tabs } from '@mui/material';
import { styles } from './style';
import { FC } from 'react';

type TabsComponentProps = {
	allTabs: string[];
	tabValue: number;
	handleTabChange: (
		event: React.SyntheticEvent<Element, Event>,
		newValue: number,
	) => void;
};

export const TabsComponent: FC<TabsComponentProps> = ({
	allTabs,
	tabValue,
	handleTabChange,
}) => {
	return (
		<Grid container sx={styles.tabStyle}>
			<Tabs
				value={tabValue}
				onChange={handleTabChange}
				aria-label='navigation tabs'
				sx={styles.tabsContainer}
			>
				{allTabs.map((tab, index) => (
					<Tab key={`${tab}-${index}`} label={tab} sx={styles.tabItem} />
				))}
			</Tabs>
		</Grid>
	);
};
