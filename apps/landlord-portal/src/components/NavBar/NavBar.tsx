import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { Context } from '../../context/NavToggleContext/NavToggleContext';
import {
	Grid,
	AppBar,
	IconButton,
	Avatar,
	Badge,
	Divider,
	TextField,
	InputAdornment,
	Skeleton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationModal from '../../components/Modals/NotificationModal';
import SearchIcon from '@mui/icons-material/Search';
import { reduce, replace, startCase } from 'lodash';
import KlbMenuList, { menuItem } from '../Shared/CustomMenuList';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { auth } from '../../firebase';
import CustomPopper from '../Shared/CustomPopper';
import { useGetNotificationsQuery } from '../../store/NotificationStore/NotificationApiSlice';
import { styles } from './style';
import { stringAvatar } from '../../helpers/utils';
import { consoleDebug } from '../../helpers/debug-logger';

const NavBar = () => {
	const { user } = useSelector(getAuthState);
	const { data: notificationData } = useGetNotificationsQuery();
	const [unreadCount, setUnreadCount] = useState(0);
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
	const { toggleMobileSidebar, mobileSideBarOpen, setIsclosing } =
		useContext(Context);
	const [isModalOpen, setOpenModal] = useState(false);
	const [searchText, setSearchText] = useState('');
	const simplifyRoleName = (role: string) => {
		const simplifiedRole = replace(role.toLowerCase(), 'organization', '');
		return startCase(simplifiedRole);
	};
	const [openAvatarPopper, setOpenAvatarPopper] = useState<boolean>(false);
	const handleAvatarPopperToggle = () => {
		setOpenAvatarPopper((prevOpen) => !prevOpen);
	};
	const anchorRef = useRef<HTMLButtonElement>(null);
	const handleOpenSidebar = () => {
		setIsclosing && setIsclosing(false);
		toggleMobileSidebar && toggleMobileSidebar();
	};
	const handleListKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpenAvatarPopper(false);
		} else if (event.key === 'Escape') {
			setOpenAvatarPopper(false);
		}
	};

	const avatarMenus: menuItem[] = [
		...(isSmallScreen
			? [
					{
						label:
							user?.firstName && user?.lastName
								? `${user?.firstName} ${user?.lastName}`
								: '',
						hasDivider: true,
					},
				]
			: []),
		{
			label: 'Profile',
			onClick: () => {
				consoleDebug('redirect to profile page later');
			},
			icon: <PersonOutlineOutlinedIcon sx={{ color: 'text.primary' }} />,
			sx: {
				padding: '10px',
			},
		},
		{
			label: 'Settings',
			onClick: () => {
				consoleDebug('redirect to settings page later');
			},
			icon: <SettingsOutlinedIcon sx={{ color: 'text.primary' }} />,
			sx: {
				padding: '10px',
			},
		},
		{
			label: 'Logout',
			onClick: () => {
				sessionStorage.clear();
				auth.signOut();
			},
			icon: <LogoutOutlinedIcon sx={{ color: 'text.primary' }} />,
			sx: {
				padding: '10px',
			},
		},
	];
	useEffect(() => {
		if (notificationData) {
			const unreadCount = reduce(
				notificationData,
				(sum, gn) =>
					sum +
					(gn.notifications.reduce(
						(unreadSum, n) => (n.isRead ? unreadSum + 0 : unreadSum + 1),
						0,
					) || 0),
				0,
			);
			setUnreadCount(unreadCount);
		}
	}, [notificationData]);
	return (
		<>
			<AppBar position='fixed' elevation={2} sx={{ width: '100%' }}>
				<Toolbar variant='regular' sx={styles(isSmallScreen).toolBarSx}>
					<Grid
						key={'main-container'}
						container
						spacing={1}
						sx={styles(isSmallScreen).mainContainer}
					>
						<Grid
							key={'left-grid'}
							item
							container
							sx={styles(isSmallScreen).leftGridContainer}
						>
							{isSmallScreen && !mobileSideBarOpen && (
								<IconButton
									// sx={{ marginRight: '1rem' }}
									onClick={handleOpenSidebar}
									size={'large'}
									edge='end'
									color='inherit'
									aria-label='menu'
								>
									<MenuIcon />
								</IconButton>
							)}
							<Grid item xs={2} ml={{ xs: '1rem', sm: '0.5rem', md: '1rem' }}>
								<Typography sx={styles(isSmallScreen).appSectionTitle}>
									{' '}
									{/* {section}{' '} */}
								</Typography>
							</Grid>
						</Grid>

						<Grid
							key={'right-grid'}
							item
							sx={styles(isSmallScreen).rightGridContainer}
						>
							{/* <ResponsiveTextFieldWithModal />
							 */}

							<TextField
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
								id='input-with-icon-textfield'
								placeholder='Search Transactions,customers'
								sx={styles(isSmallScreen).searchInput}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SearchIcon />
										</InputAdornment>
									),

									sx: styles(isSmallScreen).searchAdornment,
								}}
								variant='outlined'
							/>
							<IconButton
								size='large'
								disableRipple
								sx={styles(isSmallScreen).notificationIconButton}
								onClick={() => {
									setOpenModal(true);
								}}
							>
								<Badge
									badgeContent={unreadCount}
									invisible={unreadCount <= 0}
									color='error'
								>
									<NotificationsNoneOutlinedIcon
										sx={styles(isSmallScreen).notificationIcon}
									/>
								</Badge>
							</IconButton>
							<Divider
								orientation='vertical'
								variant='middle'
								color={theme.palette.primary.main}
								flexItem
							/>
							<Typography ml={1} sx={styles(isSmallScreen).nameRoleText}>
								{' '}
								{user?.firstName ?? (
									<Skeleton variant='rectangular' width='30px' />
								)}{' '}
								{user?.lastName ?? (
									<Skeleton variant='rectangular' width='30px' />
								)}{' '}
								<br />
								{user?.roleName ? (
									simplifyRoleName(user?.roleName)
								) : (
									<Skeleton variant='rectangular' width='40px' />
								)}
							</Typography>
							<div>
								<IconButton
									edge='end'
									disableRipple
									sx={{ color: 'black' }}
									aria-haspopup='true'
									ref={anchorRef}
									onClick={handleAvatarPopperToggle}
								>
									{user?.profilePicUrl ? (
										<Avatar
											alt={`${user?.firstName} ${user?.lastName}`}
											src={user?.profilePicUrl}
											sx={styles(isSmallScreen).profilePic}
										/>
									) : (
										<Avatar
											{...(user?.firstName &&
												user?.lastName &&
												stringAvatar(user?.firstName, user?.lastName))}
										/>
									)}
								</IconButton>
								<CustomPopper
									open={openAvatarPopper}
									anchorEl={anchorRef.current}
									onClose={() => setOpenAvatarPopper(false)}
									children={
										<KlbMenuList
											id='avatar-menu'
											handleKeyDown={handleListKeyDown}
											menuItems={avatarMenus}
										></KlbMenuList>
									}
								></CustomPopper>
							</div>
						</Grid>
					</Grid>
				</Toolbar>
				{isModalOpen && (
					<NotificationModal
						open={isModalOpen}
						onClose={() => {
							setOpenModal(false);
						}}
						notifications={notificationData ?? []}
					/>
				)}
			</AppBar>
		</>
	);
};

export default NavBar;
