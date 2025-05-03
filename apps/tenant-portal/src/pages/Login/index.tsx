import * as Yup from 'yup';
import { ReactNode } from 'react';
import { KlubiqForm, FormField, FormGroup } from '@klubiq/ui-components';

import { Grid, Typography } from '@mui/material';

import EmailOutlineIcon from '@mui/icons-material/EmailOutlined';

import LoginLayout from '@/layouts/LoginLayout';
import { styles } from './styles';
import Logo from '@/assets/images/icons.svg';
import { useNavigate } from 'react-router-dom';

type IValuesType = {
	password: string;
	email: string;
};

const Login = () => {

	const navigate = useNavigate()

	const defaultValues: IValuesType = {
		password: '',
		email: '',
	};

	const loginFormFields: (FormField | FormGroup)[] = [
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Enter your email',
			required: true,
			validation: Yup.string().required(''),
			adornment: { suffix: EmailOutlineIcon as unknown as ReactNode },
		},
		{
			name: 'password',
			label: 'Password',
			type: 'password',
			placeholder: 'Enter your password',
			required: true,
			validation: Yup.string(),
		},
	];

	const onSubmit = async (values: IValuesType) => {
		console.log(values);
		navigate('/dashboard')
	};

	return (
		<LoginLayout>
			<Grid
				item
				sx={{
					width: {
						xs: '80vw',
						sm: '35rem',
						md: '711px',
					},
					minHeight: '50vh',
					border: '0.4px solid #D0D0D0',
					backgroundColor: 'white',
					borderRadius: '24px',
					p: {
						xs: '15px 30px',
						sm: '60px 100px!important',
						md: '80px 120px!important',
					},
				}}
			>
				<Grid container>
					<Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
						<img src={Logo} />
					</Grid>
					<Grid item sm={12}>
						<Typography variant='h1' sx={styles.title}>
							Welcome to Klubiq
						</Typography>
					</Grid>
					<KlubiqForm
						fields={loginFormFields as FormField[]}
						onSubmit={onSubmit}
						initialValues={defaultValues}
						submitButtonText='Login'
					/>
					<Grid item sm={12}>
						<Typography sx={styles.text}>
							Having trouble logging in? Contact your property manager.
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</LoginLayout>
	);
};

export default Login;
