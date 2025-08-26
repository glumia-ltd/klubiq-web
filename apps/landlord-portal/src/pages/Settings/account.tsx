import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import {
	FormFieldV1,
	DynamicTanstackFormProps,
	KlubiqFormV1,
} from '@klubiq/ui-components';
import { z } from 'zod';
export const Account = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	interface InitialFormValues {

		companyName: string;
		companyAddress: string;
		phoneNumber: string;
		companyLogo: string;
		language: string;
		country: string;
		currency: string;
		timeZone: string;
		dateFormat: string;
		timeFormat: string;


	}
	const initialValues: InitialFormValues = {

		companyName: '',
		companyAddress: '',
		phoneNumber: '',
		companyLogo: '',
		timeFormat: '',
		dateFormat: '',
		timeZone: '',
		currency: '',
		country: '',
		language: '',

	};
	const onSubmit = async (values: InitialFormValues) => {
		console.log('Form submitted with values:', values);
	}
	const accountFormFields: FormFieldV1[] = [
		{
			name: 'companyName',
			label: 'Company Name',
			type: 'text',
			width: isMobile ? '100%' : '100%',
		},
		{
			name: 'companyAddress',
			label: 'Company Address',
			type: 'text',
			width: isMobile ? '100%' : '100%',
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
			name: "companyLogo",
			label: "Company Logo",
			type: "file",

		},
		{
			name: "",
			label: "",
			type: "text", // still needs a type, but ignored
			customComponent: (
				<Typography variant='h4'>Localization</Typography>

			),
		},
		{
			name: 'language',
			label: 'Language',
			type: 'select',
			radioGroupDirection: 'row',
			options: [
				{ value: 'individual', label: 'Individual' },
				{ value: 'company', label: 'Company' },

			],
		},


		{
			name: 'country',
			label: 'Country/Region',
			type: 'select',
			radioGroupDirection: 'row',
			options: [
				{ value: 'individual', label: 'Individual' },
				{ value: 'company', label: 'Company' },

			],
		}, {
			name: 'currency',
			label: 'Currency',
			type: 'select',
			radioGroupDirection: 'row',
			options: [
				{ value: 'individual', label: 'Individual' },
				{ value: 'company', label: 'Company' },

			],
		}, {
			name: 'timeZone',
			label: 'Time Zone',
			type: 'select',
			radioGroupDirection: 'row',
			options: [
				{ value: 'individual', label: 'Individual' },
				{ value: 'company', label: 'Company' },

			],
		}, {
			name: 'dateFormat',
			label: 'Date Format',
			type: 'text'

		}, {
			name: 'timeFormat',
			label: 'Time Format',
			type: 'text',

		},
	];

	const accountFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Save Changes',
		fields: accountFormFields,
		header: <Typography variant='h4'>Company Information</Typography>,
		initialValues,
		isMultiStep: false,
		onSubmit,
		showBackdrop: true,
		backdropText: 'Please wait while we save details...',
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
				<Typography variant='h5'>Account</Typography>
				<Typography variant='body1'>
					Mange you company details and configure localization settings
				</Typography>
				<KlubiqFormV1 {...accountFormConfig} />

				{/* Dynamic Form goes here @Feyi */}
			</Stack>
		</Box>
	);
};

export default Account;
