import {
	Box,
	Stack,
	Typography,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { authEndpoints } from '@/helpers/endpoints';
import { api } from '@/api';

import { useDispatch } from 'react-redux';
import { openSnackbar } from '@/store/GlobalStore/snackbar.slice';
import {
	DynamicTanstackFormProps,
	FormFieldV1,
	KlubiqFormV1,
} from '@klubiq/ui-components';
import { z } from 'zod';
import { Close } from '@mui/icons-material';

type IValuesType = {
	email: string;
};

const ForgotPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const onSubmit = async (values: IValuesType) => {
		try {
			await api.post(authEndpoints.sendResetPasswordEmail(), values);
		} catch (e) {
			dispatch(
				openSnackbar({
					message: 'An error occurred.',
					severity: 'error',
					isOpen: true,
				}),
			);
		} finally {

		}
	};

	const routeToLogin = () => {
		navigate('/login', { replace: true });
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
	const forgotPasswordFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		header: (
			<Typography
				variant='h1'
				textAlign='left'
				fontSize={isMobile ? '1.25rem' : '1.75rem'}
			>
				Forgot your password?
			</Typography>
		),
		subHeader: (
			<Stack direction='column' spacing={1}>
				<Typography variant='body2' fontSize={isMobile ? '1rem' : '1.1rem'}>
					Don't worry, happens to all of us. Enter your email below to recover
					your password.
				</Typography>
			</Stack>
		),
		submitButtonText: 'Submit',
		fullWidthButtons: true,
		verticalAlignment: 'center',
		horizontalAlignment: 'center',
		fields: [emailField],
		onSubmit: onSubmit,
		initialValues: {
			email: '',
		},
		buttonLoadingText: 'Submitting',
		enableErrorAlert: true,
		errorAlertTitle: 'Something went wrong',
		errorAlertMessage: 'Please try again',
		showTopBackButton: true,
		topBackButton: {
			text: 'Back to Login',
			onClick: () => {
				routeToLogin();
			},
			variant: 'klubiqTextButton',
			startIcon: <ArrowBackIosIcon />,
		},
		nextAction: {
			title: 'Password Reset Instructions Sent',
			description: 'Check your email for instructions to reset your password.',
			buttons: [
				{
					text: 'Close',
					onClick: routeToLogin,
					variant: 'klubiqMainButton',
				},
			],
			closeIcon: <Close />,
			showAfterSubmit: true,
			maxWidth: 'sm',
			fullWidth: true,
			renderContent: () => (
				<Stack direction='column' spacing={1}>
						<Typography
							variant='caption'
							fontSize={isMobile ? '0.8rem' : '1rem'}
						>
							Instructions to reset your password have been sent to the email
							provided. <br />
							If you did not receive it, please contact us at <a href='mailto:support@glumia.com'>support@glumia.com</a>.
						</Typography>
					</Stack>
			)
		},
	};


	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Stack
				width={isMobile ? '90%' : '33rem'}
				height='100vh'
				justifyContent='center'
				alignItems='center'
			>
				<KlubiqFormV1 {...forgotPasswordFormConfig} />
			</Stack>
			
		</Box>
	);
};

export default ForgotPassword;
