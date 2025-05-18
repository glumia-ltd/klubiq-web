import Box from '@mui/system/Box';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContainerStyle } from '@/styles/shared-style';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentsIcon from '@mui/icons-material/Payments';
import { KlubiqSideNav, NavLink } from '@klubiq/ui-components';

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
            <KlubiqSideNav
                navLinks={navLinks}
                user={user}
				onNavClick={handleNavClick}
                onSignOut={handleSignOut}
            />
			<Box sx={AppContainerStyle.content}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default AppContainer;