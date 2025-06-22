import React from 'react';
import { Card, CardContent, Typography, Stack, Box, IconButton, useTheme } from '@mui/material';
import { DocumentListProps } from './types';
import { Download } from '@mui/icons-material';

export const DocumentList: React.FC<DocumentListProps> = ({ title, items, elevation = 0 }) => {
  const theme = useTheme();

  return (
    <Card elevation={elevation} sx={{ borderRadius: 2, ...(elevation === 0 && {backgroundColor: theme.palette.background.default}) }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {title}
        </Typography>
        <Stack spacing={2}>
          {items.map((item) => (
            <Card key={item.id} elevation={0} sx={{ borderRadius: 2, p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        {item.icon && <Box sx={{ color: 'primary.main', display: 'flex' }}>{item.icon}</Box>}
                        <Box>
                            <Typography variant="body1" fontWeight={600}>
                                {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Added on {item.addedDate}
                            </Typography>
                        </Box>
                    </Stack>
                    <IconButton onClick={item.onDownload}>
                        <Download />
                    </IconButton>
                </Stack>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}; 