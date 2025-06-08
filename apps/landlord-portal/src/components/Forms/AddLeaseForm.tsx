// /* eslint-disable no-unused-vars */
// import FormLayout from '../../Layouts/FormLayout';
// import { Grid, Typography, Button, Link } from '@mui/material';
// import { LeaseFormStyle } from './style';
// import ControlledTextField from '../ControlledComponents/ControlledTextField';
// import * as yup from 'yup';
// import { useFormik } from 'formik';
// import ControlledSelect from '../ControlledComponents/ControlledSelect';
// import Logo from '../../assets/images/info.svg';
// import { useEffect, useMemo, useState, FC } from 'react';
// import { consoleLog } from '../../helpers/debug-logger';
// import { Stack } from '@mui/system';
// import { useGetOrgPropertiesViewListQuery } from '../../store/LeaseStore/leaseApiSlice';
// import { getAuthState } from '../../store/AuthStore/AuthSlice';
// import { useSelector } from 'react-redux';
// import { find } from 'lodash';
// import dayjs from 'dayjs';
// import { getCurrencySymbol } from '../../helpers/utils';
// import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
// import { useDispatch } from 'react-redux';
// import { useAddLeaseMutation } from '../../store/LeaseStore/leaseApiSlice';
// import { useNavigate } from 'react-router-dom';
// import FormSkeleton from '../skeletons/FormSkeleton';

// enum PaymentFrequency {
// 	ANNUALLY = 'Annually',
// 	BI_MONTHLY = 'Bi-Monthly',
// 	BI_WEEKLY = 'Bi-Weekly',
// 	MONTHLY = 'Monthly',
// 	ONE_TIME = 'One-Time',
// 	QUARTERLY = 'Quarterly',
// 	WEEKLY = 'Weekly',
// 	// CUSTOM = 'Custom',
// }

// const days = [
// 	'Sunday',
// 	'Monday',
// 	'Tuesday',
// 	'Wednesday',
// 	'Thursday',
// 	'Friday',
// 	'Saturday',
// ];

// const frequencyOptions = Object.values(PaymentFrequency).map((freq) => ({
// 	id: freq,
// 	name: freq,
// }));

// interface AddLeaseFormProps {
// 	propertyId: string | null;
// 	unitId: string | null;
// }

// const AddLeaseForm: FC<AddLeaseFormProps> = ({ propertyId, unitId }) => {
// 	const { user } = useSelector(getAuthState);

// 	const dispatch = useDispatch();

// 	const navigate = useNavigate();

// 	const [disabledButton, setDisabledButton] = useState(true);

// 	const [addLease] = useAddLeaseMutation();
// 	const { data: orgPropertiesViewList, isLoading: isLoadingOrgPropertiesView } =
// 		useGetOrgPropertiesViewListQuery({ orgId: user?.organizationUuid });

// 	const propertyNameOptions = orgPropertiesViewList?.properties?.map(
// 		(property: { uuid: string; name: string }) => ({
// 			id: property?.uuid,
// 			name: property?.name,
// 		}),
// 	);

// 	// const tenantOptions = orgPropertiesViewList?.tenants?.map(
// 	// 	(tenant: { id: string; firstName: string; lastName: string }) => ({
// 	// 		id: tenant.id,
// 	// 		name: `${tenant.firstName} ${tenant.lastName}`,
// 	// 	}),
// 	// );

// 	const validationSchema = yup.object({
// 		name: yup.string().required('field is required'),
// 		propertyName: yup.string().required('Select an option'),
// 		unitId: yup.string().required('Select an option'),
// 		tenantsIds: yup.array(),
// 		rentAmount: yup.number().required('field is required'),
// 		depositAmount: yup.number().required('field is required'),
// 		startDate: yup.string().required('field is required'),
// 		endDate: yup.string(),
// 		frequency: yup.string().required('field is required'),
// 		rentDueDay: yup.string(),
// 	});

