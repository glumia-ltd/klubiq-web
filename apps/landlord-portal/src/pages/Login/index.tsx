/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginLayout from '../../Layouts/LoginLayout';
import {
  Button,
  // Checkbox,
  // FormControlLabel,
  // FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import {
  // sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { firebaseResponseObject } from '../../helpers/FirebaseResponse';
import { api } from '../../api';
import { authEndpoints } from '../../helpers/endpoints';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { saveUser } from '../../store/AuthStore/AuthSlice';

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
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onSubmit = async (values: IValuesType) => {
    const { email, password } = values;

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user: any = userCredential.user;

      console.log(user);

      const payload = {
        token: user.accessToken,
        user,
      };

      dispatch(saveUser(payload));

      const userName = user.displayName.split(' ');
      const firstName = userName[0];
      const lastName = userName[1];

      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('refreshToken', user.refreshToken);

      if (!user.emailVerified) {
        const requestBody = { email, firstName, lastName };

        await api.post(authEndpoints.emailVerification(), requestBody);

        setLoading(false);
        dispatch(
          openSnackbar({
            message: 'Please verify your email!',
            severity: 'info',
            isOpen: true,
          })
        );
      } else {
        dispatch(
          openSnackbar({
            message: 'That was easy',
            severity: 'success',
            isOpen: true,
          })
        );
        navigate('/private', { replace: true });
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          message:
            firebaseResponseObject[(error as Error).message] ||
            'An error occurred',
          severity: 'error',
          isOpen: true,
        })
      );

      setLoading(false);
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
    navigate('/forgotPassword', { replace: true });
  };

  return (
    <LoginLayout handleSubmit={formik.handleSubmit}>
      <Grid item xs={12} sm={12} md={7} lg={6} sx={{ width: '33rem' }}>
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
                  justifyContent: 'end',
                }}
              >
                {/* <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember this computer"
                  />
                </FormGroup> */}
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
                {loading ? (
                  <LoadingButton
                    loading
                    loadingPosition='center'
                    variant='outlined'
                    sx={{
                      border: '1px solid #002147',
                      borderRadius: '0.5rem',
                      color: 'white',
                      height: '3.1rem',
                      width: '100%',
                    }}
                  >
                    Sign In
                  </LoadingButton>
                ) : (
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
                )}
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
      {/* <ControlledSnackbar/> */}
    </LoginLayout>
  );
};

export default Login;
