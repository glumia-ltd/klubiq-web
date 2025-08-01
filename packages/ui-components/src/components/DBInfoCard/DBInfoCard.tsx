import React, { ReactNode } from 'react';
import { Card, Box, Stack, Typography, Chip, useTheme, SxProps, Theme, Skeleton, ChipProps } from '@mui/material';

export type DBInfoCardVariant = 'default' | 'gradient' | 'primary' | 'secondary' | 'custom';

export interface DBInfoCardProps {
  icon?: ReactNode;
  amount: string | number;
  label: string | ReactNode;
  badgeText?: string;
  badgeColor?: string;
  badgeBackground?: string;
  variant?: DBInfoCardVariant;
  backgroundColor?: string;
  children?: ReactNode;
  sx?: SxProps<Theme>;
  /** Show skeletons when loading */
  loading?: boolean;
  badgeIcon?: React.ReactElement;
  caption?: string;
  chipVariant?: 'upTrend' | 'downTrend' | 'neutralTrend';
}

const getCardStyles = (variant: DBInfoCardVariant, theme: Theme, backgroundColor?: string): SxProps<Theme> | any => {
  switch (variant) {
    case 'gradient':
      return {
        background: 'linear-gradient(135deg, #615FFF 0%, #9810FA 100%)',
        color: '#fff',
      };
    case 'primary':
      return {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      };
    case 'secondary':
      return {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      };
    case 'custom':
      return {
        backgroundColor: backgroundColor || theme.palette.background.paper,
        color: theme.palette.getContrastText(backgroundColor || theme.palette.background.paper),
      };
    default:
      return {
        backgroundColor: theme.palette,
        color: theme.palette,
      };
  }
};

export const DBInfoCard: React.FC<DBInfoCardProps> = ({
  icon,
  amount,
  label,
  badgeText,
  badgeColor,
  badgeBackground,
  variant = 'default',
  backgroundColor,
  children,
  sx = {},
  loading = false,
  badgeIcon,
  caption,
  chipVariant,
}) => {
  const theme = useTheme();
  // Merge all styles into a single object
  const cardStyles = {
    borderRadius: 3,
    p: 3,
    minWidth: 0,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 2px 8px 0 rgba(16,30,54,0.04)',
    ...getCardStyles(variant, theme, backgroundColor),
    ...(typeof sx === 'object' ? sx : {}),
  };
  if (loading) {
    return (
      <Card elevation={0} sx={cardStyles}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Skeleton variant="circular" width={44} height={44} />
          <Skeleton variant="rectangular" width={60} height={28} />
        </Stack>
        <Box mt={2} mb={0.5}>
          <Skeleton variant="text" width="50%" height={48} />
        </Box>
        <Skeleton variant="text" width="40%" height={28} />
        <Box mt={2}>
          <Skeleton variant="rectangular" width="100%" height={24} />
        </Box>
      </Card>
    );
  }
  return (
    <Card elevation={0} sx={cardStyles}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        {icon && (
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              background: theme.palette.mode === 'dark' ? theme.palette.background.default : '#fff',
              border: variant === 'default' ? `1px solid ${theme.palette.primary.main}` : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 4px 0 rgba(16,30,54,0.08)',
              mb: 1,
            }}
          >
            {icon}
          </Box>
        )}
        {badgeText && (
          <Chip
            label={badgeText}
            size="small"
            icon={badgeIcon as React.ReactElement}
            variant={chipVariant as ChipProps['variant']}
            sx={{
              background: badgeBackground && '#E6F4EA',
              color: badgeColor && badgeColor,
              fontWeight: 600,
              borderRadius: 2,
              px: 1.5,
              height: 28,
              alignSelf: 'flex-start',
            }}
          />
        )}
      </Stack>
      <Box mt={icon ? 2 : 0} mb={0.5}>
        <Typography
          variant="h4"
          color='inherit'
        >
          {amount}
        </Typography>
      </Box>
     {typeof label === 'string' ? <Typography
        variant="subtitle1"
        sx={{
          color: theme.palette.text.secondary,
          fontWeight: 400,
          fontSize: '1.1rem',
        }}
      >
        {label}
      </Typography> : label}
      {children && <Box mt={2}>{children}</Box>}
      {caption && <Typography variant='caption'>{caption}</Typography>}
    </Card>
  );
};

export default DBInfoCard; 