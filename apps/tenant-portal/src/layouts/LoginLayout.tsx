import { Grid } from '@mui/material';
import { FC } from 'react';

type LoginLayoutType = {
	children: JSX.Element;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const LoginLayout: FC<LoginLayoutType> = ({ children, handleSubmit }) => {
	return (
		<Grid
			container
			spacing={0}
			component='form'
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
			onSubmit={handleSubmit}
			columnSpacing={{ xss: 1, sm: 1, md: 1 }}
		>
			{children}
		</Grid>
	);
};

export default LoginLayout;
