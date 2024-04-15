import { Card, Grid, Typography } from '@mui/material';
import Logo1 from '../assets/images/octagon.png';
import Logo2 from '../assets/images/blueoctagon.png';
import { FC } from 'react';

type WelcomePageLayoutType = {
  leftAlignTexts?: boolean;
  mainText: string;
  subText?: string;
  handleLandLordClick?: () => void;
  handleTenantClick?: () => void;
};

const WelcomePageLayout: FC<WelcomePageLayoutType> = ({
  mainText,
  subText,
  handleLandLordClick,
  handleTenantClick,
  leftAlignTexts,
}) => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        padding: '4rem',
        height: '100vh',
      }}
    >
      {
        <Grid
          container
          spacing={0}
          mt='1rem'
          sx={{
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          <Grid
            container
            xs={12}
            md={12}
            lg={12}
            sx={{
              margin: `${leftAlignTexts ? '6rem 14rem 0rem' : ''}`,
              justifyContent: 'flex-start',
              alignSelf: 'center',
              textAlign: `${leftAlignTexts ? 'left' : 'center'}`,
              color: '#002147',
              height: '105px',
              padding: '0',
            }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <Typography
                variant='h3'
                mb={'18px'}
                sx={{
                  fontWeight: '700',
                }}
              >
                {mainText}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant='h5'>{subText}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'flex-center',
              }}
            >
              <Card
                onClick={handleLandLordClick}
                sx={{
                  height: '23.7rem',
                  width: '31.4rem',
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
              sm={12}
              md={6}
              lg={6}
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'flex-center',
              }}
            >
              <Card
                onClick={handleTenantClick}
                sx={{
                  height: '23.7rem',
                  width: '31.4rem',
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
      }
    </Grid>
  );
};

export default WelcomePageLayout;
