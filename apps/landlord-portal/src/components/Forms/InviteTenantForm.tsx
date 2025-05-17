// import FormLayout from '../../Layouts/FormLayout';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCurrencySymbol } from '../../helpers/utils';
// import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
// import { getErrorResponseMessage } from '../../helpers/getErrorResponseMessage';
// import { useDispatch } from 'react-redux';
// import { getAuthState } from '../../store/AuthStore/AuthSlice';
// import { useSelector } from 'react-redux';
// import { consoleLog } from '../../helpers/debug-logger';
// import * as Yup from 'yup';
// import { useOnboardTenantMutation } from '../../store/TenantStore/tenantApiSlice';
// import { InviteTenantFormValues } from '../../shared/type';
// import {
// 	KlubiqForm,
// 	FormField,
// 	FormGroup,
// 	InputAdornment,
// } from '@klubiq/ui-components';
// import dayjs from 'dayjs';
// import FormSkeleton from '../skeletons/FormSkeleton';
// import { Typography } from '@mui/material';
// import { PERSON_TITLES } from '../../helpers/constants';
// import { omit } from 'lodash';
// import { screenMessages } from '../../helpers/screen-messages';

// interface InviteTenantFormProps {
// 	propertyDetails: {
// 		propertyName: string;
// 		unitNumber: string;
// 		unitId: string;
// 		propertyId: string;
// 	};
// 	returnPath: string;
// 	formHeader?: string;
// }
// const defaultValues: InviteTenantFormValues = {
// 	firstName: '',
// 	lastName: '',
// 	email: '',
// 	phoneNumber: '',
// 	leaseDetails: {},
// };
// const InviteTenantForm = ({
// 	propertyDetails,
// 	returnPath,
// 	formHeader,
// }: InviteTenantFormProps) => {
// 	const isMobileInvitationEnables =
// 		import.meta.env.VITE_MOBILE_INVITATION_ENABLED.toLowerCase() === 'true';
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [initialValues, setInitialValues] = useState<InviteTenantFormValues>(defaultValues);
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const [onboardTenant] = useOnboardTenantMutation();
// 	const { user } = useSelector(getAuthState);
// 	const validateLeaseDates = (startDate: string, endDate: string) => {
// 		if (dayjs(startDate).isAfter(dayjs(endDate))) {
// 			return 'End date must be after start date';
// 		}
// 		return true;
// 	};

// 	const onSubmit = async (values: InviteTenantFormValues) => {
// 		try {
// 			if(values.leaseDetails.endDate && values.leaseDetails.startDate) {
// 				const isValid = validateLeaseDates(values.leaseDetails.startDate, values.leaseDetails.endDate);
// 				if(!isValid) {
// 					dispatch(openSnackbar({message: 'End date must be after start date', severity: 'error', isOpen: true}));
// 					return;
// 				}
// 			}
// 			let requestData = omit(values, ['tenantType', 'heading']);
// 			const response = await onboardTenant({propertyId: propertyDetails.propertyId, body: requestData}).unwrap();
// 			consoleLog('response', response);
// 			consoleLog('response was successful', response);
// 			dispatch(
// 				openSnackbar({
// 					message: screenMessages.tenant.invite.success,
// 					severity: 'success',
// 					isOpen: true,
// 					duration: 2000,
// 				}),
// 			);
// 			navigate(returnPath);
// 		} catch (error) {
// 			dispatch(
// 				openSnackbar({
// 					message: getErrorResponseMessage({
// 						response: (error as any)?.response,
// 						message: (error as any)?.message || screenMessages.tenant.invite.error,
// 					}),
// 					severity: 'error',
// 					isOpen: true,
// 				}),
// 			);
// 		}
// 	};
// 	useEffect(() => {
// 		consoleLog('orgSettings', user?.orgSettings);
// 		if (propertyDetails) {
// 			setInitialValues({
// 				firstName: '',
// 				lastName: '',
// 				email: '',
// 				phoneNumber: '',
// 				title: 'Mr',
// 				company: '',
// 				leaseDetails: {
// 					name: '',
// 					startDate: '',
// 					endDate: '',
// 					unitId: propertyDetails?.unitId,
// 					rentAmount: '',
// 					propertyName: propertyDetails?.propertyName,
// 					unitNumber: propertyDetails?.unitNumber,
// 				},
// 			});
// 			setLoading(false);
// 		}
// 	}, []); // Empty dependency array means this runs once on mount

