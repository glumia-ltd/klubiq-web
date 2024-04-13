import { Button, Grid, Typography } from '@mui/material';
import LoginLayout from '../../Layouts/LoginLayout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import leftArrow from '../../assets/images/left-arrow.svg';

const validationSchema = yup.object({
  email: yup.string().email().required('Please enter your email'),
});

type IValuesType = {
  email: string;
};

const ForgotPassword = () => {
  const onSubmit = async (values: IValuesType) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit,
  });

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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                cursor: 'pointer',
              }}
            >
              <img
                src={leftArrow}
                alt='back arrow'
                style={{ alignSelf: 'flex-end', marginRight: '5px' }}
              />
              <Typography>Back to login</Typography>
            </Grid>
            <Grid
              container
              sx={{
                height: '25rem',
              }}
              mt={-10}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  textAlign: 'left',
                }}
              >
                <Typography variant='h3' sx={{ fontWeight: '700' }}>
                  Forgot your password?
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
                  textAlign: 'left',
                }}
              >
                <Typography>
                  Don’t worry, happens to all of us. Enter your email below to
                  recover your password.
                </Typography>
              </Grid>

              <Grid item sm={12} xs={12} lg={12}>
                <ControlledTextField
                  name='email'
                  label='Enter your registered email'
                  type='email'
                  formik={formik}
                />
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
                  Set Password
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LoginLayout>
  );
};

export default ForgotPassword;
