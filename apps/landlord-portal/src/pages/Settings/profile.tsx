import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { DynamicAvatar } from '@klubiq/ui-components';
import { Upload } from '@mui/icons-material';

export const Profile = () => {
	const { user } = useSelector(getAuthState);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	console.log(user);
	return (
		<Box sx={{ width: '100%', height: '100%', px: isMobile ? 2 : 7, py: 2 }}>
			<Stack
				direction='column'
				gap={3}
				alignItems='flex-start'
				justifyContent='space-between'
			>
				<Typography variant='h3'>Profile</Typography>
				<Typography variant='body1'>
					Update your personal information and profile picture
				</Typography>
				<Stack
					direction='row'
					gap={3}
					alignItems={isMobile ? 'flex-start' : 'center'}
					justifyContent={isMobile ? 'center' : 'flex-start'}
				>
					<DynamicAvatar
						items={[
							{
								image: user?.profilePicUrl,
								name: user?.firstName + ' ' + user?.lastName,
								label: user?.email,
								variant: 'circle',
								background: 'dark',
							},
						]}
                        showName={false}
						size='large'
					/>
					<Stack
						direction='column'
						// spacing={1}
                        gap={1}
						alignItems='flex-start'
						justifyContent='flex-start'
					>
						<Typography variant='h6'>Profile Photo</Typography>
						<Typography variant='body1'>Upload a new photo.</Typography>

                        
						<Stack
							direction='row'
							spacing={2}
							alignItems='center'
							justifyContent='flex-start'
                            sx={{mt: 2}}
						>
							<Button variant='klubiqOutlinedButton' startIcon={<Upload />}>
								Upload Photo
							</Button>
							<Button variant='klubiqTextButton' color='error'>
								Remove
							</Button>
						</Stack>
					</Stack>
				</Stack>
                <Box>
                    {/* Dynamic Form goes here @Feyi */}
                </Box>
			</Stack>
		</Box>
	);
};

export default Profile;
