/* eslint-disable no-unused-vars */
import FormLayout from '../../Layouts/FormLayout';
import { Grid, Typography, Button, Link } from '@mui/material';
import { LeaseFormStyle } from './style';
import ControlledTextField from '../ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ControlledSelect from '../ControlledComponents/ControlledSelect';
import Logo from '../../assets/images/info.svg';
import { useEffect, useMemo, useState, FC } from 'react';
import { consoleLog } from '../../helpers/debug-logger';
import { Stack } from '@mui/system';
import { useGetOrgPropertiesViewListQuery } from '../../store/LeaseStore/leaseApiSlice';
import { getAuthState } from '../../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import { find } from 'lodash';
import dayjs from 'dayjs';
import { getCurrencySymbol } from '../../helpers/utils';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { useDispatch } from 'react-redux';
import { useAddLeaseMutation } from '../../store/LeaseStore/leaseApiSlice';
import { useNavigate } from 'react-router-dom';
import FormSkeleton from '../skeletons/FormSkeleton';

enum PaymentFrequency {
	ANNUALLY = 'Annually',
	BI_MONTHLY = 'Bi-Monthly',
	BI_WEEKLY = 'Bi-Weekly',
	MONTHLY = 'Monthly',
	ONE_TIME = 'One-Time',
	QUARTERLY = 'Quarterly',
	WEEKLY = 'Weekly',
	// CUSTOM = 'Custom',
}

const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const frequencyOptions = Object.values(PaymentFrequency).map((freq) => ({
	id: freq,
	name: freq,
}));

interface AddLeaseFormProps {
	propertyId: string | null;
	unitId: string | null;
}

