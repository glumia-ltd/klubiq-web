import React, { ReactNode } from 'react';
import { Card, Box, Stack, Typography, useTheme, SxProps, Theme, Grid } from '@mui/material';

export interface AmenityItem {
  id: string | number;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  available?: boolean;
  customContent?: ReactNode;
}

export interface AmenityCardProps {
  title?: string | ReactNode;
  items: AmenityItem[];
  spacing?: number;
  sx?: SxProps<Theme>;
}

export const AmenityCard: React.FC<AmenityCardProps> = ({
  title = 'Property Amenities',
  items,
  spacing = 3,
  sx = {},
}) => {
  const theme = useTheme();

  const renderAmenityItem = (item: AmenityItem) => (
    <Card
      key={item.id}
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        borderRadius: 2,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          color: item.available ? theme.palette.success.main : theme.palette.text.secondary,
          mb: 1,
          '& > *': { // Style for icons
            fontSize: '2rem',
          },
        }}
      >
        {item.icon}
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        {item.title}
      </Typography>
      {item.subtitle && (
        <Typography
          variant="body2"
          color={item.available ? "success.main" : "text.secondary"}
          sx={{ mt: 'auto' }}
        >
          {item.subtitle}
        </Typography>
      )}
      {item.customContent && (
        <Box sx={{ mt: 1 }}>
          {item.customContent}
        </Box>
      )}
    </Card>
  );

  return (
    <Card
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        ...sx,
      }}
    >
      {title && typeof title === 'string' ? (
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      ) : (
        <Box sx={{ mb: 3 }}>{title}</Box>
      )}
      <Grid container spacing={spacing}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            {renderAmenityItem(item)}
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}; 