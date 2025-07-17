/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import ControlledTextField from '../../../components/ControlledComponents/ControlledTextField';
import ControlledSelect from '../../../components/ControlledComponents/ControlledSelect';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../../components/ControlledComponents/ControlledPasswordField';
import { LoadingSubmitButton } from '../../../styles/button';
import { BoldTextLink } from '../../../styles/links';
import { useNavigate } from 'react-router-dom';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../../firebase';
import { saveUser } from '../../../store/AuthStore/AuthSlice';
import { useDispatch } from 'react-redux';
import { api } from '../../../api';
import { authEndpoints } from '../../../helpers/endpoints';
import { useState } from 'react';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import { filter, find, orderBy } from 'lodash';
import countries from '../../../helpers/countries-meta.json';
import { styles } from './styles';
import bgillustration from '../../../assets/images/undraw_town_re_2ng5-removebg-preview.png';
import { PasswordStrengthBar } from '../../../components/PasswordStrengthBar/PasswordStrengthBar';
import { useGetRolesQuery } from '../../../store/GlobalStore/globalApiSlice';
import { consoleLog } from '../../../helpers/debug-logger';
import logo from '../../../assets/images/logo-1.png';
import logoText from '../../../assets/images/logo-text-2.png';
import lightLogo from '../../../assets/images/logo-3.png';
import lightLogoText from '../../../assets/images/logo-text-3.png';

