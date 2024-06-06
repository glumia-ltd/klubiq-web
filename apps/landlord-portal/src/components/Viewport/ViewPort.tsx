import React from 'react';
import Sidebar from '../SideBar';
import Box from '@mui/system/Box';
import { NavToggleProvider } from '../../context/NavToggleContext/NavToggleContext';
import NavBar from '../NavBar/NavBar';

type ViewPortProp = {
	children: React.ReactNode;
	Container?: boolean;
};

const ViewPort = ({ children }: ViewPortProp) => {
	return (
		<NavToggleProvider>
			<Box
				sx={{
					display: 'flex',
					flexGrow: 1,
					backgroundColor: '#F3F6F8',
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
