import { useEffect } from 'react';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Logo from '../../assets/images/lightshort.svg';
import Logo2 from '../../assets/images/icons.svg';
import { SectionContext } from '../../context/SectionContext/SectionContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';

import {
	ListItemButton,
	ListItemIcon,
	SvgIcon,
	ListItemText,
	ListItem,
	List,
	Button,
	Stack,
} from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { Context } from '../../context/NavToggleContext/NavToggleContext';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(16)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(16)} + 1px)`,
	},
	[theme.breakpoints.down('md')]: {
		width: `calc(${theme.spacing(0)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': 'openedMixin(theme)',
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

function SideBar() {
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const { getPathList } = useContext(SectionContext);
	const { mode, switchMode } = useContext(ThemeContext);
	const allContexts = () => useContext(Context);
	const { sidebarOpen, closeSidebar, openSidebar } = allContexts();
	const pathList = getPathList();
	const { pathname } = useLocation();

	useEffect(() => {
		isMediumScreen ? closeSidebar : sidebarOpen;
	}, [isMediumScreen]);
	useEffect(() => {
		isSmallScreen && closeSidebar;
	}, [isSmallScreen]);

	return (
		<Drawer
			variant='permanent'
			open={sidebarOpen}
			onMouseEnter={openSidebar}
			onMouseLeave={closeSidebar}
		>
			<DrawerHeader
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<IconButton onClick={sidebarOpen ? closeSidebar : openSidebar}>
					{sidebarOpen ? (
						mode === ThemeMode.LIGHT ? (
							<img
								src={Logo2}
								alt='logo'
								style={{ width: '50px', height: '50px' }}
							/>
						) : (
							<img src={Logo2} alt='logos' />
						)
					) : mode === ThemeMode.DARK ? (
						<img src={Logo} alt='logo' />
					) : (
						<img src={Logo} alt='logo' />
					)}
				</IconButton>
			</DrawerHeader>
			<List sx={{ marginBottom: '20px' }}>
				{pathList.map((props, index) => {
					const path = props.path;
					return (
						<ListItem disablePadding key={index}>
							<Link
								to={props.path || ''}
								relative='path'
								style={{ textDecoration: 'none' }}
							>
								<ListItemButton
									selected={path === pathname}
									sx={{
										minHeight: 20,
										justifyContent: sidebarOpen ? 'initial' : 'center',
										px: 2.5,
										my: 0.8,
										py: 0.8,
										marginLeft: sidebarOpen ? 4 : 4,
										width: sidebarOpen ? '200px' : '70px',
										borderRadius: '10px',
										'&:hover': {
											bgcolor: 'rgba(255,255,255,0.6)',
											color: 'rgba(255,255,255,0.5)',
										},
										'&.Mui-selected': {
											bgcolor: 'white',
											'& .MuiListItemIcon-root': {
												color: 'primary.main',
											},
											'& .MuiListItemText-root': {
												color: 'primary.main',
											},
											'&:hover': {
												bgcolor: 'white',
											},
										},
									}}
									// onMouseEnter={openSidebar}
									// onMouseLeave={closeSidebar}
									onClick={openSidebar}
									onDoubleClick={closeSidebar}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: sidebarOpen ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<SvgIcon
											sx={{ fontSize: '30px', width: '30px', height: '30px' }}
											component={props.icon}
											inheritViewBox
										/>
									</ListItemIcon>
									<ListItemText sx={{ opacity: sidebarOpen ? 1 : 0 }}>
										{props.title}
									</ListItemText>
								</ListItemButton>
							</Link>
						</ListItem>
					);
				})}
			</List>
			<Stack
				direction={{ xs: sidebarOpen ? 'row' : 'column' }}
				spacing={{ xs: 1, sm: 1, md: 0 }}
				sx={{
					borderRadius: '15px',
					width: sidebarOpen ? '200px' : '70px',
					textAlign: 'center',
					margin: 'auto',
					// display: 'flex',
					// justifyContent: 'center',
					background: '#ffffff',
					padding: sidebarOpen ? '8px' : '0px',
				}}
			>
				<Button
					onClick={() => switchMode(ThemeMode.LIGHT)}
					sx={{
						color: '#002147',
						width: sidebarOpen ? '100%' : '50%',
						borderRadius: sidebarOpen ? '15px' : '20px',
						padding: '10px',
						fontSize: '10px',

						'&:hover': {
							color: '#ffffff',
							background: '#002147',
							cursor: 'pointer',
						},
					}}
				>
					{sidebarOpen ? (
						<>
							<LightModeIcon sx={{ fontSize: 20 }} /> <h3>Light</h3>
						</>
					) : (
						<LightModeIcon />
					)}
				</Button>
				<Button
					onClick={() => switchMode(ThemeMode.DARK)}
					sx={{
						color: '#002147',
						width: sidebarOpen ? '100%' : '50%',
						borderRadius: sidebarOpen ? '15px' : '20px',
						fontSize: '10px',
						padding: '10px',
						'&:hover': {
							color: '#ffffff',
							background: '#002147',
							cursor: 'pointer',
						},
					}}
				>
					{sidebarOpen ? (
						<>
							{' '}
							<DarkModeIcon sx={{ fontSize: 20 }} />
							<h3>Dark</h3>
						</>
					) : (
						<DarkModeIcon sx={{ fontSize: 20 }} />
					)}
				</Button>
			</Stack>
		</Drawer>
	);
}

export default SideBar;
