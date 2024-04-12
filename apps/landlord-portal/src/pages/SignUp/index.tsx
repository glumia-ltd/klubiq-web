import { useState } from 'react';
import { Typography, Grid, Card } from '@mui/material';
import Logo1 from '../../assets/images/octagon.png';
import Logo2 from '../../assets/images/blueoctagon.png';
import CreateAccount from './CreateAccount';
import ContactDetails from './Stepper';

const SignUp = () => {
  const [pageState, setPageState] = useState('signup');

  return (
    <Grid container spacing={1} sx={{ padding: '4rem' }}>
      {pageState === 'signup' && (
        <Grid container spacing={0} mt='1rem'>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              textAlign: 'left',
              margin: '90px 198px 0px',
              color: '#002147',
              height: '105px',
              padding: '0px',
            }}
          >
            <Typography variant='h3' mb={'18px'} sx={{ fontWeight: '700' }}>
              Create your Klubiq account
            </Typography>
            <Typography variant='h5'>I am a:</Typography>
          </Grid>
          <Grid container sx={{ margin: '0px 145px' }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              sx={
                {
                  // display: 'flex',
                  // justifyContent: 'right',
                  // alignItems: 'flex-center',
                }
              }
            >
              <Card
                onClick={() => {
                  console.log('here'), setPageState('createaccount');
                }}
                sx={{
                  height: '356px',
                  width: '471px',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '3.7rem',
                  borderRadius: '30px',
                  color: '#ffffff',
                  margin: '50px',
                  background: '#002147',
                  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                  '&:hover': {
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                  },
                }}
              >
                <img src={Logo1} alt='logo' />
                <Typography variant='h3' mt={'40px'}>
                  Landlord or Property Manager
                </Typography>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'flex-center',
              }}
            >
              <Card
                sx={{
                  height: '356px',
                  width: '471px',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '3.7rem',
                  borderRadius: '30px',
                  color: '#002147',
                  margin: '50px',

                  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                  '&:hover': {
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                  },
                }}
              >
                <img src={Logo2} alt='logo' />

                <Typography variant='h3' mt={'40px'}>
                  Tenant
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}

      {pageState === 'createaccount' && <CreateAccount />}
      {pageState === 'contactdetails' && <ContactDetails />}
    </Grid>
  );
};

export default SignUp;
