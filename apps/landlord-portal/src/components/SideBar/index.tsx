import { useEffect } from 'react';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
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
	Typography,
} from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { Context } from '../../context/NavToggleContext/NavToggleContext';
const drawerWidth = {
	smallOpen: 200,
	smallClosed: 0,
	largeOpen: 230,
	largeClosed: 70,
};

const transitionedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.enteringScreen,
	}),
});

// const closedMixin = (theme: Theme): CSSObject => ({
// 	// transition: theme.transitions.create('width', {
// 	// 	easing: theme.transitions.easing.easeInOut,
// 	// 	duration: theme.transitions.duration.leavingScreen,
// 	// }),
// 	//flexDirection: 'column',
// 	width: `70px`,
// 	[theme.breakpoints.up('sm')]: {
// 		width: `70px`,
// 	},
// 	[theme.breakpoints.down('sm')]: {
// 		width: `50px`,
// 	},
// });

const DrawerHeader = styled('div')(() => ({
	display: 'flex',
	alignItems: 'center',
	alignSelf: 'flex-start',
}));
const ThemeSwitcher = styled('div')(() => ({
	position: 'fixed',
	bottom: '24px',
}));
const DrawerChildren = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '80%',
	gap: '20px',
	padding: theme.spacing(1, 3),
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

function SideBar() {
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const { getPathList } = useContext(SectionContext);
	const { switchMode } = useContext(ThemeContext);
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
						<IconButton
						//style={{ height: '30px' }}
						>
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

												//idth: sidebarOpen ? '200px' : '70px',
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
													mr: sidebarOpen ? 1 : 'auto',
													justifyContent: 'center',
												}}
											>
												<SvgIcon
													sx={{
														fontSize: '30px',
														width: '30px',
														height: '30px',
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
							borderRadius: '15px',
							background: '#ffffff',
							padding: sidebarOpen ? '4px 8px' : '0px',
						}}
					>
						<Button
							onClick={() => switchMode(ThemeMode.LIGHT)}
							sx={{
								color: '#002147',
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
				</ThemeSwitcher>
			</DrawerChildren>
		</Drawer>
	);
}

export default SideBar;
