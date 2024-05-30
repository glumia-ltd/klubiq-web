/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography } from '@mui/material';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
import { Link } from '@mui/material';
import { SubmitButton, LoadingSubmitButton } from '../../styles/button';
// import ControlledCheckBox from '../../components/ControlledComponents/ControlledCheckbox';
import { useNavigate } from 'react-router-dom';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebase';
import { saveUser } from '../../store/AuthStore/AuthSlice';
import { useDispatch } from 'react-redux';
import { api } from '../../api';
import { authEndpoints } from '../../helpers/endpoints';
import { useState } from 'react';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';

const CreateAccount: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);

	const validationSchema = yup.object({
		firstName: yup.string().required('This field is required'),
		companyName: yup.string().required('This field is required'),
		lastName: yup.string().required('This field is required'),
		password: yup.string().required('Please enter your password'),
		email: yup.string().email().required('Please enter your email'),
		mailCheck: yup.bool().oneOf([true], 'Please Check Box'),
	});

	type IValuesType = {
		firstName: string;
		companyName: string;
		lastName: string;
		password: string;
		email: string;
		mailCheck: boolean;
	};

	const onSubmit = async (values: IValuesType) => {
		const { email, password, firstName, lastName, companyName } = values;

		try {
			setLoading(true);
			const userDetails = { email, password, firstName, lastName, companyName };

			const {
				data: { data: token },
			} = await api.post(authEndpoints.signup(), userDetails);

			const userCredential = await signInWithCustomToken(auth, token);
			dispatch(
				openSnackbar({
					message: 'Please verify your email!',
					severity: 'info',
					isOpen: true,
				}),
			);

			const user: any = userCredential.user;

			const userInfo = { email: user.email };

			dispatch(saveUser({ user: userInfo, token: user.accessToken }));
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	// const routeToLogin = () => {
	// 	navigate('/login', { replace: true });
	// };

	const routeToLogin = () => {
		navigate('/', { replace: true });
	};
	const formik = useFormik({
		initialValues: {
			firstName: '',
			companyName: '',
			lastName: '',
			password: '',
			email: '',
			mailCheck: false,
		},
		validationSchema,
		onSubmit,
	});

	return (
		<Grid
			container
			spacing={0}
			sx={{
				justifyContent: 'center',
			}}
			component='form'
			onSubmit={formik.handleSubmit}
		>
			<Grid
				container
				item
				xs={12}
				sm={12}
				md={7}
				lg={6}
				spacing={0}
				sx={{
					alignContent: 'center',
				}}
			>
				<Grid
					container
					sx={{
						width: '36rem',
						justifyContent: 'center',
						margin: 'auto',
					}}
					spacing={0.5}
				>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={12}
						sx={{ textAlign: 'center' }}
					>
						<Typography variant='h2' color='#002147' mb='3rem'>
							Create your Klubiq account
						</Typography>
						<Typography
							color='#002147'
							mt='-3rem'
							mb='2rem'
							sx={{
								fontWeight: 500,
								lineHeight: '30px',
								textAlign: 'center',
								fontSize: '18px',
							}}
						>
							Sign up and get 30 days free trial.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<ControlledTextField
							name='firstName'
							label='First Name'
							type='text'
							placeholder='John'
							formik={formik}
						/>
					</Grid>
					<Grid item sm={12} xs={12} md={6} lg={6}>
						<ControlledTextField
							name='lastName'
							label='Last Name'
							placeholder='Doe'
							formik={formik}
							type='text'
						/>
					</Grid>

					<Grid item sm={12} xs={12} lg={12}>
						<ControlledTextField
							name='companyName'
							label='Company Name'
							placeholder='Lyal Solutions'
							type='text'
							formik={formik}
						/>
					</Grid>

					<Grid item sm={12} xs={12} lg={12}>
						<ControlledTextField
							name='email'
							label='Email '
							placeholder='johndoe@example.com'
							formik={formik}
							type='email'
						/>
					</Grid>

					<Grid item sm={12} xs={12} lg={12}>
						<ControlledPasswordField
							name='password'
							label='Password'
							type='password'
							formik={formik}
						/>
					</Grid>

					{/* <Grid item sm={12} xs={12} lg={12}>
						<ControlledCheckBox
							name='mailCheck'
label='I agree to the Terms & Conditions'
							formik={formik}
						/>
					</Grid> */}

					<Typography
						color='#002147'
						sx={{
							fontWeight: 500,
							textAlign: 'center',
							width: '498px',
							lineHeight: '22px',
						}}
					>
						<span>By creating an account you are agreeing to our </span>
						<Link
							href='/terms-of-use'
							sx={{
								color: '#002147',
								fontWeight: '700',
								textDecoration: 'none',
							}}
						>
							Terms of Use
						</Link>
						<span> and </span>
						<Link
							href='/privacy-policy'
							sx={{
								color: '#002147',
								fontWeight: '700',
								textDecoration: 'none',
							}}
						>
							Privacy Policy
						</Link>
						<span>.</span>
					</Typography>

					<Grid
						item
						sm={12}
						xs={12}
						lg={12}
						sx={{
							alignItems: 'center',
							textAlign: 'center',
							marginTop: '1rem',
						}}
					>
						{loading ? (
							<LoadingSubmitButton
								loading
								loadingPosition='center'
								variant='outlined'
							>
								Sign Up
							</LoadingSubmitButton>
						) : (
							<SubmitButton type='submit' disableRipple>
								Sign Up
							</SubmitButton>
						)}
					</Grid>
					<Grid
						item
						sm={12}
						xs={12}
						lg={12}
						sx={{
							alignItems: 'center',
							textAlign: 'center',
							cursor: 'pointer',
							marginTop: '1.2rem',
						}}
					>
						<Typography>
							Already have an account?{' '}
							<span
								style={{ color: '#002147', fontWeight: '600' }}
								onClick={routeToLogin}
							>
								Sign in
							</span>
						</Typography>
					</Grid>
				</Grid>
			</Grid>

			<Grid
				item
				xs={0}
				sm={0}
				md={5}
				lg={5}
				sx={{
					background: '#6699CC',
					borderBottomRightRadius: '1.3rem',
					borderBottomLeftRadius: '1.3rem',
					height: '97vh',
					alignSelf: 'start',
				}}
			></Grid>
		</Grid>
	);
};

export default CreateAccount;
