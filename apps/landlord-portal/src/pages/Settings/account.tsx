/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import {
	FormFieldV1,
	DynamicTanstackFormProps,
	KlubiqFormV1,
} from '@klubiq/ui-components';
import { z } from 'zod';
import countries from '../../helpers/countries-meta.json';
import { filter, orderBy } from 'lodash';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { useUpdateOrganizationMutation } from '../../store/SettingsPageStore/SettingsApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { screenMessages } from '../../helpers/screen-messages';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { dateFormatOptions, timeFormatOptions } from '../../helpers/utils';
export const Account = () => {
	const theme = useTheme();
	const { user } = useSelector(getAuthState);
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [updateCompany] = useUpdateOrganizationMutation()
	const dispatch = useDispatch();
	const isGloballyAvailable =
		import.meta.env.VITE_IS_GLOBALLY_AVAILABLE?.toLowerCase() === 'true';

	type CountryType = {
		name: string;
		code: string;
		dialCode: string;
		currency: string;
		currencySymbol: string;
		language: string;
	};
	type LanguageOption = {
		value: string;
		label: string;
	};
	const activeCountries: CountryType[] = orderBy(
		filter(countries, ['active', true]),
		'priority',
		'asc',
	) as CountryType[];
	const currencyOptions = activeCountries.map((country) => ({
		value: country.currency,
		label: `${country.currency} - ${country.name} (${country.currencySymbol})`,
	}));
	const languageOptions: LanguageOption[] = Array.from(
		new Set(activeCountries.map((c) => c.language))
	).map((lang) => ({
		value: lang,
		label: lang.toUpperCase(), // or use Intl.DisplayNames for full names
	}));
	interface InitialFormValues {
		name: string;
		addressLine2: string;
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
		name: user?.organization ?? '',
		addressLine2: user?.organizationAddressLine2 ?? '',
		phoneNumber: user?.organizationPhone ?? '',
		companyLogo: user?.organizationLogoUrl ?? '',
		timeFormat: user?.organizationSettings?.settings?.timeFormat ?? '24H',
		dateFormat: user?.organizationSettings?.settings?.dateFormat ?? 'DD/MM/YYYY',
		timeZone: user?.organizationSettings?.settings?.timeZone ?? 'Africa/Lagos',
		currency: user?.organizationSettings?.settings?.currency ?? 'NGN',
		country: user?.country ?? '',
		language: user?.organizationSettings?.settings?.language ?? 'en',
	};

	const onSubmit = async (values: any) => {
		if (!user?.uuid || !user?.organizationUuid) {
			return;
		}
		try {
			const payload = {
				profileUuid: user.uuid,
				uuid: user.organizationUuid,
				body: {
					name: values.name ?? '',
					addressLine2: values.addressLine2 ?? '',
					phoneNumber: values.phoneNumber ?? '',
					country: values.country ?? '',
				},
			};
			await updateCompany(payload).unwrap();
			dispatch(
				openSnackbar({
					message: screenMessages.settings.companyUpdate.success,
					severity: 'success',
					isOpen: true,
					duration: 2000,
				}),
			);
		} catch (error) {
			dispatch(
				openSnackbar({
					message: `There was an error updating the profile.\n${screenMessages.settings.companyUpdate.error}`,
					severity: 'error',
					isOpen: true,
					duration: 7000,
				}),
			);
		}
	};
	const accountFormFields: FormFieldV1[] = [
		{
			name: 'name',
			label: 'Company Name',
			type: 'text',
			width: isMobile ? '100%' : '100%',
		},
		{
			name: 'addressLine2',
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
			type: "text",
			customComponent: (
				<Typography variant='h4'>Localization</Typography>

			),
		},
		{
			name: 'language',
			label: 'Language',
			type: 'select',
			radioGroupDirection: 'row',
			options: languageOptions
		},


		{
			name: 'country',
			label: 'Country/Region',
			type: 'select',
			placeholder: 'Select your country',
			width: '100%',
			hidden: !isGloballyAvailable,
			options: activeCountries?.map((country) => ({
				value: country.code,
				label: country.name,
			})),

		}, {
			name: 'currency',
			label: 'Currency',
			type: 'select',
			radioGroupDirection: 'row',
			options: currencyOptions,

		}, {
			name: 'timeZone',
			label: 'Time Zone',
			type: 'select',
			options: [
				{ value: 'Africa/Lagos', label: 'WAT (West Africa Time)' },
			],
		}, {
			name: "dateFormat",
			label: "Date Format",
			type: "select",
			options: dateFormatOptions,
		}, {
			name: 'timeFormat',
			label: 'Time Format',
			type: 'select',
			options: timeFormatOptions,

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

			</Stack>
		</Box>
	);
};

export default Account;
