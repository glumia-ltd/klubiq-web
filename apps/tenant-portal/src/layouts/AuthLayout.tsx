import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<Stack
			spacing={0}
			sx={{
        justifyContent: 'center',
        alignItems: 'center',
				height: '100vh',
				p: {
					xs: 1,
					sm: 1,
					md: 0,
					lg: 0,
					overflow: 'hidden',
					backgroundColor: '#F8FBFF',
				},
			}}
		>
			<Outlet />
		</Stack>
	);
};

export default AuthLayout;
