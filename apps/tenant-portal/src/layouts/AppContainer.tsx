import Box from '@mui/system/Box';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContainerStyle } from '@/styles/shared-style';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentsIcon from '@mui/icons-material/Payments';
import { SideNav } from '@/components/SideNav/KlubiqSideNav';
import { NavLink } from '@/components/SideNav/SideNavTypes';
import { useSignOutMutation } from '@/store/AuthStore/authApi.slice';
import { AppFooter } from '@klubiq/ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { BottomNav } from '@/components/BottomNav/BottomNav';
import { useTheme } from '@mui/material/styles';
import { AppBar, useMediaQuery } from '@mui/material';
import { Build, Description, Person } from '@mui/icons-material';
// Example for tenant portal
const tenantFooterConfig = {
	appName: 'Tenant Portal',
	version: import.meta.env.REACT_TP_APP_VERSION || '0.0.1',
	environment: import.meta.env.VITE_NODE_ENV as
		| 'development'
		| 'staging'
		| 'production',
	// ... other props
};

const AppContainer = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.auth);
	const [signOut] = useSignOutMutation();

	// Define navigation links
	const navLinks: NavLink[] = [
		{
			label: 'Dashboard',
			icon: <DashboardIcon />,
			route: '/dashboard',
			index: 0,
		},
		{
			label: 'Payments',
			icon: <PaymentsIcon />,
			route: '/payments',
			index: 1,
			// disabled: true,
		},
		{
			label: 'Maintenance',
			icon: <Build />,
			route: '/maintenance',
			index: 2,
			//disabled: true,
		},
		{
			label: 'Documents',
			icon: <Description />,
			route: '/documents',
			index: 3,
			// disabled: true,
		},
		{
			label: 'Profile',
			icon: <Person />,
			route: '/profile',
			index: 4,
			disabled: !isMobile,
		},
	];

	// Mock user data (replace with your actual user data
	// Navigation handler
	const handleNavClick = (route: string) => {
		navigate(route);
	};

	// Sign out handler
	const handleSignOut = async () => {
		// Implement your sign out logic here
		try {
			const { error } = await signOut({});

			if (error) {
				throw error;
			}
			navigate('/', { replace: true });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box sx={{ ...AppContainerStyle(isMobile).box, pb: 7 }}>
			{!isMobile && (
				<SideNav
					navLinks={navLinks}
					user={user}
					onNavClick={handleNavClick}
					onSignOut={handleSignOut}
				/>
			)}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
				}}
			>
				<Box sx={AppContainerStyle(isMobile).content} p={isMobile ? 2 : 5}>
					<Outlet />
				</Box>
				{/* {!isMobile && (
					<AppBar
						position='static'
						sx={{
							top: 'auto',
							bottom: 0,
							width: '100%',
							backgroundColor: 'background.default',
						}}
					>
						<AppFooter {...tenantFooterConfig} />
					</AppBar>
				)} */}
			</Box>

			{isMobile && (
				<BottomNav navLinks={navLinks} onNavClick={handleNavClick} />
			)}
		</Box>
	);
};

export default AppContainer;
