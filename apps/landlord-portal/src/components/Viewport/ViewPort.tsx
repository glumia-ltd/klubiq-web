import React, { useEffect } from 'react';
import Sidebar from '../SideBar';
import Box from '@mui/system/Box';
import { useContext } from 'react';
import { NavToggleProvider } from '../../context/NavToggleContext/NavToggleContext';
import NavBar from '../NavBar/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { useMediaQuery, useTheme } from '@mui/material';
import MobileSideBar from '../SideBar/mobile-side-bar';
import { AppFooter } from '@klubiq/ui-components';	
import pkg from '../../../package.json';

type ViewPortProp = {
	children: React.ReactNode;
	Container?: boolean;
	pathname?: string;
};
// Example for landlord portal
const landlordFooterConfig = {
	appName: 'Landlord Portal',
	version: pkg.version,
	environment: import.meta.env.VITE_NODE_ENV as
		| 'development'
		| 'staging'
		| 'production',
	// ... other props
};

const ViewPort = ({ children, pathname }: ViewPortProp) => {
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
	const { mode } = useContext(ThemeContext);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const content = (
		<>
			<CssBaseline />
			{isMediumScreen && <MobileSideBar />}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					flexGrow: 1,
					overflow: 'hidden',
					'&.MuiBox-root': {
						backgroundColor: mode === ThemeMode.LIGHT ? '#F3F6F8' : '#0D0D0D',
					},
				}}
			>
				{!isMediumScreen && <Sidebar />}
				<Box
					display='flex'
					flexGrow={1}
					flexDirection='column'
					width={'100%'}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<NavBar />

					<Box
						width={'100%'}
						mt={10}
						mb={10}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							px: 5
						}}
					>
						{children}
					</Box>
					<Box 
						width={'100%'} 
						sx={{
							position: 'fixed',
							bottom: 0,
							zIndex: 1
						}}
					>
						<AppFooter {...landlordFooterConfig} />
					</Box>
				</Box>
			</Box>
		</>
	);

	return <NavToggleProvider>{content}</NavToggleProvider>;
};

export default ViewPort;
