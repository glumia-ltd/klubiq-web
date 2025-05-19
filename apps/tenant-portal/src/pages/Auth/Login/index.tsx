import * as Yup from 'yup';
import { ReactNode } from 'react';
//import { useNavigate } from 'react-router-dom';
import { KlubiqForm, FormField, FormGroup } from '@klubiq/ui-components';
import { Stack, Typography } from '@mui/material';
import EmailOutlineIcon from '@mui/icons-material/EmailOutlined';
import { styles } from '../styles';
import Logo from '@/assets/images/icons.svg';
import { openSnackbar } from '@/store/GlobalStore/snackbar.slice';
import { api } from '@/api';
import { authEndpoints } from '@/helpers/endpoints';

type IValuesType = {
    password: string;
    email: string;
};

const Login = () => {
    // NOTE: Don't lkeve unuse variables as it will cause tbe build to fail
	//const navigate = useNavigate();

    const defaultValues: IValuesType = {
        password: '',
        email: '',
    };

    const loginFormFields: (FormField | FormGroup)[] = [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            required: true,
            validation: Yup.string().required(''),
            adornment: { suffix: EmailOutlineIcon as unknown as ReactNode },
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            required: true,
            validation: Yup.string(),
        },
    ];

    const loadUserAfterSignIn = async () => {
        const user = await api.post(authEndpoints.getUserData())

        console.log(user)
    }

	const onSubmit = async (values: IValuesType) => {
		try {
			const response = await api.post(authEndpoints.login(), values)
            // await loadUserAfterSignIn()
		} catch (error:any) {
			openSnackbar({
				message: error.response.data.message,
				severity: 'error',
				isOpen: true,
			});
		}
		navigate('/dashboard');
	};

    return (
        <Stack
            sx={styles.container}
            spacing={2}
        >
            <Stack 
                direction="row" 
                justifyContent="center" 
                alignItems="center"
            >
                <img src={Logo} alt="Klubiq Logo" />
            </Stack>
            
            <Typography variant='h1' sx={styles.title}>
                Welcome to Klubiq
            </Typography>

            <KlubiqForm
                fields={loginFormFields as FormField[]}
                onSubmit={onSubmit}
                initialValues={defaultValues}
                submitButtonText='Login'
            />

            <Typography sx={styles.text}>
                Having trouble logging in? Contact your property manager.
            </Typography>
        </Stack>
    );
};

export default Login;