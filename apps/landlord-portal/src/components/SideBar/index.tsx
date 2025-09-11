import { styled, useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo2 from '../../assets/images/icons.svg';
import { SectionContext } from '../../context/SectionContext/SectionContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListItem,
	List,
	Button,
	Stack,
	Typography,
	Drawer
} from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { Context } from '../../context/NavToggleContext/NavToggleContext';
import { useSignOutMutation } from '../../store/AuthStore/authApiSlice';
import { motion } from 'framer-motion';
import { useVisibleNav } from './useVisibleNav';
import { NavToolTips } from '../../styles/tooltips';


const SideBar = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { getPathList } = useContext(SectionContext);
	const { switchMode, mode } = useContext(ThemeContext);
	const allContexts = useContext(Context);
	const { visible: pathList } = useVisibleNav(getPathList());
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

	const DrawerHeader = styled('div')(() => ({
		display: 'flex',
		alignItems: 'center',
		alignSelf: 'center',
	}));

	const ThemeSwitcher = styled('div')(() => ({
		position: 'fixed',
		bottom: '24px',
	}));

	const DrawerChildren = styled('div')(() => ({
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		gap: 2,
		padding: theme.spacing(1, 2),
		alignItems: 'center',
	}));

	const MotionDrawer = motion.create(Drawer);

	// Define animation variants
	const smoothTransition = {
		type: 'spring',
		stiffness: 100,
		damping: 20,
		mass: 1,
		duration: 0.8,
	};
	const drawerVariants = {
		expanded: {
			width: `${drawerWidth.largeOpen}px`, // expanded width
			transition: smoothTransition,
		},
		collapsed: {
			width: `${drawerWidth.largeClosed}px`, // collapsed width
			transition: smoothTransition,
		},
	};

	// Define content animation variants
	const contentVariants = {
		expanded: {
			opacity: 1,
			transition: {
				duration: 0.2,
				delay: 0.1,
			},
		},
		collapsed: {
			// opacity: 0.5,
			transition: {
				duration: 0.2,
			},
		},
	};

	const openDrawerStyles = {
		'& .MuiDrawer-paper': {
			width: '200px',
			transition: 'none',
			overflowX: 'hidden',
			willChange: 'transform', // Optimize performance
			backfaceVisibility: 'hidden', // Prevent flickering
			WebkitBackfaceVisibility: 'hidden',
			transform: 'translateZ(0)', // Force GPU acceleration
			WebkitTransform: 'translateZ(0)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	};
	const closedDrawerStyles = {
		'& .MuiDrawer-paper': {
			width: '55px',
			transition: 'none',
			overflowX: 'hidden',
			willChange: 'transform', // Optimize performance
			backfaceVisibility: 'hidden', // Prevent flickering
			WebkitBackfaceVisibility: 'hidden',
			transform: 'translateZ(0)', // Force GPU acceleration
			WebkitTransform: 'translateZ(0)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	};
	const handleSignOut = async () => {
		await userSignOut({}).unwrap();
		navigate('/login');
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
			initial='collapsed'
			animate={sidebarOpen ? 'expanded' : 'collapsed'}
			variants={drawerVariants as any}
			open={sidebarOpen}
			// onMouseEnter={() => setSidebarOpen(true)}
			// onMouseLeave={() => setSidebarOpen(false)}
			onTransitionEnd={handleDrawerTransitionEnd}
			onClose={handleDrawerClose}
			sx={sidebarOpen ? openDrawerStyles : closedDrawerStyles}
			anchor='left'
		>
			<DrawerChildren>
				<motion.div
					variants={contentVariants}
					initial='collapsed'
					animate={sidebarOpen ? 'expanded' : 'collapsed'}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2,
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
							const { path } = props;
							return (
								<NavToolTips
									key={index}
									placement='right'
									title={props.title}
									disableHoverListener={sidebarOpen}
									disableFocusListener={sidebarOpen}
									disableTouchListener={sidebarOpen}
								>
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
												selected={pathname.includes(path || '') && path !== '/'}
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
													{/* <SvgIcon
													sx={{
														fontSize: '20px',
														width: '20px',
														height: '20px',
													}}
													component={props.icon}
													inheritViewBox
												/> */}
													{props.icon}
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
								</NavToolTips>
							);
						})}
					</List>
				</motion.div>
				<ThemeSwitcher>
					<motion.div
						variants={contentVariants}
						initial='collapsed'
						animate={sidebarOpen ? 'expanded' : 'collapsed'}
					>
						<Stack
							direction={{ xs: sidebarOpen ? 'row' : 'column' }}
							sx={{
								borderRadius: '10px',
								background: '#ffffff',
								padding: sidebarOpen ? '8px 8px' : '0.9px',
								height: sidebarOpen ? '60px' : '96px',
								width: sidebarOpen ? 'auto' : '55px',
								gap: 1,
								alignItems: 'center',
								justifyContent: 'space-around',
							}}
						>
							<NavToolTips title='Light Mode' placement='right' disableHoverListener={sidebarOpen} disableFocusListener={sidebarOpen} disableTouchListener={sidebarOpen}>
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
							</NavToolTips>
							<NavToolTips title='Dark Mode' placement='right' disableHoverListener={sidebarOpen} disableFocusListener={sidebarOpen} disableTouchListener={sidebarOpen}>
							<Button
								onClick={() => switchMode(ThemeMode.DARK)}
								sx={{
									color: mode === ThemeMode.DARK ? '#ffffff' : '#002147',
									background:
										mode === ThemeMode.DARK ? '#002147' : 'transparent',
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
							</NavToolTips>
						</Stack>
					</motion.div>
				</ThemeSwitcher>
			</DrawerChildren>
		</MotionDrawer>
	);
};

export default SideBar;
