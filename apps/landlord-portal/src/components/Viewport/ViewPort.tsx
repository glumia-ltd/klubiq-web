import React, { useEffect, useState } from 'react';
import Sidebar from '../SideBar';
import Box from '@mui/system/Box';
import { useContext } from 'react';
import { NavToggleProvider } from '../../context/NavToggleContext/NavToggleContext';
import NavBar from '../NavBar/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
import { useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import MobileSideBar from '../SideBar/mobile-side-bar';
import { motion } from 'framer-motion';

type ViewPortProp = {
	children: React.ReactNode;
	Container?: boolean;
};

const ViewPort = ({ children }: ViewPortProp) => {
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

	const { mode } = useContext(ThemeContext);

	const { pathname } = useLocation();

	// Step 1: Add state for selected section
	const [selectedSection, setSelectedSection] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<NavToggleProvider>
				<CssBaseline />
				{isMediumScreen && <MobileSideBar onSelectSection={setSelectedSection} />}
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
					{!isMediumScreen && <Sidebar onSelectSection={setSelectedSection} />}
					<Box
						display='flex'
						flexGrow={1}
						flexDirection='column'
						width={'100%'}
					>
						<NavBar section={selectedSection} />

						<Box
							width={'100%'}
							mt={'80px'}
							mb={'20px'}
							ml={'24px'}
							pr={'32px'}
							sx={{
								marginLeft: {
									xs: '0px',
									sm: '1rem',
									md: '1.5rem',
									lg: '1.5rem',
								},
								paddingRight: {
									xs: '0px',
									sm: '1.5rem',
									md: '2rem',
									lg: '2rem',
								},
							}}
						>
							{' '}
							{children}
						</Box>
					</Box>
				</Box>
			</NavToggleProvider>
		</motion.div>
	);
};

export default ViewPort;
