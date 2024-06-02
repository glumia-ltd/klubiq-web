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
				<Box display='flex' flexDirection='column' width='100%'>
					<NavBar />
					<Box
						sx={{
							flexGrow: 1,
							padding: 2,
							overflow: 'auto',
							// background: "#F3F6F8",
							// backgroundSize: "cover !important",
							// backgroundRepeat: "no-repeat",
							// minHeight: "100vh",
							// backgroundAttachment: "fixed",
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
