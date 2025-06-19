import React, { useState } from 'react';
import {
	Box,
	BottomNavigation,
	BottomNavigationAction,
} from '@mui/material';

import { NavLink } from './BottomNavTypes';


export const BottomNav: React.FC<{ navLinks: NavLink[], onNavClick: (route: string) => void }> = ({ navLinks, onNavClick }) => {
	const [selectedIndex, setSelectedIndex] = useState(() => {
		// Get the initial selected index from localStorage or default to 0
		const savedIndex = localStorage.getItem('selectedNavIndex');
		return savedIndex ? parseInt(savedIndex) : 0;
	});
	const handleNavClick = (index: number, route: string) => {
		setSelectedIndex(index);
		localStorage.setItem('selectedNavIndex', index.toString());
		onNavClick(route);
	};

	// Responsive Drawer
	return (
		<Box>
				<BottomNavigation
					showLabels
					value={selectedIndex}
					onChange={(event, newValue) => {
						console.log(`${event} newValue`, newValue);``
						handleNavClick(newValue, navLinks[newValue].route);
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
		</Box>
	);
};
