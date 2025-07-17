import React, { useState } from 'react';
import {
	Box,
	BottomNavigation,
	BottomNavigationAction,
	Paper,
} from '@mui/material';

import { NavLink } from './BottomNavTypes';


export const BottomNav: React.FC<{ navLinks: NavLink[], onNavClick: (route: string) => void }> = ({ navLinks, onNavClick }) => {
	// const profileNavLink = {
	// 	label: 'Profile',
	// 	icon: <Person />,
	// 	route: '/profile',
	// 	index: navLinks.length + 1,
	// 	disabled: false,
	// };
	// const mobileNavLinks= [...navLinks, profileNavLink];
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
			<Paper elevation={3} sx={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, borderRadius: 3, padding: 2}} >
				<BottomNavigation
					showLabels
					value={selectedIndex}
					onChange={(event, newValue) => {
						console.log(`${event} newValue`, newValue);``
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