// 	type formValues = {
// 		endDate: string;
// 		startDate: string;
// 		frequency: string;
// 		rentAmount: number | string;
// 		depositAmount: number | string;
// 		name: string;
// 		propertyName: string;
// 		unitId: number | string;
// 		unitName: string;
// 		tenantsIds: number[];
// 		rentDueDay: number | string;
// 	};

// 	const onSubmit = async (values: formValues) => {
// 		consoleLog(values, 'val');
// 	};

// 	const formik = useFormik({
// 		initialValues: {
// 			endDate: '',
// 			startDate: '',
// 			frequency: '',
// 			rentAmount: '',
// 			depositAmount: '',
// 			name: '',
// 			propertyName: '',
// 			unitId: '',
// 			unitName: '',
// 			tenantsIds: [],
// 			rentDueDay: '0',
// 		},
// 		validationSchema,
// 		onSubmit,
// 	});

// 	const propertyData = useMemo(
// 		() =>
// 			find(orgPropertiesViewList?.properties, {
// 				uuid: formik?.values?.propertyName,
// 			}),
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 		[formik?.values?.propertyName],
// 	);

// 	const unitsInProperty = propertyData?.units?.map(
// 		(unit: { id: string; unitNumber: string }) => ({
// 			id: unit?.id,
// 			name: unit?.unitNumber,
// 		}),
// 	);

// 	const getUnitNumber = find(unitsInProperty, {
// 		id: formik.values.unitId,
// 	});

// 	const rentDueDayOptions = Array.from({ length: 31 }, (_, index) => index).map(
// 		(value) => ({
// 			id: `${value}`,
// 			name: `${value === 0 ? 'select due day' : value} `,
// 		}),
// 	);

// 	useEffect(() => {
// 		formik.resetForm({ values: { ...formik.values, unitId: unitId ?? '' } });
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [formik.values.propertyName]);

// 	useEffect(() => {
// 		const {startDate, endDate} = formik.values;
// 		if (dayjs(startDate).isAfter(endDate)) {
// 			formik.setFieldValue('endDate', '');
// 			dispatch(
// 				openSnackbar({
// 					message: 'The lease end date cannot be before the start date',
// 					severity: 'warning',
// 					isOpen: true,
// 					duration: 2000,
// 				}),
// 			);
// 		}
// 	}, [formik.values.startDate, formik.values.endDate]);

// 	useEffect(() => {
// 		if (unitsInProperty?.length <= 1) {
// 			const unit = unitsInProperty[0];
// 			formik.setFieldValue('unitId', unit.id);
// 			formik.setFieldValue('unitName', unit.name);
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [formik?.values?.propertyName]);

// 	useEffect(() => {
// 		if (propertyId && orgPropertiesViewList) {
// 			consoleLog('propertyId', propertyId);
// 			const property = find(orgPropertiesViewList.properties, { uuid: propertyId });
// 			if (property) {
// 				formik.setFieldValue('propertyName', property.uuid);
// 				if (unitId) {
// 					consoleLog('unitId', unitId);
// 					const unit = find(property?.units, { id: unitId });
// 					consoleLog('unit', unit);
// 					formik.setFieldValue('unitId', unit?.id);
// 					formik.setFieldValue('unitName', unit?.unitNumber);
// 				}
// 			}
// 		}
// 	}, [propertyId, orgPropertiesViewList]);

// 	const rentDueOn = (
// 		endDate: string,
// 		startDate: string,
// 	): Record<string, string> => {
// 		consoleLog(dayjs(endDate).get('date'), 'end date');
// 		// const rentDueDay = dayjs(endDate).get('date');
// 		const startDayAndMonth = dayjs(startDate).format('MMMM DD');

// 		const quaterFromStartDay = dayjs(startDate).add(3, 'months');
// 		const quaterFromStartDayDate = quaterFromStartDay.format('MMMM DD, YYYY');
// 		const getQuarterDay = days[quaterFromStartDay.get('day')];

