import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';

export const Account = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	return (
		<Box sx={{ width: '100%', height: '100%', px: isMobile ? 2 : 7, py: 2 }}>
			<Stack
				direction='column'
				gap={3}
				alignItems='flex-start'
				justifyContent='space-between'
			>
				<Typography variant='h5'>Account Tab</Typography>
				  {/* Dynamic Form goes here @Feyi */}
			</Stack>
		</Box>
	);
};

export default Account;
