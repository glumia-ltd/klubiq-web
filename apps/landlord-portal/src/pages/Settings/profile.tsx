/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import {
	FormFieldV1,
	DynamicTanstackFormProps,
	KlubiqFormV1,
} from '@klubiq/ui-components';
import { z } from 'zod';
import { useUpdateProfileMutation } from '../../store/SettingsPageStore/SettingsApiSlice';
import { useDispatch } from 'react-redux';
import { screenMessages } from '../../helpers/screen-messages';
import { useUploadImagesMutation } from '../../store/GlobalStore/globalApiSlice';

export const Profile = () => {
	const { user } = useSelector(getAuthState);
	const theme = useTheme();
	const dispatch = useDispatch();
	const [updateProfile] = useUpdateProfileMutation();
	const [uploadImages] = useUploadImagesMutation();

	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	interface InitialFormValues {
		firstName: string;
		lastName: string;
		addressLine2: string;
		email: string;
		phoneNumber: string;
	}
	const initialValues: InitialFormValues = {
		firstName: user?.firstName,
		lastName: user?.lastName,
		addressLine2: user?.addressLine2 || '',
		email: user?.email,
		phoneNumber: user?.phoneNumber,
	};
	const onSubmit = async (values: any) => {
		if (!user?.profileUuid) return;

		try {
			const payload = {
				profileId: String(user.profileUuid),
				body: {
					firstName: values.firstName,
					lastName: values.lastName,
					phoneNumber: values.phoneNumber,
					addressLine2: values.addressLine2,
					profilePicUrl: '',
				},
			};
			await updateProfile(payload).unwrap();

			dispatch(
				openSnackbar({
					message: screenMessages.settings.profileUpdate.success,
					severity: 'success',
					isOpen: true,
					duration: 2000,
				}),
			);
		} catch (error) {
			dispatch(
				openSnackbar({
					message: `There was an error updating the profile.\n${screenMessages.settings.profileUpdate.error}`,
					severity: 'error',
					isOpen: true,
					duration: 7000,
				}),
			);
		}
	};

	const profileFormFields: FormFieldV1[] = [
		{
			name: 'firstName',
			label: 'First Name',
			type: 'text',
			width: isMobile ? '100%' : '100%',
		},
		{
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
			width: isMobile ? '100%' : '100%',
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			width: isMobile ? '100%' : '100%',
			validation: {
				schema: z
					.string({ message: 'Email is required' })
					.email('Please enter a valid email address')
					.min(1, { message: 'Email is required' }),
			},
		},

		{
			name: 'phoneNumber',
			label: 'Phone Number',
			type: 'text',
			width: isMobile ? '100%' : '100%',
			validation: {
				schema: z
					.string()
					.refine(
						(value) => {
							if (value.length === 0) {
								return true;
							}
							return value.match(/^[0-9]+$/);
						},
						{
							message: 'Invalid phone number',
						},
					)
					.optional()
					.nullable(),
			},
		},
		{
			name: 'addressLine2',
			label: 'Address',
			type: 'text',
			width: isMobile ? '100%' : '100%',
		},
	];

	const profileFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Save Changes',
		fields: profileFormFields,
		initialValues,
		isMultiStep: false,
		onSubmit,
		showBackdrop: true,
		backdropText: 'Please wait while we save details...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
		buttonLoadingText: 'Saving changes...'
	};


	const onUpload = async (formData: FormData): Promise<StorageUploadResult[]> => {

		try {
			if (!user?.profileUuid) throw new Error("Profile UUID missing");

			const newForm = new FormData();

			const file = formData.get("file") as File;
			if (!file) throw new Error("No file found in formData");

			newForm.append("files", file);

			newForm.append("profileUuid", user.profileUuid);
			newForm.append("rootFolder", "profile");

			// Call backend
			const results = await uploadImages(newForm).unwrap();
			const result = results?.[0];

			if (!result) throw new Error("No file returned from upload");

			const uploadResult: StorageUploadResult = {
				url: result.secure_url ?? result.url,
			};

			await updateProfile({
				profileId: String(user.profileUuid),
				body: { profilePicUrl: uploadResult.url },
			}).unwrap();

			dispatch(
				openSnackbar({
					message: screenMessages.settings.profileUpdate.success,
					severity: "success",
					isOpen: true,
					duration: 2000,
				})
			);

			return [uploadResult];
		} catch (error) {
			dispatch(
				openSnackbar({
					message: `Profile photo upload failed.\n${screenMessages.settings.profileUpdate.error}`,
					severity: "error",
					isOpen: true,
					duration: 7000,
				})
			);
			return [];
		}
	};

	const onDelete = async (): Promise<boolean> => {
		try {
			await updateProfile({
				profileId: String(user?.profileUuid),
				body: { profilePicUrl: "" },
			}).unwrap();

			dispatch(
				openSnackbar({
					message: "Profile photo removed successfully",
					severity: "success",
					isOpen: true,
					duration: 2000,
				})
			);

			return true;
		} catch (error) {

			dispatch(
				openSnackbar({
					message: "Failed to remove profile photo",
					severity: "error",
					isOpen: true,
					duration: 7000,
				})
			);

			return false;
		}
	};

	const fileUploadConfig = {
		accept: "image/*",
		variant: "button" as const,
		uploadContext: "profile" as const,
		subtitle: "Upload Profile Photo",
		caption: "Drag & Drop or Browse to Upload",
		maxSize: 2 * 1024 * 1024,
		multiple: false,
		onUpload,
		onDelete,
		value: null,
		autoUploadOnSelect: true,
		uploadButtonText: "Upload Photo",
		helperText: "Upload a new profile photo.",
		uploadButtonVariant: "klubiqOutlinedButton" as const,

		onChange: async (files: FileList | null) => {
			if (files && files.length > 0) {
				const file = files[0];
				if (file) {
					const formData = new FormData();
					formData.append("file", file);
					await onUpload(formData);
				}
			}
		},

		onBlur: () => { },
	};


	return (
		<Box sx={{ width: '100%', height: '100%', px: isMobile ? 2 : 7, py: 2 }}>
			<Stack
				direction='column'
				gap={2}
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
								name: user?.firstName + " " + user?.lastName,
								label: user?.email,
								variant: "circle",
								background: "dark",
							},
						]}
						showName={false}
						size="large"
					/>


					<Stack
						direction='column'
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
							<Button
								variant="klubiqTextButton"
								color="error"
								onClick={async () => {
									await fileUploadConfig.onDelete?.();
								}}
							>								Remove
							</Button>
						</Stack>
					</Stack>
				</Stack>
				<KlubiqFormV1 {...profileFormConfig} />
			</Stack>
		</Box>
	);
};

export default Profile;