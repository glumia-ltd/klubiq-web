import { Box, Stack, Typography, useTheme, Theme, SxProps } from '@mui/material';
import React, { ReactNode } from 'react';

export type PageHeaderVariant = 'default' | 'compact' | 'detailed' | 'custom';

export interface PageHeaderProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  rightContent?: ReactNode;
  variant?: PageHeaderVariant;
  actions?: ReactNode;
  icon?: ReactNode;
  backgroundColor?: string;
  sx?: SxProps<Theme>;
}

const getVariantStyles = (variant: PageHeaderVariant, theme: Theme) => {
  const baseStyles = {
    width: '100%',
    padding: {
      xs: theme.spacing(2),
      sm: theme.spacing(3),
      md: theme.spacing(4)
    },
    borderRadius: theme.shape.borderRadius,
  };

  switch (variant) {
    case 'compact':
      return {
        ...baseStyles,
        padding: {
          xs: theme.spacing(1.5),
          sm: theme.spacing(2),
          md: theme.spacing(2.5)
        },
      };
    case 'detailed':
      return {
        ...baseStyles,
        padding: {
          xs: theme.spacing(2.5),
          sm: theme.spacing(4),
          md: theme.spacing(5)
        },
      };
    case 'custom':
      return baseStyles;
    default:
      return baseStyles;
  }
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  rightContent,
  variant = 'default',
  actions,
  icon,
  backgroundColor,
  sx = {},
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...getVariantStyles(variant, theme),
        backgroundColor: backgroundColor || theme.palette.background.paper,
        color: theme.palette.text.primary,
        ...sx,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Stack direction="row" spacing={2} alignItems="center" flex={1}>
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.primary.main,
              }}
            >
              {icon}
            </Box>
          )}
          <Stack spacing={0.5} flex={1}>
            {typeof title === 'string' ? (
              <Typography
                variant="h4"
                sx={{
                  fontSize: {
                    xs: '1.5rem',
                    sm: '1.75rem',
                    md: '2rem',
                  },
                  fontWeight: 600,
                }}
              >
                {title}
              </Typography>
            ) : (
              title
            )}
            {subtitle && (
              typeof subtitle === 'string' ? (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem',
                    },
                  }}
                >
                  {subtitle}
                </Typography>
              ) : (
                subtitle
              )
            )}
          </Stack>
        </Stack>

        {(rightContent || actions) && (
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'flex-start', sm: 'flex-end' },
            }}
          >
            {rightContent}
            {actions && (
              <Stack direction="row" spacing={1}>
                {actions}
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default PageHeader; 