// 	const inviteMethodFields: FormField = {
// 		name: 'invitationMethod',
// 		label: 'Send the tenant an invite by',
// 		type: 'radio',
// 		radioGroupDirection: 'row',
// 		required: true,
// 		options: [
// 			{ value: 'email', label: 'Email' },
// 			{ value: 'text', label: 'Text' },
// 		],
// 		validation: Yup.string().required('Required'),
// 	};
// 	const leaseDetailsFields: FormGroup = {
// 		name: 'leaseDetails',
// 		columns: 1,
// 		fields: [
// 			{
// 				name: 'leaseDetails.propertyName',
// 				label: 'Property Name',
// 				type: 'text',
// 				readonly: true,
// 				disabled: true,
// 				predefinedValue: propertyDetails?.propertyName,
// 				defaultValue: propertyDetails?.propertyName,
// 			},
// 			{
// 				name: 'leaseDetails.unitNumber',
// 				label: 'Unit',
// 				type: 'text',
// 				readonly: true,
// 				disabled: true,
// 				predefinedValue: propertyDetails?.unitNumber,
// 				defaultValue: propertyDetails?.unitNumber,
// 			},
// 			{
// 				name: 'leaseDetails.unitId',
// 				label: 'Unit Id',
// 				type: 'hidden',
// 				hidden: true,
// 				predefinedValue: propertyDetails?.unitId,
// 				defaultValue: propertyDetails?.unitId,
// 			},
// 			{
// 				name: 'leaseDetails.startDate',
// 				label: 'Start Date',
// 				type: 'date',
// 				required: true,
// 				validation: Yup.date()
// 				.transform((value) => (dayjs(value).toDate()))
// 				.required('Start Date is required')
// 			},
// 			{
// 				name: 'leaseDetails.endDate',
// 				label: 'End Date',
// 				type: 'date',
// 				required: false,
// 				minDate: 'startDate',
// 				dependsOn: [
// 					{
// 						field: 'startDate',
// 						value: 'startDate',
// 					}
// 				],
// 				validation: Yup.date()
// 					.transform((value) => (dayjs(value).toDate()))
// 					.min(
// 						Yup.ref('leaseDetails.startDate'),
// 						'End date must be after start date',
// 					)
// 					.test(
// 						'date-comparison',
// 						'End date must be after start date',
// 						function (value) {
// 							const { startDate } = this.parent;
//             				if (!value || !startDate) {
//                  				return true;
//                 			}
//             				return dayjs(value).isAfter(dayjs(startDate));
// 						},
// 					)
// 			},
// 			{
// 				name: 'leaseDetails.rentAmount',
// 				label: 'Rent Amount',
// 				type: 'decimal',
// 				formatType: 'decimal',
// 				decimals: 2,
// 				adornment: {
// 					prefix: getCurrencySymbol(user?.orgSettings),
// 				} as InputAdornment,
// 				required: true,
// 				validation: Yup.string()
// 				.required('Rent Amount is required'),
// 			},
// 		],
// 	};
// 	const tenantFormFields: (FormField | FormGroup)[] = [

