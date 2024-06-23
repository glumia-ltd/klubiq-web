import { useEffect, useContext } from 'react';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation } from 'react-router-dom';
import Logo2 from '../../assets/images/icons.svg';
import { SectionContext } from '../../context/SectionContext/SectionContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	ListItemButton,
	ListItemIcon,
	SvgIcon,
	ListItemText,
	ListItem,
	List,
	Button,
	Stack,
	Typography,
} from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { Context } from '../../context/NavToggleContext/NavToggleContext';

function SideBar() {
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
	// const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const { getPathList } = useContext(SectionContext);
	const { switchMode, mode } = useContext(ThemeContext);
	const allContexts = useContext(Context);
	const { sidebarOpen, closeSidebar, openSidebar, drawerWidth } = allContexts;
	const pathList = getPathList();
	const { pathname } = useLocation();

	const transitionedMixin = (theme: Theme): CSSObject => ({
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	});

	const DrawerHeader = styled('div')(() => ({
		display: 'flex',
		alignItems: 'center',
		alignSelf: 'flex-start',
	}));

	const ThemeSwitcher = styled('div')(() => ({
		position: 'fixed',
		bottom: '24px',
		// height:"90px"
	}));

	const DrawerChildren = styled('div')(() => ({
		display: 'flex',
		flexDirection: 'column',
		width: '80%',
		gap: '20px',
		padding: theme.spacing(1, 2),
		alignItems: 'center',
	}));

	const Drawer = styled(MuiDrawer, {
		shouldForwardProp: (prop) => prop !== 'open',
	})(({ theme, open }) => ({
		'& .MuiDrawer-paper': {
			width: 'inherit',
		},
		...transitionedMixin(theme),
		...(open && {
			[theme.breakpoints.up('sm')]: {
				width: `${drawerWidth.largeOpen}px`,
			},
			[theme.breakpoints.down('sm')]: {
				width: `${drawerWidth.smallOpen}px`,
			},
		}),
		...(!open && {
			[theme.breakpoints.down('sm')]: {
				width: `${drawerWidth.smallClosed}px`,
			},
		}),
	}));

	useEffect(() => {
		isMediumScreen ? closeSidebar : sidebarOpen;
	}, [isMediumScreen, closeSidebar, sidebarOpen]);

	// useEffect(() => {
	// 	isSmallScreen && closeSidebar();
	// }, [isSmallScreen, closeSidebar]);

	if (isMediumScreen && !sidebarOpen) {
		return null;
	}

	return (
		<Drawer
			variant='permanent'
			open={sidebarOpen}
			onMouseEnter={openSidebar}
			onMouseLeave={closeSidebar}
		>
			<DrawerChildren>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '20px',
					}}
				>
					<DrawerHeader>
						<IconButton>
							<img src={Logo2} height={'40px'} alt='logo' />
						</IconButton>
						<Typography variant='h4' color={'#ffffff'}>
							{sidebarOpen ? 'KLUBIQ' : ''}
						</Typography>
					</DrawerHeader>
					<List>
						{pathList.map((props, index) => {
							const path = props.path;
							return (
								<ListItem disablePadding key={index}>
									<Link
										to={props.path || ''}
										relative='path'
										style={{
											textDecoration: 'none',
											width: sidebarOpen ? 'inherit' : '40px',
										}}
									>
										<ListItemButton
											selected={path === pathname}
											sx={{
												minHeight: 20,
												justifyContent: sidebarOpen ? 'initial' : 'center',
												my: 0.8,
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
											onClick={openSidebar}
											onDoubleClick={closeSidebar}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: sidebarOpen ? 1 : 'auto',
													justifyContent: 'center',
												}}
											>
												<SvgIcon
													sx={{
														fontSize: '20px',
														width: '20px',
														height: '20px',
													}}
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
				</div>
				<ThemeSwitcher>
					<Stack
						direction={{ xs: sidebarOpen ? 'row' : 'column' }}
						sx={{
							borderRadius: '10px',
							background: '#ffffff',
							padding: sidebarOpen ? '8px 8px' : '0.9px',
							height: sidebarOpen ? '60px' : '96px',
							width: sidebarOpen ? 'auto' : '60px',
							gap: '8px',
							alignItems: 'center',
							justifyContent: 'space-around',
						}}
					>
						<Button
							onClick={() => switchMode(ThemeMode.LIGHT)}
							sx={{
								color: mode === ThemeMode.LIGHT ? '#ffffff' : '#002147',
								background:
									mode === ThemeMode.LIGHT ? '#002147' : 'transparent',
								borderRadius: sidebarOpen ? '18px' : '18px',
								padding: sidebarOpen ? '10px' : '0px',
								fontSize: '10px',
								marginTop: sidebarOpen ? '0px' : '8px',
								height: '36px',
								minWidth: '44px',
								'&:hover': {
									color: '#ffffff',
									background: '#002147',
									cursor: 'pointer',
									height: '36px',
									minWidth: '44px',
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
								color: mode === ThemeMode.DARK ? '#ffffff' : '#002147',
								background: mode === ThemeMode.DARK ? '#002147' : 'transparent',
								borderRadius: sidebarOpen ? '18px' : '18px',
								fontSize: '10px',
								padding: sidebarOpen ? '10px' : '0px',
								marginBottom: sidebarOpen ? '0px' : '8px',
								height: '36px',
								minWidth: '44px',
								'&:hover': {
									color: '#ffffff',
									background: '#002147',
									cursor: 'pointer',
									height: '36px',
									minWidth: '44px',
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
				</ThemeSwitcher>
			</DrawerChildren>
		</Drawer>
	);
}

export default SideBar;
