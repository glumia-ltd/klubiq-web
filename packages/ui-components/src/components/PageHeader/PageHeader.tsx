import { Box, Stack, Typography, useTheme, Theme, SxProps } from '@mui/material';
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