// 		const biMonthlyFromStartDay = dayjs(startDate).add(2, 'months');
// 		const biMonthlyDate = biMonthlyFromStartDay.format('MMMM DD, YYYY');
// 		const getBiMonthlyDay = days[biMonthlyFromStartDay.get('day')];

// 		const monthlyFromStartDay = dayjs(startDate).add(1, 'months');
// 		const monthlyDate = monthlyFromStartDay.format('MMMM DD, YYYY');
// 		const getMonthlyDay = days[monthlyFromStartDay.get('day')];

// 		const weeklyFromStartDay = dayjs(startDate).add(1, 'week');
// 		const weekDate = weeklyFromStartDay.format('MMMM DD, YYYY');
// 		const getWeekDay = days[weeklyFromStartDay.get('day')];

// 		const biWeeklyFromStartDay = dayjs(startDate).add(2, 'week');
// 		const biWeekDate = biWeeklyFromStartDay.format('MMMM DD, YYYY');
// 		const getBiWeekDay = days[biWeeklyFromStartDay.get('day')];

// 		return {
// 			[PaymentFrequency.WEEKLY]: `${getWeekDay}, ${weekDate}.`,
// 			[PaymentFrequency.BI_WEEKLY]: `${getBiWeekDay}, ${biWeekDate}.`,
// 			[PaymentFrequency.MONTHLY]: `${getMonthlyDay}, ${monthlyDate}.`,
// 			[PaymentFrequency.ANNUALLY]: `${startDayAndMonth}`,
// 			[PaymentFrequency.ONE_TIME]: `Once on ${startDayAndMonth}`,
// 			[PaymentFrequency.BI_MONTHLY]: `${getBiMonthlyDay}, ${biMonthlyDate}.`,
// 			[PaymentFrequency.QUARTERLY]: `${getQuarterDay}, ${quaterFromStartDayDate}.`,
// 			// [PaymentFrequency.CUSTOM]: `See lease agreement`,
// 		};
// 	};

// 	useEffect(() => {
// 		const {
// 			name,
// 			propertyName,
// 			rentAmount,
// 			startDate,
// 			frequency,
// 			depositAmount,
// 			unitId,
// 		} = formik.values;

// 		if (
// 			!name ||
// 			!propertyName ||
// 			!rentAmount ||
// 			!startDate ||
// 			!frequency ||
// 			!depositAmount ||
// 			!unitId
// 		) {
// 			setDisabledButton(true);
// 		} else {
// 			setDisabledButton(false);
// 		}
// 	}, [formik.values]);

// 	const handleAddLease = async () => {
// 		const requestBody: any = {
// 			name: formik.values.name,
// 			startDate: formik.values.startDate,
// 			// endDate: formik.values.endDate,
// 			newTenants: null,
// 			tenantsIds: formik.values.tenantsIds,
// 			unitId: formik.values.unitId,
// 			rentDueDay: formik.values?.rentDueDay && Number(formik.values.rentDueDay),
// 			rentAmount: formik.values.rentAmount && Number(formik.values.rentAmount),
// 			securityDeposit:
// 				formik.values.depositAmount && Number(formik.values.depositAmount),
// 			isDraft: false,
// 			paymentFrequency: formik.values.frequency,
// 			status: null,
// 			propertyName: propertyData?.name,
// 			firstPaymentDate: rentDueOn(
// 				formik.values?.endDate,
// 				formik.values?.startDate,
// 			)[formik.values?.frequency],
// 			unitNumber: getUnitNumber?.name,
// 		};

// 		if (formik.values.endDate) {
// 			requestBody['endDate'] = formik.values.endDate;
// 		}

// 		try {
// 			await addLease(requestBody).unwrap();

// 			dispatch(
// 				openSnackbar({
// 					message: 'Lease successfully added',
// 					severity: 'success',
// 					isOpen: true,
// 					duration: 2000,
// 				}),
// 			);

// 			navigate(-1);
// 		} catch (e) {
// 			consoleLog(e as any);

