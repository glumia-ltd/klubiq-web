// import EmailIcon from '@mui/icons-material/Email';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
// import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutIcon from '@mui/icons-material/Logout';
// import HelpIcon from '@mui/icons-material/Help';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';
import { Settings } from '@mui/icons-material';
const userPathList = [
	{
		title: 'Dashboard',
		icon: DashboardIcon,
		path: '/dashboard',
	},
	{
		title: 'Properties',
		icon: HomeIcon,
		path: '/properties',
	},
	{
		title: 'Leases',
		icon: RateReviewIcon,
		path: '/leases',
	},
	{
		title: 'Tenants',
		icon: PeopleIcon,
		path: '/tenants',
	},
	{
		title: 'Settings',
		icon: Settings,
		path: '/settings',
	},
	
	{
		title: 'Logout',
		icon: LogoutIcon,
		path: '/',
	},
];

export default userPathList;
