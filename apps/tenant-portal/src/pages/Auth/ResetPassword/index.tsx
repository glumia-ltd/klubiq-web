import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import {
	DynamicTanstackFormProps,
	FormFieldV1,
	KlubiqFormV1,
} from '@klubiq/ui-components';

import Logo from '@/assets/images/icons.svg';

import { styles } from '../styles';
import { api } from '@/api';
import { authEndpoints } from '@/helpers/endpoints';
import { openSnackbar } from '@/store/GlobalStore/snackbar.slice';
import { ArrowBack } from '@mui/icons-material';

type IPasswordType = {
	password: string;
	confirmPassword: string;
	email: string;
};

const ResetPassword = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const emailFromUrl = searchParams.get('email');

	const onSubmit = async (values: IPasswordType) => {
		const token = searchParams.get('token');
		const oobCode = searchParams.get('oobCode');
		const email = emailFromUrl ?? values.email;
		if (!email) {
			openSnackbar({
				message: 'Email is required',
				severity: 'error',
				isOpen: true,
			});
			throw new Error('Email is required');
		}

		try {
			await api.post(authEndpoints.acceptInvitation(token!), {
				password: values.password,
				email,
				oobCode,
			});

			openSnackbar({
				message: 'That was easy, please continue to login',
				severity: 'success',
				isOpen: true,
			});
			navigate('/', { replace: true });
		} catch (error: any) {
			console.error(error);
			openSnackbar({
				message: error.response.data.message,
				severity: 'error',
				isOpen: true,
			});
		}
	};
	const emailField: FormFieldV1 = {
		name: 'email',
		label: 'Email',
		type: 'email',
		placeholder: 'Enter your email',
		validation: {
			schema: z
				.string({ required_error: 'Email is required' })
				.email({ message: 'Enter a valid email address' }),
		},
	};
	let resetPasswordFields: FormFieldV1[] = [
		{
			name: 'password',
			label: 'Password',
			type: 'password',
			placeholder: 'Enter your password',
			validation: {
				schema: z
					.string({ required_error: 'Password is required' })
					.refine(
						(value) =>
							/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
								value ?? '',
							),
						'Password should be more than 7 characters.',
					),
			},
		},
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
			type: 'password',
			placeholder: 'Confirm your password',
			validation: {
				schema: z
					.string({ required_error: 'Confirm password is required' })
					.refine(
						(value) =>
							/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
								value ?? '',
							),
						'Password should be more than 7 characters.',
					),
				dependencies: [
					{
						field: 'password',
						type: 'equals',
						message: 'Passwords do not match',
					},
				],
			},
		},
	];

	if (!emailFromUrl) {
		resetPasswordFields = [emailField, ...resetPasswordFields];
	}

	const resetPasswordFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		header: (
			<Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
				<img src={Logo} />
			</Stack>
		),
		subHeader: (
			<Stack>
				<Typography variant='h1' sx={styles.title}>
					Reset Your Password
				</Typography>
			</Stack>
		),
		submitButtonText: 'ResetPassword',
		fullWidthButtons: true,
		verticalAlignment: 'center',
		horizontalAlignment: 'center',
		fields: resetPasswordFields,
		onSubmit: onSubmit,
		initialValues: {
			password: '',
			confirmPassword: '',
			email: emailFromUrl ?? '',
		},
		buttonLoadingText: 'Submitting',
		enableErrorAlert: true,
		errorAlertTitle: 'Something went wrong',
		errorAlertMessage: 'Please try again',
		showTopBackButton: true,
		topBackButton: {
			text: 'Back to Login',
			onClick: () => navigate('/login'),
			variant: 'klubiqTextButton',
			startIcon: <ArrowBack />,
		},
	};

	return (
		<Card
			sx={{
				maxHeight: '90%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CardContent sx={{ height: '100%' }}>
				<Stack
					sx={{
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<KlubiqFormV1 {...resetPasswordFormConfig} />
				</Stack>
			</CardContent>
		</Card>
	);
};

export default ResetPassword;
