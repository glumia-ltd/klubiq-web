import Box from '@mui/system/Box';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContainerStyle } from '@/styles/shared-style';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentsIcon from '@mui/icons-material/Payments';
import { SideNav } from '@/components/SideNav/KlubiqSideNav';
import { NavLink } from '@/components/SideNav/SideNavTypes';
import { AppFooter } from '@klubiq/ui-components';

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
	const navigate = useNavigate();
	// Define navigation links
	const navLinks: NavLink[] = [
		{
			label: 'Dashboard',
			icon: <DashboardIcon />,
			route: '/dashboard',
			index: 0,
		},
		{
			label: 'Properties',
			icon: <ApartmentIcon />,
			route: '/properties',
			index: 1,
		},
		{
			label: 'Tenants',
			icon: <PeopleIcon />,
			route: '/tenants',
			index: 2,
		},
		{
			label: 'Payments',
			icon: <PaymentsIcon />,
			route: '/payments',
			index: 3,
		},
	];

	// Mock user data (replace with your actual user data)
	const user = {
		name: 'John Doe',
		role: 'Property Manager',
		avatarUrl: 'path/to/avatar.jpg',
	};
	// Navigation handler
	const handleNavClick = (route: string) => {
		navigate(route);
	};

	// Sign out handler
	const handleSignOut = () => {
		// Implement your sign out logic here
		console.log('Signing out...');
	};

	return (
		<Box sx={AppContainerStyle.box}>
			<SideNav
				navLinks={navLinks}
				user={user}
				onNavClick={handleNavClick}
				onSignOut={handleSignOut}
			/>
			<Box sx={AppContainerStyle.content}>
				<Outlet />
				<Box width={'100%'}>
					<AppFooter {...tenantFooterConfig} />
				</Box>
			</Box>
		</Box>
	);
};

export default AppContainer;
