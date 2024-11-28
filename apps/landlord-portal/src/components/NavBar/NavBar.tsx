import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useContext, useRef, useState } from 'react';
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
// import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import ResponsiveTextFieldWithModal from '../ControlledComponents/TextFieldWithModal';
import NotificationModal from '../../components/Modals/NotificationModal';
import SearchIcon from '@mui/icons-material/Search';
import { replace, startCase } from 'lodash';
import KlbMenuList, { menuItem } from '../Shared/CustomMenuList';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { auth } from '../../firebase';
import CustomPopper from '../Shared/CustomPopper';

const NavBar = () => {
	const { user } = useSelector(getAuthState);
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
	// const { pathname } = useLocation();
	// const section = pathname.split('/')[1];
	const handleAvatarPopperToggle = () => {
		setOpenAvatarPopper((prevOpen) => !prevOpen);
	};
	const anchorRef = useRef<HTMLButtonElement>(null);
	const handleOpenSidebar = () => {
		setIsclosing && setIsclosing(false);
		toggleMobileSidebar && toggleMobileSidebar();
	};
	const stringToColor = (string: string) => {
		let hash = 5;
		let i;

		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = '#';

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */

		return color;
	};
	const stringAvatar = (fname: string, lname: string) => {
		return {
			sx: {
				bgcolor: stringToColor(`${fname} ${lname}`),
				width: '40px',
				height: '40px',
				marginRight: '1rem',
				borderRadius: '90px',
			},
			children: `${fname[0]}${lname[0]}`,
		};
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
		{
			label: 'Profile',
			onClick: () => {
				console.log('profile');
			},
			icon: <PersonOutlineOutlinedIcon sx={{ color: 'text.primary' }} />,
			sx: {
				padding: '10px',
			},
		},
		{
			label: 'Settings',
			onClick: () => {
				console.log('profile');
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

	return (
		<AppBar position='fixed' elevation={2} sx={{ width: '100%' }}>
			<Toolbar
				variant='regular'
				sx={{
					justifyContent: 'space-between',
					padding: '.5rem',
				}}
			>
				<Grid
					container
					spacing={1}
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Grid
						item
						container
						sx={{
							width: {
								xs: '30%',
								sm: '50%',
								md: '50%',
								lg: '50%',
								xl: '50%',
							},
							alignItems: 'center',
							display: {
								xs: 'flex',
								sm: 'flex',
								md: 'flex',
								lg: 'flex',
								xl: 'flex',
							},
						}}
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
							<Typography
								sx={{
									textTransform: 'capitalize',
									fontWeight: '500',
									fontSize: '18px',
								}}
							>
								{' '}
								{/* {section}{' '} */}
							</Typography>
						</Grid>
					</Grid>

					<Grid
						item
						sx={{
							width: {
								xs: '70%',
								sm: '50%',
								md: '50%',
								lg: '50%',
								xl: '50%',
							},
							cursor: 'pointer',
							alignItems: 'center',
							justifyContent: {
								lg: 'flex-end',
								md: 'flex-end',
								sm: 'flex-end',
								xs: 'flex-end',
							},
							display: {
								xs: 'flex',
								sm: 'flex',
								md: 'flex',
								lg: 'flex',
								xl: 'flex',
							},
						}}
					>
						{/* <ResponsiveTextFieldWithModal />
						 */}

						<TextField
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							id='input-with-icon-textfield'
							placeholder='Search Transactions,customers'
							sx={{
								width: { xs: '50px', sm: '250px', md: '320px' },
								// height: '45px',
								padding: '0 4 0 4',
								border: { xs: 'none' },
								borderRadius: '10px',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: isSmallScreen ? 'none' : undefined,
									},
								},
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								),

								sx: {
									height: '45px',
								},
							}}
							variant='outlined'
						/>
						<IconButton
							size='large'
							disableRipple
							sx={{
								backgroundColor: 'transparent',
								padding: '1rem',
								borderRadius: '10px',
								marginRight: '1rem',
							}}
							onClick={() => {
								setOpenModal(true);
							}}
						>
							<Badge badgeContent={'2'} color='error'>
								<NotificationsNoneOutlinedIcon
									sx={{
										color: 'notification.light',
										width: '28px',
										height: '28px',
									}}
								/>
							</Badge>
						</IconButton>
						<Divider
							orientation='vertical'
							variant='middle'
							color={theme.palette.primary.main}
							flexItem
						/>
						<Typography
							ml={1}
							sx={{
								fontSize: '12px',
								fontWeight: '700',
								display: { xs: 'none', sm: 'none', md: 'flex' },
							}}
						>
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
									sx={{
										width: '40px',
										height: '40px',
										marginRight: '1rem',
										borderRadius: '90px',
									}}
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
					</Grid>
				</Grid>
			</Toolbar>
			{isModalOpen && (
				<NotificationModal
					open={isModalOpen}
					onClose={() => {
						setOpenModal(false);
					}}
				/>
			)}
		</AppBar>
	);
};

export default NavBar;
