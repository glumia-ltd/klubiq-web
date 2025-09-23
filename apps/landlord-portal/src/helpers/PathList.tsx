// import EmailIcon from '@mui/icons-material/Email';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
// import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutIcon from '@mui/icons-material/Logout';
// import HelpIcon from '@mui/icons-material/Help';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';
import { Settings } from '@mui/icons-material';
import { PERMISSIONS } from '../authz/constants';
import { PermissionType } from '../store/AuthStore/authType';

export type NavItem = {
	id: string;
	title: string;
	path?: string;
	icon?: React.ReactNode;
	permsAny?: PermissionType[];
	permsAll?: PermissionType[];
	children?: NavItem[];
  };

const userPathList: NavItem[] = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		icon: <DashboardIcon />,
		path: '/dashboard',
		permsAll: [PERMISSIONS.DASHBOARD.READ],
	},
	{
		id: 'properties',
		title: 'Properties',
		icon: <HomeIcon />,
		path: '/properties',
		permsAny: [PERMISSIONS.PROPERTY.READ, PERMISSIONS.PROPERTY.CREATE, PERMISSIONS.PROPERTY.UPDATE, PERMISSIONS.PROPERTY.DELETE],
	},
	{
		id: 'leases',
		title: 'Leases',
		icon: <RateReviewIcon />,
		path: '/leases',
		permsAny: [PERMISSIONS.LEASE.READ, PERMISSIONS.LEASE.CREATE, PERMISSIONS.LEASE.UPDATE, PERMISSIONS.LEASE.DELETE],
	},
	{
		id: 'tenants',
		title: 'Tenants',
		icon: <PeopleIcon />,
		path: '/tenants',
		permsAny: [PERMISSIONS.TENANT.READ, PERMISSIONS.TENANT.CREATE, PERMISSIONS.TENANT.UPDATE, PERMISSIONS.TENANT.DELETE],
	},
	{
		id: 'settings',
		title: 'Settings',
		icon: <Settings />,
		path: '/settings',
		permsAny: [PERMISSIONS.SETTINGS.READ, PERMISSIONS.SETTINGS.UPDATE],
	},
	
	{
		id: 'logout',
		title: 'Logout',
		icon: <LogoutIcon />,
		path: '/',
	},
];

export default userPathList;
