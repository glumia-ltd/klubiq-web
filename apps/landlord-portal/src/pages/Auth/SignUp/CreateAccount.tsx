/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Button,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { BoldTextLink } from '../../../styles/links';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import lightLogo from '../../../assets/images/logo-2.png';
import lightLogoText from '../../../assets/images/logo-text-1.png';
import { useSignUpMutation } from '../../../store/AuthStore/authApiSlice';
import { DynamicModal, DynamicTanstackFormProps, KlubiqFormV1 } from '@klubiq/ui-components';
import { z } from 'zod';
import { TaskAlt } from '@mui/icons-material';

const CreateAccount: React.FC = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [passwordMessage, setPasswordMessage] = useState<string>('');
	const { data: rolesData } = useGetRolesQuery();
	const [signUpMutation] = useSignUpMutation();
	const [accountCreated, setAccountCreated] = useState<boolean>(false);
	const [emailVerified, setEmailVerified] = useState<boolean>(false);

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

	type IValuesType = {
		name: {
			firstName: string;
			lastName: string;
		};
		companyName: string;
		password: string;
		email: string;
		country: string;
	};
	// Add error handling for role
	const role = rolesData
		? find(rolesData, ['name', 'Organization_Owner'])
		: null;

	const onSubmit = async (values: IValuesType) => {
		console.log('values entered:', values);
		const { email, password, name, companyName, country } = values;
		const { firstName, lastName } = name;
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
				setAccountCreated(false);
				return;
			}

			const { emailVerified } = await signUpMutation(userDetails).unwrap();
			setAccountCreated(true);
			setEmailVerified(emailVerified);
		} catch (error) {
			setAccountCreated(false);
			setEmailVerified(false);
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
			throw error;
		}
	};
	const handleCloseModal = () => {
		setAccountCreated(false);
		routeToLogin();
	};

	const routeToLogin = () => {
		navigate('/login', { replace: true });
	};
	const getNextActionTitle = () => {
		if (emailVerified) {
			return `Your email is verified and you can login now!`;
		}
		return `Account Created!`;
	};
	const getNextActionDescription = () => {
		if (emailVerified) {
			return `
			Looks like you've already verified your email.<br />
			You can now login to your account with your email and password. 
			If you don't remember your password, you can reset it by clicking on the "Forgot password" link.`;
		}
			return `<strong>Congratulations! Your account has been created successfully.</strong> <br />
			We've sent you an email. Please confirm your email address by clicking on the link in your inbox.
			If you don't receive an email, please check your spam folder or contact us -
			 <a href='mailto:support@klubiq.com'>support@klubiq.com</a>.`;
	};
		const signUpFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		header: (
			<Stack
				direction='row'
				justifyContent='flex-start'
				alignItems='center'
				gap={2}
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
		),
		subHeader: (
			<Typography variant='h2' sx={styles.subTitle} textAlign='left'>
				Create your Klubiq account.
			</Typography>
		),
		submitButtonText: 'Sign up',
		underSubmitButtonNode: (
			<Typography textAlign='left'>
				Already have an account?{' '}
				<BoldTextLink onClick={routeToLogin}>Sign in</BoldTextLink>
			</Typography>
		),
		showBackdrop: false,
		fullWidthButtons: true,
		verticalAlignment: 'center',
		horizontalAlignment: 'center',
		fields: [
			{
				name: 'name',
				type: 'group',
				label: '',
				width: '100%',
				layout: 'row',
				groupFields: [
					{
						name: 'firstName',
						type: 'text',
						label: 'First Name',
						placeholder: 'Enter your first name',
						width: isMobile ? '100%' : '47.5%',
						validation: {
							schema: z
								.string({ required_error: 'First name is required' })
								.min(2, {
									message:
										'First name is too short. Please enter at least 2 characters.',
								}),
						},
					},
					{
						name: 'lastName',
						type: 'text',
						label: 'Last Name',
						placeholder: 'Enter your last name',
						width: isMobile ? '100%' : '47.5%',
						validation: {
							schema: z
								.string({ required_error: 'Last name is required' })
								.min(2, {
									message:
										'Last name is too short. Please enter at least 2 characters.',
								}),
						},
					},
				],
			},
			{
				name: 'companyName',
				type: 'text',
				label: 'Company Name',
				placeholder: 'Enter your company name',
				width: '100%',
			},
			{
				name: 'country',
				type: 'hidden',
				label: 'Country',
				placeholder: 'Select your country',
				required: true,
				width: '100%',
				hidden: !isGloballyAvailable,
				options: activeCountries?.map((country) => ({
					value: country.code,
					label: country.name,
				})),
			},
			{
				name: 'email',
				type: 'email',
				label: 'Email',
				placeholder: 'Enter your email address',
				validation: {
					schema: z
						.string({ required_error: 'Email is required' })
						.email({ message: 'Enter a valid email address' }),
				},
			},
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
				name: 'passwordMeter',
				type: 'custom',
				label: '',
				showIf: (values) => !!values.password,
				component: (_, __, form: any) => {
					return (
						<PasswordStrengthBar
							password={form.getFieldValue('password')}
							handlePasswordChange={setPasswordMessage}
						/>
					);
				},
			},
			{
				name: 'termsAndConditions',
				type: 'custom',
				label: '',
				component: (
					<Typography variant='body1' textAlign='left' sx={{ width: '100%' }}>
						<span>By creating an account you are agreeing to our </span>
						<BoldTextLink href='/terms-of-use'>Terms of Use</BoldTextLink>
						<span> and </span>
						<BoldTextLink href='/privacy-policy'>Privacy Policy</BoldTextLink>
						<span>.</span>
					</Typography>
				),
			},
		],
		onSubmit: onSubmit,
		initialValues: {
			name: {
				firstName: '',
				lastName: '',
			},
			companyName: '',
			country: activeCountries[0]?.code,
			email: '',
			password: '',
		},
		enableErrorAlert: true,
	};

	return (
		<Grid container sx={styles.container}>
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
					width: isMobile ? '100%' : '33rem',
				}}
			>
				<Grid container sx={styles.mainContainer} spacing={0.5}>
					<Stack
						justifyContent='center'
						direction='column'
						width={isMobile ? '90%' : '50%'}
						// p={isMobile ? 5: 10}
						gap={1}
						sx={{
							height: '100vh',
						}}
					>
						<KlubiqFormV1 {...signUpFormConfig} />
					</Stack>
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
			<DynamicModal
					open={accountCreated}
					onClose={handleCloseModal}
					header={
						<Stack direction='row' spacing={2} alignItems='center' width='100%'>
							<TaskAlt color='success' fontSize='large' sx={{ fontSize: '3rem' }} />
							<Typography variant='h4'>
								{getNextActionTitle()}
							</Typography>
						</Stack>
					}
					children={<Stack direction='column' spacing={2} alignItems='center' justifyContent='center' width='100%'>
						<Typography variant='body1' lineHeight={1.2} textAlign='center' dangerouslySetInnerHTML={{ __html: getNextActionDescription() }} />
					</Stack>}
					footer={
						<Stack direction='row' spacing={2} alignItems='center' justifyContent='center' width='100%'>
							<Button variant='klubiqMainButton' onClick={handleCloseModal}>Login</Button>
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
	);
};

export default CreateAccount;
