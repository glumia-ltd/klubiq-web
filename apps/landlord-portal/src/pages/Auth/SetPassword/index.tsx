import { Button, Grid, Typography } from '@mui/material';
import LoginLayout from '../../../Layouts/LoginLayout';
import ControlledPasswordField from '../../../components/ControlledComponents/ControlledPasswordField';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { authEndpoints } from '../../../helpers/endpoints';
import { api } from '../../../api';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';

const validationSchema = yup.object({
	password: yup.string().required('Please enter your password'),
	confirmPassword: yup.string().required('Please confirm your password'),
});

type IValuesType = {
	password: string;
	confirmPassword: string;
};

const SetPassword = () => {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const email = searchParams.get('email');
	const oobCode = searchParams.get('oobCode');

	const onSubmit = async (values: IValuesType) => {
		const { password } = values;

		const body = {
			email,
			password,
			oobCode,
		};

		try {
			await api.post(authEndpoints.resetPassword(), body);

			dispatch(
				openSnackbar({
					message: 'Password successfully updated',
					severity: 'success',
					isOpen: true,
				}),
			);

			formik.resetForm();

			navigate('/', { replace: true });
		} catch (e) {
			dispatch(
				openSnackbar({
					message: 'An error occurred.',
					severity: 'error',
					isOpen: true,
				}),
			);
		}
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
					</Grid>
				</Grid>
			</Grid>
		</LoginLayout>
	);
};

export default SetPassword;