// 		{
// 			name: 'heading',
// 			label: '',
// 			type: 'text',
// 			customComponent: <Typography variant='subtitle2'>We'll invite the tenant to setup their tenant account so they can pay their rent.</Typography>,
// 		},
// 		{
// 			name: 'tenantType',
// 			label: 'Tenant Type',
// 			type: 'radio',
// 			required: true,
// 			radioGroupDirection: 'row',
// 			options: [
// 				{ value: 'company', label: 'Company' },
// 				{ value: 'individual', label: 'Individual' },
// 			],
// 		},
// 		{
// 			name: 'companyName',
// 			label: 'Company Name',
// 			type: 'text',
// 			required: true,
// 			validation: Yup.string().when('tenantType', {
// 				is: 'company',
// 				then: (schema) => schema.required('Company name is required'),
// 				otherwise: (schema) => schema.notRequired(),
// 			}),
// 			showIf: (values) => values.tenantType === 'company'
// 		},
// 		{
// 			name: 'title',
// 			label: 'Title',
// 			type: 'select',
// 			placeholder: 'Select Title',
// 			options: PERSON_TITLES.map((title) => ({ value: title, label: title })),
// 			showIf: (values) => values.tenantType === 'individual',
// 			dependsOn: [
// 				{
// 					field: 'tenantType',
// 					value: 'individual',
// 				},
// 			],
// 		},
// 		{
// 			name: 'firstName',
// 			label: 'First Name',
// 			type: 'text',
// 			required: true,
// 			validation: Yup.string()
// 				.min(2, 'Too Short!')
// 				.max(50, 'Too Long!')
// 				.when('tenantType', {
// 					is: 'individual',
// 					then: (schema) => schema.required('First name is required'),
// 					otherwise: (schema) => schema.notRequired(),
// 				}),
// 			showIf: (values) => values.tenantType === 'individual'
// 		},
// 		{
// 			name: 'lastName',
// 			label: 'Last Name',
// 			type: 'text',
// 			required: true,
// 			validation: Yup.string()
// 				.min(2, 'Too Short!')
// 				.max(50, 'Too Long!')
// 				.when('tenantType', {
// 					is: 'individual',
// 					then: (schema) => schema.required('Last name is required'),
// 					otherwise: (schema) => schema.notRequired(),
// 				}),
// 			showIf: (values) => values.tenantType === 'individual',
// 		},
// 		{
// 			name: 'email',
// 			label: 'Email',
// 			type: 'email',
// 			required: true,
// 			validation: Yup.string()
// 				.email('Invalid email')
// 				.required('Email is required'),
// 		},
// 		{
// 			name: 'phoneNumber',
// 			label: 'Phone Number',
// 			type: 'text',
// 			required: false,
// 			validation: Yup.string().matches(/^[0-9]+$/, 'Invalid phone number'),
// 		},
// 		leaseDetailsFields,
// 	];
// 	if (isMobileInvitationEnables) {
// 		tenantFormFields.push(inviteMethodFields);
// 	}

// 	return (
// 		<FormLayout Header={formHeader || 'Add Tenant'}>
// 			{loading ? (
// 				<FormSkeleton rows={tenantFormFields.length} columns={[1, 1, 1]} />
// 			) : (
// 				<KlubiqForm
// 					fields={tenantFormFields as FormField[]}
// 					onSubmit={onSubmit}
// 					initialValues={initialValues}
// 					enableReset={true}
// 					submitButtonText='Invite Tenant'
// 					resetButtonText='Cancel'
// 				/>
// 			)}
// 		</FormLayout>
// 	);
// };

// export default InviteTenantForm;

import FormLayout from '../../Layouts/FormLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrencySymbol } from '../../helpers/utils';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { omit } from 'lodash';
import { Typography } from '@mui/material';
import {
	KlubiqForm,
	FormField,
	FormGroup,
	InputAdornment,
} from '@klubiq/ui-components';
import dayjs from 'dayjs';

