import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { Context } from '../../context/NavToggleContext/NavToggleContext';
import { Grid, AppBar, IconButton, Avatar, Badge } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ResponsiveTextFieldWithModal from '../ControlledComponents/TextFieldWithModal';
import NotificationModal from '../../components/Modals/NotificationModal';
import user from '../../assets/manImage.svg';

const NavBar = () => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
	const { toggleSidebar, sidebarOpen, drawerWidth } = useContext(Context);
	const [isModalOpen, setOpenModal] = useState(false);

	const { pathname } = useLocation();
	const section = pathname.split('/')[1];
	const currentDrawerWidth = sidebarOpen
		? isSmallScreen
			? drawerWidth.smallOpen
			: drawerWidth.largeOpen
		: isSmallScreen
			? drawerWidth.smallClosed
			: drawerWidth.largeClosed;

	return (
		<AppBar
			position='fixed'
			elevation={2}
			sx={{ width: `calc(100% - ${currentDrawerWidth}px)` }}
		>
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
						{isSmallScreen && (
							<IconButton
								// sx={{ marginRight: '1rem' }}
								onClick={toggleSidebar}
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
								{section}{' '}
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
						<ResponsiveTextFieldWithModal />
						<IconButton
							size='large'
							disableRipple
							sx={{
								backgroundColor: 'transparent',
								padding: '1rem',
								borderRadius: '10px',
							}}
							onClick={() => {
								setOpenModal(true);
							}}
						>
							<Badge badgeContent={'2'} color='error'>
								<NotificationsNoneOutlinedIcon
									sx={{ color: '#075450', width: '28px', height: '28px' }}
								/>
							</Badge>
						</IconButton>
						<Typography
							sx={{
								fontSize: '12px',
								fontWeight: '700',
								display: { xs: 'none', sm: 'none', md: 'flex' },
							}}
						>
							{' '}
							Feyisetan <br />
							manager
						</Typography>
						<IconButton
							edge='end'
							disableRipple
							sx={{ color: 'black' }}
							aria-haspopup='true'
						>
							<Avatar
								alt='Remy Sharp'
								src={user}
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
