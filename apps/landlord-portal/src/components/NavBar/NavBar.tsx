import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { Context } from '../../context/NavToggleContext/NavToggleContext';
import {
	Grid,
	AppBar,
	IconButton,
	Avatar,
	Badge,
	TextField,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/images/blueoctagon.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const NavBar = () => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
	const allContext = () => useContext(Context);
	const { toggleSidebar } = allContext();

	const { pathname } = useLocation();
	const section = pathname.split('/')[1];
	return (
		<AppBar position='static' elevation={1} sx={{ width: '100%' }}>
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
					{isSmallScreen && (
						<Grid
							item
							container
							sx={{
								width: { xs: '5%', sm: '5%', md: '5%' },
								alignItems: 'center',
								display: {
									xs: 'flex',
									sm: 'flex',
									md: 'flex',
								},
							}}
						>
							<IconButton
								sx={{ marginRight: '1rem' }}
								onClick={toggleSidebar}
								size={'large'}
								edge='end'
								color='inherit'
								aria-label='menu'
							>
								<MenuIcon />
							</IconButton>
						</Grid>
					)}
					<Grid
						item
						container
						sx={{
							width: { xs: '28%', sm: '15%', md: '20%', lg: '50%', xl: '50%' },
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
						<Grid item xs={2} ml={{ xs: '1rem', sm: '0.5rem', md: '1rem' }}>
							<Typography
								sx={{
									textTransform: 'capitalize',
									fontWeight: '500',
									fontSize: '18px',
									color: 'black',
								}}
							>
								{' '}
								{section}{' '}
							</Typography>
						</Grid>
					</Grid>

					<Grid
						item
						container
						sx={{
							width: { xs: '20%', sm: '30%', md: '35%', lg: '19%', xl: '19%' },
							// width: '15%',
							alignItems: 'center',
							marginRight: {
								xs: '1rem',
								sm: '1rem',
								md: '3rem',
								lg: '3rem',
								xl: '3rem',
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
						<Grid item xs={3}>
							<TextField
								id='input-with-icon-textfield'
								// label="TextField"
								placeholder='Search Transactions,customers'
								sx={{
									width: { xs: '50px', sm: '250px', md: '320px' },
									height: '44px',
									padding: '0 4 0 4',
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SearchIcon />
										</InputAdornment>
									),
								}}
								variant='outlined'
							/>{' '}
						</Grid>
					</Grid>

					<Grid
						item
						sx={{
							width: { xs: '30%', sm: '40%', md: '20%', lg: '25%', xl: '25%' },
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
						<IconButton
							size='large'
							disableRipple
							sx={{
								backgroundColor: 'white',
								padding: '1rem',
								borderRadius: '10px',
							}}
							// onClick={Navigate}
						>
							<Badge badgeContent={'2'} color='error'>
								<NotificationsIcon
									sx={{ color: '#075450', width: '28px', height: '28px' }}
								/>
							</Badge>
						</IconButton>
						<Typography sx={{ fontSize: '12px', fontWeight: '700' }}>
							{' '}
							Feyisetan <br />
							manager
						</Typography>
						<IconButton
							edge='end'
							disableRipple
							sx={{ color: 'black' }}
							// aria-label='account of current user'
							// aria-controls={menuId}
							aria-haspopup='true'
							// onClick={handleProfileMenuOpen}
						>
							<Avatar
								alt='Remy Sharp'
								src={Logo}
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
		</AppBar>
	);
};

export default NavBar;
