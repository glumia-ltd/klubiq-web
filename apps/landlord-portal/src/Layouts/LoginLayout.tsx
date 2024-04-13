import { Grid } from '@mui/material';
import { FC } from 'react';

type LoginLayoutType = {
  children: JSX.Element;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const LoginLayout: FC<LoginLayoutType> = ({ children, handleSubmit }) => {
  return (
    <Grid
      container
      spacing={0}
      component='form'
      sx={{
        justifyContent: 'center',
        height: '100vh',
      }}
      onSubmit={handleSubmit}
    >
      {children}

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
  );
};

export default LoginLayout;
