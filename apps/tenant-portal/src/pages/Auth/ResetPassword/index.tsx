import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import { DynamicTanstackFormProps, KlubiqFormV1 } from '@klubiq/ui-components';

import Logo from '@/assets/images/icons.svg';

import { styles } from '../styles';
import { api } from '@/api';
import { authEndpoints } from '@/helpers/endpoints';
import { openSnackbar } from '@/store/GlobalStore/snackbar.slice';

type IPasswordType = { password: string; confirmPassword: string };

const ResetPassword = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const onSubmit = async (values: IPasswordType) => {
		const token = searchParams.get('token');
		const oobCode = searchParams.get('oobCode');
		const email = searchParams.get('email');

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
		fields: [
			// Password Regex
			//   Has minimum 8 characters in length. Adjust it by modifying {8,}
			// At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
			// At least one lowercase English letter.  You can remove this condition by removing (?=.*?[a-z])
			// At least one digit. You can remove this condition by removing (?=.*?[0-9])
			// At least one special character,  You can remove this condition by removing (?=.*?[#?!@$%^&*-])
			{
				name: 'password',
				label: 'Password',
				type: 'password',
				placeholder: 'Enter your password',
				required: true,
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
				required: true,
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
							message: 'Passwords do not match'
						}
					]
				},
			},
		],
		onSubmit: onSubmit,
		initialValues: { password: '', confirmPassword: '' },
		buttonLoadingText: 'Submitting',
		enableErrorAlert: true,
		errorAlertTitle: 'Something went wrong',
		errorAlertMessage: 'Please try again',
	};

	return (
		<Stack sx={styles.container}>
			<Stack>
				<KlubiqFormV1 {...resetPasswordFormConfig} />
			</Stack>
		</Stack>
	);
};

export default ResetPassword;
