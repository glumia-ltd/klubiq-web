import FormLayout from '../../Layouts/FormLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrencySymbol } from '../../helpers/utils';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { getErrorResponseMessage } from '../../helpers/getErrorResponseMessage';
import { useDispatch } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import { consoleLog } from '../../helpers/debug-logger';
import * as Yup from 'yup';
import { useOnboardTenantMutation } from '../../store/TenantStore/tenantApiSlice';
import { InviteTenantFormValues } from '../../shared/type';
import {
	KlubiqForm,
	FormField,
	FormGroup,
	InputAdornment,
} from '@klubiq/ui-components';
import dayjs from 'dayjs';
import FormSkeleton from '../skeletons/FormSkeleton';

interface InviteTenantFormProps {
	propertyDetails: {
		propertyName: string;
		unitNumber: string;
		unitId: string;
	};
	returnPath: string;
	formHeader?: string;
}
const defaultValues: InviteTenantFormValues = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	leaseDetails: {},
};
const InviteTenantForm = ({
	propertyDetails,
	returnPath,
	formHeader,
}: InviteTenantFormProps) => {
	const isMobileInvitationEnables =
		import.meta.env.VITE_MOBILE_INVITATION_ENABLED.toLowerCase() === 'true';
	const [loading, setLoading] = useState<boolean>(true);
	const [initialValues, setInitialValues] = useState<InviteTenantFormValues>(defaultValues);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [onboardTenant] = useOnboardTenantMutation();
	const { orgSettings } = useSelector(getAuthState);
	const validateLeaseDates = (startDate: string, endDate: string) => {
		if (dayjs(startDate).isAfter(dayjs(endDate))) {
			return 'End date must be after start date';
		}
		return true;
	};

	const onSubmit = async (values: InviteTenantFormValues) => {
		try {
			if(values.leaseDetails.endDate && values.leaseDetails.startDate) {
				const isValid = validateLeaseDates(values.leaseDetails.startDate, values.leaseDetails.endDate);
				if(!isValid) {
					dispatch(openSnackbar({message: 'End date must be after start date', severity: 'error', isOpen: true}));
					return;
				}
			}
			const response = await onboardTenant(values).unwrap();
			consoleLog('response', response);
			if(response.success) {
				dispatch(
					openSnackbar({
						message: 'Tenant successfully added',
						severity: 'success',
						isOpen: true,
						duration: 2000,
					}),
				);
				navigate(returnPath);
			} else {
				dispatch(
					openSnackbar({
						message: response.message,
						severity: 'error',
						isOpen: true,
					}),
				);
			}
		} catch (error) {
			dispatch(
				openSnackbar({
					message: getErrorResponseMessage({
						response: (error as any)?.response,
						message: (error as any)?.message,
					}),
					severity: 'error',
					isOpen: true,
				}),
			);
		}
	};
	useEffect(() => {
		consoleLog('orgSettings', orgSettings);
		if (propertyDetails) {
			setInitialValues({
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
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
	}, []); // Empty dependency array means this runs once on mount

	const inviteMethodFields: FormField = {
		name: 'invitationMethod',
		label: 'Invite Tenant by',
		type: 'radio',
		radioGroupDirection: 'row',
		required: true,
		options: [
			{ value: 'email', label: 'Email' },
			{ value: 'text', label: 'Text' },
		],
		validation: Yup.string().required('Required'),
	};
	const leaseDetailsFields: FormGroup = {
		name: 'leaseDetails',
		columns: 1,
		fields: [
			{
				name: 'leaseDetails.propertyName',
				label: 'Property Name',
				type: 'text',
				readonly: true,
				disabled: true,
				predefinedValue: propertyDetails?.propertyName,
				defaultValue: propertyDetails?.propertyName,
			},
			{
				name: 'leaseDetails.unitNumber',
				label: 'Unit',
				type: 'text',
				readonly: true,
				disabled: true,
				predefinedValue: propertyDetails?.unitNumber,
				defaultValue: propertyDetails?.unitNumber,
			},
			{
				name: 'leaseDetails.unitId',
				label: 'Unit Id',
				type: 'hidden',
				hidden: true,
				predefinedValue: propertyDetails?.unitId,
				defaultValue: propertyDetails?.unitId,
			},
			{
				name: 'leaseDetails.startDate',
				label: 'Start Date',
				type: 'date',
				required: true,
				validation: Yup.date()
				.transform((value) => (dayjs(value).toDate()))
				.required('Start Date is required')
			},
			{
				name: 'leaseDetails.endDate',
				label: 'End Date',
				type: 'date',
				required: false,
				minDate: 'startDate',
				dependsOn: [
					{
						field: 'startDate',
						value: 'startDate',
					}
				],
				validation: Yup.date()
					.transform((value) => (dayjs(value).toDate()))
					.min(
						Yup.ref('leaseDetails.startDate'),
						'End date must be after start date',
					)
					.test(
						'date-comparison',
						'End date must be after start date',
						function (value) {
							const { startDate } = this.parent;
            				if (!value || !startDate) {
                 				return true;
                			}
            				return dayjs(value).isAfter(dayjs(startDate));
						},
					)
			},
			{
				name: 'leaseDetails.rentAmount',
				label: 'Rent Amount',
				type: 'decimal',
				formatType: 'decimal',
				decimals: 2,
				adornment: {
					prefix: getCurrencySymbol(orgSettings),
				} as InputAdornment,
				required: true,
				validation: Yup.string()
				.required('Rent Amount is required'),
			},
		],
	};
	const tenantFormFields: (FormField | FormGroup)[] = [
		{
			name: 'firstName',
			label: 'First Name',
			type: 'text',
			required: true,
			validation: Yup.string()
				.min(2, 'Too Short!')
				.max(50, 'Too Long!')
				.required('First Name is required'),
		},
		{
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
			required: true,
			validation: Yup.string()
				.min(2, 'Too Short!')
				.max(50, 'Too Long!')
				.required('Last Name is required'),
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			required: true,
			validation: Yup.string()
				.email('Invalid email')
				.required('Email is required'),
		},
		{
			name: 'phoneNumber',
			label: 'Phone Number',
			type: 'text',
			required: false,
			validation: Yup.string().matches(/^[0-9]+$/, 'Invalid phone number'),
		},
		leaseDetailsFields,
	];
	if (isMobileInvitationEnables) {
		tenantFormFields.push(inviteMethodFields);
	}
	consoleLog('tenantFormFields', tenantFormFields);

	return (
		<FormLayout Header={formHeader || 'Add Tenant'}>
			{loading ? (
				<FormSkeleton rows={tenantFormFields.length} columns={[1, 1, 1]} />
			) : (
				<KlubiqForm
					fields={tenantFormFields as FormField[]}
					onSubmit={onSubmit}
					initialValues={initialValues}
					enableReset={true}
					submitButtonText='Invite Tenant'
					resetButtonText='Cancel'
				/>
			)}
		</FormLayout>
	);
};

export default InviteTenantForm;
