import React, { useState, useEffect } from 'react';
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
import { useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 235;
const COLLAPSED_WIDTH = 64;

export const SideNav: React.FC<KlubiqSideNavProps> = ({
	navLinks,
	user,
	onNavClick,
	onSignOut,
	onSidebarStateChange,
	// logoUrl = '/assets/images/icons.svg',
	customBottomContent,
}) => {
	const theme = useTheme();
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(true);

	// Determine selected index based on current route
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
		// Get the initial selected index from current route
		return getSelectedIndex();
	});

	// Update selected index when route changes
	useEffect(() => {
		const newSelectedIndex = getSelectedIndex();
		setSelectedIndex(newSelectedIndex);
		localStorage.setItem('selectedNavIndex', newSelectedIndex.toString());
	}, [location.pathname, navLinks]);

	// Handle mouse enter - open the sidebar
	const handleMouseEnter = () => {
		setIsOpen(true);
		onSidebarStateChange?.(true);
	};

	// Handle mouse leave - close the sidebar
	const handleMouseLeave = () => {
		setIsOpen(false);
		onSidebarStateChange?.(false);
	};

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
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			sx={{
				height: '100%',
				position: 'relative',
				width: isOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
				px: isOpen ? 2 : 1,
				py: 4,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			}}
		>
			{/* Main Content: Logo, Search, Nav Links */}
			<Stack spacing={3} sx={{ flexGrow: 1 }}>
				{/* Logo & Title */}
				<Stack
					direction='row'
					alignItems='center'
					spacing={1}
					sx={{
						justifyContent: isOpen ? 'flex-start' : 'center',
						px: isOpen ? 0 : 1,
						minHeight: 48, // Ensure consistent height
					}}
				>
					<img src={logo} alt='KLUBIQ Logo' width={32} height={32} />
					{isOpen && (
						<Typography
							variant='h4'
							sx={{
								letterSpacing: 1,
								color: 'primary.contrastText',
								fontWeight: 700,
								opacity: isOpen ? 1 : 0,
								transition: theme.transitions.create('opacity', {
									easing: theme.transitions.easing.sharp,
									duration: theme.transitions.duration.enteringScreen,
								}),
							}}
						>
							KLUBIQ
						</Typography>
					)}
				</Stack>

				{/* Search - maintain height when collapsed */}
				<Box sx={{ minHeight: 36, display: 'flex', alignItems: 'center' }}>
					<Paper
						component='form'
						onSubmit={handleSearchSubmit}
						sx={{
							display: 'flex',
							alignItems: 'center',
							bgcolor: 'primary.main',
							borderRadius: 2,
							px: isOpen ? 1 : 0.5,
							height: 36,
							border: '1px solid #fff',
							width: '100%',
							opacity: isOpen ? 1 : 0.7,
							transition: theme.transitions.create(
								['opacity', 'padding', 'width'],
								{
									easing: theme.transitions.easing.sharp,
									duration: theme.transitions.duration.enteringScreen,
								},
							),
							// Ensure consistent height and prevent layout shift
							minHeight: 36,
							maxHeight: 36,
							overflow: 'hidden',
						}}
					>
						<IconButton
							sx={{
								color: 'primary.contrastText',
								minWidth: isOpen ? 'auto' : 36,
								width: isOpen ? 'auto' : 36,
								height: 36,
								transition: theme.transitions.create(['min-width', 'width'], {
									easing: theme.transitions.easing.sharp,
									duration: theme.transitions.duration.enteringScreen,
								}),
							}}
							aria-label='search'
						>
							<SearchIcon />
						</IconButton>
						{isOpen && (
							<InputBase
								sx={{
									ml: 1,
									flex: 1,
									color: 'primary.contrastText',
									height: '100%',
									'& input': {
										height: '100%',
										padding: 0,
									},
								}}
								placeholder='Search Klubiq'
								inputProps={{ 'aria-label': 'search klubiq' }}
							/>
						)}
					</Paper>
				</Box>

				{/* Nav Links */}
				<Stack spacing={1} alignItems='flex-start' sx={{ minHeight: 200 }}>
					{navLinks.map((link, index) =>
						link.disabled ? null : (
							<ListItemButton
								key={link.label}
								onClick={() => handleNavClick(index, link.route)}
								sx={{
									bgcolor:
										index === selectedIndex
											? 'primary.contrastText'
											: 'transparent',
									color:
										index === selectedIndex
											? 'primary.main'
											: 'primary.contrastText',
									borderRadius: 2,
									minHeight: 40,
									px: isOpen ? 2 : 1,
									width: '100%',
									justifyContent: isOpen ? 'flex-start' : 'center',
									'&:hover': {
										bgcolor: 'primary.light',
										color: 'primary.contrastText',
									},
								}}
								aria-label={link.label}
								tabIndex={0}
							>
								<ListItemIcon
									sx={{
										color: 'inherit',
										minWidth: 0,
										mr: isOpen ? 2 : 0,
										justifyContent: 'center',
									}}
								>
									{link.icon}
								</ListItemIcon>
								{isOpen && (
									<ListItemText
										primary={link.label}
										sx={{
											color:
												index === selectedIndex
													? 'primary.main'
													: 'primary.contrastText',
											opacity: isOpen ? 1 : 0,
											transition: theme.transitions.create('opacity', {
												easing: theme.transitions.easing.sharp,
												duration: theme.transitions.duration.enteringScreen,
											}),
										}}
									/>
								)}
							</ListItemButton>
						),
					)}
				</Stack>
			</Stack>

			{/* Bottom Section: Help & Settings and User Info */}
			<Box sx={{ mt: 3, position: 'relative', minHeight: 120 }}>
				{/* Help & Settings */}
				<Stack
					spacing={1}
					alignItems='flex-start'
					sx={{ mb: 2, minHeight: 80 }}
				>
					<ListItemButton
						onClick={() => onNavClick('/help')}
						sx={{
							color: 'primary.contrastText',
							borderRadius: 2,
							minHeight: 40,
							px: isOpen ? 2 : 1,
							width: '100%',
							justifyContent: isOpen ? 'flex-start' : 'center',
							'&:hover': {
								bgcolor: 'primary.light',
								color: 'primary.contrastText',
							},
						}}
						aria-label='Help'
						tabIndex={0}
					>
						<ListItemIcon
							sx={{
								color: 'inherit',
								minWidth: 0,
								mr: isOpen ? 2 : 0,
								justifyContent: 'center',
							}}
						>
							<HelpOutlineIcon />
						</ListItemIcon>
						{isOpen && (
							<ListItemText
								primary='Help'
								sx={{
									opacity: isOpen ? 1 : 0,
									transition: theme.transitions.create('opacity', {
										easing: theme.transitions.easing.sharp,
										duration: theme.transitions.duration.enteringScreen,
									}),
								}}
							/>
						)}
					</ListItemButton>
					<ListItemButton
						onClick={() => onNavClick('/settings')}
						sx={{
							color: 'primary.contrastText',
							borderRadius: 2,
							minHeight: 40,
							px: isOpen ? 2 : 1,
							width: '100%',
							justifyContent: isOpen ? 'flex-start' : 'center',
							'&:hover': {
								bgcolor: 'primary.light',
								color: 'primary.contrastText',
							},
						}}
						aria-label='Settings'
						tabIndex={0}
					>
						<ListItemIcon
							sx={{
								color: 'inherit',
								minWidth: 0,
								mr: isOpen ? 2 : 0,
								justifyContent: 'center',
							}}
						>
							<SettingsIcon />
						</ListItemIcon>
						{isOpen && (
							<ListItemText
								primary='Settings'
								sx={{
									opacity: isOpen ? 1 : 0,
									transition: theme.transitions.create('opacity', {
										easing: theme.transitions.easing.sharp,
										duration: theme.transitions.duration.enteringScreen,
									}),
								}}
							/>
						)}
					</ListItemButton>
				</Stack>

				{/* Divider above User Info */}
				{isOpen && (
					<Divider
						sx={{
							bgcolor: 'primary.contrastText',
							my: 2,
							opacity: isOpen ? 1 : 0,
							transition: theme.transitions.create('opacity', {
								easing: theme.transitions.easing.sharp,
								duration: theme.transitions.duration.enteringScreen,
							}),
						}}
					/>
				)}

				{/* User Info sticky to bottom */}
				<Box
					sx={{
						position: 'sticky',
						bottom: 0,
						bgcolor: 'primary.main',
						pb: 0,
						minHeight: 60,
					}}
				>
					{customBottomContent ? (
						customBottomContent
					) : (
						<Stack
							direction='row'
							alignItems='center'
							spacing={1}
							sx={{
								justifyContent: isOpen ? 'space-between' : 'center',
								px: isOpen ? 0 : 1,
							}}
						>
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
							{isOpen && (
								<Box
									sx={{
										flexGrow: 1,
										textAlign: 'left',
										direction: 'column',
										width: '100%',
										opacity: isOpen ? 1 : 0,
										transition: theme.transitions.create('opacity', {
											easing: theme.transitions.easing.sharp,
											duration: theme.transitions.duration.enteringScreen,
										}),
									}}
								>
									<Typography
										variant='subtitle2'
										sx={{ color: 'primary.contrastText' }}
									>
										{user.firstname} {user.lastname}
									</Typography>
									<Typography
										variant='subtitle1'
										sx={{ color: 'primary.contrastText' }}
									>
										{user.role}
									</Typography>
								</Box>
							)}
							<IconButton
								aria-label='sign out'
								onClick={onSignOut}
								sx={{
									color: 'primary.contrastText',
									ml: isOpen ? 0 : 'auto',
									mr: isOpen ? 0 : 'auto',
								}}
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
					width: isOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: isOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
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
