/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography } from '@mui/material';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
import { SubmitButton, LoadingSubmitButton } from '../../styles/button';
import { BoldTextLink } from '../../styles/links';
import { useNavigate } from 'react-router-dom';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebase';
import { saveUser } from '../../store/AuthStore/AuthSlice';
import { useDispatch } from 'react-redux';
import { api } from '../../api';
import { authEndpoints } from '../../helpers/endpoints';
import { useState } from 'react';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { filter, find, orderBy } from 'lodash';
import countries from '../../helpers/countries-meta.json';

const CreateAccount: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	type CountryType = {
		name: string;
		code: string;
		dialCode: string;
		currency: string;
		currencySymbol: string;
	};
	const activeCountries: CountryType[] = orderBy(
		filter(countries, ['active', true]),
		'priority',
		'asc',
	) as CountryType[];

	const validationSchema = yup.object({
		firstName: yup.string().required('This field is required'),
		companyName: yup.string().required('This field is required'),
		lastName: yup.string().required('This field is required'),
		password: yup.string().required('Please enter your password'),
		email: yup.string().email().required('Please enter your email'),
		country: yup.string().required('This field is required'),
	});

	type IValuesType = {
		firstName: string;
		companyName: string;
		lastName: string;
		password: string;
		email: string;
		mailCheck: boolean;
		country: string | undefined;
	};

	const onSubmit = async (values: IValuesType) => {
		console.log('submit clicked');
		const { email, password, firstName, lastName, companyName, country } =
			values;
		const selectedCountry = find(activeCountries, ['code', country]);

		try {
			setLoading(true);

			const userDetails = {
				email,
				password,
				firstName,
				lastName,
				companyName,
				organizationCountry: selectedCountry,
			};

			const {
				data: { data: token },
			} = await api.post(authEndpoints.signup(), userDetails);

			console.log(token);

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
			country: activeCountries[0]?.code,
		},
		enableReinitialize: true,
		validateOnChange: true,
		validateOnBlur: true,
		validateOnMount: true,
		isInitialValid: false,
		validationSchema: {
			validate: (values: IValuesType) => {
				return validationSchema.isValidSync(values);
			},
		},
		onSubmit,
	});

	return (
		<>
			<Grid
				component='form'
				container
				spacing={0}
				justifyContent={'space-around'}
				sx={{
					p: {
						xs: 2,
						sm: 1,
						md: 1,
						lg: 1,
					},
				}}
				onSubmit={formik.handleSubmit}
				columnSpacing={{ xs: 1, sm: 1, md: 1 }}
			>
				<Grid
					container
					item
					xs={12}
					sm={12}
					md={4}
					lg={4}
					xl={5}
					spacing={0}
					sx={{
						alignContent: 'center',
					}}
				>
					<Grid
						container
						sx={{
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
							<Typography variant='h2' mb='3rem'>
								Create your Klubiq account
							</Typography>
							<Typography
								mt='-3rem'
								mb='2rem'
								sx={{
									fontWeight: 500,
									lineHeight: '30px',
									textAlign: 'center',
									fontSize: '18px',
									display: 'none',
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
								placeholder='Enter your first'
								formik={formik}
							/>
						</Grid>
						<Grid item sm={12} xs={12} md={6} lg={6}>
							<ControlledTextField
								name='lastName'
								label='Last Name'
								placeholder='Enter your last name'
								formik={formik}
								type='text'
							/>
						</Grid>

						<Grid item sm={12} xs={12} lg={12}>
							<ControlledTextField
								name='companyName'
								label='Company Name'
								placeholder='Enter your company name'
								type='text'
								formik={formik}
							/>
						</Grid>
						<Grid item sm={12} xs={12} lg={12}>
							<ControlledSelect
								name='country'
								label='Select Country'
								placeholder='Select Country'
								formik={formik}
								options={activeCountries.map((country) => ({
									value: country.code,
									label: country.name,
								}))}
							/>
						</Grid>
						<Grid item sm={12} xs={12} lg={12}>
							<ControlledTextField
								name='email'
								label='Email '
								placeholder='Enter your email address'
								formik={formik}
								type='email'
							/>
						</Grid>

						<Grid item sm={12} xs={12} lg={12}>
							<ControlledPasswordField
								name='password'
								label='Password'
								type='password'
								placeholder='Enter your password'
								formik={formik}
							/>
						</Grid>

						<Typography
							sx={{
								fontWeight: 500,
								textAlign: 'center',
								width: '498px',
								lineHeight: '22px',
							}}
						>
							<span>By creating an account you are agreeing to our </span>
							<BoldTextLink href='/terms-of-use'>Terms of Use</BoldTextLink>
							<span> and </span>
							<BoldTextLink href='/privacy-policy'>Privacy Policy</BoldTextLink>
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
								<BoldTextLink onClick={routeToLogin}>Sign in</BoldTextLink>
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
						display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
						borderBottomRightRadius: '1.3rem',
						borderBottomLeftRadius: '1.3rem',
						height: '97vh',
						alignSelf: 'start',
					}}
				></Grid>
			</Grid>
		</>
	);
};

export default CreateAccount;
