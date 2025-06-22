import React from 'react';
import { Box, Paper, Stack, Skeleton, useTheme, useMediaQuery } from '@mui/material';

export const PageDetailSkeleton: React.FC<{
    showTabs?: boolean;
    displayMode?: 'container' | 'modal';
    position?: 'left' | 'right';
}> = ({ showTabs = true, displayMode = 'modal', position = 'right' }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyles = {
        width: isMobile ? '100%' : 400,
        height: '100vh',
        position: 'fixed',
        top: 0,
        [position]: 0,
        zIndex: theme.zIndex.drawer + 1,
    };

    const containerStyles = {
        width: '100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
    };

    return (
        <Paper
            elevation={displayMode === 'modal' ? 3 : 0}
            sx={{
                ...(displayMode === 'modal' ? modalStyles : containerStyles),
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.background.default,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ height: '100%', overflowY: 'auto', p: 2 }}>
                <Stack spacing={2}>
                    <Skeleton variant="rounded" height={160} />
                    <Skeleton variant="rounded" height={150} />
                    <Skeleton variant="rounded" height={150} />
                    <Skeleton variant="rounded" height={200} />
                </Stack>
            </Box>
        </Paper>
    );
}; 