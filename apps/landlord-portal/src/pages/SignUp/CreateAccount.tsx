import { Grid, Typography, Button } from '@mui/material';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ControlledPasswordField from '../../components/ControlledComponents/ControlledPasswordField';
// import { useSnackbar } from "notistack";

const CreateAccount: React.FC = () => {
  const validationSchema = yup.object({
    firstname: yup.string().required('This field is required'),
    companyName: yup.string().required('This field is required'),
    lastname: yup.string().required('This field is required'),
    password: yup.string().required('Please enter referral code'),
    email: yup.string().email().required('Please enter an email'),
  });

  type IValuesType = {
    firstname: string;
    companyName: string;
    lastname: string;
    password: string;
    email: string;
  };

  const onSubmit = async (values: IValuesType) => {
    console.log(values, 'hh');
  };
  const formik = useFormik({
    initialValues: {
      firstname: '',
      companyName: '',
      lastname: '',
      password: '',
      email: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Grid
      container
      spacing={1}
      sx={{
        alignContent: 'center',
        justifyContent: 'center',
      }}
      component='form'
      onSubmit={formik.handleSubmit}
    >
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Grid
          container
          spacing={0}
          sx={{
            width: '600px',
            padding: '1rem',
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ textAlign: 'center' }}
          >
            <Typography variant='h4' color='#002147' mb='1.5rem'>
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
              sx={{
                border: '1px solid #002147',
                color: 'white',
                background: '#002147',
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
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6}>
        a
      </Grid>
    </Grid>
  );
};

export default CreateAccount;
