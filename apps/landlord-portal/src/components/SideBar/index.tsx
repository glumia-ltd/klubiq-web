import { useState, useEffect } from 'react';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Logo from '../../assets/images/lightshort.svg';
import Logo2 from '../../assets/images/lightslant.svg';
import DarkLogo from '../../assets/images/Frame 1000006803.png';
import { SectionContext } from '../../context/SectionContext/SectionContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	ListItemButton,
	ListItemIcon,
	SvgIcon,
	ListItemText,
	ListItem,
	List,
	Button,
	Stack,
} from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(16)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(16)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': 'openedMixin(theme)',
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

function SideBar() {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
	const { getPathList } = useContext(SectionContext);
	const pathList = getPathList();
	const { mode, switchMode } = useContext(ThemeContext);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		isMediumScreen ? setOpen(false) : setOpen(true);
	}, [isMediumScreen]);

	return (
		<Box>
			<Drawer variant='permanent' open={open}>
				<DrawerHeader
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
						{open ? (
							mode === ThemeMode.LIGHT ? (
								<img src={Logo2} alt='logo' />
							) : (
								<img src={DarkLogo} alt='logos' />
							)
						) : (
							<img src={Logo} alt='logo' />
						)}
					</IconButton>
				</DrawerHeader>
				<List sx={{ marginBottom: '20px' }}>
					{pathList.map((props, index) => (
						<ListItem disablePadding key={index}>
							<Link
								to={props.path}
								relative='path'
								style={{ textDecoration: 'none' }}
							>
								<ListItemButton
									sx={{
										minHeight: 20,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
										my: 0.8,
										py: 0.8,
										marginLeft: open ? 4 : 3,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<SvgIcon
											sx={{ fontSize: '20px', width: '20px', height: '20px' }}
											component={props.icon}
											inheritViewBox
										/>
									</ListItemIcon>
									<ListItemText sx={{ opacity: open ? 1 : 0 }}>
										{props.title}
									</ListItemText>
								</ListItemButton>
							</Link>
						</ListItem>
					))}
				</List>
				<Stack
					direction={{ xs: open ? 'row' : 'column' }}
					spacing={{ xs: 1, sm: 1, md: 0 }}
					sx={{
						borderRadius: '15px',
						width: open ? '200px' : '70px',
						textAlign: 'center',
						margin: 'auto',
						// display: 'flex',
						// justifyContent: 'center',
						background: '#ffffff',
						padding: open ? '8px' : '0px',
					}}
				>
					<Button
						onClick={() => switchMode(ThemeMode.LIGHT)}
						sx={{
							color: '#002147',
							width: open ? '100%' : '50%',
							borderRadius: open ? '15px' : '20px',
							padding: '10px',
							fontSize: '10px',

							'&:hover': {
								color: '#ffffff',
								background: '#002147',
								cursor: 'pointer',
							},
						}}
					>
						{open ? (
							<>
								<LightModeIcon sx={{ fontSize: 20 }} /> <h3>Light</h3>
							</>
						) : (
							<LightModeIcon />
						)}
					</Button>
					<Button
						onClick={() => switchMode(ThemeMode.DARK)}
						sx={{
							color: '#002147',
							width: open ? '100%' : '50%',
							borderRadius: open ? '15px' : '20px',
							fontSize: '10px',
							padding: '10px',
							'&:hover': {
								color: '#ffffff',
								background: '#002147',
								cursor: 'pointer',
							},
						}}
					>
						{open ? (
							<>
								{' '}
								<DarkModeIcon sx={{ fontSize: 20 }} />
								<h3>Dark</h3>
							</>
						) : (
							<DarkModeIcon sx={{ fontSize: 20 }} />
						)}
					</Button>
				</Stack>
			</Drawer>
		</Box>
	);
}

export default SideBar;
