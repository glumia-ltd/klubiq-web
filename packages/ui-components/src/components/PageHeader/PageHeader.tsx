import { Box, Stack, Typography, useTheme, Theme, SxProps, Skeleton } from '@mui/material';
import React, { ReactNode } from 'react';

export type PageHeaderVariant = 'default' | 'compact' | 'detailed' | 'custom';

export interface PageHeaderProps {
  /** The main title of the header. Can be a string or a custom React node */
  title: string | ReactNode;
  /** Optional subtitle text or component */
  subtitle?: string | ReactNode;
  /** Optional content to be displayed on the right side */
  rightContent?: ReactNode;
  /** The style variant of the header */
  variant?: PageHeaderVariant;
  /** Optional action buttons or components to be displayed after rightContent */
  actions?: ReactNode;
  /** Optional icon to be displayed before the title */
  icon?: ReactNode;
  /** Optional background color override */
  backgroundColor?: string;
  /** Optional style overrides */
  sx?: SxProps<Theme>;
  /** Show skeletons when loading */
  loading?: boolean;
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

/**
 * PageHeader is a versatile component for creating page headers with various layouts and styles.
 * It supports different variants, custom content, and responsive design.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  rightContent,
  variant = 'default',
  actions,
  icon,
  backgroundColor,
  sx = {},
  loading = false,
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Box
        sx={{
          ...getVariantStyles(variant, theme),
          backgroundColor: backgroundColor || theme.palette.background.paper,
          color: theme.palette.text.primary,
          width: '100%',
          minWidth: 0,
          ...sx,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          alignItems= {{ xs: 'stretch', sm: 'center' }}
          spacing={2}
          width="100%"
          minWidth={0}
        >
          <Stack direction="row" spacing={2} alignItems="center" flex={1} width="100%" minWidth={0}>
            <Skeleton variant="circular" width={40} height={40} />
            <Stack spacing={0.5} flex={1}>
              <Skeleton variant="text" width="60%" height={36} />
              <Skeleton variant="text" width="40%" height={24} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" width={{ xs: '100%', sm: 'auto' }} justifyContent={{ xs: 'flex-end', sm: 'flex-end' }} mt={{ xs: 2, sm: 0 }}>
            <Skeleton variant="rectangular" width={80} height={36} />
            <Skeleton variant="rectangular" width={36} height={36} />
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...getVariantStyles(variant, theme),
        backgroundColor: backgroundColor || theme.palette.background.paper,
        color: theme.palette.text.primary,
        width: '100%',
        minWidth: 0,
        ...sx,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        alignItems= {{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        width="100%"
        minWidth={0}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          width="100%"
          minWidth={0}
          sx={{
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            textAlign: { xs: 'left', sm: 'inherit' },
          }}
        >
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
            width={{ xs: '100%', sm: 'auto' }}
            justifyContent={{ xs: 'center', sm: 'flex-end' }}
            mt={{ xs: 2, sm: 0 }}
            sx={{
              textAlign: { xs: 'center', sm: 'inherit' },
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