import { styled, useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation } from 'react-router-dom';
import Logo2 from '../../assets/images/icons.svg';
import { SectionContext } from '../../context/SectionContext/SectionContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
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
	Drawer,
} from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { Context } from '../../context/NavToggleContext/NavToggleContext';
import { auth } from '../../firebase';
import { useSignOutMutation } from '../../store/AuthStore/authApiSlice';
import { resetStore } from '../../store';
import { motion } from 'framer-motion';


const SideBar = () => {
	const theme = useTheme();
	const { getPathList } = useContext(SectionContext);
	const { switchMode, mode } = useContext(ThemeContext);
	const allContexts = useContext(Context);
	const pathList = getPathList();
	const { pathname } = useLocation();
	const [userSignOut] = useSignOutMutation();
	const { sidebarOpen, setSidebarOpen, setIsclosing, drawerWidth } =
		allContexts;

	const handleDrawerClose = () => {
		setIsclosing(true);
		setSidebarOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsclosing(true);
	};
	// const transitionedMixin = (theme: Theme): CSSObject => ({
	// 	transition: theme.transitions.create('width', {
	// 		easing: theme.transitions.easing.easeInOut,
	// 		duration: theme.transitions.duration.enteringScreen,
	// 	}),
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

	const DrawerChildren = styled('div')(() => ({
		display: 'flex',
		flexDirection: 'column',
		width: '80%',
		gap: '20px',
		padding: theme.spacing(1, 2),
		alignItems: 'center',
	}));

	const MotionDrawer = motion(Drawer);

	// Define animation variants
	const smoothTransition = {
		type: "spring",
		stiffness: 100,
		damping: 20,
		mass: 1,
		duration: 0.8
	  };
	const drawerVariants = {
		expanded: {
		  width: `${drawerWidth.largeOpen}px`, // expanded width
		  transition: smoothTransition
		},
		collapsed: {
		  width: `${drawerWidth.largeClosed}px`, // collapsed width
		  transition: smoothTransition
		}
	  };
	
	  // Define content animation variants
	  const contentVariants = {
		expanded: {
		  opacity: 1,
		  transition: {
			duration: 0.2,
			delay: 0.1
		  }
		},
		collapsed: {
		  opacity: 0.5,
		  transition: {
			duration: 0.2
		  }
		}
	  };

	// const Drawer = styled(MuiDrawer, {
	// 	shouldForwardProp: (prop) => prop !== 'open',
	// })(({ theme, open }) => ({
	// 	'& .MuiDrawer-paper': {
	// 		width: 'inherit',
	// 	},
	// 	...transitionedMixin(theme),
	// 	...(open && {
	// 		width: `${drawerWidth.largeOpen}px`,
	// 	}),
	// 	...(!open && {
	// 		width: `${drawerWidth.largeClosed}px`,
	// 	}),
	// }));
	const drawerStyles = {
		'& .MuiDrawer-paper': {
		  width: 'auto',
		  transition: 'none',
		  overflowX: 'hidden',
		  willChange: 'transform', // Optimize performance
		  backfaceVisibility: 'hidden', // Prevent flickering
		  WebkitBackfaceVisibility: 'hidden',
		  transform: 'translateZ(0)', // Force GPU acceleration
		  WebkitTransform: 'translateZ(0)',
		}
	  };

	const handleSignOut = async () => {
		await userSignOut({}).unwrap();
		resetStore();
		sessionStorage.clear();
		auth.signOut();
	};

	const handleLinkClick = (title: string) => {
		if (title !== 'Logout') {
			return;
		}
		handleSignOut();
	};

	return (
		<MotionDrawer
			variant='permanent'
			initial="collapsed"
			animate={sidebarOpen ? 'expanded' : 'collapsed'}
			variants={drawerVariants}
			open={sidebarOpen}
			onMouseEnter={() => setSidebarOpen(true)}
			onMouseLeave={() => setSidebarOpen(false)}
			onTransitionEnd={handleDrawerTransitionEnd}
			onClose={handleDrawerClose}
			sx={drawerStyles}
			anchor='left'
		>
		<DrawerChildren>
				<motion.div
					variants={contentVariants}
					initial="collapsed"
					animate={sidebarOpen ? 'expanded' : 'collapsed'}
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
							const {path} = props;
							return (
								<ListItem
									disablePadding
									key={index}
									onClick={() => {
										handleLinkClick(props.title);
									}}
								>
									<Link
										to={props.path || ''}
										relative='path'
										style={{
											textDecoration: 'none',
											width: sidebarOpen ? 'inherit' : '40px',
										}}
									>
										<ListItemButton
											selected={pathname.includes(path) && path !== '/'}
											sx={{
												minHeight: 20,
												justifyContent: sidebarOpen ? 'initial' : 'center',
												alignItems: 'center',
												my: 0.8,
												borderRadius: '10px',
												'&:hover': {
													bgcolor: 'secondary.light',
													opacity: '0.9',
												},
												'&.Mui-selected': {
													bgcolor: 'white',
													'& .MuiListItemIcon-root': {
														// color: 'primary.main',
														color: 'secondary.light',
													},
													'& .MuiListItemText-root': {
														// color: 'primary.main',
														color: 'secondary.dark',
													},
													'&:hover': {
														bgcolor: 'white',
													},
												},
											}}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: sidebarOpen ? 1 : 'auto',
													justifyContent: 'center',
													pointerEvents: 'none',
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
											<ListItemText
												sx={{
													opacity: sidebarOpen ? 1 : 0,
													pointerEvents: 'none',
													justifyContent: 'center',
													'& .MuiListItemText-primary': {
														fontWeight: 600,
														fontSize: '1.1rem',
													},
												}}
											>
												{props.title}
											</ListItemText>
										</ListItemButton>
									</Link>
								</ListItem>
							);
						})}
					</List>
				</motion.div>
				<ThemeSwitcher>
					<motion.div
						variants={contentVariants}
						initial="collapsed"
						animate={sidebarOpen ? 'expanded' : 'collapsed'}
					>
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
					</motion.div>
				</ThemeSwitcher>
			</DrawerChildren>
		</MotionDrawer>
	);
}

export default SideBar;
