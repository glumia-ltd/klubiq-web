import { DynamicTanstackFormProps, InputAdornment as InputAdornmentType,
	FormFieldV1,
	KlubiqFormV1, } from '@klubiq/ui-components';
import {
	useGetOrgPropertiesViewListQuery, useAddLeaseMutation,
} from '../../store/LeaseStore/leaseApiSlice';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { find } from 'lodash';
import dayjs from 'dayjs';
import { getCurrencySymbol } from '../../helpers/utils';
import { FC,
	useMemo, 
	 useState } from 'react';

import FormLayout from '../../Layouts/FormLayout';
import FormSkeleton from '../skeletons/FormSkeleton';

import { consoleLog } from '../../helpers/debug-logger';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/system/useMediaQuery';
import { z } from 'zod';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { TenantDialog } from '../CustomFormComponents/TenantDialog';
import { Info } from '@mui/icons-material';


function renderPropertySelectField(fieldApi: any, fieldConfig: any, form: any) {
	const options = Array.isArray(fieldConfig.options)
				? fieldConfig.options
				: typeof fieldConfig.options === 'function'
					? fieldConfig.options(form.state.values)
					: [];
	return (
		<Box sx={{ width: '100%' }}>
			<Select
						value={fieldApi.state.value || ''}
						placeholder={fieldConfig.placeholder}
						fullWidth
						onChange={(e) => {
							const selectedProperty = find(options, { value: e.target.value });
							console.log('selectedProperty', selectedProperty);
							form.setFieldValue('propertyName', selectedProperty.label);
							form.setFieldValue('unitId', selectedProperty?.units?.[0]?.id);
							fieldApi.handleChange(e.target.value);
						}}
						onBlur={fieldApi.handleBlur}
						label={fieldConfig.isInFieldLabel ? fieldConfig.label : undefined}
						multiple={!!fieldConfig.multiple}
						disabled={fieldConfig.disabled}
					>
						{options.map((option: any) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
		</Box>
	);
}

function renderUnitSelectField(fieldApi: any, fieldConfig: any, form: any) {
	const options = Array.isArray(fieldConfig.options)
				? fieldConfig.options
				: typeof fieldConfig.options === 'function'
					? fieldConfig.options(form.state.values)
					: [];
	return (
		<Box sx={{ width: '100%' }}>
			<Select
						value={fieldApi.state.value || ''}
						placeholder={fieldConfig.placeholder}
						fullWidth
						onChange={(e) => {
							const selectedUnit = find(options, { value: e.target.value });
							console.log('selectedUnit', selectedUnit);
							form.setFieldValue('unitNumber', selectedUnit.label);
							fieldApi.handleChange(e.target.value);
							

						}}
						onBlur={fieldApi.handleBlur}
						label={fieldConfig.isInFieldLabel ? fieldConfig.label : undefined}
						multiple={!!fieldConfig.multiple}
						disabled={fieldConfig.disabled}
					>
						{options.map((option: any) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
		</Box>
	);
}

function renderTenantSelectField(fieldApi: any, fieldConfig: any, form: any) {
	return (
		<TenantDialog
			field={{
				fieldConfig: {
					...fieldConfig,
					options: Array.isArray(fieldConfig.options)
						? fieldConfig.options.map((opt: { value: string | number, label: string, email: string }) => ({
								...opt,
								value: String(opt.value),
								label: `${opt.label} - (${opt.email})`,
							}))
							: typeof fieldConfig.options === 'function'
							? fieldConfig
									.options(form.getValues())
										.map((opt: { value: string | number, label: string, email: string }) => ({
											...opt,
											value: String(opt.value),
											label: `${opt.label} - (${opt.email})`,
									}))
							: [],
				},
				state: fieldApi.state,
				handleChange: fieldApi.handleChange,
			}}
			form={form}
		/>
	)
}







enum PaymentFrequency {
	ANNUALLY = 'Annually',
	BI_MONTHLY = 'Bi-Monthly',
	BI_WEEKLY = 'Bi-Weekly',
	MONTHLY = 'Monthly',
	ONE_TIME = 'One-Time',
	QUARTERLY = 'Quarterly',
	WEEKLY = 'Weekly',
}

interface AddLeaseFormProps {
	propertyId: string;
	unitId: string;
}
interface Property {
	uuid: string;
	name: string;
	units?: Array<{ id: string; unitNumber: string }>;
}
// interface NewTenant {
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	phone: string;
// 	companyName: string;
// }
// interface LeaseFormValues {
// 	name: string;
// 	startDate: string;
// 	endDate?: string;
// 	newTenants?: NewTenant[];
// 	tenantsIds: string[];
// 	unitId: string;
// 	rentDueDay: number;
// 	rentAmount: number;
// 	securityDeposit?: number;
// 	paymentFrequency: PaymentFrequency;
// 	propertyName: string;
// 	firstPaymentDate?: string;
// 	unitNumber: string;
// }

const AddLeaseForm: FC<AddLeaseFormProps> = ({ propertyId }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { user } = useSelector(getAuthState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [addLease] = useAddLeaseMutation();
	const queryResult = useGetOrgPropertiesViewListQuery({orgId: user?.organizationUuid}, {
		selectFromResult: ({ data, isLoading: loading }) => ({
			properties: data?.properties ? [...data.properties] : [],
			tenants: data?.tenants ? [...data.tenants] : [],
			isLoading: loading,
		}),
	});
	
	const propertyData = useMemo(
		() => find(queryResult.properties, { uuid: propertyId }),
		[queryResult.properties, propertyId],
	);
	consoleLog(propertyData)
	const { properties, tenants, isLoading } = queryResult;

	const getPropertyUnits = (values: Record<string, any>) => {
		const selectedProperty = find(queryResult.properties, { uuid: values.propertyId });
		return selectedProperty?.units.map((unit: { id: string; unitNumber: string }) => ({
			label: unit.unitNumber,
			value: unit.id,
		}));
	}

	const [formInitialValues] = useState({
		name: '',
		propertyName: '',
		unitId: '',
		tenantsIds: [],
		rentAmount: '',
		depositAmount: '',
		startDate: '',
		endDate: '',
		frequency: PaymentFrequency.ANNUALLY,
		rentDueDay: '0',
	});
	const initialValues = {
		name: '',
		propertyName: '',
		propertyId: propertyData?.uuid || '',
		unitId: '',
		tenantsIds: [],
		newTenants: [],
		rentAmount: 0,
		securityDeposit: 0,
		startDate: '',
		endDate: '',
		paymentFrequency: PaymentFrequency.ANNUALLY,
		rentDueDay: 0,
		unitNumber: '',
		firstPaymentDate: '',
		selectedProperty: null,
		selectedUnit: null,
	}

	console.log('initial values', formInitialValues);

	// const propertyData = useMemo(
	// 	() => find(properties, { uuid: propertyId }),
	// 	[properties, propertyId],
	// );
	const calculateDueDate = (values: any) => {
		if (!values?.paymentFrequency || !values?.startDate) {
			return '';
		}

		const startDayAndMonth = dayjs(values?.startDate).format('MMMM DD');
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		const dueDates = {
			[PaymentFrequency.WEEKLY]: `${days[dayjs(values?.startDate).add(1, 'week').get('day')]}, ${dayjs(values?.startDate).add(1, 'week').format('MMMM DD, YYYY')}`,
			[PaymentFrequency.BI_WEEKLY]: `${days[dayjs(values?.startDate).add(2, 'week').get('day')]}, ${dayjs(values?.startDate).add(2, 'week').format('MMMM DD, YYYY')}`,
			[PaymentFrequency.MONTHLY]: `${days[dayjs(values?.startDate).add(1, 'month').get('day')]}, ${dayjs(values?.startDate).add(1, 'month').format('MMMM DD, YYYY')}`,
			[PaymentFrequency.ANNUALLY]: startDayAndMonth,
			[PaymentFrequency.ONE_TIME]: `Once on ${startDayAndMonth}`,
			[PaymentFrequency.BI_MONTHLY]: `${days[dayjs(values?.startDate).add(2, 'month').get('day')]}, ${dayjs(values?.startDate).add(2, 'month').format('MMMM DD, YYYY')}`,
			[PaymentFrequency.QUARTERLY]: `${days[dayjs(values?.startDate).add(3, 'month').get('day')]}, ${dayjs(values?.startDate).add(3, 'month').format('MMMM DD, YYYY')}`,
		};

		return dueDates[values?.paymentFrequency as PaymentFrequency] || '';
	};



	const leaseFormFields: FormFieldV1[] = [
		{
			name: 'name',
			label: 'Lease Name',
			type: 'text',
			required: true,
			validation: {
				schema: z.string().min(1, {message: 'Lease name is required'}),
			},
		},
		{
			name: 'propertyName',
			label: '',
			type: 'hidden',
		},
		{
			name: 'propertyId',
			label: 'Property Name',
			type: 'select',
			required: true,
			options: properties.map((property: Property) => ({
						label: property.name,
						value: property.uuid,
						units: property.units,
					})),
			validation: {
				schema: z.string().min(1, {message: 'Property name is required'}),
			},
			customComponent: renderPropertySelectField,
		},
		{
			name: 'unitId',
			label: 'Unit',
			type: 'select',
			options: getPropertyUnits,
			showIf: (values) => !!values.propertyId,
			customComponent: renderUnitSelectField,
		},
		{
			name: 'tenantsIds',
			label: 'Tenants',
			type: 'checkbox-group',
			options: tenants.map((tenant: { firstName: string; lastName: string; email: string, id: string }) => ({
				label: `${tenant.firstName} ${tenant.lastName}`,
				value: tenant.id,
				email: tenant.email,
			})),
			customComponent: renderTenantSelectField,
		},
		{
			name: 'rentAmount',
			type: 'decimal',
			label: 'Rent Amount',
			width: '100%',
			formatType: 'decimal',
			required: true,
			decimals: 2,
			adornment: {
				prefix: getCurrencySymbol(user?.orgSettings),
			} as InputAdornmentType,
		},
		{
			name: 'securityDeposit',
			type: 'decimal',
			label: 'Security Deposit',
			width: '100%',
			formatType: 'decimal',
			decimals: 2,
			adornment: {
				prefix: getCurrencySymbol(user?.orgSettings),
			} as InputAdornmentType,
		},
		{
			name: 'startDate',
			label: 'Lease Start Date',
			type: 'date',
			required: true,
			width: '50%',
			validation: {
				schema: z.any().refine((val) => {
					if (!val) return false;
					const date = dayjs(val);
					return date.isValid();
				}, 'Lease start date is required'),

			},
		},
		{
			name: 'endDate',
			label: 'Lease End Date',
			type: 'date',
			width: '50%',
			validation: {
				schema: z.any().refine((val) => {
					if (!val) return true; // Optional field
					const date = dayjs(val);
					return date.isValid();
				}, 'Invalid date format'),
				dependencies: [
					{
						field: 'startDate',
						type: 'min',
						message: 'Lease end date must be after start date',    
					},
				],
			},
		},
		{
			name: 'paymentFrequency',
			label: 'Payment Frequency',
			type: 'select',
			required: true,
			options: Object.values(PaymentFrequency).map((freq) => ({
				label: freq,
				value: freq,
			})),
			width: '50%',
			validation: {
				schema: z.string({required_error: 'Payment frequency is required'}),
			},
		},
		{
			name: 'rentDueDay',
			label: 'Payment Day',
			type: 'select',
			options: Array.from({ length: 31 }, (_, i) => ({
				label: i === 0 ? 'select due day' : `${i}`,
				value: `${i}`,
			})),
			width: '50%',
			showIf: (values) =>
				values.paymentFrequency === 'Monthly' || values.paymentFrequency === 'Bi-Monthly',
		},
		{
			name: 'firstPaymentDate',
			showIf: (values) => !!values.startDate,
			type: 'custom',
			label: '',
			component: (_, __, form: any) => {
				return (
					<Typography variant='body2' textAlign='left' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Info sx={{ fontSize: 16, color: theme.palette.primary.main }} />
						<Typography variant='body2' textAlign='left'>
							First payment due on {calculateDueDate(form.state.values)}
						</Typography>
					</Typography>
				)
			}
		},
	];
	// const handleSubmit = async (values: LeaseFormValues) => {
	// 	try {
	// 		const requestBody = {
	// 			name: values.name,
	// 			startDate: values.startDate,
	// 			endDate: values.endDate,
	// 			newTenants: null,
	// 			tenantsIds: values.tenantsIds,
	// 			unitId: values.unitId,
	// 			rentDueDay: values.rentDueDay ? Number(values.rentDueDay) : undefined,
	// 			rentAmount: Number(values.rentAmount),
	// 			securityDeposit: Number(values.securityDeposit),
	// 			isDraft: false,
	// 			paymentFrequency: values.paymentFrequency,
	// 			status: null,
	// 			propertyName: propertyData?.name,
	// 			firstPaymentDate: calculateDueDate(values),
	// 			unitNumber: find(propertyData?.units, { id: values.unitId })
	// 				?.unitNumber,
	// 		};

	// 		await addLease(requestBody).unwrap();

	// 		dispatch(
	// 			openSnackbar({
	// 				message: 'Lease successfully added',
	// 				severity: 'success',
	// 				isOpen: true,
	// 				duration: 2000,
	// 			}),
	// 		);

	// 		navigate(-1);
	// 	} catch (error) {
	// 		dispatch(
	// 			openSnackbar({
	// 				message: 'Error saving lease. Please try again',
	// 				severity: 'error',
	// 				isOpen: true,
	// 				duration: 2000,
	// 			}),
	// 		);
	// 	}
	// };

	// const handleAllLeasesClick = () => {
	// 	navigate('/leases');
	// }

	const handleAddLease = async (values: any) => {
		try {
			console.log('values', values);
		} catch (error) {
			dispatch(
				openSnackbar({
					message: 'Error saving lease. Please try again',
					severity: 'error',
					isOpen: true,
					duration: 2000,
				}),
			);
		}
	}

	const leaseFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Add Lease',
		enableReset: true,
		resetButtonText: 'Cancel',
		fields: leaseFormFields,
		initialValues,
		isMultiStep: false,
		onSubmit: handleAddLease,
		showBackdrop: true,
		backdropText: 'Please wait while we add your lease...',
		fullWidthButtons: !!isMobile,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
	}


	return (
		<FormLayout Header={'Add Lease'}>
			{isLoading ? (
				<FormSkeleton rows={leaseFormFields.length} columns={[1, 1, 1]} sx={{ width: '100%', p: 2 }} />
			) : (
				<Box sx={{ width: '100%', p:2 }}>
					<KlubiqFormV1 {...leaseFormConfig} />
				</Box>
			)}
		</FormLayout>
	);
};

export default AddLeaseForm;
