import React from 'react';
import Sidebar from '../SideBar';
import Box from '@mui/system/Box';
import { useContext } from 'react';
import { NavToggleProvider } from '../../context/NavToggleContext/NavToggleContext';
import NavBar from '../NavBar/NavBar';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { ThemeMode } from '../../context/ThemeContext/themeTypes';
type ViewPortProp = {
	children: React.ReactNode;
	Container?: boolean;
};

const ViewPort = ({ children }: ViewPortProp) => {
	const { mode } = useContext(ThemeContext);

	return (
		<NavToggleProvider>
			<CssBaseline />

			<Box
				sx={{
					display: 'flex',
					flexGrow: 1,
					overflow: 'hidden',
					'&.MuiBox-root': {
						backgroundColor: mode === ThemeMode.LIGHT ? '#F3F6F8' : '#0D0D0D',
					},
				}}
			>
				<Sidebar />
				<Box display='flex' flexGrow={1} flexDirection='column' width={'100%'}>
					<NavBar />
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
	);
};

export default ViewPort;
