import * as Yup from 'yup';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { KlubiqForm, FormField, FormGroup } from '@klubiq/ui-components';
import { Stack, Typography } from '@mui/material';
import EmailOutlineIcon from '@mui/icons-material/EmailOutlined';
import { styles } from '../styles';
import Logo from '@/assets/images/icons.svg';

type IValuesType = {
    password: string;
    email: string;
};

const Login = () => {
    const navigate = useNavigate();

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

    const onSubmit = async (values: IValuesType) => {
        console.log(values);
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