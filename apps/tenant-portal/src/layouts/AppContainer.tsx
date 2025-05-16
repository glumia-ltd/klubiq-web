import React, { useEffect } from 'react';
import Box from '@mui/system/Box';
import { useLocation } from 'react-router-dom';

type AppContainerProp = {
	children: React.ReactNode;
	Container?: boolean;
};

const AppContainer = ({ children }: AppContainerProp) => {
	const { pathname } = useLocation();


	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Box>
			{children}
		</Box>
	);
};

export default AppContainer;
