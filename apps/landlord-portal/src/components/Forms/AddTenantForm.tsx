import FormLayout from '../../Layouts/FormLayout';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
	FormFieldV1,
	DynamicTanstackFormProps,
	KlubiqFormV1,
} from '@klubiq/ui-components';

import { useAddNewTenantWithoutLeaseMutation } from '../../store/TenantStore/tenantApiSlice';
import { useAddNewTenantToLeaseMutation } from '../../store/LeaseStore/leaseApiSlice';
import { PERSON_TITLES } from '../../helpers/constants';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { screenMessages } from '../../helpers/screen-messages';

interface AddTenantFormProps {
	leaseAndUnitDetails: {
		leaseId: string;
		unitId: string;
		unitNumber: string;
		propertyId: string;
		propertyName: string;
	};
	returnPath: string;
	formHeader?: string;
	rentAmountPortion?: boolean;
}
interface InitialFormValues {
	tenantType: string;
	tenantDetails: {
		title: string;
		firstName: string;
		lastName: string;
		companyName: string;
		email: string;
		phoneNumber: string;
	};
	notes: string;
	leaseId: string;
	unitId: string;
	unitNumber: string;
}

const AddTenantForm = ({
	leaseAndUnitDetails,
	returnPath,
}: AddTenantFormProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [addNewTenantWithoutLease] = useAddNewTenantWithoutLeaseMutation();

	const [addNewTenantToLease] = useAddNewTenantToLeaseMutation();

	// Initialize form values
	const leaseUnitDetails = useMemo(() => {
		return {
			leaseId: leaseAndUnitDetails?.leaseId,
			unitId: leaseAndUnitDetails?.unitId,
			unitNumber: leaseAndUnitDetails?.unitNumber,
		};
	}, [leaseAndUnitDetails]);

	// Form submission handler
	const onSubmit = async (values: InitialFormValues) => {
		try {
			const { tenantType, tenantDetails, notes, leaseId } = values;
			const { title, firstName, lastName, companyName, email, phoneNumber } =
				tenantDetails;

			// Create base request data based on tenant type
			const baseRequestData =
				tenantType === 'company'
					? { companyName, email, phoneNumber }
					: { title, firstName, lastName, email, phoneNumber };

			// Add optional fields if they exist
			const requestData = {
				...baseRequestData,
				...(notes && { notes }),
			};

			// Make API call based on lease details
			const apiCall = leaseId
				? addNewTenantToLease({ leaseId: leaseId || '', body: requestData })
				: addNewTenantWithoutLease(requestData);
			await apiCall.unwrap();
			dispatch(
				openSnackbar({
					message: screenMessages.tenant.add.success,
					severity: 'success',
					isOpen: true,
					duration: 5000,
				}),
			);
			if (returnPath) {
				navigate(returnPath);
			}
		} catch (error) {
			const errorMessage = (error as any)?.message;
			dispatch(
				openSnackbar({
					message: errorMessage,
					severity: 'error',
					isOpen: true,
					duration: 7000,
				}),
			);
			throw error;
		}
	};
	const initialValues: InitialFormValues = {
		tenantType: '',
		tenantDetails: {
			title: '',
			firstName: '',
			lastName: '',
			companyName: '',
			email: '',
			phoneNumber: '',
		},
		notes: '',
		leaseId: leaseUnitDetails?.leaseId,
		unitId: leaseUnitDetails?.unitId,
		unitNumber: leaseUnitDetails?.unitNumber,
	};

	// Form field definitions
	const tenantFormFields: FormFieldV1[] = [
		{
			name: 'subHeader',
			label: '',
			type: 'custom',
			component: (
				<Typography variant='subtitle2'>
					{leaseAndUnitDetails
						? `Add a new tenant to ${leaseAndUnitDetails.propertyName}-${leaseAndUnitDetails.unitNumber}. Lease ID: ${leaseAndUnitDetails.leaseId}`
						: "Add a new tenant to your organization's tenant list"}
				</Typography>
			),
		},
		{
			name: 'tenantType',
			label: 'Tenant Type',
			type: 'radio',
			required: true,
			radioGroupDirection: 'row',
			validation: {
				schema: z
					.string({ message: 'Tenant type is required' })
					.min(1, { message: 'Tenant type is required' }),
			},
			options: [
				{ value: 'individual', label: 'Individual' },
				{ value: 'company', label: 'Company' },
			],
		},
		{
			name: 'tenantDetails',
			label: '',
			type: 'group',
			layout: isMobile ? 'column' : 'row',
			groupFields: [
				{
					name: 'title',
					label: 'Title',
					type: 'select',
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
					placeholder: "Enter tenant's phone number",
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
			name: 'notes',
			label: 'Notes',
			type: 'textarea',
			rows: 3,
			required: false,
			placeholder: 'Enter any additional notes about the tenant',
		},
		{
			name: 'leaseId',
			label: '',
			type: 'hidden',
			hidden: true,
			defaultValue: leaseUnitDetails?.leaseId,
			predefinedValue: leaseUnitDetails?.leaseId,
		},
	];

	const addTenantFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Add Tenant',
		enableReset: true,
		resetButtonText: 'Cancel',
		fields: tenantFormFields,
		initialValues,
		isMultiStep: false,
		onSubmit,
		showBackdrop: true,
		backdropText: 'Please wait while we add your tenant...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
	};

	return (
		<FormLayout Header={'Add Tenant'}>
			<Box sx={{ width: '100%', p: 2 }}>
				<KlubiqFormV1 {...addTenantFormConfig} />
			</Box>
		</FormLayout>
	);
};

export default AddTenantForm;
