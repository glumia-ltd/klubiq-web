// import EmailIcon from '@mui/icons-material/Email';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
// import ConstructionIcon from '@mui/icons-material/Construction';
import LogoutIcon from '@mui/icons-material/Logout';
// import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import RateReviewIcon from '@mui/icons-material/RateReview';
import PeopleIcon from '@mui/icons-material/People';
const adminPathList = [
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
		title: 'Lease',
		icon: RateReviewIcon,
		path: '/lease',
	},
	{
		title: 'Tenants',
		icon: PeopleIcon,
		path: '/tenants',
	},
	// {
	// 	title: 'Maintenance',
	// 	icon: ConstructionIcon,
	// 	path: '/maintenance',
	// },
	// {
	// 	title: 'Message',
	// 	icon: EmailIcon,
	// 	path: '/message',
	// },
	// {
	// 	title: 'Support',
	// 	icon: HelpIcon,
	// 	path: '/support',
	// },
	{
		title: 'Settings',
		icon: SettingsIcon,
		path: '/settings',
	},
	{
		title: 'Logout',
		icon: LogoutIcon,
		path: '/',
	},
];

export default adminPathList;
