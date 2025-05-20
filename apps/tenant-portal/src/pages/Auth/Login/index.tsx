import * as Yup from 'yup';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { KlubiqForm, FormField, FormGroup } from '@klubiq/ui-components';
import EmailOutlineIcon from '@mui/icons-material/EmailOutlined';

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

	return (
		<Stack sx={styles.container} spacing={1}>
			<Stack direction='row' justifyContent='center' alignItems='center'>
				<img src={Logo} alt='Klubiq Logo' />
			</Stack>

			<Typography variant='h1' sx={styles.title}>
				Welcome to Klubiq
			</Typography>

			<KlubiqForm
				fields={loginFormFields as FormField[]}
				onSubmit={onSubmit}
				initialValues={defaultValues}
				submitButtonText='Login'
			/>

			<Typography sx={styles.text}>
				Having trouble logging in? Contact your property manager.
			</Typography>
		</Stack>
	);
};

export default Login;