const CreateAccount: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [passwordMessage, setPasswordMessage] = useState<string>('');
	const { data: rolesData } = useGetRolesQuery();
	const theme = useTheme();

	const isGloballyAvailable =
		import.meta.env.VITE_IS_GLOBALLY_AVAILABLE?.toLowerCase() === 'true';

	type CountryType = {
		name: string;
		code: string;
		dialCode: string;
		currency: string;
		currencySymbol: string;
		language: string;
	};
	const activeCountries: CountryType[] = orderBy(
		filter(countries, ['active', true]),
		'priority',
		'asc',
	) as CountryType[];
	const validationSchema = yup.object({
		firstName: yup.string().required('This field is required'),
		companyName: yup.string(),
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
	// Add error handling for role
	const role = rolesData
		? find(rolesData, ['name', 'Organization_Owner'])
		: null;

	const onSubmit = async (values: IValuesType) => {
		const { email, password, firstName, lastName, companyName, country } =
			values;
		const selectedCountry = find(activeCountries, ['code', country]);

		try {
			if (!rolesData || !role) {
				consoleLog('Role not found');
				dispatch(
					openSnackbar({
						message: 'Something went wrong. Please try again later.',
						severity: 'error',
						isOpen: true,
						duration: 5000,
					}),
				);
				return;
			}
			setLoading(true);
			const userDetails = {
				email,
				password,
				firstName,
				lastName,
				companyName,
				organizationCountry: selectedCountry,
				role,
			};

			if (passwordMessage) {
				dispatch(
					openSnackbar({
						message: passwordMessage,
						severity: 'warning',
						isOpen: true,
						duration: 5000,
					}),
				);

				setLoading(false);

				return;
			}

			const {
				data: { data: token },
			} = await api.post(authEndpoints.signup(), userDetails);

			const userCredential = await signInWithCustomToken(auth, token);
			dispatch(
				openSnackbar({
					message: 'Please verify your email!',
					severity: 'info',
					isOpen: true,
					duration: 5000,
				}),
			);

			setLoading(false);

			const user: any = userCredential.user;

			const userInfo = { email: user.email };

			dispatch(
				saveUser({
					user: userInfo,
					isSignedIn: true,
				}),
			);
			navigate('/verify-email?is_pending=true', { replace: true });
		} catch (error) {
			setLoading(false);
			const errorMessage = (error as Error).message.includes('code 424')
				? 'Your credentials are invalid. Please try again with new credentials.'
				: (error as Error).message;
			dispatch(
				openSnackbar({
					message: errorMessage,
					severity: 'error',
					isOpen: true,
					duration: 7000,
				}),
			);
		}
	};

	const routeToLogin = () => {
		navigate('/login', { replace: true });
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
		enableReinitialize: false,
		validateOnChange: true,
		validateOnBlur: true,
		validateOnMount: true,
		validationSchema,
		onSubmit,
	});

	return (
		<Grid
			container
			component='form'
			sx={styles.container}
			onSubmit={formik.handleSubmit}
			columnSpacing={{ xs: 1, sm: 1, md: 1 }}
		>
			<Grid
				item
				xs={12}
				sm={12}
				md={6}
				lg={6}
				xl={6}
				// spacing={0}
				sx={{
					alignContent: 'center',
				}}
			>
				<Grid container sx={styles.mainContainer} spacing={0.5}>
					<Grid container sx={styles.formContainer}>
						<Grid item xs={12} sm={12} md={12} lg={12} sx={styles.headerGrid}>
							<Stack
								direction='row'
								justifyContent='flex-start'
								alignItems='center'
								gap={2}
								mb={2}
								sx={{ width: '100%' }}
							>
								<img
									src={theme.palette.mode === 'dark' ? logo : lightLogo}
									alt='logo'
									style={{ width: '10%', height: 'auto' }}
								/>
								<img
									src={theme.palette.mode === 'dark' ? logoText : lightLogoText}
									alt='logo'
									style={{ width: '25%', height: 'auto' }}
								/>
							</Stack>
							<Typography variant='h2' sx={styles.title}>
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
						<Grid item sm={12} xs={12} lg={12} mb={1}>
							<Stack direction={'row'} sx={styles.nameStack}>
								<ControlledTextField
									sx={styles.inputStyle}
									name='firstName'
									label='First Name'
									type='text'
									placeholder='Enter your first name'
									autoComplete='given-name'
									formik={formik}
								/>
								<ControlledTextField
									sx={styles.inputStyle}
									name='lastName'
									label='Last Name'
									placeholder='Enter your last name'
									formik={formik}
									type='text'
									autoComplete='family-name'
								/>
							</Stack>
						</Grid>
						<Grid item sm={12} xs={12} lg={12} mb={1}>
							<ControlledTextField
								name='companyName'
								label='Company Name'
								placeholder='Enter your company name'
								type='text'
								formik={formik}
								autoComplete='organization'
							/>
						</Grid>
						{isGloballyAvailable && (
							<Grid item sm={12} xs={12} lg={12} mb={1}>
								<ControlledSelect
									name='country'
									label='Select Country'
									placeholder='Select Country'
									formik={formik}
									options={activeCountries?.map((country) => ({
										id: country.code,
										name: country.name,
									}))}
								/>
							</Grid>
						)}
						<Grid item sm={12} xs={12} lg={12} mb={1}>
							<ControlledTextField
								name='email'
								label='Email '
								placeholder='Enter your email address'
								formik={formik}
								type='email'
								autoComplete='email'
							/>
						</Grid>

						<Grid item sm={12} xs={12} lg={12} mb={1}>
							<ControlledPasswordField
								name='password'
								label='Password'
								type='password'
								placeholder='Enter your password'
								formik={formik}
								autoComplete='new-password'
							/>
						</Grid>

						<Grid item sm={12} xs={12} lg={12} mt={-2} mb={1}>
							<PasswordStrengthBar
								password={formik.values.password}
								handlePasswordChange={setPasswordMessage}
							/>
						</Grid>

						<Typography variant='body1' textAlign='left' sx={{ width: '100%' }}>
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
								<Button
									fullWidth
									variant='klubiqMainButton'
									type='submit'
									disableRipple
								>
									Sign Up
								</Button>
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
			</Grid>

			<Grid
				item
				xs={0}
				sm={0}
				md={6}
				lg={6}
				xl={6}
				sx={{
					background: `linear-gradient(#6699CC, #1F305E), url(${bgillustration})`,
					display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
					borderTopRightRadius: '1.3rem',
					borderBottomLeftRadius: '1.3rem',
					alignContent: 'center',
					backgroundBlendMode: 'overlay',
					backgroundSize: 'fixed',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'bottom',
				}}
			>
				<Stack
					direction={'column'}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
					}}
				>
					<Typography color={'white'} textAlign={'center'} variant='h2'>
						Ready to Transform Your Property Management?
					</Typography>
					<Typography color={'white'} variant='body1'>
						Sign up and make managing properties effortless.
					</Typography>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default CreateAccount;
