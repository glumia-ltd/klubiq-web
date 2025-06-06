import { Grid, Stack, Typography } from '@mui/material';
import LoginLayout from '../../../Layouts/LoginLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DynamicTanstackFormProps, KlubiqFormV1 } from '@klubiq/ui-components';
import { useResetPasswordMutation } from '../../../store/AuthStore/authApiSlice';
import { z } from 'zod';

type IValuesType = {
	password: string;
	confirmPassword: string;
};

const SetPassword = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const email = searchParams.get('email');
	const oobCode = searchParams.get('oobCode');
	const [resetPassword] = useResetPasswordMutation();

	const onSubmit = async (values: IValuesType) => {
		const { password } = values;

		const body = {
			email,
			password,
			oobCode,
		};

		try {
			await resetPassword(body).unwrap();
			navigate('/login', { replace: true });
		} catch (e) {
			console.error(e);
		}
	};


	const resetPasswordFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		header: (
			<Typography variant='h2' textAlign='left'>
				Time for a Fresh Start!
			</Typography>
		),
		subHeader: (
			<Typography variant='body1' textAlign='left'>
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
						.string({required_error: 'Password is required'})
						.min(8, { message: 'Password must be at least 8 characters long' })
						.refine((data: any) => /[A-Z]/.test(data) && /[0-9]/.test(data) && /[!@#$%^&*]/.test(data), {
							message: 'Password must contain at least one uppercase letter, one number, and one special character',
						})
					
						
				},
			},
			{
				name: 'confirmPassword',
				type: 'password',
				label: 'Confirm password',
				placeholder: 'Confirm your password',
				validation: {
					schema: z
						.string({required_error: 'Confirm password is required'})
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
			<Grid item xs={12} sm={6} md={6} lg={6} sx={{ width: '33rem' }}>
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
						width='50%'
						gap={1}
						sx={{
							height: '100vh',
						}}
					>
						<KlubiqFormV1 {...resetPasswordFormConfig} />
					</Stack>
					{/* <Grid
						container
						sx={{
							width: '33rem',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Grid
							container
							mt={-10}
							sx={{
								height: '25rem',
							}}
						>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								lg={12}
								sx={{
									textAlign: 'left',
								}}
							>
								
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								lg={12}
								mb={5}
								sx={{
									textAlign: 'left',
								}}
							>
							</Grid>

							<Grid item sm={12} xs={12} lg={12}>
								<ControlledPasswordField
									name='password'
									label='Password'
									type='password'
									formik={formik}
									inputProps={{
										sx: {
											height: '40px',
										},
									}}
								/>
							</Grid>

							<Grid item sm={12} xs={12} lg={12}>
								<ControlledPasswordField
									name='confirmPassword'
									label='Confirm password'
									type='password'
									formik={formik}
									inputProps={{
										sx: {
											height: '40px',
										},
									}}
								/>
							</Grid>

							<Grid
								item
								sm={12}
								xs={12}
								lg={12}
								// m={0.5}
								sx={{
									alignItems: 'center',
									textAlign: 'center',
									marginTop: '1rem',
								}}
							>
								<Button fullWidth variant='klubiqMainButton' type='submit'>
									Set Password
								</Button>
							</Grid>
						</Grid>
					</Grid> */}
				</Grid>
			</Grid>
		</LoginLayout>
	);
};

export default SetPassword;