// 			dispatch(
// 				openSnackbar({
// 					message: 'Error saving lease.Please try again',
// 					severity: 'error',
// 					isOpen: true,
// 					duration: 2000,
// 				}),
// 			);
// 		}

// 	};

// 	return (
// 		<FormLayout Header='LEASE INFORMATION' sx={LeaseFormStyle.card}>
// 			{isLoadingOrgPropertiesView ? (
// 				<FormSkeleton rows={8} columns={[1, 1, 1, 1, 1, 1, 1, 1]} sx={LeaseFormStyle.content} />
// 			) : (
// 				<Grid container spacing={0} sx={LeaseFormStyle.content}>
// 					<Grid item xs={12}>
// 						<ControlledTextField
// 							name='name'
// 							label='Lease Name'
// 							formik={formik}
// 							type='text'
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<ControlledSelect
// 							name='propertyName'
// 							label='Property Name'
// 							type='text'
// 							formik={formik}
// 							options={propertyNameOptions}
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<ControlledSelect
// 							name='unitId'
// 							label='Unit'
// 							type='text'
// 							formik={formik}
// 							options={unitsInProperty}
// 							disabled={!unitsInProperty || unitsInProperty?.length <= 1}
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<Link
// 							component='button'
// 							variant='body2'
// 							sx={{
// 								position: 'absolute',
// 								right: '25px',
// 							}}
// 							onClick={() => {
// 								navigate(`/tenants/add-tenant?property=${propertyData?.uuid}`, {
// 									state: {
// 										currentProperty: propertyData,
// 									},
// 								});
// 							}}
// 						>
// 							Add tenant
// 						</Link>
// 						<ControlledSelect
// 							multiple={true}
// 							name='tenantsIds'
// 							label='Tenant'
// 							type='text'
// 							formik={formik}
// 							options={[]}
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<ControlledTextField
// 							name='rentAmount'
// 							label='Rent Amount'
// 							formik={formik}
// 							type='number'
// 							showCurrency
// 							currencySymbol={getCurrencySymbol(user?.orgSettings) as string}
// 						/>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<ControlledTextField
// 							name='depositAmount'
// 							label='Deposit Amount'
// 							type='number'
// 							formik={formik}
// 							showCurrency
// 							currencySymbol={getCurrencySymbol(user?.orgSettings) as string}
// 						/>
// 					</Grid>

// 					<Grid container>
// 						<Grid item xs={6} sm={6} md={6} lg={6}>
// 							<ControlledTextField
// 								name='startDate'
// 								label='Lease Start Date'
// 								formik={formik}
// 								type='date'
// 							/>
// 						</Grid>
// 						<Grid item xs={6} sm={6} md={6} lg={6}>
// 							<ControlledTextField
// 								name='endDate'
// 								label='Lease End Date'
// 								formik={formik}
// 								type='date'
// 							/>
// 						</Grid>
// 					</Grid>

// 					<Grid item xs={6}>
// 						<ControlledSelect
// 							name='frequency'
// 							label='Payment Frequency *'
// 							type='text'
// 							formik={formik}
// 							options={frequencyOptions}
// 						/>
// 					</Grid>
// 					<Grid item xs={6}>
// 						{formik.values.frequency === 'Monthly' ||
// 						formik.values.frequency === 'Bi-Monthly' ? (
// 							<ControlledSelect
// 								name='rentDueDay'
// 								label='Payment Day'
// 								type='number'
// 								formik={formik}
// 								options={rentDueDayOptions}
// 							/>
// 						) : null}
// 					</Grid>

// 					<Grid item xs={12} sx={LeaseFormStyle.infobox}>
// 						<img src={Logo} alt='logo' style={LeaseFormStyle.infoimg} />

