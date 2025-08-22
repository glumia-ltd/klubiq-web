import {
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import LoginLayout from '../../../Layouts/LoginLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	DynamicModal,
	DynamicTanstackFormProps,
	KlubiqFormV1,
} from '@klubiq/ui-components';
import { useResetPasswordMutation } from '../../../store/AuthStore/authApiSlice';
import { z } from 'zod';
import { TaskAlt } from '@mui/icons-material';
import { useState } from 'react';

type IValuesType = {
	password: string;
	confirmPassword: string;
};

const SetPassword = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [openConfirmationModal, setOpenConfirmationModal] =
		useState<boolean>(true);

	const email = location.search.split('email=')[1]?.split('&')[0];
	const token = searchParams.get('token');
	const [resetPassword] = useResetPasswordMutation();

	const routeToLogin = () => {
		setOpenConfirmationModal(false);
		navigate('/login', { replace: true });
	};

	const scheduleGoToLogin = () => {
		window.setTimeout(() => {
			routeToLogin();
		}, 7000);
	};

	const onSubmit = async (values: IValuesType) => {
		const { password } = values;

		const body = {
			email,
			password,
			oobCode: token,
		};

		try {
			await resetPassword(body).unwrap();
			setOpenConfirmationModal(true);
			scheduleGoToLogin();
		} catch (e) {
			setOpenConfirmationModal(false);
			console.error(e);
			throw e;
		}
	};

	const resetPasswordFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		header: (
			<Typography
				variant={'h1'}
				fontSize={isMobile ? '1.75rem' : '2.25rem'}
				textAlign='left'
			>
				Time for a Fresh Start!
			</Typography>
		),
		subHeader: (
			<Typography
				variant={'h2'}
				fontSize={isMobile ? '1.25rem' : '1.75rem'}
				textAlign='left'
			>
				Let's Secure Your Klubiq Account with a New Password.
			</Typography>
		),
		submitButtonText: 'Set Password',
		fullWidthButtons: true,
		verticalAlignment: 'center',
		horizontalAlignment: 'center',
		fields: [
			{
				name: 'password',
				type: 'password',
				label: 'Password',
				placeholder: 'Enter your password',
				validation: {
					schema: z
						.string({ required_error: 'Password is required' })
						.min(8, { message: 'Password must be at least 8 characters long' })
						.refine(
							(data: any) =>
								/[A-Z]/.test(data) &&
								/[0-9]/.test(data) &&
								/[!@#$%^&*]/.test(data),
							{
								message:
									'Password must contain at least one uppercase letter, one number, and one special character',
							},
						),
				},
			},
			{
				name: 'confirmPassword',
				type: 'password',
				label: 'Confirm password',
				placeholder: 'Confirm your password',
				validation: {
					schema: z
						.string({ required_error: 'Confirm password is required' })
						.min(8, { message: 'Password must be at least 8 characters long' }),
					dependencies: [
						{
							field: 'password',
							type: 'equals',
							message: 'Passwords do not match',
						},
					],
				},
			},
		],
		onSubmit: onSubmit,
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		buttonLoadingText: 'Setting password...',
		enableErrorAlert: true,
		errorAlertTitle: 'Password mismatch',
		errorAlertMessage: 'Please check your password and try again.',
	};

	return (
		<LoginLayout>
			<Grid
				item
				xs={12}
				sm={6}
				md={6}
				lg={6}
				sx={{ width: isMobile ? '100%' : '33rem' }}
			>
				<Grid
					container
					sx={{
						height: '100vh',
						justifyContent: 'center',
					}}
				>
					<Stack
						justifyContent='center'
						direction='column'
						width={isMobile ? '90%' : '50%'}
						gap={1}
						sx={{
							height: '100vh',
						}}
					>
						<KlubiqFormV1 {...resetPasswordFormConfig} />
					</Stack>
				</Grid>
				<DynamicModal
					open={openConfirmationModal}
					onClose={routeToLogin}
					header={
						<Stack direction='row' spacing={2} alignItems='center' width='100%'>
							<TaskAlt
								color='success'
								fontSize='large'
								sx={{ fontSize: '3rem' }}
							/>
							<Typography variant='h4'>Password set successfully!</Typography>
						</Stack>
					}
					children={
						<Stack
							direction='column'
							spacing={2}
							alignItems='center'
							justifyContent='center'
							width='100%'
						>
							<Typography variant='body1' lineHeight={1.2} textAlign='center'>
								You can now login to your account with your email and password. <br />
								If you don't remember your password, you can reset it by
								clicking on the 'Forgot password' link.
							</Typography>
							<Typography variant='body1' lineHeight={1.2} textAlign='center'>
								You will be redirected to the login page shortly.
							</Typography>
						</Stack>
					}
					borderRadius={2}
					contentAlign='center'
					maxWidth='xs'
					fullScreenOnMobile={false}
					sx={{
						maxHeight: '300px',
						justifyContent: 'center',
						alignItems: 'space-between',
						alignContent: 'center',
						maxWidth: '700px',
						width: '100%',
					}}
				/>
			</Grid>
		</LoginLayout>
	);
};

export default SetPassword;
