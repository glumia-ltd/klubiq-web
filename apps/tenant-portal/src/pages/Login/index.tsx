import LoginLayout from '@/layouts/LoginLayout';
import { Grid, Typography } from '@mui/material';
import EmailOutlineIcon from '@mui/icons-material/EmailOutlined';
import * as yup from 'yup';
import { styles } from './styles';
import {
	ControlledTextField,
	ControlledPasswordField,
} from '@klubiq/ui-components';

// import ControlledPasswordField from '@klubiq/ui-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment } from '@mui/material';

type IValuesType = {
	password: string;
	email: string;
};

const validationSchema = yup.object({
	password: yup.string().required('Please enter your password'),
	email: yup.string().email().required('Please enter your email'),
});

const Login = () => {
	const onSubmit = async (values: IValuesType) => {
		console.log(values);
	};

	const { control, handleSubmit } = useForm<IValuesType>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(validationSchema),
	});

	console.log(ControlledPasswordField, ControlledTextField);

	return (
		<>
			<LoginLayout handleSubmit={handleSubmit(onSubmit)}>
				<Grid
					item
					sx={{
						width: {
							xs: '80vw',
							sm: '35rem',
							md: '711px',
						},
						height: '50vh',
						border: '0.4px solid #D0D0D0',
						backgroundColor: 'white',
						borderRadius: '24px',
						p: {
							xs: '15px 30px',
							sm: '60px 100px!important',
							md: '80px 120px!important',
						},
					}}
				>
					<Grid container>
						<Grid item sm={12}>
							<Typography variant='h1' sx={styles.title}>
								Welcome to Klubiq
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<ControlledTextField
								name='email'
								label='Email'
								type='email'
								autoComplete='username'
								placeholder='Enter your email address'
								control={control}
								InputProps={{
									endAdornment: (
										<InputAdornment position='start'>
											<EmailOutlineIcon />
										</InputAdornment>
									),
									sx: {
										width: '100%',
									},
								}}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sx={{ marginTop: '20px' }}>
							{/* <ControlledPasswordField
								name='password'
								label='Password'
								type='password'
								autoComplete='password'
								placeholder='Enter your password'
								control={control}
								fullWidth
							/> */}
						</Grid>
					</Grid>
				</Grid>
			</LoginLayout>
		</>
	);
};

export default Login;
