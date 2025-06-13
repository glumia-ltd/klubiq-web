import FormLayout from '../../Layouts/FormLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrencySymbol } from '../../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import {
	InputAdornment as InputAdornmentType,
	FormFieldV1,
	DynamicTanstackFormProps,
	KlubiqFormV1,
} from '@klubiq/ui-components';
import dayjs from 'dayjs';

// API and Store imports
import { useOnboardTenantMutation } from '../../store/TenantStore/tenantApiSlice';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { PERSON_TITLES } from '../../helpers/constants';
import FormSkeleton from '../skeletons/FormSkeleton';
import { CustomDateField } from '../CustomFormComponents/CustomDateField';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { screenMessages } from '../../helpers/screen-messages';

function renderCustomDateField(
	fieldApi: any,
	fieldConfig: any,
	form: any,
	dependencyField?: string,
) {
	return (
		<CustomDateField
			fieldApi={fieldApi}
			fieldConfig={fieldConfig}
			form={form}
			dependencyField={dependencyField}
		/>
	);
}
interface InitialValues {
	tenantType: string;
	tenantDetails: {
		title: string;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber?: string;
		companyName?: string;
	};
	leaseDetails: {
		name?: string;
		startDate?: string;
		endDate?: string;
		unitId?: string;
		rentAmount?: number | string;
		propertyName?: string;
		unitNumber?: string;
	};
}				

interface InviteTenantFormProps {
	propertyDetails: {
		propertyName: string;
		unitNumber: string;
		unitId: string;
		propertyId: string;
	};
	returnPath: string;
	formHeader?: string;
}

const defaultValues: InitialValues = {
	tenantType: '',
	tenantDetails: {
		title: '',
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		companyName: '',
	},
	leaseDetails: {},
};

