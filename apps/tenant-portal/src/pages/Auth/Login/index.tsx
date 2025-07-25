import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import {
	CardContent,
	Card,
	Stack,
	Typography
} from '@mui/material';
import { DynamicTanstackFormProps, KlubiqFormV1 } from '@klubiq/ui-components';

import { openSnackbar } from '@/store/GlobalStore/snackbar.slice';
import {
	useLazyGetUserByFbidQuery,
	useSignInMutation,
} from '@/store/AuthStore/authApi.slice';
import { saveUser } from '@/store/AuthStore/auth.slice';
import { useDispatch } from 'react-redux';

import { styles } from '../styles';
import Logo from '@/assets/images/icons.svg';
import { BoldTextLink } from '@/styles/links';

type IValuesType = {
	password: string;
	email: string;
};

const Login = () => {
	const navigate = useNavigate();
	const [signIn] = useSignInMutation();
	const [triggerGetUserByFbidQuery] = useLazyGetUserByFbidQuery();
	const dispatch = useDispatch();
	// const renderResetPasswordButton = () => {
	// 	return (
	// 		<Button variant='klubiqOutlinedButton' fullWidth  onClick={() => navigate('/reset-password')}>
	// 			Reset Password
	// 		</Button>
	// 	);
	// };
	const loadUserAfterSignIn = async () => {
		const { isError, error, data } = await triggerGetUserByFbidQuery();

		if (isError) {
			console.error(error); // to reemove
			openSnackbar({
				message: 'Oops! an error occurred',
				severity: 'error',
				isOpen: true,
			});
			throw isError;
		}

		if (data) {
			dispatch(saveUser({ user: data, isAuthenticated: true }));
			navigate('/dashboard', { replace: true });
		}
	};

	const onSubmit = async (values: IValuesType) => {
		const { email, password } = values;
		try {
			await signIn({ email, password }).unwrap();
			loadUserAfterSignIn();
		} catch (error: any) {
			const errorMessage = error.data.message;
			throw new Error(errorMessage);
		}
	};

	const loginFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		verticalAlignment: 'top',
		horizontalAlignment: 'center',
		header: (
			<Stack direction='row' justifyContent='center' alignItems='center'>
				<img src={Logo} alt='Klubiq Logo' />
			</Stack>
		),
		subHeader: (
			<Typography variant='h1' sx={styles.title}>
				Welcome to Klubiq
			</Typography>
		),
		submitButtonText: 'Login',
		underSubmitButtonNode: (
			<Typography sx={styles.text}>
				Having trouble logging in? Contact your property manager.
			</Typography>
		),
		fullWidthButtons: true,

		fields: [
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'Enter your email',
				validation: {
					schema: z
						.string({ required_error: 'Email is required' })
						.email({ message: 'Enter a valid email address' }),
				},
			},
			{
				name: 'password',
				label: 'Password',
				type: 'password',
				placeholder: 'Enter your password',
				validation: {
					schema: z
						.string({ required_error: 'Password is required' })
						.min(8, { message: 'Password must be at least 8 characters long' }),
				},
			},
			{
				name: 'forgotPassword',
				type: 'custom',
				label: '',
				component: (
					<Typography
						textAlign='left'
						onClick={() => navigate('/forgot-password')}
					>
						<BoldTextLink>Forgot password</BoldTextLink>
					</Typography>
				),
			},
		],
		onSubmit: onSubmit,
		initialValues: {
			email: '',
			password: '',
		},
		buttonLoadingText: 'Signing in...',
		enableErrorAlert: true,
		errorAlertTitle: 'Invalid credentials',
		errorAlertMessage: 'Please check your email and password and try again.',
	};

	return (
		<Card
			sx={{
				minHeight: '600px',
				width: {
					xs: '95%',
					sm: '50%',
					md: '400px',
				},
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CardContent sx={{ height: 'auto', width: '100%' }}>
				<Stack
					sx={{
						height: 'auto',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<KlubiqFormV1 {...loginFormConfig} />
				</Stack>
			</CardContent>
		</Card>
	);
};

export default Login;
