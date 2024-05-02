/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography, Button } from '@mui/material';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
import { useSnackbar } from 'notistack';
import ControlledCheckBox from '../../components/ControlledComponents/ControlledCheckbox';
import { useNavigate } from 'react-router-dom';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebase';
import { saveUser } from '../../store/AuthStore/AuthSlice';
import { useDispatch } from 'react-redux';
import { api, endpoints } from '../../api';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const CreateAccount: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
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
      } = await api.post(endpoints.signup(), userDetails);

      const userCredential = await signInWithCustomToken(auth, token);

      enqueueSnackbar('Please verify your email!', { variant: 'success' });

      // const actionCodeSettings = {
      //   url: 'http://localhost:5173/verify-email',
      // };

      // send notification for email (still using this?)

      // await sendEmailVerification(userCredential.user, actionCodeSettings);

      //if successful, reroute to verification email page here.

      //TODO: Find out what user info should be saved
      const user: any = userCredential.user;

      const userInfo = { email: user.email };

      dispatch(saveUser({ user: userInfo, token: user.accessToken }));

      // navigate('/private', { replace: true });

      // localStorage.setItem('token', user.accessToken);

      //TODO: Redirect to a page
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    // navigate('/signup/profileupdate', { replace: true });
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
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          justifyContent: 'center',
        }}
        component='form'
        onSubmit={formik.handleSubmit}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          spacing={1}
          sx={{
            alignContent: 'center',
          }}
        >
          <Grid
            container
            sx={{
              width: '33rem',
              margin: '1.7rem 11.6rem 0rem 7.5rem',
            }}
            spacing={1}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ textAlign: 'center' }}
            >
              <Typography variant='h2' color='#002147' mb='1.5rem'>
                Create a Klubiq account{' '}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{ textAlign: 'center' }}
            >
              <Typography variant='h6' color='#002147' mb='1.5rem'>
                Sign Up and get 30 days free trial.{' '}
              </Typography>
            </Grid>
            <Grid item  xs={12} sm={12} lg={6}>
              <ControlledTextField
                name='firstName'
                label='First Name'
                type='text'
                formik={formik}
              />
            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
              <ControlledTextField
                name='lastName'
                label='Last Name'
                formik={formik}
                type='text'
              />
            </Grid>

            <Grid item sm={12} xs={12} lg={12}>
              <ControlledTextField
                name='companyName'
                label='Company Name'
                type='text'
                formik={formik}
              />
            </Grid>

            <Grid item sm={12} xs={12} lg={12}>
              <ControlledTextField
                name='email'
                label='Email '
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

            <Grid item sm={12} xs={12} lg={12}>
              <ControlledCheckBox
                name='mailCheck'
                label='I agree to the Terms & Conditions'
                type='text'
                formik={formik}
              />
            </Grid>

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
                  disableRipple
                  sx={{
                    border: '1px solid #002147',
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
                marginTop:"1rem"
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
          md={6}
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
    </>
  );
};

export default CreateAccount;
