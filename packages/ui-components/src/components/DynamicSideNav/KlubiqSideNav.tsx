// packages/ui-components/src/components/SharedSideNav.tsx

'use client';
import React, { useState } from 'react';
import {
	Drawer,
	List,
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
	Tooltip,
	ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { KlubiqSideNavProps } from './SideNavTypes';

const drawerWidth = 260;
const collapsedWidth = 72;

export const KlubiqSideNav: React.FC<KlubiqSideNavProps> = ({
	navLinks,
	user,
	onNavClick,
	onSignOut,
	logoUrl = '../assets/svg/klubiq-logo.svg',
	customBottomContent,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [mobileOpen, setMobileOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(() => {
        // Get the initial selected index from localStorage or default to 0
        const savedIndex = localStorage.getItem('selectedNavIndex');
        return savedIndex ? parseInt(savedIndex) : 0;
    });
	const handleNavClick = (index: number, route: string) => {
        setSelectedIndex(index);
        localStorage.setItem('selectedNavIndex', index.toString());
        onNavClick(route);
        if (isMobile) {
            setMobileOpen(false);
        }
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
			<Box>
				{/* Logo & Collapse Toggle */}
				<Box
					sx={{
						p: 3,
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						justifyContent: collapsed ? 'center' : 'flex-start',
					}}
				>
					<img src={logoUrl} alt='KLUBIQ Logo' width={40} height={40} />
					{!collapsed && (
						<Typography
							variant='h6'
							fontWeight='bold'
							sx={{ letterSpacing: 1 }}
						>
							KLUBIQ
						</Typography>
					)}
					<IconButton
						aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
						onClick={() => setCollapsed((prev) => !prev)}
						sx={{
							ml: 'auto',
							color: '#fff',
							display: { xs: 'none', md: 'inline-flex' },
						}}
						size='small'
					>
						{collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</Box>
				{/* Search */}
				{!collapsed && (
					<Box sx={{ px: 2, pb: 2 }}>
						<Paper
							sx={{
								display: 'flex',
								alignItems: 'center',
								bgcolor: '#17316a',
								borderRadius: 2,
								px: 1,
								py: 0.5,
							}}
						>
							<IconButton sx={{ color: '#fff' }} aria-label='search'>
								<SearchIcon />
							</IconButton>
							<InputBase
								sx={{ ml: 1, flex: 1, color: '#fff' }}
								placeholder='Search Klubiq'
								inputProps={{ 'aria-label': 'search klubiq' }}
							/>
						</Paper>
					</Box>
				)}
				{/* Nav Links */}
				<List>
					{navLinks.map((link, index) => (
						<Tooltip
							key={link.label}
							title={collapsed ? link.label : ''}
							placement='right'
							arrow
						>
							<ListItemButton
								onClick={() => handleNavClick(index, link.route)}
								sx={{
									bgcolor: index === selectedIndex ? '#fff' : 'transparent',
									color: index === selectedIndex ? '#0a2259' : '#fff',
									borderRadius: 2,
									my: 0.5,
									minHeight: 48,
									px: collapsed ? 2 : 3,
									'&:hover': { bgcolor: '#17316a', color: '#fff' },
									justifyContent: collapsed ? 'center' : 'flex-start',
								}}
								aria-label={link.label}
								tabIndex={0}
							>
								<ListItemIcon
									sx={{
										color: 'inherit',
										minWidth: 0,
										mr: collapsed ? 0 : 2,
										justifyContent: 'center',
									}}
								>
									{link.icon}
								</ListItemIcon>
								{!collapsed && <ListItemText primary={link.label} />}
							</ListItemButton>
						</Tooltip>
					))}
				</List>
				{/* Help & Settings */}
				<Box sx={{ px: collapsed ? 0 : 3, pt: 2 }}>
					<Stack spacing={1}>
						<Tooltip title={collapsed ? 'Help' : ''} placement='right' arrow>
							<ListItemButton
								onClick={() => onNavClick('/help')}
								sx={{
									color: '#fff',
									borderRadius: 2,
									'&:hover': { bgcolor: '#17316a', color: '#fff' },
									justifyContent: collapsed ? 'center' : 'flex-start',
									px: collapsed ? 2 : 3,
								}}
								aria-label='Help'
								tabIndex={0}
							>
								<ListItemIcon
									sx={{
										color: 'inherit',
										minWidth: 0,
										mr: collapsed ? 0 : 2,
										justifyContent: 'center',
									}}
								>
									<span className='material-icons'>help_outline</span>
								</ListItemIcon>
								{!collapsed && <ListItemText primary='Help' />}
							</ListItemButton>
						</Tooltip>
						<Tooltip
							title={collapsed ? 'Settings' : ''}
							placement='right'
							arrow
						>
							<ListItemButton
								onClick={() => onNavClick('/settings')}
								sx={{
									color: '#fff',
									borderRadius: 2,
									'&:hover': { bgcolor: '#17316a', color: '#fff' },
									justifyContent: collapsed ? 'center' : 'flex-start',
									px: collapsed ? 2 : 3,
								}}
								aria-label='Settings'
								tabIndex={0}
							>
								<ListItemIcon
									sx={{
										color: 'inherit',
										minWidth: 0,
										mr: collapsed ? 0 : 2,
										justifyContent: 'center',
									}}
								>
									<span className='material-icons'>settings</span>
								</ListItemIcon>
								{!collapsed && <ListItemText primary='Settings' />}
							</ListItemButton>
						</Tooltip>
					</Stack>
				</Box>
			</Box>
			{/* User Info Bottom */}
			<Box sx={{ px: collapsed ? 0 : 3, pb: 2 }}>
				<Divider sx={{ bgcolor: '#17316a', my: 2 }} />
				{customBottomContent ? (
					customBottomContent
				) : (
					<Stack
						direction='row'
						alignItems='center'
						spacing={2}
						justifyContent={collapsed ? 'center' : 'flex-start'}
					>
						<Avatar src={user.avatarUrl} alt={user.name} />
						{!collapsed && (
							<Box>
								<Typography fontWeight='bold' fontSize={15}>
									{user.name}
								</Typography>
								<Typography fontSize={13} color='#b0b8c1'>
									{user.role}
								</Typography>
							</Box>
						)}
						<IconButton
							aria-label='sign out'
							onClick={onSignOut}
							sx={{ color: '#fff', ml: 'auto' }}
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
			{/* Hamburger for mobile */}
			{isMobile && (
				<IconButton
					aria-label='open drawer'
					onClick={() => setMobileOpen(true)}
					sx={{
						position: 'fixed',
						top: 16,
						left: 16,
						zIndex: theme.zIndex.drawer + 1,
						bgcolor: '#0a2259',
						color: '#fff',
						'&:hover': { bgcolor: '#17316a' },
					}}
				>
					<MenuIcon />
				</IconButton>
			)}
			<Drawer
				variant={isMobile ? 'temporary' : 'permanent'}
				open={isMobile ? mobileOpen : true}
				onClose={() => setMobileOpen(false)}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					width: collapsed ? collapsedWidth : drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: collapsed ? collapsedWidth : drawerWidth,
						boxSizing: 'border-box',
						bgcolor: '#0a2259',
						color: '#fff',
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