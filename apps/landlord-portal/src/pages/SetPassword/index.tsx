import { Grid, Typography } from '@mui/material';
import { SubmitButton } from '../../styles/button';
import LoginLayout from '../../Layouts/LoginLayout';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
	password: yup.string().required('Please enter your password'),
	confirmPassword: yup.string().required('Please confirm your password'),
});

type IValuesType = {
	password: string;
	confirmPassword: string;
};

const SetPassword = () => {
	const onSubmit = async (values: IValuesType) => {
		console.log(values);
	};

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema,
		onSubmit,
	});

	return (
		<LoginLayout handleSubmit={formik.handleSubmit}>
			<Grid item xs={12} sm={6} md={6} lg={6} sx={{ width: '33rem' }}>
				<Grid
					container
					sx={{
						height: '100vh',
						justifyContent: 'center',
					}}
				>
					<Grid
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
								<Typography variant='h3' sx={{ fontWeight: '700' }}>
									Time for a Fresh Start!
								</Typography>
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
								<Typography>
									Let's Secure Your Klubiq Account with a New Password.
								</Typography>
							</Grid>

							<Grid item sm={12} xs={12} lg={12}>
								<ControlledPasswordField
									name='password'
									label='Password'
									type='password'
									formik={formik}
								/>
							</Grid>

							<Grid item sm={12} xs={12} lg={12}>
								<ControlledPasswordField
									name='confirmPassword'
									label='Confirm password'
									type='password'
									formik={formik}
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
								<SubmitButton type='submit'>Set Password</SubmitButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</LoginLayout>
	);
};

export default SetPassword;