const InviteTenantForm = ({
	propertyDetails,
	returnPath,
	formHeader,
}: InviteTenantFormProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const dispatch = useDispatch();
	const isMobileInvitationEnables =
		import.meta.env.VITE_MOBILE_INVITATION_ENABLED.toLowerCase() === 'true';
	const [loading, setLoading] = useState<boolean>(true);
	const [initialValues, setInitialValues] =
		useState<InitialValues>(defaultValues);
	const navigate = useNavigate();
	const [onboardTenant] = useOnboardTenantMutation();
	const { user } = useSelector(getAuthState);


	const onSubmit = async (values: InitialValues) => {
		try {
			const { tenantType, tenantDetails, leaseDetails } = values;
			const { title, firstName, lastName, email, phoneNumber, companyName } = tenantDetails;
			// Create base request data based on tenant type
			const baseRequestData = tenantType === 'company' 
				? { companyName, email, phoneNumber, leaseDetails }
				: { title, firstName, lastName, email, phoneNumber, leaseDetails };
			await onboardTenant({
				propertyId: propertyDetails.propertyId,
				body: baseRequestData,
			}).unwrap();
			dispatch(
				openSnackbar({
					message: screenMessages.tenant.invite.success,
					severity: 'success',
					isOpen: true,
					duration: 5000,
				})
			);
			navigate(returnPath);
		} catch (error) {
			const errorMessage = (error as any)?.message || screenMessages.tenant.invite.error;
			dispatch(
				openSnackbar({
					message: errorMessage,
					severity: 'error',
					isOpen: true,
					duration: 7000,
				})
			);
			throw error;
		}
	};

	useEffect(() => {
		if (propertyDetails) {
			setInitialValues({
				tenantType: '',
				tenantDetails: {
					title: '',
					firstName: '',
					lastName: '',
					email: '',
					phoneNumber: '',
					companyName: '',
				},
				leaseDetails: {
					name: '',
					startDate: '',
					endDate: '',
					unitId: propertyDetails?.unitId,
					rentAmount: '',
					propertyName: propertyDetails?.propertyName,
					unitNumber: propertyDetails?.unitNumber,
				},
			});
			setLoading(false);
		}
	}, [propertyDetails]);

	const inviteMethodFields: FormFieldV1 = {
		name: 'invitationMethod',
		label: 'Send the tenant an invite by',
		type: 'radio',
		radioGroupDirection: 'row',
		required: true,
		options: [
			{ value: 'email', label: 'Email' },
			{ value: 'text', label: 'Text' },
		],
		validation: {
			schema: z.string({ message: 'Required' }).min(1, { message: 'Required' }),
		},
	};

	const tenantFormFields: FormFieldV1[] = [
		{
			name: 'tenantType',
			label: 'Tenant Type',
			type: 'radio',
			required: true,
			radioGroupDirection: 'row',
			options: [
				{ value: 'individual', label: 'Individual' },
				{ value: 'company', label: 'Company' },
				
			],
		},
		{
			name: 'tenantDetails',
			label: 'Tenant Details',
			type: 'group',
			layout: isMobile ? 'column' : 'row',
			groupFields: [
				{
					name: 'title',
					label: 'Title',
					type: 'select',
					showIf: (values) => values.tenantType === 'individual',
					options: PERSON_TITLES.map((title) => ({
						value: title,
						label: title,
					})),
				},
				{
					name: 'firstName',
					label: 'First Name',
					type: 'text',
					width: isMobile ? '100%' : '48%',
					required: (values) => values.tenantType === 'individual',
					placeholder: "Enter tenant's first name",
					showIf: (values) => values.tenantType === 'individual',
				},
				{
					name: 'lastName',
					label: 'Last Name',
					type: 'text',
					width: isMobile ? '100%' : '48%',
					required: (values) => values.tenantType === 'individual',
					placeholder: "Enter tenant's last name",
					showIf: (values) => values.tenantType === 'individual',
				},

				{
					name: 'email',
					label: 'Email',
					type: 'email',
					required: true,
					width: isMobile ? '100%' : '48%',
					placeholder: "Enter tenant's email",
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
					width: isMobile ? '100%' : '48%',
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
					name: 'companyName',
					label: 'Company Name',
					type: 'text',
					placeholder: "Enter company's name",
					required: (values) => values.tenantType === 'company',
					showIf: (values) => values.tenantType === 'company',
				},
			],
		},
		{
			name: 'leaseDetails',
			label: 'Lease Details',
			type: 'group',
			layout: isMobile ? 'column' : 'row',
			groupFields: [
				{
					name: 'propertyName',
					label: 'Property Name',
					type: 'text',
					readonly: true,
					disabled: true,
					predefinedValue: propertyDetails?.propertyName,
					defaultValue: propertyDetails?.propertyName,
				},
				{
					name: 'unitNumber',
					label: 'Unit',
					type: 'text',
					readonly: true,
					disabled: true,
					predefinedValue: propertyDetails?.unitNumber,
					defaultValue: propertyDetails?.unitNumber,
				},
				{
					name: 'unitId',
					label: 'Unit Id',
					type: 'hidden',
					hidden: true,
					predefinedValue: propertyDetails?.unitId,
					defaultValue: propertyDetails?.unitId,
				},
				{
					name: 'startDate',
					label: 'Start Date',
					type: 'date',
					required: true,
					width: isMobile ? '100%' : '48%',
					customComponent: (fieldApi, fieldConfig, form) =>
						renderCustomDateField(
							fieldApi,
							fieldConfig,
							form,
							'leaseDetails.endDate',
						),
					validation: {
						schema: z.any().refine((val) => {
							if (!val) {
								return false;
							}
							const date = dayjs(val);
							return date.isValid();
						}, 'Lease start date is required'),
						dependencies: [
							{
								field: 'leaseDetails.endDate',
								type: 'max',
								message: 'Lease start date must be before end date',
							},
						],
					},
				},
				{
					name: 'endDate',
					label: 'End Date',
					type: 'date',
					required: true,
					width: isMobile ? '100%' : '48%',
					customComponent: (fieldApi, fieldConfig, form) =>
						renderCustomDateField(
							fieldApi,
							fieldConfig,
							form,
							'leaseDetails.startDate',
						),
					validation: {
						schema: z.any().refine((val) => {
							if (!val) {
								return false;
							}
							const date = dayjs(val);
							return date.isValid();
						}, 'Lease end date is required'),
						dependencies: [
							{
								field: 'leaseDetails.startDate',
								type: 'min',
								message: 'Lease end date must be after start date',
							},
						],
					},
				},
				{
					name: 'rentAmount',
					type: 'decimal',
					label: 'Rent',
					width: isMobile ? '100%' : '48%',
					formatType: 'decimal',
					required: true,
					decimals: 2,
					adornment: {
						prefix: getCurrencySymbol(user?.orgSettings),
					} as InputAdornmentType,
					validation: {
						schema: z.string().min(1, { message: 'Rent is required' }),
					},
				},
			],
		},
	];

	if (isMobileInvitationEnables) {
		tenantFormFields.push(inviteMethodFields);
	}
	const inviteTenantFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Invite Tenant',
		subHeader: 'We\'ll invite the tenant to setup their tenant account so they can pay their rent.',
		enableReset: true,
		resetButtonText: 'Cancel',
		fields: tenantFormFields,
		initialValues,
		isMultiStep: false,
		onSubmit,
		showBackdrop: true,
		backdropText: 'Inviting the tenant...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
		// nextAction: {
		// 	title: 'Lease Created',
		// 	description: 'Your new lease was created successfully and ready for use',
		// 	closeIcon: <Close />,
		// 	onClose: handleAllLeasesClick,
		// 	buttons: [
		// 		{
		// 			text: 'View Lease Details',
		// 			onClick: handleViewLeaseClick,
		// 			variant: 'klubiqOutlinedButton',
		// 			autoFocus: true,
		// 		},
		// 		{
		// 			text: 'View Tenants',
		// 			onClick: handleViewTenantsClick,
		// 			variant: 'klubiqMainButton',
		// 			autoFocus: false,
		// 		},
		// 	],
		// 	maxWidth: 'md',
		// 	fullWidth: true,
		// 	showAfterSubmit: true,
		// },
	};

	return (
		<FormLayout Header={formHeader || 'Add Tenant'}>
			{loading ? (
				<FormSkeleton rows={tenantFormFields.length} columns={[1, 1, 1]} sx={{ width: '100%', p: 2 }} />
			) : (
				// <KlubiqForm
				// 	fields={tenantFormFields as FormField[]}
				// 	onSubmit={onSubmit}
				// 	initialValues={initialValues}
				// 	enableReset={true}
				// 	submitButtonText='Invite Tenant'
				// 	resetButtonText='Cancel'
				// />
				<Box sx={{ width: '100%', p: 2 }}>
					<KlubiqFormV1 {...inviteTenantFormConfig} />
				</Box>
			)}
		</FormLayout>
	);
};

export default InviteTenantForm;
