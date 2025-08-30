import React, { useEffect, useState } from 'react';
import {
	Box,
	BottomNavigation,
	BottomNavigationAction,
	Paper,
	List,
	ListItemText,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Drawer,
} from '@mui/material';

import { NavLink } from './BottomNavTypes';
import { useLocation } from 'react-router-dom';

export const BottomNav: React.FC<{
	navLinks: NavLink[];
	onNavClick: (route: string) => void;
	settingsDrawerListNavLinks?: NavLink[];
}> = ({ navLinks, onNavClick, settingsDrawerListNavLinks }) => {
	const location = useLocation();
	const [settingsDrawerOpened, setSettingsDrawerOpened] = useState(false);
	const toggleSettingsDrawer = () => {
		setSettingsDrawerOpened(!settingsDrawerOpened);
	};
	const getSelectedIndex = () => {
		const currentPath = location.pathname;
		const matchingIndex = navLinks.findIndex((link) => {
			// Handle exact matches and nested routes
			if (link.route === currentPath) {
				return true;
			}
			// Handle cases where current path starts with the nav link route
			// (e.g., /payments/confirm should highlight /payments)
			if (link.route !== '/' && currentPath.startsWith(link.route)) {
				return true;
			}
			return false;
		});
		return matchingIndex >= 0 ? matchingIndex : 0;
	};

	const handleSettingsDrawerClick = (action: string | (() => void)) => {
		toggleSettingsDrawer();
		if (typeof action === 'function') {
			action();
			return;
		}
		onNavClick(action);
	};
	const settingsDrawerList = (
		<Box sx={{width: 170}} role='presentation' onClick={toggleSettingsDrawer}>
			<List>
				{settingsDrawerListNavLinks?.map((link, index) =>
					link.disabled ? null : (
						<ListItem  key={link.index + index}>
							<ListItemButton onClick={(e) => { e.stopPropagation(); handleSettingsDrawerClick(link.onClick ?? link.route); }}>
								<ListItemIcon>
									{link.icon}
								</ListItemIcon>
								<ListItemText primary={link.label} />
							</ListItemButton>
						</ListItem>
					),
				)}
			</List>
		</Box>
	);

	const [selectedIndex, setSelectedIndex] = useState(() => {
		return getSelectedIndex();
	});
	const handleNavClick = (index: number, route: string) => {
		setSelectedIndex(index);
		localStorage.setItem('selectedNavIndex', index.toString());
		onNavClick(route);
	};
	// Update selected index when route changes
	useEffect(() => {
		const newSelectedIndex = getSelectedIndex();
		setSelectedIndex(newSelectedIndex);
		localStorage.setItem('selectedNavIndex', newSelectedIndex.toString());
	}, [location.pathname, navLinks]);

	// Responsive Drawer
	return (
		<Box>
			<Paper
				elevation={3}
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 1000,
					borderRadius: 3,
					padding: 2,
				}}
			>
				<BottomNavigation
					showLabels
					value={selectedIndex}
					onChange={(_event, newValue) => {
						if (navLinks[newValue].route === '/settings') {
							toggleSettingsDrawer();
							return;
						}
						handleNavClick(newValue, navLinks[newValue].route);
					}}
					sx={{
						pt: 1,
						pb: 1,
						px: 2,
					}}
				>
					{navLinks.map((link, index) =>
						link.disabled ? null : (
							<BottomNavigationAction
								key={link.label + index}
								label={link.label}
								icon={link.icon}
							/>
						),
					)}
				</BottomNavigation>
				<Drawer anchor='right' open={settingsDrawerOpened} onClose={toggleSettingsDrawer}>
					{settingsDrawerList}
				</Drawer>
			</Paper>
		</Box>
	);
};
