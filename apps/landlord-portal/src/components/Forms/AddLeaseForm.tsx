import {
	DynamicTanstackFormProps,
	InputAdornment as InputAdornmentType,
	FormFieldV1,
	KlubiqFormV1,
} from '@klubiq/ui-components';
import {
	useGetOrgPropertiesViewListQuery,
	useAddLeaseMutation,
} from '../../store/LeaseStore/leaseApiSlice';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { find } from 'lodash';
import dayjs from 'dayjs';
import { getCurrencySymbol } from '../../helpers/utils';
import { FC, useMemo } from 'react';

import FormLayout from '../../Layouts/FormLayout';
import FormSkeleton from '../skeletons/FormSkeleton';

import { consoleLog } from '../../helpers/debug-logger';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/system/useMediaQuery';
import { z } from 'zod';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { TenantDialog } from '../CustomFormComponents/TenantDialog';
import { Close, Info } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { screenMessages } from '../../helpers/screen-messages';


function renderPropertySelectField(fieldApi: any, fieldConfig: any, form: any) {
	const options = Array.isArray(fieldConfig.options)
		? fieldConfig.options
		: typeof fieldConfig.options === 'function'
			? fieldConfig.options(form.state.values)
			: [];
	return (
		<Box>
			<Select
				value={fieldApi.state.value || ''}
				placeholder={fieldConfig.placeholder}
				fullWidth
				onChange={(e) => {
					const selectedProperty = find(options, { value: e.target.value });
					form.setFieldValue('selectedProperty', selectedProperty);
					form.setFieldValue('property.name', selectedProperty.label);
					form.setFieldValue(
						'property.unitId',
						selectedProperty?.units?.[0]?.id,
					);
					form.setFieldValue(
						'property.unitNumber',
						selectedProperty?.units?.[0]?.unitNumber,
					);
					form.setFieldValue('selectedUnit', selectedProperty?.units?.[0]);
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
		<Box>
			<Select
				value={fieldApi.state.value || ''}
				placeholder={fieldConfig.placeholder}
				fullWidth
				onChange={(e) => {
					const selectedUnit = find(options, { value: e.target.value });
					form.setFieldValue('property.unitNumber', selectedUnit.label);
					form.setFieldValue('selectedUnit', selectedUnit);
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
						? fieldConfig.options.map(
								(opt: {
									value: string | number;
									label: string;
									email: string;
								}) => ({
									...opt,
									value: String(opt.value),
									label: `${opt.label}`,
								}),
							)
						: typeof fieldConfig.options === 'function'
							? fieldConfig
									.options(form.getValues())
									.map(
										(opt: {
											value: string | number;
											label: string;
											email: string;
										}) => ({
											...opt,
											value: String(opt.value),
											label: `${opt.label}`,
										}),
									)
							: [],
				},
				state: fieldApi.state,
				handleChange: fieldApi.handleChange,
			}}
			form={form}
		/>
	);
}
function renderLeaseDatesField(
	fieldApi: any,
	fieldConfig: any,
	form: any,
	dependencyField: string,
) {
	const dependencyFieldValue = form.getFieldValue(dependencyField);
	const handleChange = (newValue: any) => {
		fieldApi.handleChange(newValue);
		if ((fieldConfig.required || newValue !== null) && dependencyFieldValue) {
			form.validateField(dependencyField);
		}
	};
	return (
		<Box>
			<DatePicker
				label={fieldConfig.isInFieldLabel ? fieldConfig.label : undefined}
				value={
					fieldConfig.readonly
						? fieldConfig.predefinedValue
						: fieldApi.state.value
							? dayjs(fieldApi.state.value)
							: null
				}
				onChange={(newValue) => {
					if (newValue && dayjs.isDayjs(newValue)) {
						handleChange(newValue.toDate());
					} else {
						handleChange(null);
					}
				}}
				slotProps={{
					textField: {
						sx: {
							borderRadius: '0.5rem',
							height: '2.7rem',
							color: 'inherit',
						},
						size: 'small',
						fullWidth: true,
						error: !!form.state.errors[fieldConfig.name],
						helperText:
							form.state.errors[fieldConfig.name] || fieldConfig.helperText,
						disabled: fieldConfig.disabled || fieldConfig.readonly,
						inputProps: {
							readOnly: fieldConfig.readonly,
						},
					},
				}}
				disabled={fieldConfig.disabled || fieldConfig.readonly}
			/>
		</Box>
	);
}

export enum PaymentFrequency {
	ANNUALLY = 'Annually',
	BI_MONTHLY = 'Bi-Monthly',
	BI_WEEKLY = 'Bi-Weekly',
	MONTHLY = 'Monthly',
	ONE_TIME = 'One-Time',
	QUARTERLY = 'Quarterly',
	WEEKLY = 'Weekly',
	CUSTOM = 'Custom',
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
interface LeaseFormValues {
	name: string;
	startDate: string;
	endDate?: string;
	//newTenants?: NewTenant[];
	tenantsIds: string[];
	unitId: string;
	rentDueDay: number;
	rentAmount: number;
	lateFeeAmount?: number;
	securityDeposit?: number;
	paymentFrequency: PaymentFrequency;
	customPaymentFrequency: number;
	propertyName: string;
	firstPaymentDate?: string;
	unitNumber: string;
	leaseConfig: Record<string, any>;
}

const AddLeaseForm: FC<AddLeaseFormProps> = ({ propertyId, unitId }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { user } = useSelector(getAuthState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [addLease] = useAddLeaseMutation();
	const queryResult = useGetOrgPropertiesViewListQuery(
		{ orgId: user?.organizationUuid },
		{
			selectFromResult: ({ data, isLoading: loading }) => ({
				properties: data?.properties ? [...data.properties] : [],
				tenants: data?.tenants ? [...data.tenants] : [],
				isLoading: loading,
			}),
		},
	);

	const propertyData = useMemo(
		() => find(queryResult.properties, { uuid: propertyId }),
		[queryResult.properties, propertyId],
	);
	const unitData = useMemo(
		() => find(propertyData?.units, { id: unitId }),
		[propertyData?.units, unitId],
	);
	consoleLog(propertyData);
	const { properties, tenants, isLoading } = queryResult;

	const getPropertyUnits = (values: Record<string, any>) => {
		const selectedProperty = find(queryResult.properties, {
			uuid: values.property.uuid,
		});
		return (
			selectedProperty?.units.map(
				(unit: { id: string; unitNumber: string }) => ({
					label: unit.unitNumber,
					value: unit.id,
				}),
			) || []
		);
	};

	const initialValues = {
		property: {
			uuid: propertyData?.uuid || '',
			name: propertyData?.name || '',
			unitId: unitData?.id || '',
			unitNumber: unitData?.unitNumber || '',
		},
		name: '',
		tenantsIds: [],
		newTenants: [],
		fees: {
			rent: null,
			securityDeposit: null,
			lateFeeAmount: null,
		},
		leaseDates: {
			start: null,
			end: null,
		},
		paymentFrequency: PaymentFrequency.ANNUALLY,
		customPaymentFrequency: 0,
		rentDueDay: 0,
		firstPaymentDate: '',
		selectedProperty: propertyData || null,
		selectedUnit: unitData || null,
	};
	const calculateFirstPaymentDate = (values: any) => {
		if (!values?.paymentFrequency || !values?.leaseDates?.start) {
			return '';
		}
		return dayjs(values?.leaseDates?.start).format('MMMM DD, YYYY');
	};
	const calculateDueDate = (values: any) => {
		if (!values?.paymentFrequency || !values?.leaseDates?.start) {
			return '';
		}

		const startDayAndMonthPlusYear = dayjs(values?.leaseDates?.start).add(365, 'day').format(
			'MMMM DD, YYYY',
		);
		const monthDueDate = dayjs(values?.leaseDates?.start)
			.add(1, 'month')
			.set('date', values?.rentDueDay || 1);
		const biMonthlyDueDate = dayjs(values?.leaseDates?.start)
			.add(2, 'month')
			.set('date', values?.rentDueDay || 1);
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		const leaseDateDiffs = dayjs(values?.leaseDates?.end).diff(dayjs(values?.leaseDates?.start), 'day');

		const dueDates = {
			[PaymentFrequency.WEEKLY]:  leaseDateDiffs > 7 ? `${days[dayjs(values?.leaseDates?.start).add(1, 'week').get('day')]}, ${dayjs(values?.leaseDates?.start).add(1, 'week').format('MMMM DD, YYYY')}` : null,
			[PaymentFrequency.BI_WEEKLY]: leaseDateDiffs > 14 ? `${days[dayjs(values?.leaseDates?.start).add(2, 'week').get('day')]}, ${dayjs(values?.leaseDates?.start).add(2, 'week').format('MMMM DD, YYYY')}` : null,
			[PaymentFrequency.MONTHLY]: leaseDateDiffs > 30 ? `${days[monthDueDate.get('day')]}, ${monthDueDate.format('MMMM DD, YYYY')}` : null,
			[PaymentFrequency.ANNUALLY]: leaseDateDiffs > 365 ? startDayAndMonthPlusYear : null,
			[PaymentFrequency.ONE_TIME]: null,
			[PaymentFrequency.BI_MONTHLY]: leaseDateDiffs > 60 ? `${days[biMonthlyDueDate.get('day')]}, ${biMonthlyDueDate.format('MMMM DD, YYYY')}` : null,
			[PaymentFrequency.QUARTERLY]: leaseDateDiffs > 90 ? `${days[dayjs(values?.leaseDates?.start).add(3, 'month').get('day')]}, ${dayjs(values?.leaseDates?.start).add(3, 'month').format('MMMM DD, YYYY')}` : null,
			[PaymentFrequency.CUSTOM]: null,
		};

		return dueDates[values?.paymentFrequency as PaymentFrequency] || '';
	};
	const leaseFormFields: FormFieldV1[] = [
		{
			name: 'name',
			label: 'Lease Name',
			type: 'text',
			required: true,
			placeholder: "Enter a lease name",
			validation: {
				schema: z.string({ message: 'Lease name is required' }).min(1, { message: 'Lease name is required' }),
			},
		},
		{
			name: 'property',
			label: 'Property Details',
			type: 'group',
			width: '100%',
			layout: 'row',
			groupFields: [
				{
					name: 'uuid',
					label: 'Property Name',
					type: 'select',
					required: true,
					width: isMobile ? '100%' : '48%',
					options: properties.map((property: Property) => ({
						label: property.name,
						value: property.uuid,
						units: property.units,
					})),
					validation: {
						schema: z.string().min(1, { message: 'Property name is required' }),
					},
					customComponent: renderPropertySelectField,
				},
				{
					name: 'unitId',
					label: 'Unit',
					type: 'select',
					width: isMobile ? '100%' : '48%',
					options: getPropertyUnits,
					customComponent: renderUnitSelectField,
				},
			],
		},
		{
			name: 'tenantsIds',
			label: 'Tenants',
			type: 'checkbox-group',
			options: tenants.map(
				(tenant: {
					firstName: string;
					lastName: string;
					email: string;
					id: string;
					companyName?: string;
				}) => ({
					label: `${tenant.companyName || ''} ${tenant.companyName && (tenant.firstName || tenant.lastName) ? ' - ' : ''}${tenant.firstName} ${tenant.lastName}`,
					value: tenant.id,
					email: tenant.email,
				}),
			),
			customComponent: renderTenantSelectField,
		},
		{
			name: 'fees',
			label: 'Fees',
			type: 'group',
			width: '100%',
			layout: 'row',
			groupFields: [
				{
					name: 'rent',
					type: 'decimal',
					label: 'Rent',
					width: isMobile ? '100%' : '48%',
					formatType: 'decimal',
					required: true,
					decimals: 2,
					placeholder: "0.00",
					adornment: {
						prefix: getCurrencySymbol(user.orgSettings?.settings),
					} as InputAdornmentType,
					validation: {
						schema: z.string().min(1, { message: 'Rent is required' }),
					},
				},
				{
					name: 'securityDeposit',
					type: 'decimal',
					label: 'Security Deposit',
					width: isMobile ? '100%' : '48%',
					formatType: 'decimal',
					decimals: 2,
					placeholder: "0.00",
					adornment: {
						prefix: getCurrencySymbol(user.orgSettings?.settings),
					} as InputAdornmentType,
				},
				{
					name: 'lateFeeAmount',
					type: 'decimal',
					label: 'Late Fee',
					width: isMobile ? '100%' : '48%',
					formatType: 'decimal',
					decimals: 2,
					placeholder: "0.00",
					adornment: {
						prefix: getCurrencySymbol(user.orgSettings?.settings),
					} as InputAdornmentType,
				},
			],
		},
		{
			name: 'leaseDates',
			label: 'Lease Dates',
			type: 'group',
			width: '100%',
			layout: 'row',
			groupFields: [
				{
					name: 'start',
					label: 'Start Date',
					type: 'date',
					required: true,
					width: isMobile ? '100%' : '48%',
					customComponent: (fieldApi, fieldConfig, form) =>
						renderLeaseDatesField(
							fieldApi,
							fieldConfig,
							form,
							'leaseDates.end',
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
								field: 'leaseDates.end',
								type: 'max',
								message: 'Lease start date must be before end date',
							},
						],
					},
				},
				{
					name: 'end',
					label: 'End Date',
					type: 'date',
					required: true,
					width: isMobile ? '100%' : '48%',
					customComponent: (fieldApi, fieldConfig, form) =>
						renderLeaseDatesField(
							fieldApi,
							fieldConfig,
							form,
							'leaseDates.start',
						),
					validation: {
						schema: z.any().refine((val) => {
							if (!val) {
								return false;
							} // Optional field
							const date = dayjs(val);
							return date.isValid();
						}, 'Lease end date is required'),
						dependencies: [
							{
								field: 'leaseDates.start',
								type: 'min',
								message: 'Lease end date must be after start date',
							},
						],
					},
				},
			],
		},

		{
			name: 'paymentFrequency',
			label: 'Payment Frequency',
			type: 'select',
			required: true,
			options: Object.values(PaymentFrequency).map((freq) => ({
				label: freq === PaymentFrequency.CUSTOM ? 'Custom (shortlets/daily rentals)' : freq,
				value: freq,
			})),
			width: isMobile ? '100%' : '48%',
			validation: {
				schema: z.string({ required_error: 'Payment frequency is required' }),
			},
		},
		{
			name: 'customPaymentFrequency',
			label: 'Select a custom payment interval',
			type: 'select',
			options: Array.from({ length: 6 }, (_, i) => ({
				label: i === 0 ? 'select interval' : `${i}`,
				value: `${i}`,
			})),
			width: '50%',
			required: (values) =>
				values.paymentFrequency === PaymentFrequency.CUSTOM,
			showIf: (values) =>
				values.paymentFrequency === PaymentFrequency.CUSTOM,
		},
		{
			name: 'rentDueDay',
			label: 'Payment Day',
			type: 'select',
			options: Array.from({ length: 30 }, (_, i) => ({
				label: i === 0 ? 'select due day' : `${i}`,
				value: `${i}`,
			})),
			width: '50%',
			showIf: (values) =>
				values.paymentFrequency === PaymentFrequency.MONTHLY ||
				values.paymentFrequency === PaymentFrequency.BI_MONTHLY,
		},
		{
			name: 'firstPaymentDate',
			showIf: (values) => !!values.leaseDates?.start,
			type: 'custom',
			label: '',
			component: (_, __, form: any) => {
				return (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Info sx={{ fontSize: 16, color: theme.palette.primary.main }} />
						<Typography variant='body2' textAlign='left'>
							First payment due on {calculateFirstPaymentDate(form.state.values)} {calculateDueDate(form.state.values) && `and next payment due on ${calculateDueDate(form.state.values)}`}
						</Typography>
					</Box>
				);
			},
		},
	];
	const validateLeaseDatesWithPaymentFrequency = (values: Record<string, any>): boolean => {
		const { leaseDates, paymentFrequency, customPaymentFrequency } = values;
		const { start, end } = leaseDates || {};

		if (!start || !end || !paymentFrequency) {
			return false;
		}

		const startDate = dayjs(start);
		const endDate = dayjs(end);

		const diffInDays = endDate.diff(startDate, 'day');
		const diffInMonths = endDate.diff(startDate, 'month');
		const diffInYears = endDate.diff(startDate, 'year');

		const frequencyChecks: Record<string, boolean> = {
			[PaymentFrequency.ANNUALLY]: diffInYears > 0,
			[PaymentFrequency.MONTHLY]: diffInMonths > 0,
			[PaymentFrequency.WEEKLY]: diffInDays > 7,
			[PaymentFrequency.BI_WEEKLY]: diffInDays > 14,
			[PaymentFrequency.QUARTERLY]: diffInDays > 90,
			[PaymentFrequency.BI_MONTHLY]: diffInDays > 60,
			[PaymentFrequency.CUSTOM]: !!customPaymentFrequency && customPaymentFrequency > 0 && diffInDays > customPaymentFrequency,
		};

		return paymentFrequency in frequencyChecks
			? !!frequencyChecks[paymentFrequency]
			: true;
	};
	const onSubmit = async (values: any) => {
		try {
			if (!validateLeaseDatesWithPaymentFrequency(values)) {
				throw new Error('Lease dates are not valid for the selected payment frequency');
			}
			const requestBody: LeaseFormValues = {
				name: values.name,
				startDate: values.leaseDates.start,
				endDate: values.leaseDates.end,
				tenantsIds: values.tenantsIds,
				unitId: values.property.unitId,
				rentDueDay: values.rentDueDay !== 0 ? Number(values.rentDueDay) : 0,
				rentAmount: Number(values.fees.rent),
				securityDeposit: Number(values.fees.securityDeposit),
				paymentFrequency: values.paymentFrequency,
				propertyName: values.property.name,
				customPaymentFrequency: values.customPaymentFrequency,
				lateFeeAmount: Number(values.fees.lateFeeAmount),
				firstPaymentDate: calculateDueDate(values),
				unitNumber: values.property.unitNumber,
				leaseConfig: {
					currency: user.orgSettings?.settings?.currency || 'NGN',
					currencySymbol: user.orgSettings?.settings?.currencySymbol || '₦',
				}
			};
			return await addLease(requestBody).unwrap();
		} catch (error: unknown) {
			const errorMessage =
				(error as any)?.message || 
				(error instanceof Error ? error.message : screenMessages.lease.create.error);
			throw new Error(errorMessage);
		}
	};

	const handleAllLeasesClick = () => {
		navigate('/leases');
	};
	const handleViewLeaseClick = (_: any, result: any) => {
		navigate(`/leases/${result?.id}`);
	};
	const handleViewTenantsClick = () => {
		navigate(`/tenants`);
	};
	const leaseFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: 'Add Lease',
		enableReset: true,
		resetButtonText: 'Cancel',
		fields: leaseFormFields,
		initialValues,
		isMultiStep: false,
		onSubmit,
		showBackdrop: true,
		backdropText: 'Please wait while we add your lease...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
		// header: renderHeader(),
		nextAction: {
			title: 'Lease Created',
			description: 'Your new lease was created successfully and ready for use',
			closeIcon: <Close />,
			onClose: handleAllLeasesClick,
			buttons: [
				{
					text: 'View Lease Details',
					onClick: handleViewLeaseClick,
					variant: 'klubiqOutlinedButton',
					autoFocus: true,
				},
				{
					text: 'View Tenants',
					onClick: handleViewTenantsClick,
					variant: 'klubiqMainButton',
					autoFocus: false,
				},
			],
			maxWidth: 'md',
			fullWidth: true,
			showAfterSubmit: true,
		},
	};

	return (
		<FormLayout Header={'Add Lease'}>
			{isLoading ? (
				<FormSkeleton
					rows={leaseFormFields.length}
					columns={[1, 1, 1]}
					sx={{ width: '100%', p: 2 }}
				/>
			) : (
				<Box sx={{ width: '100%', p: 2 }}>
					<KlubiqFormV1 {...leaseFormConfig} />
				</Box>
			)}
		</FormLayout>
	);
};

export default AddLeaseForm;
