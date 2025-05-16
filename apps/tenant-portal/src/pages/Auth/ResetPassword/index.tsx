import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as Yup from 'yup';

import { FormField, FormGroup, KlubiqForm } from '@klubiq/ui-components';
import { Grid, Typography } from '@mui/material';

import { openSnackbar } from '@/store/SnackbarStore/SnackbarSlice';
import { authEndpoints } from '@/helpers/endpoints';
import { api } from "@/api"

import Logo from '@/assets/images/icons.svg';
import { styles } from '../styles';

type IPasswordType = {
	password: string;
	confirmPassword: string;
};

const ResetPassword = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch()
	

	const [loading, setLoading] = useState<boolean>(false)

	const resetPasswordFormFields: (FormField | FormGroup)[] = [
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
			validation: Yup.string()
				.required()
				.matches(
					/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
					{
						message: 'Password should be more than 7 characters.',
					},
				),
		},
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
			type: 'password',
			placeholder: 'Confirm your password',
			required: true,
			validation: Yup.string()
				.required()
				.test(
					'is-same',
					() => 'Confirm password is not the same as password',
					function (code, context) {
						const { password, confirmPassword } = context.parent;

						return password === confirmPassword;
					},
				),
		},
	];

	const defaultValues: IPasswordType = {
		password: '',
		confirmPassword: '',
	};

	const onSubmit = async (values: IPasswordType) => {
		setLoading(true)

		const payload = {
			oobCode: searchParams.get('oobCode'),
			email: searchParams.get('email')!.replace(' ', '+'),
			password: values.password
		};

		try {
			const response = await api.post(
				authEndpoints.acceptInvitation(searchParams.get('token')as string),
				payload,
			);

			console.log(response)
			navigate('/');
		} catch (e) {
			console.error(e)
			dispatch(
				openSnackbar({
					message: 'An error occurred',
					severity: 'error',
					isOpen: true
				})
			)
		}
	};

	return (
		<Grid item sx={styles.container}>
			<Grid container>
				<Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
					<img src={Logo} />
				</Grid>
				<Grid item sm={12}>
					<Typography variant='h1' sx={styles.title}>
						Reset Your Password
					</Typography>
				</Grid>

				<KlubiqForm
					fields={resetPasswordFormFields as FormField[]}
					onSubmit={onSubmit}
					initialValues={defaultValues}
					submitButtonText='Reset Password'
				></KlubiqForm>
			</Grid>
		</Grid>
	);
};

export default ResetPassword;
