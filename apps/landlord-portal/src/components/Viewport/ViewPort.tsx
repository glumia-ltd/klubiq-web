import React from 'react';
import Sidebar from '../SideBar';
import Box from '@mui/system/Box';
import { NavToggleProvider } from '../../context/NavToggleContext/NavToggleContext';
import NavBar from '../NavBar/NavBar';
type ViewPortProp = {
	children: React.ReactNode;
	noContainer?: boolean;
};

const ViewPort = ({ children }: ViewPortProp) => {
	return (
		<NavToggleProvider>
			<Box sx={{ display: 'flex', flexGrow: 1 }}>
				<Sidebar />
				<Box display='flex' flexDirection='column' width='100%' height='100vh'>
					<NavBar />
					<Box
						sx={{
							flexGrow: 1,
							padding: 2,
							backgroundColor: '#F3F6F8',
							backgroundSize: 'cover !important',
						}}
					>
						{children}
					</Box>
				</Box>
			</Box>
		</NavToggleProvider>
	);
};

export default ViewPort;
