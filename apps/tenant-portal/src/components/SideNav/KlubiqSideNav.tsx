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

const DRAWER_WIDTH = 235;
const COLLAPSED_WIDTH = 64;

export const SideNav: React.FC<KlubiqSideNavProps> = ({
	navLinks,
	user,
	onNavClick,
	onSignOut,
	// logoUrl = '/assets/images/icons.svg',
	customBottomContent,
}) => {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(() => {
		// Get the initial selected index from localStorage or default to 0
		const savedIndex = localStorage.getItem('selectedNavIndex');
		return savedIndex ? parseInt(savedIndex) : 0;
	});

	// Handle mouse enter - open the sidebar
	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	// Handle mouse leave - close the sidebar
	const handleMouseLeave = () => {
		setIsOpen(false);
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

				{/* Search - only show when open */}
				{isOpen && (
					<Paper
						component='form'
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
							opacity: isOpen ? 1 : 0,
							transition: theme.transitions.create('opacity', {
								easing: theme.transitions.easing.sharp,
								duration: theme.transitions.duration.enteringScreen,
							}),
						}}
					>
						<IconButton
							sx={{ color: 'primary.contrastText' }}
							aria-label='search'
						>
							<SearchIcon />
						</IconButton>
						<InputBase
							sx={{ ml: 1, flex: 1, color: 'primary.contrastText' }}
							placeholder='Search Klubiq'
							inputProps={{ 'aria-label': 'search klubiq' }}
						/>
					</Paper>
				)}

				{/* Nav Links */}
				<Stack spacing={1} alignItems='flex-start'>
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
			<Box sx={{ mt: 3, position: 'relative' }}>
				{/* Help & Settings */}
				<Stack spacing={1} alignItems='flex-start' sx={{ mb: 2 }}>
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
					sx={{ position: 'sticky', bottom: 0, bgcolor: 'primary.main', pb: 0 }}
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