// 						<Typography variant='subtitle2' sx={LeaseFormStyle.infotypo}>
// 							{formik.values.endDate &&
// 							formik.values.startDate &&
// 							formik.values.frequency
// 								? `The first rent payment will be due on ${rentDueOn(formik.values.endDate, formik.values.startDate)[formik.values.frequency]}`
// 								: 'Your payment due date will be determined'}
// 						</Typography>
// 					</Grid>

// 					<Stack
// 						direction={'row'}
// 						gap={3}
// 						justifyContent={'flex-end'}
// 						width={'100%'}
// 						mt={10}
// 					>
// 						<Button variant='klubiqTextButton'>
// 							Cancel
// 						</Button>
// 						<Button
// 							variant='klubiqMainButton'
// 							//sx={LeaseFormStyle.button}
// 							onClick={handleAddLease}
// 							disabled={disabledButton}
// 						>
// 							Add Lease
// 						</Button>
// 					</Stack>
// 				</Grid>
// 			)}
// 		</FormLayout>
// 	);
// };

// export default AddLeaseForm;

import { DynamicTanstackFormProps, KlubiqForm, InputAdornment as InputAdornmentType,
	FormFieldV1,
	KlubiqFormV1, } from '@klubiq/ui-components';
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
import { FormField } from '@klubiq/ui-components';
import { FC, useMemo, useState } from 'react';

import FormLayout from '../../Layouts/FormLayout';
import FormSkeleton from '../skeletons/FormSkeleton';

import { consoleLog } from '../../helpers/debug-logger';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/system/useMediaQuery';
import { z } from 'zod';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { TenantDialog } from '../CustomFormComponents/TenantDialog';
import { Info } from '@mui/icons-material';
import { LeftArrowIcon } from '../Icons/LeftArrowIcon';


