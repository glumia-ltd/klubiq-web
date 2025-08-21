import React, { useEffect, useState } from 'react';
import {
	Box,
	BottomNavigation,
	BottomNavigationAction,
	Paper,
} from '@mui/material';

import { NavLink } from './BottomNavTypes';
import { useLocation } from 'react-router-dom';

export const BottomNav: React.FC<{
	navLinks: NavLink[];
	onNavClick: (route: string) => void;
}> = ({ navLinks, onNavClick }) => {
	const location = useLocation();
	const getSelectedIndex = () => {
		const currentPath = location.pathname;
		const matchingIndex = navLinks.findIndex((link) => {
			// Handle exact matches and nested routes
			if (link.route === currentPath) return true;
			// Handle cases where current path starts with the nav link route
			// (e.g., /payments/confirm should highlight /payments)
			if (link.route !== '/' && currentPath.startsWith(link.route)) return true;
			return false;
		});
		return matchingIndex >= 0 ? matchingIndex : 0;
	};

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
			</Paper>
		</Box>
	);
};
