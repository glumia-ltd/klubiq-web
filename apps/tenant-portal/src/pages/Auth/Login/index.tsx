import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
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

type IValuesType = {
	password: string;
	email: string;
};

const Login = () => {
	const navigate = useNavigate();
	const [signIn] = useSignInMutation();
	const [triggerGetUserByFbidQuery] = useLazyGetUserByFbidQuery();
	const dispatch = useDispatch();

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
			openSnackbar({
				message: error.response.data.message,
				severity: 'error',
				isOpen: true,
			});
		}
	};

	const loginFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
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
		verticalAlignment: 'center',
		horizontalAlignment: 'center',
		fields: [
			{
				name: 'email',
				label: 'Email',
				type: 'email',
				placeholder: 'Enter your email',
				required: true,
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
				required: true,
				validation: {
					schema: z
						.string({ required_error: 'Password is required' })
						.min(8, { message: 'Password must be at least 8 characters long' })
				},
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
		errorAlertMessage: 'Please check your email and password and try again.'
	};

	return (
		<Stack sx={styles.container} spacing={1}>
			<KlubiqFormV1 {...loginFormConfig} />
		</Stack>
	);
};

export default Login;
