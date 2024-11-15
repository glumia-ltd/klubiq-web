/* eslint-disable no-unused-vars */
import FormLayout from '../../../Layouts/FormLayout';
import { Grid, Typography, Skeleton, Button, Link } from '@mui/material';
import style from './style';
import ControlledTextField from '../../ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ControlledSelect from '../../ControlledComponents/ControlledSelect';
import Logo from '../../../assets/images/info.svg';
import { useEffect } from 'react';
import { consoleLog } from '../../../helpers/debug-logger';
import { Stack } from '@mui/system';
import { useGetOrgPropertiesViewListQuery } from '../../../store/LeaseStore/leaseApiSlice';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import { find } from 'lodash';

enum PaymentFrequency {
	ANNUALLY = 'Annually',
	BI_MONTHLY = 'Bi-Monthly',
	BI_WEEKLY = 'Bi-Weekly',
	MONTHLY = 'Monthly',
	ONE_TIME = 'One Time',
	QUARTERLY = 'Quarterly',
	WEEKLY = 'Weekly',
	// CUSTOM = 'Custom',
}

const frequencyOptions = Object.values(PaymentFrequency).map((freq) => ({
	id: freq,
	name: freq,
}));

const AddLeaseForm = () => {
	const { user } = useSelector(getAuthState);

	const { data: orgPropertiesViewList, isLoading: isLoadingOrgPropertiesView } =
		useGetOrgPropertiesViewListQuery(user?.organizationId);

	const propertyNameOptions = orgPropertiesViewList?.map(
		(property: { uuid: string; name: string }) => ({
			id: property?.uuid,
			name: property?.name,
		}),
	);

	const validationSchema = yup.object({
		nickname: yup.string().required('field is required'),
		// description: yup.string().required('This field is required'),
		unit: yup.string().required('Select an option'),
		propertyName: yup.string().required('Select an option'),
		tenant: yup.string().required('Select an option'),
		rentAmount: yup.string().required('field is required'),
		depositAmount: yup.string().required('field is required'),
		frequency: yup.string().required('field is required'),
		startDate: yup.string().required('field is required'),
		endDate: yup.string().required('field is required'),
	});

	type formValues = {
		endDate: string;
		startDate: string;
		frequency: string;
		rentAmount: string;
		depositAmount: string;
		nickname: string;
		propertyName: string;
		unit: string;
		tenant: string;
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
			nickname: '',
			propertyName: '',
			unit: '',
			tenant: '',
		},
		validationSchema,
		onSubmit,
	});

	const getUnitsInProperty = find(orgPropertiesViewList, {
		uuid: formik.values.propertyName,
	});

	const unitsInProperty = getUnitsInProperty?.units?.map(
		(unit: { id: string; unitNumber: string }) => ({
			id: unit?.id,
			name: unit?.unitNumber,
		}),
	);

	useEffect(() => {
		formik.resetForm({ values: { ...formik.values, unit: '' } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.propertyName]);

	//  const RENT_DUE_ON = (
	// rentDueDay: number,
	// startDate: string,
	//  ): Record<PaymentFrequency, string> => {

	// const startDayAndMonth = DateTime.fromISO(startDate).toFormat('dd LLL');
	// const day: string = DateTime.fromISO(startDate).weekdayLong;

	// return ({
	// [PaymentFrequency.WEEKLY]: ${day} every week,
	// [PaymentFrequency.BI_WEEKLY]: ${day} Bi-Weekly,
	// [PaymentFrequency.MONTHLY]: ${rentDueDay}<sup>${getDaySuffix(rentDueDay)}</sup> of every month,
	// [PaymentFrequency.ANNUALLY]: ${startDayAndMonth} every year,
	// [PaymentFrequency.ONE_TIME]: Once on ${startDayAndMonth},
	// [PaymentFrequency.BI_MONTHLY]: ${rentDueDay}<sup>${getDaySuffix(rentDueDay)}</sup> of every other month,
	// [PaymentFrequency.QUARTERLY]: Quarterly on ${day},
	// [PaymentFrequency.CUSTOM]: See lease agreement,
	//  });
	// };

	return (
		<FormLayout Header='LEASE INFORMATION' sx={style.card}>
			{isLoadingOrgPropertiesView ? (
				<Grid container spacing={1} sx={style.content}>
					<Grid item xs={12}>
						<Skeleton variant='text' height={25} width='50%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12} sx={style.skeleton}>
						<Skeleton variant='text' height={25} width='50%' />

						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={12} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={6} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='40%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>{' '}
					<Grid item xs={6}></Grid>
					<Grid item xs={6} sm={6} md={3} lg={3}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} />
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} />
					</Grid>
					<Grid item xs={12}>
						<Skeleton variant='text' sx={style.skeleton} width='90%' />
					</Grid>
				</Grid>
			) : (
				<Grid container spacing={0} sx={style.content}>
					<Grid item xs={12}>
						<ControlledTextField
							name='nickname'
							label='Lease Nickname'
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
							name='unit'
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
								console.log('clicked');
							}}
						>
							Add tenant
						</Link>
						<ControlledSelect
							name='tenant'
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
							type='text'
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledTextField
							name='depositAmount'
							label='Deposit Amount'
							type='text'
							formik={formik}
						/>
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
					<Grid item xs={6}></Grid>

					<Grid item xs={6} sm={6} md={3} lg={3}>
						<ControlledTextField
							name='startDate'
							label='Lease Start Date'
							formik={formik}
							type='date'
						/>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3}>
						<ControlledTextField
							name='endDate'
							label='Lease End Date'
							formik={formik}
							type='date'
						/>
					</Grid>
					<Grid item xs={12} sx={style.infobox}>
						<img src={Logo} alt='logo' style={style.infoimg} />

						<Typography variant='subtitle2' sx={style.infotypo}>
							The first rent payment will be due on 24 April 2024 and then every
							year on the same date
						</Typography>
					</Grid>

					<Stack
						direction={'row'}
						gap={3}
						justifyContent={'flex-end'}
						width={'100%'}
						mt={10}
					>
						<Button variant='text' sx={style.button}>
							Cancel
						</Button>
						<Button variant='contained' sx={style.button}>
							Add Lease
						</Button>
					</Stack>
				</Grid>
			)}
		</FormLayout>
	);
};

export default AddLeaseForm;
