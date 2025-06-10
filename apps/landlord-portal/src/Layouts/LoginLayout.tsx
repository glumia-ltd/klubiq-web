import { Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import style from './style';

type LoginLayoutType = {
	children: JSX.Element;
	// handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const LoginLayout: FC<LoginLayoutType> = ({ children }) => {
	return (
		<Grid
			container
			spacing={0}
			sx={{
				justifyContent: 'center',
				height: '100vh',
				p: {
					xs: 1,
					sm: 1,
					md: 0,
					lg: 0,
				},
			}}
			// onSubmit={handleSubmit}
			columnSpacing={{ xs: 1, sm: 1, md: 1 }}
		>
			{children}

			<Grid
				item
				xs={0}
				sm={0}
				md={6}
				lg={6}
				xl={6}
				sx={{
					...style.background,
					borderTopRightRadius: '1.3rem',
					borderBottomLeftRadius: '1.3rem',
					alignContent: 'center',
					display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
				}}
			>
				<Stack
					direction={'column'}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
					}}
				>
					<Typography color={'white'} textAlign={'center'} variant='h2'>
						Welcome back to Klubiq!
					</Typography>
					<Typography color={'white'} variant='body1'>
						Manage your properties effortlessly, all in one place.
					</Typography>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default LoginLayout;
