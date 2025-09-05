import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import {
	DynamicAvatar,
	FileUpload,
	StorageUploadResult,
} from '@klubiq/ui-components';

export const Profile = () => {
	const { user } = useSelector(getAuthState);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	console.log(user);
	const onUploadProfile = (formData: FormData) => {
		console.log(formData);
		return Promise.resolve({} as StorageUploadResult);
	};
	const fileUploadConfig = {
		accept: 'image/*',
		variant: 'button' as const,
		uploadContext: 'profile' as const,
		maxSize: 2 * 1024 * 1024, // 2MB
		multiple: false,
		onUploadProfile: onUploadProfile,
		value: user?.profilePicUrl,
		onChange: (value: FileList | null) => {
			console.log(value);
		},
		onBlur: () => {
			console.log('blur');
		},
		autoUploadOnSelect: true,
		uploadButtonText: 'Upload Profile Photo',
		helperText: 'Upload a new profile photo.',
		uploadButtonVariant: 'klubiqOutlinedButton' as const,
	};
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
							sx={{ mt: 2 }}
						>
							<FileUpload {...fileUploadConfig} />
							<Button variant='klubiqTextButton' color='error'>
								Remove
							</Button>
						</Stack>
					</Stack>
				</Stack>
				<Box>{/* Dynamic Form goes here @Feyi */}</Box>
			</Stack>
		</Box>
	);
};

export default Profile;
