import React from 'react';
import Sidebar from '../SideBar';
import Box from '@mui/system/Box';
import { useContext } from 'react';
import { NavToggleProvider } from '../../context/NavToggleContext/NavToggleContext';
import NavBar from '../NavBar/NavBar';
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
			<Box
				sx={{
					display: 'flex',
					flexGrow: 1,
					backgroundColor: mode === ThemeMode.LIGHT ? '#F3F6F8' : '#000000',
					overflow: 'hidden',
				}}
			>
				<Sidebar />
				<Box display='flex' flexDirection='column' width='100%'>
					<NavBar />
					<Box width={'100%'} flexGrow={1}>
						{' '}
						{children}
					</Box>
				</Box>
			</Box>
		</NavToggleProvider>
	);
};

export default ViewPort;
