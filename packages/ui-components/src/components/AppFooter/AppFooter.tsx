import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AppFooterProps {
  appName: string;
  version: string;
  environment?: 'development' | 'staging' | 'production';
  companyName?: string;
  companyWebsite?: string;
  supportEmail?: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
}

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
}));

const EnvironmentBadge = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.75rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
}));

const getEnvironmentColor = (environment?: string) => {
  switch (environment) {
    case 'development':
      return '#ff9800';
    case 'staging':
      return '#2196f3';
    case 'production':
      return '#4caf50';
    default:
      return '#757575';
  }
};

export const AppFooter: React.FC<AppFooterProps> = ({
  appName,
  version,
  environment,
  companyName = 'KlubIQ',
  companyWebsite = 'https://blog.klubiq.com',
  supportEmail = 'support@klubiq.com',
  privacyPolicyUrl = '/privacy-policy',
  termsOfServiceUrl = '/terms-of-service',
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'flex-start' }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} {companyName}. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={2} mt={1}>
              <Link href={privacyPolicyUrl} color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href={termsOfServiceUrl} color="inherit" underline="hover">
                Terms of Service
              </Link>
              <Link href={`mailto:${supportEmail}`} color="inherit" underline="hover">
                Support
              </Link>
            </Stack>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            {environment && (
              <EnvironmentBadge
                sx={{
                  backgroundColor: getEnvironmentColor(environment),
                  color: 'white',
                }}
              >
                {environment}
              </EnvironmentBadge>
            )}
            <Typography variant="body2" color="text.secondary">
              {appName} v{version}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </FooterContainer>
  );
}; 