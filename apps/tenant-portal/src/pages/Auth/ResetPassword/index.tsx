import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	Button,
	Card,
	CardContent,
	CircularProgress,
	Stack,
	Typography,
} from '@mui/material';
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
import { useEffect, useState } from 'react';
import {
	useAcceptInvitationMutation,
	useResetPasswordMutation,
	useValidateResetPasswordTokenMutation,
} from '@/store/AuthStore/authApi.slice';
import { screenMessages } from '@/helpers/screen-messages';

type IPasswordType = {
	password: string;
	confirmPassword: string;
	email: string;
};

const ResetPassword = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [isInvitationValid, setIsInvitationValid] = useState(false);
	const [isValidating, setIsValidating] = useState(false);
	const [formReady, setFormReady] = useState(false);
	const emailFromUrl = searchParams.get('email');
	const token = searchParams.get('token');
	const mode = searchParams.get('mode');
	const [resetPassword] = useResetPasswordMutation();
	const [acceptInvitation] = useAcceptInvitationMutation();
	const [validateResetPasswordToken] = useValidateResetPasswordTokenMutation();
	console.log(emailFromUrl, 'emailFromUrl');
	useEffect(() => {
		if (token) {
			if (mode === 'resetPassword') {
				(async () => {
					const res = await validateResetPasswordToken({
						token,
						email: emailFromUrl ?? undefined,
					}).unwrap();
					setIsInvitationValid(res);
					setIsValidating(false);
				})();
			} else {
				api.get(authEndpoints.validateInvitationToken(token)).then((res) => {
					setIsInvitationValid(res.data);
					setIsValidating(false);
				});
			}
			setFormReady(true);
		} else {
			navigate('/forgot-password', { replace: true });
			setFormReady(false);
		}
	}, [searchParams]);

	const onSubmit = async (values: IPasswordType) => {
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
			if (mode === 'resetPassword') {
				await resetPassword({
					password: values.password,
					email,
					token,
				});
			} else {
				await acceptInvitation({
					token: token ?? '',
					data: {
						password: values.password,
						email: email ?? '',
						token: token ?? '',
					},
				});
			}

			openSnackbar({
				message: 'That was easy, please continue to login',
				severity: 'success',
				isOpen: true,
			});
			navigate('/', { replace: true });
		} catch (error: unknown) {
			const errorMessage =
				(error as any)?.message || 
				(error instanceof Error ? error.message : screenMessages.auth.resetPassword.error);
			throw new Error(errorMessage);
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
						'Password should be more than 7 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character.',
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
						'Password should be more than 7 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character.',
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
		verticalAlignment: 'top',
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
	const renderResetContent = () => {
		return isValidating ? (
			<Stack
				sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress />
				{mode === 'resetPassword' ? (
					<Typography>Verifying reset password link</Typography>
				) : (
					<Typography>Verifying invitation link</Typography>
				)}
			</Stack>
		) : isInvitationValid ? (
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
						<KlubiqFormV1 {...resetPasswordFormConfig} />
					</Stack>
				</CardContent>
			</Card>
		) : (
			<Stack
				spacing={2}
				sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				{mode === 'resetPassword' ? (
					<Typography variant='h4'>
						Your reset password link has expired!
					</Typography>
				) : (
					<Typography variant='h4'>Your invitation has expired</Typography>
				)}
				{mode !== 'resetPassword' && (
					<Typography variant='body1'>
						Please contact your landlord to get a new invitation
					</Typography>
				)}
				<Button variant='klubiqMainButton' onClick={() => navigate('/login')}>
					Back to Login
				</Button>
			</Stack>
		);
	};

	return formReady ? (
		renderResetContent()
	) : (
		<Stack
			sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}
		>
			<CircularProgress />
		</Stack>
	);
};

export default ResetPassword;
