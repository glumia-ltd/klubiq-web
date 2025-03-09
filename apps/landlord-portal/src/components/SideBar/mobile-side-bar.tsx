import { styled, useTheme } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
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
function MobileSideBar({
	onSelectSection,
}: {
	onSelectSection: (section: string) => void;
}) {
	const theme = useTheme();

	const { getPathList } = useContext(SectionContext);
	const { switchMode, mode } = useContext(ThemeContext);
	const allContexts = useContext(Context);
	const pathList = getPathList();
	const { pathname } = useLocation();
	const {
		sidebarOpen,
		mobileSideBarOpen,
		drawerWidth,
		setIsclosing,
		toggleMobileSidebar,
	} = allContexts;

	const handleDrawerClose = () => {
		setIsclosing(true);
		toggleMobileSidebar();
	};

	const handleDrawerTransitionEnd = () => {
		setIsclosing(true);
	};

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
		gap: '20px',
		padding: theme.spacing(1, 2),
		alignItems: 'center',
		width: drawerWidth.smallOpen,
	}));

	const handleLinkClick = (title: string) => {
		handleDrawerClose();
		if (title !== 'Logout') {
			onSelectSection(title);
			return;
		}
		sessionStorage.clear();
		auth.signOut();
	};
	useEffect(() => {
		if (pathname && pathname !== '/') {
			onSelectSection(pathname?.split('/')[1] || '');
		}
	}, [onSelectSection]);

	return (
		<Drawer
			id='mobile-drawer'
			variant='temporary'
			open={mobileSideBarOpen}
			onTransitionEnd={handleDrawerTransitionEnd}
			onClose={handleDrawerClose}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
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

export default MobileSideBar;
