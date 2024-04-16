/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginLayout from '../../Layouts/LoginLayout';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const validationSchema = yup.object({
  password: yup.string().required('Please enter your password'),
  email: yup.string().email().required('Please enter your email'),
});
type IValuesType = {
  password: string;
  email: string;
};

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: IValuesType) => {
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: any = userCredential.user;
      console.log(user.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  const routeToSignUp = () => {
    navigate('/signup', { replace: true });
  };

  const routeToForgotPassword = () => {
    navigate('/forgotPassword');
  };

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
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              mt={4}
              sx={{
                textAlign: 'right',
              }}
            >
              <Typography>
                Are you a tenant?{' '}
                <span
                  style={{
                    color: '#002147',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Sign in here
                </span>
              </Typography>
            </Grid>

            <Grid
              container
              sx={{
                height: '25rem',
              }}
              mt={-15}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                mb={2}
                sx={{
                  textAlign: 'center',
                }}
              >
                <Typography variant='h3' sx={{ fontWeight: '700' }}>
                  Sign in
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
                  textAlign: 'center',
                }}
              >
                <Typography>
                  Welcome back! Please enter your details.
                </Typography>
              </Grid>

              <Grid item sm={12} xs={12} lg={12}>
                <ControlledTextField
                  name='email'
                  label='Email'
                  type='email'
                  formik={formik}
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
              <Grid
                item
                sm={12}
                xs={12}
                lg={12}
                mt={-1}
                m={0.5}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label='Remember this computer'
                  />
                </FormGroup>
                <Typography
                  onClick={routeToForgotPassword}
                  style={{
                    color: '#0096FF',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Forgot password
                </Typography>
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
                <Button
                  type='submit'
                  sx={{
                    border: '1px solid #002147',
                    borderRadius: '0.5rem',
                    color: 'white',
                    background: '#002147',
                    height: '3.1rem',
                    width: '100%',
                    '&:hover': {
                      color: '#002147',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Grid>

              <Grid
                item
                sm={12}
                xs={12}
                lg={12}
                mt={2}
                sx={{
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={routeToSignUp}
              >
                <Typography>
                  Don't have an account?{' '}
                  <span style={{ color: '#002147', fontWeight: '600' }}>
                    Sign up
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LoginLayout>
  );
};

export default Login;
