import React, { useState } from 'react';
import {
	Drawer,
	ListItemIcon,
	ListItemText,
	Box,
	Typography,
	IconButton,
	InputBase,
	Divider,
	Stack,
	Paper,
	useTheme,
	ListItemButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { KlubiqSideNavProps } from './SideNavTypes';
import logo from '@/assets/images/icons.svg';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { DynamicAvatar } from '@klubiq/ui-components';
const DRAWER_WIDTH = 221;

export const SideNav: React.FC<KlubiqSideNavProps> = ({
	navLinks,
	user,
	onNavClick,
	onSignOut,
	// logoUrl = '/assets/images/icons.svg',
	customBottomContent,
}) => {
	const theme = useTheme();
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
	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('search');
	};

	// Drawer content
	const drawerContent = (
		<Box
			sx={{
				height: '100%',
				position: 'relative',
				width: DRAWER_WIDTH,
				px: 2,
				py: 4,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{/* Main Content: Logo, Search, Nav Links */}
			<Stack spacing={3} sx={{ flexGrow: 1 }}>
				{/* Logo & Title */}
				<Stack direction="row" alignItems="center" spacing={1}>
					<img src={logo} alt="KLUBIQ Logo" width={32} height={32} />
					<Typography
						variant="h4"
						sx={{ letterSpacing: 1, color: 'primary.contrastText', fontWeight: 700 }}
					>
						KLUBIQ
					</Typography>
				</Stack>
				{/* Search */}
				<Paper
					component="form"
					onSubmit={handleSearchSubmit}
					sx={{
						display: 'flex',
						alignItems: 'center',
						bgcolor: 'primary.main',
						borderRadius: 2,
						px: 1,
						height: 36,
						border: '1px solid #fff',
						width: '100%',
					}}
				>
					<IconButton sx={{ color: 'primary.contrastText' }} aria-label="search">
						<SearchIcon />
					</IconButton>
					<InputBase
						sx={{ ml: 1, flex: 1, color: 'primary.contrastText' }}
						placeholder="Search Klubiq"
						inputProps={{ 'aria-label': 'search klubiq' }}
					/>
				</Paper>
				{/* Nav Links */}
				<Stack spacing={1} alignItems="flex-start">
					{navLinks.map((link, index) =>
						link.disabled ? null : (
							<ListItemButton
								key={link.label}
								onClick={() => handleNavClick(index, link.route)}
								sx={{
									bgcolor: index === selectedIndex ? 'primary.contrastText' : 'transparent',
									color: index === selectedIndex ? 'primary.main' : 'primary.contrastText',
									borderRadius: 2,
									minHeight: 40,
									px: 2,
									width: '100%',
									'&:hover': {
										bgcolor: 'primary.light',
										color: 'primary.contrastText',
									},
									justifyContent: 'flex-start',
								}}
								aria-label={link.label}
								tabIndex={0}
							>
								<ListItemIcon
									sx={{
										color: 'inherit',
										minWidth: 0,
										mr: 2,
										justifyContent: 'center',
									}}
								>
									{link.icon}
								</ListItemIcon>
								<ListItemText
									primary={link.label}
									sx={{
										color: index === selectedIndex ? 'primary.main' : 'primary.contrastText',
									}}
								/>
							</ListItemButton>
						)
					)}
				</Stack>
			</Stack>

			{/* Bottom Section: Help & Settings and User Info */}
			<Box sx={{ mt: 3, position: 'relative' }}>
				{/* Help & Settings */}
				<Stack spacing={1} alignItems="flex-start" sx={{ mb: 2 }}>
					<ListItemButton
						onClick={() => onNavClick('/help')}
						sx={{
							color: 'primary.contrastText',
							borderRadius: 2,
							minHeight: 40,
							px: 2,
							width: '100%',
							'&:hover': {
								bgcolor: 'primary.light',
								color: 'primary.contrastText',
							},
							justifyContent: 'flex-start',
						}}
						aria-label="Help"
						tabIndex={0}
					>
						<ListItemIcon
							sx={{
								color: 'inherit',
								minWidth: 0,
								mr: 2,
								justifyContent: 'center',
							}}
						>
							<HelpOutlineIcon />
						</ListItemIcon>
						<ListItemText primary="Help" />
					</ListItemButton>
					<ListItemButton
						onClick={() => onNavClick('/settings')}
						sx={{
							color: 'primary.contrastText',
							borderRadius: 2,
							minHeight: 40,
							px: 2,
							width: '100%',
							'&:hover': {
								bgcolor: 'primary.light',
								color: 'primary.contrastText',
							},
							justifyContent: 'flex-start',
						}}
						aria-label="Settings"
						tabIndex={0}
					>
						<ListItemIcon
							sx={{
								color: 'inherit',
								minWidth: 0,
								mr: 2,
								justifyContent: 'center',
							}}
						>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</ListItemButton>
				</Stack>
				{/* Divider above User Info */}
				<Divider sx={{ bgcolor: 'primary.contrastText', my: 2 }} />
				{/* User Info sticky to bottom */}
				<Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'primary.main', pb: 0 }}>
					{customBottomContent ? (
						customBottomContent
					) : (
						<Stack direction="row" alignItems="center" spacing={1}>
							<DynamicAvatar
								items={[
									{
										label: user.firstname,
										id: user.email,
										name: user.firstname,
										variant: 'square',
										background: 'light',
									},
								]}
								showName={false}
							/>
							<Box sx={{ flexGrow: 1, textAlign: 'left', direction: 'column' }}>
								<Typography
									variant="body1"
									sx={{ color: 'primary.contrastText' }}
								>
									{user.firstname} {user.lastname}
								</Typography>
								<Typography
									variant="body2"
									sx={{ color: 'primary.contrastText' }}
								>
									{user.role}
								</Typography>
							</Box>
							<IconButton
								aria-label="sign out"
								onClick={onSignOut}
								sx={{ color: 'primary.contrastText' }}
							>
								<LogoutIcon />
							</IconButton>
						</Stack>
					)}
				</Box>
			</Box>
		</Box>
	);

	// Responsive Drawer
	return (
		<>
			<Drawer
				variant={'permanent'}
				open={true}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					width: DRAWER_WIDTH,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: DRAWER_WIDTH,
						boxSizing: 'border-box',
						bgcolor: 'primary.main',
						color: 'primary.contrastText',
						borderRight: 0,
						transition: theme.transitions.create('width', {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.enteringScreen,
						}),
						overflowX: 'hidden',
					},
				}}
				PaperProps={{ elevation: 3 }}
			>
				{drawerContent}
			</Drawer>
		</>
	);
};
