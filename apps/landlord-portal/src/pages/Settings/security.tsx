import { Card, Switch, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import {
	FormFieldV1,
	DynamicTanstackFormProps,
	KlubiqFormV1,
} from '@klubiq/ui-components';
import { z } from 'zod';


export const Security = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	interface InitialFormValues {

		currentPassword: string;
		newPassword: string;
		confirmNewPassword: string;


	}
	const initialValues: InitialFormValues = {

		currentPassword: "",
		confirmNewPassword: "",
		newPassword: "",

	};
	const onSubmit = async (_values: InitialFormValues) => {
	}
	const securityFormFields: FormFieldV1[] = [
		{
			name: 'currentPassword',
			label: 'Current Password',
			type: 'password',
			width: isMobile ? '100%' : '100%',
			// required: true,
		},
		{
			name: 'newPassword',
			label: 'New Password',
			type: 'password',
			width: isMobile ? '100%' : '100%',
			// required: true,
			validation: {
				schema: z.string().min(8, 'Password must be at least 8 characters long'),
			},
		},
		{
			name: 'confirmNewPassword',
			label: 'Confirm New Password',
			type: 'password',
			width: isMobile ? '100%' : '100%',
			// required: true,
			validation: {
				schema: z.string().min(8, 'Password must be at least 8 characters long'),
			},
		},
	];

	const securityFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Update Password',
		fields: securityFormFields,
		initialValues,
		isMultiStep: false,
		onSubmit,
		header: <Typography variant='h4'>Change Password</Typography>,
		showBackdrop: true,
		backdropText: 'Please wait while we update your password...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
	};

	return (
		<Box sx={{ width: '100%', height: '100%', px: isMobile ? 2 : 7, py: 2 }}>
			<Stack
				direction='column'
				gap={2}
				alignItems='flex-start'
				justifyContent='space-between'
			>
				<Typography variant='h5'>Security</Typography>
				<Typography variant='body1'>Keep your accounts secured</Typography>

				<KlubiqFormV1 {...securityFormConfig} />

				{/* <Stack> */}
				<Card sx={{ p: 2, mb: 2, width: '100%' }}>
					<Typography variant='h4'>Two Factor Authentication</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: 2, mt: 2 }}>
						<Box><Typography variant='subtitle1'>Enable 2FA</Typography>
							<Typography>Add an extra layer of security to your account</Typography></Box>
						<Box>
							<Switch size='medium' />
						</Box>
					</Box>
				</Card>
				<Card sx={{ p: 2, mb: 2, width: '100%' }}>
					<Typography variant='h4'>Two Factor Authentication</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: 2, mt: 2 }}>
						<Box><Typography variant='subtitle1'>Desktop Chrome</Typography>
							<Typography sx={{color:"#666666", fontSize:"14px"}} >Lagos, Nigeria - Current Session</Typography></Box>
						<Box textAlign={"right"}>
							<Typography variant='subtitle1'>2hrs ago</Typography>
							<Typography color="#059669">Active</Typography>						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", gap: 2, mt: 2 }}>
						<Box><Typography variant='subtitle1'>Mobile - Safari</Typography>
							<Typography  sx={{color:"#666666", fontSize:"14px"}}>Abuja, Nigeria</Typography></Box>
						<Box textAlign={"right"}>
							<Typography variant='subtitle1'>1 day ago</Typography>
							<Typography color="#059669">Active</Typography>						</Box>
					</Box>
				</Card>
				{/* </Stack> */}
				{/* Dynamic Form goes here @Feyi */}
			</Stack>
		</Box>
	);
};

export default Security;
