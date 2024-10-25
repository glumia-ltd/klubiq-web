import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';
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
} from '@mui/material';
// import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import ResponsiveTextFieldWithModal from '../ControlledComponents/TextFieldWithModal';
import NotificationModal from '../../components/Modals/NotificationModal';
import SearchIcon from '@mui/icons-material/Search';
import { replace, startCase } from 'lodash';

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
	// const { pathname } = useLocation();
	// const section = pathname.split('/')[1];

	const handleOpenSidebar = () => {
		setIsclosing && setIsclosing(false);
		toggleMobileSidebar && toggleMobileSidebar();
	};

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
							width: { xs: '30%', sm: '50%', md: '50%', lg: '50%', xl: '50%' },
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
							width: { xs: '70%', sm: '50%', md: '50%', lg: '50%', xl: '50%' },
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
							{user?.firstName ?? 'Klubiq User'} <br />
							{simplifyRoleName(user?.roleName || '')}
						</Typography>
						<IconButton
							edge='end'
							disableRipple
							sx={{ color: 'black' }}
							aria-haspopup='true'
						>
							<Avatar
								alt={user?.firstName ?? 'K'}
								src={user?.profilePicUrl ?? ''}
								sx={{
									width: '40px',
									height: '40px',
									marginRight: '1rem',
									borderRadius: '90px',
								}}
							/>
						</IconButton>
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
