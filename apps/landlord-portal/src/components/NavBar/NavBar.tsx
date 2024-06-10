import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { Context } from '../../context/NavToggleContext/NavToggleContext';
import { Grid, AppBar, IconButton, Avatar, Badge } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Logo from '../../assets/images/blueoctagon.png';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ResponsiveTextFieldWithModal from '../ControlledComponents/TextFieldWithModal';
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