// API and Store imports
import { useOnboardTenantMutation } from '../../store/TenantStore/tenantApiSlice';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { InviteTenantFormValues } from '../../shared/type';
import { PERSON_TITLES } from '../../helpers/constants';
import FormSkeleton from '../skeletons/FormSkeleton';
import { consoleLog } from '../../helpers/debug-logger';

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
	const [initialValues, setInitialValues] =
		useState<InviteTenantFormValues>(defaultValues);
	const navigate = useNavigate();
	const [onboardTenant] = useOnboardTenantMutation();
	const { user } = useSelector(getAuthState);

	const validateLeaseDates = (startDate: string, endDate: string) => {
		if (dayjs(startDate).isAfter(dayjs(endDate))) {
			return 'End date must be after start date';
		}
		return true;
	};

	const onSubmit = async (values: InviteTenantFormValues) => {
		try {
			if (values.leaseDetails.endDate && values.leaseDetails.startDate) {
				const isValid = validateLeaseDates(
					values.leaseDetails.startDate,
					values.leaseDetails.endDate,
				);
				if (!isValid) {
					return;
				}
			}

			const requestData = omit(values, ['tenantType', 'heading']);
			await onboardTenant({
				propertyId: propertyDetails.propertyId,
				body: requestData,
			}).unwrap();
			// Only reset form and navigate on success
			setInitialValues(defaultValues);
			navigate(returnPath);
		} catch (error) {
			consoleLog('error in invite tenant form', error);
			setInitialValues(values);
		}
	};

	useEffect(() => {
		if (propertyDetails) {
			setInitialValues({
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				title: 'Mr',
				company: '',
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

	const inviteMethodFields: FormField = {
		name: 'invitationMethod',
		label: 'Send the tenant an invite by',
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
					.transform((value) => dayjs(value).toDate())
					.required('Start Date is required'),
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
					},
				],
				validation: Yup.date()
					.transform((value) => dayjs(value).toDate())
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
					),
			},
			{
				name: 'leaseDetails.rentAmount',
				label: 'Rent Amount',
				type: 'decimal',
				formatType: 'decimal',
				decimals: 2,
				adornment: {
					prefix: getCurrencySymbol(user?.orgSettings),
				} as InputAdornment,
				required: true,
				validation: Yup.string().required('Rent Amount is required'),
			},
		],
	};

	const tenantFormFields: (FormField | FormGroup)[] = [
		{
			name: 'heading',
			label: '',
			type: 'text',
			customComponent: (
				<Typography variant='subtitle2'>
					We'll invite the tenant to setup their tenant account so they can pay
					their rent.
				</Typography>
			),
		},
		{
			name: 'tenantType',
			label: 'Tenant Type',
			type: 'radio',
			required: true,
			radioGroupDirection: 'row',
			options: [
				{ value: 'company', label: 'Company' },
				{ value: 'individual', label: 'Individual' },
			],
		},
		{
			name: 'companyName',
			label: 'Company Name',
			type: 'text',
			required: true,
			validation: Yup.string().when('tenantType', {
				is: 'company',
				then: (schema) => schema.required('Company name is required'),
				otherwise: (schema) => schema.notRequired(),
			}),
			showIf: (values) => values.tenantType === 'company',
		},
		{
			name: 'title',
			label: 'Title',
			type: 'select',
			placeholder: 'Select Title',
			options: PERSON_TITLES.map((title) => ({ value: title, label: title })),
			showIf: (values) => values.tenantType === 'individual',
			dependsOn: [
				{
					field: 'tenantType',
					value: 'individual',
				},
			],
		},
		{
			name: 'firstName',
			label: 'First Name',
			type: 'text',
			required: true,
			validation: Yup.string()
				.min(2, 'Too Short!')
				.max(50, 'Too Long!')
				.when('tenantType', {
					is: 'individual',
					then: (schema) => schema.required('First name is required'),
					otherwise: (schema) => schema.notRequired(),
				}),
			showIf: (values) => values.tenantType === 'individual',
		},
		{
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
			required: true,
			validation: Yup.string()
				.min(2, 'Too Short!')
				.max(50, 'Too Long!')
				.when('tenantType', {
					is: 'individual',
					then: (schema) => schema.required('Last name is required'),
					otherwise: (schema) => schema.notRequired(),
				}),
			showIf: (values) => values.tenantType === 'individual',
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
