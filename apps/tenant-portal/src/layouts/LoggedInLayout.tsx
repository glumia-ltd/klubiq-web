import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import {
	Grid,
	Typography,
	Toolbar,
	ListItemText,
	ListItemIcon,
	ListItemButton,
	ListItem,
	List,
	Drawer,
	CssBaseline,
	Box,
	AppBar,
	Link,
	Avatar,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

import Logo from '@/assets/images/icons.svg';
import { styles } from './styles';

type Props = {
	children: React.ReactNode
}

const drawerWidth = 240;
const routes = [
	{
		title: 'Dashboard',
		route: '/dashboard',
		icon: DashboardOutlinedIcon,
	},
	{
		title: 'Rents',
		route: '/rents',
		icon: MonetizationOnOutlinedIcon,
	},
	{
		title: 'Issues',
		route: '/issues',
		icon: HandymanOutlinedIcon,
	},
];

export default function LoggedInUserLayout() {
	const { pathname } = useLocation();

	const [mobileOpen, setMobileOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const handleDrawerClose = () => {
		// setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const drawer = (
		<Grid container>
			<Grid
				container
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					p: {
						xs: '20px 40px',
						lg: '36px 65px',
					},
				}}
			>
				<img src={Logo} alt='Klubiq logo' />
			</Grid>

			<List sx={styles.list}>
				{routes.map(({ title, route, icon: Icon }, index) => (
					<Link
						component={NavLink}
						key={index}
						to={route}
						underline='none'
						sx={pathname == route ? styles['link-active'] : styles.link}
					>
						<ListItem
							disablePadding
							sx={pathname == route ? styles['link-active'] : styles.link}
						>
							<ListItemButton>
								<ListItemIcon>
									<Icon sx={styles['link-icon']} />
								</ListItemIcon>
								<ListItemText primary={title} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</Grid>
	);

	return (
		<Box sx={{ display: 'flex', backgroundColor: '#F1F1F1' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
				elevation={0}
			>
				<Toolbar sx={{ backgroundColor: '#F2F8FF', color: '#1B1B1B' }}>
					<Grid
						container
						direction={'row'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Grid item>
							<Grid container alignItems={'center'} direction={'row'}>
								<IconButton
									color='inherit'
									aria-label='open drawer'
									edge='start'
									onClick={handleDrawerToggle}
									sx={{ mr: 2, display: { sm: 'none' } }}
								>
									<MenuIcon />
								</IconButton>
								<Typography
									variant='h6'
									noWrap
									component='div'
									sx={styles.header}
								>
									{pathname.split('/')[1]}
								</Typography>
							</Grid>
						</Grid>

						<Grid item>
							<Grid container alignItems={'center'} gap={'1rem'}>
								<Grid item>
									<Avatar sx={styles.avatar}>B</Avatar>
								</Grid>
								<Grid
									item
									sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
								>
									<Typography variant='h6'>Blessing Bella</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='app-drawer'
			>
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onTransitionEnd={handleDrawerTransitionEnd}
					onClose={handleDrawerClose}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					minHeight: '100vh',
					backgroundColor: '#F2F8FF',
				}}
			>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
}
