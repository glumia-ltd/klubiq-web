import React, { useState } from 'react';
import {
	Drawer,
	ListItemIcon,
	ListItemText,
	Avatar,
	Box,
	Typography,
	IconButton,
	InputBase,
	Divider,
	Stack,
	Paper,
	useTheme,
	useMediaQuery,
	ListItemButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { KlubiqSideNavProps } from './SideNavTypes';
import logo from '@/assets/images/icons.svg';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
const drawerWidth = 256;

export const SideNav: React.FC<KlubiqSideNavProps> = ({
	navLinks,
	user,
	onNavClick,
	onSignOut,
	// logoUrl = '/assets/images/icons.svg',
	customBottomContent,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Stack
				direction='column'
				justifyContent='flex-start'
				alignItems='stretch'
				height='100%'
				spacing={3}
				py={4}
			>
				{/* Logo & Collapse Toggle */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'row',
						gap: 2,
						justifyContent: isMobile ? 'center' : 'flex-start',
					}}
				>
					<img src={logo} alt='KLUBIQ Logo' width={32} height={32} />

					<Typography
						variant='h4'
						sx={{ letterSpacing: 1, color: 'primary.contrastText' }}
					>
						KLUBIQ
					</Typography>
				</Box>
				{/* Search */}
				<Box sx={{ width: '221px' }}>
						<Paper
							component='form'
							onSubmit={handleSearchSubmit}
							sx={{
								display: 'flex',
								alignItems: 'center',
								bgcolor: 'primary.main',
								borderRadius: 8,
								px: 0.5,
								py: 0.5,
								border: '1px solid #fff',
								height: 36,
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
					</Box>
				{/* Nav Links */}
				<Box sx={{ width: '221px' }}>
					<Stack spacing={1}>
						{navLinks.map((link, index) =>
							link.disabled ? null : (
								<ListItemButton
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
											my: 0.5,
											minHeight: 40,
											px:  3,
											'&:hover': {
												bgcolor: 'primary.light',
												color: 'primary.contrastText',
											},
											justifyContent:  'flex-start',
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
										<ListItemText primary={link.label} sx={{ color:
												index === selectedIndex
													? 'primary.main'
													: 'primary.contrastText', }} />
									</ListItemButton>
							),
						)}
					</Stack>
				</Box>
				{/* Help & Settings */}
				<Box sx={{ width: '221px' }}>
					<Stack spacing={1}>
					<ListItemButton
								onClick={() => onNavClick('/help')}
								sx={{
									color: 'primary.contrastText',
									borderRadius: 2,
									minHeight: 40,
									'&:hover': {
										bgcolor: 'primary.light',
										color: 'primary.contrastText',
									},
									justifyContent: 'flex-start',
									px: 3,
								}}
								aria-label='Help'
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
								<ListItemText primary='Help' />
							</ListItemButton>
							<ListItemButton
								onClick={() => onNavClick('/settings')}
								sx={{
									color: 'primary.contrastText',
									borderRadius: 2,
									minHeight: 40,
									'&:hover': {
										bgcolor: 'primary.light',
										color: 'primary.contrastText',
									},
									justifyContent: 'flex-start',
									px: 3,
								}}
								aria-label='Settings'
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
								<ListItemText primary='Settings' />
							</ListItemButton>
					</Stack>
				</Box>
			</Stack>
			{/* User Info Bottom */}
			<Divider sx={{ bgcolor: 'primary.contrastText', my: 2 }} />
			<Box sx={{ px: 1, pb: 2 }}>
				
				{customBottomContent ? (
					customBottomContent
				) : (
					<Stack
						direction='row'
						alignItems='center'
						spacing={1}
						justifyContent='flex-start'
					>
						<Avatar
							src={user.profilePicUrl || user.firstname || ''}
							alt={user.firstname || ''}
						/>
							<Box>
								<Typography variant='subtitle1' sx={{ color: 'primary.contrastText' }}>
									{user.firstname} {user.lastname}
								</Typography>
							</Box>
						<IconButton
							aria-label='sign out'
							onClick={onSignOut}
							sx={{ color: 'primary.contrastText', ml: 'auto' }}
						>
							<LogoutIcon />
						</IconButton>
					</Stack>
				)}
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
						width: drawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: {
							width: drawerWidth,
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