function renderPropertySelectField(fieldApi: any, fieldConfig: any, form: any) {
	const options = Array.isArray(fieldConfig.options)
				? fieldConfig.options
				: typeof fieldConfig.options === 'function'
					? fieldConfig.options(form.state.values)
					: [];
	return (
		<Box sx={{ width: '100%' }}>
			<Select
						value={fieldApi.state.value?.value || ''}
						placeholder={fieldConfig.placeholder}
						onChange={(e) => {
							const selectedProperty = find(options, { value: e.target.value });
							form.setFieldValue('selectedProperty', selectedProperty);
							form.setFieldValue('unitId', selectedProperty.units[0].id);
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
						value={fieldApi.state.value?.value || ''}
						placeholder={fieldConfig.placeholder}
						onChange={(e) => {
							const selectedUnit = find(options, { value: e.target.value });
							form.setFieldValue('selectedUnit', selectedUnit);
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
interface NewTenant {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	
}
interface LeaseFormValues {
	name: string;
	startDate: string;
	endDate?: string;
	newTenants?: NewTenant[];
	tenantsIds: string[];
	unitId: string;
	rentDueDay: number;
	rentAmount: number;
	securityDeposit?: number;
	paymentFrequency: PaymentFrequency;
	propertyName: string;
	firstPaymentDate?: string;
	unitNumber: string;
}

const AddLeaseForm: FC<AddLeaseFormProps> = ({ propertyId }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
	const { user } = useSelector(getAuthState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [addLease] = useAddLeaseMutation();
	const queryResult = useGetOrgPropertiesViewListQuery({orgId: user?.organizationUuid}, {
		selectFromResult: ({ data, isLoading: loading }) => ({
			properties: data?.properties ? [...data.properties].sort(sortByName) : [],
			tenants: data?.tenants ? [...data.tenants].sort(sortByName) : [],
			isLoading: loading,
		}),
	});
	const { properties, tenants, isLoading } = queryResult;
	const { data: orgPropertiesViewList, isLoading: loading } =
		useGetOrgPropertiesViewListQuery({
			orgId: user?.organizationUuid,
		});

	consoleLog('properties', orgPropertiesViewList);

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

	const propertyData = useMemo(
		() => find(properties, { uuid: propertyId }),
		[properties, propertyId],
	);
	const calculateDueDate = (values: any) => {
		if (!values?.paymentFrequency || !values?.startDate || !values?.endDate) {
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
				schema: z.string({required_error: 'Lease name is required'}),
			},
		},
		{
			name: 'propertyName',
			label: 'Property Name',
			type: 'select',
			required: true,
			options: properties.map((property: Property) => ({
						label: property.name,
						value: property.uuid,
					})),
			validation: {
				schema: z.string({required_error: 'Property name is required'}),
			},
			customComponent: renderPropertySelectField,
		},
		{
			name: 'unitId',
			label: 'Unit',
			type: 'select',
			required: true,
			options: (values) => values.selectedProperty?.units.map((unit: { id: string; unitNumber: string }) => ({
				label: unit.unitNumber,
				value: unit.id,
			})),
			showIf: (values) => !!values.propertyName,
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
			validation: {
				schema: z.number({required_error: 'Rent amount is required'}).min(1, {message: 'Rent amount must be greater than 0'}),
			},
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
			validation: {
				schema: z.number().nullable().optional(),
			},
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
				schema: z.date({required_error: 'Lease start date is required'}),
				dependencies: [
					{
						field: 'endDate',
						type: 'min',
						message: 'Lease start date must be before end date',
					},
				],
			},
		},
		{
			name: 'endDate',
			label: 'Lease End Date',
			type: 'date',
			width: '50%',
			validation: {
				schema: z.date().nullable().optional(),
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
				values.frequency === 'Monthly' || values.frequency === 'Bi-Monthly',
		},
		{
			name: 'firstPaymentDate',
			type: 'custom',
			label: '',
			component: (_, __, form: any) => {
				return (
					<Typography variant='body2' textAlign='left' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Info sx={{ fontSize: 16, color: theme.palette.primary.main }} />
						<span>{calculateDueDate(form.state.values)}</span>
					</Typography>
				)
			}
		},
	];
	const handleSubmit = async (values: LeaseFormValues) => {
		try {
			const requestBody = {
				name: values.name,
				startDate: values.startDate,
				endDate: values.endDate,
				newTenants: null,
				tenantsIds: values.tenantsIds,
				unitId: values.unitId,
				rentDueDay: values.rentDueDay ? Number(values.rentDueDay) : undefined,
				rentAmount: Number(values.rentAmount),
				securityDeposit: Number(values.securityDeposit),
				isDraft: false,
				paymentFrequency: values.paymentFrequency,
				status: null,
				propertyName: propertyData?.name,
				firstPaymentDate: calculateDueDate(values),
				unitNumber: find(propertyData?.units, { id: values.unitId })
					?.unitNumber,
			};

			await addLease(requestBody).unwrap();

			dispatch(
				openSnackbar({
					message: 'Lease successfully added',
					severity: 'success',
					isOpen: true,
					duration: 2000,
				}),
			);

			navigate(-1);
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
	};

	const handleAllLeasesClick = () => {
		navigate('/leases');
	}

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
		onSubmit: handleAddLease,
		showTopBackButton: true,
		showBackdrop: true,
		backdropText: 'Please wait while we add your lease...',
		topBackButton: {
			showDialog: true,
			dialogTitle: 'Are you sure you want to leave?',
			dialogDescription: 'You have unsaved changes. If you leave now, your changes will be lost.',
			dialogConfirmButtonText: 'Leave',
			dialogCancelButtonText: 'Continue Creating Lease',
			onClick: handleAllLeasesClick,
			text: 'All Leases',
			variant: 'klubiqTextButton',
			startIcon: <LeftArrowIcon />,
		},
		fullWidthButtons: !!isMobile,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
	}


	return (
		<FormLayout Header={'Add Lease'}>
			{loading ? (
				<FormSkeleton rows={leaseFormFields.length} columns={[1, 1, 1]} />
			) : (
				<KlubiqFormV1 {...leaseFormConfig} />
			)}
		</FormLayout>
	);
};

export default AddLeaseForm;
