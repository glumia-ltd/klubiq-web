import React from 'react';
import { Box, Paper, Stack, Skeleton, useTheme, useMediaQuery } from '@mui/material';

export const PageDetailSkeleton: React.FC<{ showTabs?: boolean }> = ({ showTabs = true }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper
            elevation={3}
            sx={{
                width: isMobile ? '100%' : 400,
                height: '100vh',
                position: 'fixed',
                right: 0,
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Skeleton variant="circular" width={60} height={60} />
                    <Stack flex={1} spacing={0.5}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="70%" />
                    </Stack>
                    <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: '16px' }}/>
                </Stack>
            </Box>

            {showTabs && (
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Stack direction="row" justifyContent="space-around" sx={{p: 1}}>
                        <Skeleton variant="text" width="40%" height={30} />
                        <Skeleton variant="text" width="40%" height={30} />
                    </Stack>
                </Box>
            )}

            <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
                <Stack spacing={2}>
                    <Skeleton variant="rounded" height={150} />
                    <Skeleton variant="rounded" height={150} />
                    <Skeleton variant="rounded" height={200} />
                </Stack>
            </Box>
        </Paper>
    );
}; 