const AddLeaseForm: FC<AddLeaseFormProps> = ({ propertyId, unitId }) => {
	const { user, orgSettings } = useSelector(getAuthState);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [disabledButton, setDisabledButton] = useState(true);

	const [addLease] = useAddLeaseMutation();
	const { data: orgPropertiesViewList, isLoading: isLoadingOrgPropertiesView } =
		useGetOrgPropertiesViewListQuery({ orgId: user?.organizationUuid });

	const propertyNameOptions = orgPropertiesViewList?.properties?.map(
		(property: { uuid: string; name: string }) => ({
			id: property?.uuid,
			name: property?.name,
		}),
	);

	// const tenantOptions = orgPropertiesViewList?.tenants?.map(
	// 	(tenant: { id: string; firstName: string; lastName: string }) => ({
	// 		id: tenant.id,
	// 		name: `${tenant.firstName} ${tenant.lastName}`,
	// 	}),
	// );

	const validationSchema = yup.object({
		name: yup.string().required('field is required'),
		propertyName: yup.string().required('Select an option'),
		unitId: yup.string().required('Select an option'),
		tenantsIds: yup.array(),
		rentAmount: yup.number().required('field is required'),
		depositAmount: yup.number().required('field is required'),
		startDate: yup.string().required('field is required'),
		endDate: yup.string(),
		frequency: yup.string().required('field is required'),
		rentDueDay: yup.string(),
	});

	type formValues = {
		endDate: string;
		startDate: string;
		frequency: string;
		rentAmount: number | string;
		depositAmount: number | string;
		name: string;
		propertyName: string;
		unitId: number | string;
		unitName: string;
		tenantsIds: number[];
		rentDueDay: number | string;
	};

	const onSubmit = async (values: formValues) => {
		consoleLog(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			endDate: '',
			startDate: '',
			frequency: '',
			rentAmount: '',
			depositAmount: '',
			name: '',
			propertyName: '',
			unitId: '',
			unitName: '',
			tenantsIds: [],
			rentDueDay: '0',
		},
		validationSchema,
		onSubmit,
	});

	const propertyData = useMemo(
		() =>
			find(orgPropertiesViewList?.properties, {
				uuid: formik?.values?.propertyName,
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[formik?.values?.propertyName],
	);

	const unitsInProperty = propertyData?.units?.map(
		(unit: { id: string; unitNumber: string }) => ({
			id: unit?.id,
			name: unit?.unitNumber,
		}),
	);

	const getUnitNumber = find(unitsInProperty, {
		id: formik.values.unitId,
	});

	const rentDueDayOptions = Array.from({ length: 31 }, (_, index) => index).map(
		(value) => ({
			id: `${value}`,
			name: `${value === 0 ? 'select due day' : value} `,
		}),
	);

	useEffect(() => {
		formik.resetForm({ values: { ...formik.values, unitId: unitId ?? '' } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.propertyName]);

	useEffect(() => {	
		const {startDate, endDate} = formik.values;
		if (dayjs(startDate).isAfter(endDate)) {
			formik.setFieldValue('endDate', '');
			dispatch(
				openSnackbar({
					message: 'The lease end date cannot be before the start date',
					severity: 'warning',
					isOpen: true,
					duration: 2000,
				}),
			);
		}
	}, [formik.values.startDate, formik.values.endDate]);

	useEffect(() => {
		if (unitsInProperty?.length <= 1) {
			const unit = unitsInProperty[0];
			formik.setFieldValue('unitId', unit.id);
			formik.setFieldValue('unitName', unit.name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik?.values?.propertyName]);

	useEffect(() => {
		if (propertyId && orgPropertiesViewList) {
			consoleLog('propertyId', propertyId);
			const property = find(orgPropertiesViewList.properties, { uuid: propertyId });
			if (property) {
				formik.setFieldValue('propertyName', property.uuid);
				if (unitId) {
					consoleLog('unitId', unitId);
					const unit = find(property?.units, { id: unitId });
					consoleLog('unit', unit);
					formik.setFieldValue('unitId', unit?.id);
					formik.setFieldValue('unitName', unit?.unitNumber);
				}
			}
		}
	}, [propertyId, orgPropertiesViewList]);


	const rentDueOn = (
		endDate: string,
		startDate: string,
	): Record<string, string> => {
		consoleLog(dayjs(endDate).get('date'), 'end date');
		// const rentDueDay = dayjs(endDate).get('date');
		const startDayAndMonth = dayjs(startDate).format('MMMM DD');

		const quaterFromStartDay = dayjs(startDate).add(3, 'months');
		const quaterFromStartDayDate = quaterFromStartDay.format('MMMM DD, YYYY');
		const getQuarterDay = days[quaterFromStartDay.get('day')];

		const biMonthlyFromStartDay = dayjs(startDate).add(2, 'months');
		const biMonthlyDate = biMonthlyFromStartDay.format('MMMM DD, YYYY');
		const getBiMonthlyDay = days[biMonthlyFromStartDay.get('day')];

		const monthlyFromStartDay = dayjs(startDate).add(1, 'months');
		const monthlyDate = monthlyFromStartDay.format('MMMM DD, YYYY');
		const getMonthlyDay = days[monthlyFromStartDay.get('day')];

		const weeklyFromStartDay = dayjs(startDate).add(1, 'week');
		const weekDate = weeklyFromStartDay.format('MMMM DD, YYYY');
		const getWeekDay = days[weeklyFromStartDay.get('day')];

		const biWeeklyFromStartDay = dayjs(startDate).add(2, 'week');
		const biWeekDate = biWeeklyFromStartDay.format('MMMM DD, YYYY');
		const getBiWeekDay = days[biWeeklyFromStartDay.get('day')];

		return {
			[PaymentFrequency.WEEKLY]: `${getWeekDay}, ${weekDate}.`,
			[PaymentFrequency.BI_WEEKLY]: `${getBiWeekDay}, ${biWeekDate}.`,
			[PaymentFrequency.MONTHLY]: `${getMonthlyDay}, ${monthlyDate}.`,
			[PaymentFrequency.ANNUALLY]: `${startDayAndMonth}`,
			[PaymentFrequency.ONE_TIME]: `Once on ${startDayAndMonth}`,
			[PaymentFrequency.BI_MONTHLY]: `${getBiMonthlyDay}, ${biMonthlyDate}.`,
			[PaymentFrequency.QUARTERLY]: `${getQuarterDay}, ${quaterFromStartDayDate}.`,
			// [PaymentFrequency.CUSTOM]: `See lease agreement`,
		};
	};

	useEffect(() => {
		const {
			name,
			propertyName,
			rentAmount,
			startDate,
			frequency,
			depositAmount,
			unitId,
		} = formik.values;

		if (
			!name ||
			!propertyName ||
			!rentAmount ||
			!startDate ||
			!frequency ||
			!depositAmount ||
			!unitId
		) {
			setDisabledButton(true);
		} else {
			setDisabledButton(false);
		}
	}, [formik.values]);

	const handleAddLease = async () => {
		const requestBody: any = {
			name: formik.values.name,
			startDate: formik.values.startDate,
			// endDate: formik.values.endDate,
			newTenants: null,
			tenantsIds: formik.values.tenantsIds,
			unitId: formik.values.unitId,
			rentDueDay: formik.values?.rentDueDay && Number(formik.values.rentDueDay),
			rentAmount: formik.values.rentAmount && Number(formik.values.rentAmount),
			securityDeposit:
				formik.values.depositAmount && Number(formik.values.depositAmount),
			isDraft: false,
			paymentFrequency: formik.values.frequency,
			status: null,
			propertyName: propertyData?.name,
			firstPaymentDate: rentDueOn(
				formik.values?.endDate,
				formik.values?.startDate,
			)[formik.values?.frequency],
			unitNumber: getUnitNumber?.name,
		};

		if (formik.values.endDate) {
			requestBody['endDate'] = formik.values.endDate;
		}

		try {
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
		} catch (e) {
			consoleLog(e as any);

			dispatch(
				openSnackbar({
					message: 'Error saving lease.Please try again',
					severity: 'error',
					isOpen: true,
					duration: 2000,
				}),
			);
		}

	};

	return (
		<FormLayout Header='LEASE INFORMATION' sx={LeaseFormStyle.card}>
			{isLoadingOrgPropertiesView ? (
				<FormSkeleton rows={8} columns={[1, 1, 1, 1, 1, 1, 1, 1]} sx={LeaseFormStyle.content} />
			) : (
				<Grid container spacing={0} sx={LeaseFormStyle.content}>
					<Grid item xs={12}>
						<ControlledTextField
							name='name'
							label='Lease Name'
							formik={formik}
							type='text'
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledSelect
							name='propertyName'
							label='Property Name'
							type='text'
							formik={formik}
							options={propertyNameOptions}
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledSelect
							name='unitId'
							label='Unit'
							type='text'
							formik={formik}
							options={unitsInProperty}
							disabled={!unitsInProperty || unitsInProperty?.length <= 1}
						/>
					</Grid>
					<Grid item xs={12}>
						<Link
							component='button'
							variant='body2'
							sx={{
								position: 'absolute',
								right: '25px',
							}}
							onClick={() => {
								navigate(`/tenants/add-tenant?property=${propertyData?.uuid}`, {
									state: {
										currentProperty: propertyData,
									},
								});
							}}
						>
							Add tenant
						</Link>
						<ControlledSelect
							multiple={true}
							name='tenantsIds'
							label='Tenant'
							type='text'
							formik={formik}
							options={[]}
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledTextField
							name='rentAmount'
							label='Rent Amount'
							formik={formik}
							type='number'
							showCurrency
							currencySymbol={getCurrencySymbol(orgSettings) as string}
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledTextField
							name='depositAmount'
							label='Deposit Amount'
							type='number'
							formik={formik}
							showCurrency
							currencySymbol={getCurrencySymbol(orgSettings) as string}
						/>
					</Grid>

					<Grid container>
						<Grid item xs={6} sm={6} md={6} lg={6}>
							<ControlledTextField
								name='startDate'
								label='Lease Start Date'
								formik={formik}
								type='date'
							/>
						</Grid>
						<Grid item xs={6} sm={6} md={6} lg={6}>
							<ControlledTextField
								name='endDate'
								label='Lease End Date'
								formik={formik}
								type='date'
							/>
						</Grid>
					</Grid>

					<Grid item xs={6}>
						<ControlledSelect
							name='frequency'
							label='Payment Frequency *'
							type='text'
							formik={formik}
							options={frequencyOptions}
						/>
					</Grid>
					<Grid item xs={6}>
						{formik.values.frequency === 'Monthly' ||
						formik.values.frequency === 'Bi-Monthly' ? (
							<ControlledSelect
								name='rentDueDay'
								label='Payment Day'
								type='number'
								formik={formik}
								options={rentDueDayOptions}
							/>
						) : null}
					</Grid>

					<Grid item xs={12} sx={LeaseFormStyle.infobox}>
						<img src={Logo} alt='logo' style={LeaseFormStyle.infoimg} />

						<Typography variant='subtitle2' sx={LeaseFormStyle.infotypo}>
							{formik.values.endDate &&
							formik.values.startDate &&
							formik.values.frequency
								? `The first rent payment will be due on ${rentDueOn(formik.values.endDate, formik.values.startDate)[formik.values.frequency]}`
								: 'Your payment due date will be determined'}
						</Typography>
					</Grid>

					<Stack
						direction={'row'}
						gap={3}
						justifyContent={'flex-end'}
						width={'100%'}
						mt={10}
					>
						<Button variant='text' sx={LeaseFormStyle.button}>
							Cancel
						</Button>
						<Button
							variant='contained'
							sx={LeaseFormStyle.button}
							onClick={handleAddLease}
							disabled={disabledButton}
						>
							Add Lease
						</Button>
					</Stack>
				</Grid>
			)}
		</FormLayout>
	);
};

export default AddLeaseForm;
