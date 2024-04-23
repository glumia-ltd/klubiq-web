/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography, Button } from '@mui/material';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
// import { useSnackbar } from "notistack";
import ControlledCheckBox from '../../components/ControlledComponents/ControlledCheckbox';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { saveUser } from '../../store/AuthStore/AuthSlice';
import { useDispatch } from 'react-redux';

const CreateAccount: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    firstname: yup.string().required('This field is required'),
    companyName: yup.string().required('This field is required'),
    lastname: yup.string().required('This field is required'),
    password: yup.string().required('Please enter your password'),
    email: yup.string().email().required('Please enter your email'),
    mailCheck: yup.bool().oneOf([true], 'Please Check Box'),
  });

  type IValuesType = {
    firstname: string;
    companyName: string;
    lastname: string;
    password: string;
    email: string;
    mailCheck: boolean;
  };

  const onSubmit = async (values: IValuesType) => {
    console.log(values, 'hh');

    const { email, password } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);

      //TODO: Find out what user info should be saved
      const user: any = userCredential.user;

      const userInfo = { email: user.email };

      dispatch(saveUser({ user: userInfo, token: user.accessToken }));

      navigate('/private', { replace: true });

      localStorage.setItem('token', user.accessToken);

      //TODO: Redirect to a page
    } catch (error) {
      console.log(error);
    }

    navigate('/signup/profileupdate', { replace: true });
  };

  const routeToLogin = () => {
    navigate('/login', { replace: true });
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      companyName: '',
      lastname: '',
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
        spacing={0}
        sx={{
          justifyContent: 'center',
        }}
        component='form'
        onSubmit={formik.handleSubmit}
      >
        <Grid
          item
          xs={12}
          sm={6}
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
              margin: '2.7rem 11.6rem 0rem 7.5rem',
            }}
            spacing={2}
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
            <Grid container spacing={1}></Grid>
            <Grid item sm={6} xs={12} lg={6}>
              <ControlledTextField
                name='firstname'
                label='First Name'
                type='text'
                formik={formik}
              />
            </Grid>
            <Grid item sm={6} xs={12} lg={6}>
              <ControlledTextField
                name='lastname'
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
              }}
              // onClick={goBackToLogin}
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
          xs={12}
          sm={6}
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
