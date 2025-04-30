import FormLayout from '../../Layouts/FormLayout';
import { Grid,  Box, Skeleton } from '@mui/material';
import style from './TenantForm/style';
import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { getCurrencySymbol, getLocaleFormat } from '../../helpers/utils';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { getErrorResponseMessage } from '../../helpers/getErrorResponseMessage';
import { useDispatch } from 'react-redux';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import { consoleLog } from '../../helpers/debug-logger';
//import { KlubiqForm } from '../DynamicForm/klubiq-form';
import * as Yup from 'yup';
import { formValues } from '../SingleUnitForms/TenantForm/validation';
import { useOnboardTenantMutation } from '../../store/TenantStore/tenantApiSlice';
import { InviteTenantFormValues } from '../../shared/type';
import { KlubiqForm, FormField, FormGroup, InputAdornment } from '@klubiq/ui-components';

interface InviteTenantFormProps {
    propertyDetails: {
        propertyName: string;
		unitNumber: string;
		unitId: string;
    },
	returnPath: string;
	formHeader?: string;
}


const InviteTenantForm = ({ propertyDetails, returnPath, formHeader }: InviteTenantFormProps) => {
	const isMobileInvitationEnables = import.meta.env.VITE_MOBILE_INVITATION_ENABLED.toLowerCase() === 'true';
	const [loading, setLoading] = useState<boolean>(true);
	const [initialValues, setInitialValues] = useState<InviteTenantFormValues>({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [onboardTenant] = useOnboardTenantMutation();
	const { orgSettings } = useSelector(getAuthState);
	consoleLog("propertyDetails",propertyDetails)
	const onSubmit = async (values: formValues) => {
		try {
			consoleLog("values",values)
			await onboardTenant(values).unwrap();

			dispatch(
				openSnackbar({
					message: 'Tenant successfully added',
					severity: 'success',
					isOpen: true,
					duration: 2000,
				}),
			);
			navigate(returnPath);
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
		if(propertyDetails){
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
	}
	const leaseDetailsFields: FormGroup = {
		name: 'leaseDetails',
		columns: 1,
		fields: [
		{
			name: 'leaseDetails.propertyName',
			label: 'Property Name',
			type: 'text',
			required: true,
			readonly: true,
			disabled: true,
			predefinedValue: propertyDetails?.propertyName,
			defaultValue: propertyDetails?.propertyName,
		},
		{
			name: 'leaseDetails.unitNumber',
			label: 'Unit',
			type: 'text',
			required: true,
			readonly: true,
			disabled: true,
			predefinedValue: propertyDetails?.unitNumber,
		},
		{
			name: 'leaseDetails.unitId',
			label: 'Unit Id',
			type: 'hidden',
			required: true,
			hidden: true,
			predefinedValue: propertyDetails?.unitId,
		},
		{
			name: 'leaseDetails.startDate',
			label: 'Start Date',
			type: 'date',
			required: true,
			validation: Yup.date().required('Start Date is required'),
		},
		{
			name: 'leaseDetails.endDate',
			label: 'End Date',
			type: 'date',
			required: false,
			validation: Yup.date().min(Yup.ref('leaseDetails.startDate'), 'End date must be after start date'),
		},
		{
			name: 'leaseDetails.rentAmount',
			label: 'Rent Amount',
			type: 'currency',
			formatType: 'currency',
			formatFunction: (value: number) => getLocaleFormat(orgSettings, value, 'currency', 2),
			adornment: {
				prefix: getCurrencySymbol(orgSettings),
			} as InputAdornment,
			required: true,
			validation: Yup.number().required('Rent Amount is required'),
		},
		
		]
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
			validation: Yup.string().email('Invalid email').required('Email is required'),
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
	if(isMobileInvitationEnables){
		tenantFormFields.push(inviteMethodFields);
	}
	consoleLog("tenantFormFields",tenantFormFields)

	return (
		<FormLayout Header={formHeader || 'Add Tenant'} sx={style.card}>
			{loading ? (
				<Grid container spacing={2} sx={style.content}>
					{[...Array(1)].map((_, index) => (
						<Grid item xs={12} key={`text-skeleton-${index}`}>
							<Skeleton variant='text' height={15} width='100%' />
							<Skeleton variant='text' height={15} width='100%' />
						</Grid>
					))}
					{[...Array(4)].map((_, index) => (
						<Grid item xs={12} key={`rectangular-skeleton-${index}`}>
							<Skeleton variant='text' height={25} width='50%' />
							<Skeleton variant='rectangular' height={30} width='100%' />
						</Grid>
					))}
					<Grid item xs={12}>
						<Skeleton variant='text' height={25} width='60%' />
					</Grid>
					<Grid item xs={12} sx={style.boxTwo}>
						{[...Array(3)].map((_, index) => (
							<Box sx={style.boxThree} key={`circular-skeleton-${index}`}>
								<Skeleton variant='circular' height={20} width={20} />
								<Skeleton variant='rectangular' height={10} width={80} />
							</Box>
						))}
					</Grid>
					<Grid item xs={12}>
						<Skeleton variant='text' height={25} width='50%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12} sx={style.box}>
						{[...Array(2)].map((_, index) => (
							<Box key={`button-skeleton-${index}`}>
								<Skeleton variant='rectangular' height={30} width={150} />
							</Box>
						))}
					</Grid>
				</Grid>
			) : (
				<KlubiqForm fields={tenantFormFields as FormField[]} 
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
