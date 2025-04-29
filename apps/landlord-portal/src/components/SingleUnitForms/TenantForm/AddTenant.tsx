import FormLayout from '../../../Layouts/FormLayout';
import { Grid, Typography, Box, Button, Skeleton } from '@mui/material';
import style from './style';
import ControlledTextField from '../../ControlledComponents/ControlledTextField';
import { useState, useEffect } from 'react';
import { find } from 'lodash';
import { useFormik } from 'formik';
import { useGetRolesQuery } from '../../../store/GlobalStore/globalApiSlice';
import { api } from '../../../api';
import { tenantEndpoints } from '../../../helpers/endpoints';
import { getCurrencySymbol } from '../../../helpers/utils';
import { validationSchema, formValues, AddTenantFormProps } from './validation';
import { openSnackbar } from '../../../store/SnackbarStore/SnackbarSlice';
import { getErrorResponseMessage } from '../../../helpers/getErrorResponseMessage';
import { useDispatch } from 'react-redux';
import {
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import AddTenantModal from '../../Modals/AddTenantModal';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import ControlledSelect from '../../ControlledComponents/ControlledSelect';

const AddTenant = ({ propertyDetails }: AddTenantFormProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [isModalOpen, setOpenModal] = useState(false);
	const dispatch = useDispatch();
	const { orgSettings } = useSelector(getAuthState);
	const { data } = useGetRolesQuery();
	const role = find(data, ['name', 'Organization_Owner']);
	const [apiMessage, setApiMessage] = useState<string>('');
	const propertyNames = propertyDetails?.name;
console.log("propertyDetails",propertyDetails)
	const onSubmit = async (values: formValues) => {
		try {
			const response = await api.post(tenantEndpoints.onboardTenant(),{
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				phoneNumber: values.phoneNumber,
				role: {
					id: role?.id || 0,
					name: role?.name || '',
				},
				leaseDetails: {
					name: values.leaseDetails.name,
					startDate: values.leaseDetails.startDate,
					endDate: values.leaseDetails.endDate,
					unitId: values.leaseDetails.unitId,
					rentAmount: values.leaseDetails.rentAmount,
					propertyName: values.leaseDetails.propertyName,
					unitNumber: UnitNumber?.name,
				},
			});
			console.log(response, 'res');

			if (response.status >= 200 && response.status < 300) {
				const data = response.data;
				console.log('Success:', data);
				formik.resetForm();
				setApiMessage(response.data.message || 'Tenant added successfully!');
				setOpenModal(true);
				dispatch(
					openSnackbar({
						message: 'Tenant added successfully!',
						severity: 'success',
						isOpen: true,
					}),
				);
			} else {
				console.error('Error:', response.statusText);
				dispatch(
					openSnackbar({
						message: getErrorResponseMessage({
							response: response,
							message: response.statusText,
						}),
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

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			role: {
				id: role?.id || 0,
				name: role?.name || '',
			},

			leaseDetails: {
				name: '',
				startDate: '',
				endDate: '',
				unitId: '',
				rentAmount: 0,
				propertyName: propertyNames,
				unitNumber: '',
			},
			selectedOption: '',
		},
		validationSchema,
		onSubmit,
	});

	useEffect(() => {
		setTimeout(() => setLoading(false), 400);
	}, []);

	const unitsInProperty = Array.isArray(propertyDetails?.units)
		? propertyDetails.units
				.filter((unit) => unit.id && unit.unitNumber)
				.map((unit) => ({
					id: `${unit.id}` as string,
					name: unit.unitNumber as string,
				}))
		: [];
	const UnitNumber = find(unitsInProperty, {
		id: formik.values.leaseDetails.unitId,
		name: formik.values.leaseDetails.name,
	});
	useEffect(() => {
		if (propertyDetails && propertyDetails?.units) {
			const unit: any = propertyDetails.units[0];
			formik.setFieldValue('leaseDetails.unitId', unit.id);
			formik.setFieldValue('leaseDetails.name', unit.unitNumber);
		}
		formik.setFieldValue('leaseDetails.propertyName', propertyDetails?.name);
		formik.setFieldValue('leaseDetails.unitNumber', propertyDetails?.unitCount);
	}, [propertyDetails]);

	useEffect(() => {
		if (unitsInProperty?.length <= 1) {
			const unit = unitsInProperty[0];
			if (unit) {
				formik.setFieldValue('leaseDetails.unitId', unit.name);
				formik.setFieldValue('leaseDetails.name', unit.name);
			}
		}
		formik.setFieldValue('leaseDetails.propertyName', propertyNames);
	}, [formik?.values?.leaseDetails.propertyName]);

	let hasMobileNumber = false;
	const option = [
		{ value: 'one', label: 'Email' },
		...(hasMobileNumber ? [{ value: 'two', label: 'Text' }] : []),
		...(hasMobileNumber ? [{ value: 'three', label: 'Email & Text' }] : []),
	];

	return (
		<FormLayout Header='Add Tenant' sx={style.card}>
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
				<Grid
					container
					spacing={0}
					sx={style.content}
					component='form'
					onSubmit={formik.handleSubmit}
				>
					<Grid item xs={12} sx={style.infobox}>
						<Typography variant='subtitle2' sx={style.infotypo}>
							We’ll invite the tenant to setup their tenant portal so they can
							send messages, pay rent, and request maintenance.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12}>
						<ControlledTextField
							name='firstName'
							label='First Name'
							formik={formik}
							type='text'
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<ControlledTextField
							name='lastName'
							label='Last Name'
							formik={formik}
							type='text'
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<ControlledTextField
							name='leaseDetails.rentAmount'
							label='Rent Amount'
							formik={formik}
							type='text'
							showCurrency
							currencySymbol={getCurrencySymbol(orgSettings) as string}
						/>
					</Grid>

					<Grid item xs={12} sm={12}>
						<ControlledTextField
							name='leaseDetails.propertyName'
							label='Property Name'
							type='text'
							formik={formik}
							disabled
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<ControlledTextField
							name='phoneNumber'
							label='Phone Number'
							formik={formik}
							type='text'
							placeholder='(123) 456-7890'
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<ControlledTextField
							name='email'
							label='Email '
							formik={formik}
							type='text'
						/>
					</Grid>
					{propertyDetails?.isMultiUnit && (
						<Grid item xs={12} sm={6}>
							<ControlledSelect
								name='leaseDetails.unitId'
								label='Unit'
								type='text'
								formik={formik}
								options={unitsInProperty}
							/>
						</Grid>
					)}
					{!propertyDetails?.isMultiUnit && (
						<Grid item xs={12} sm={6}>
							<ControlledTextField
								name='leaseDetails.unitId'
								label='Unit'
								type='text'
								formik={formik}
								disabled
							/>
						</Grid>
					)}
					<Grid item xs={12} sm={6}>
						<ControlledTextField
							name='leaseDetails.unitId'
							label='Unit ID'
							formik={formik}
							type='text'
							value={
								propertyDetails?.isMultiUnit
									? unitsInProperty.find(
											(unit) => unit.id === formik.values.leaseDetails.unitId,
									  )?.id || ''
									: propertyDetails?.units?.[0]?.unitNumber || ''
							}
							disabled
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<ControlledTextField
							name='leaseDetails.startDate'
							label='Lease Start Date'
							formik={formik}
							type='date'
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<ControlledTextField
							name='leaseDetails.endDate'
							label='Lease End Date'
							formik={formik}
							type='date'
						/>
					</Grid>

					<Grid item xs={12} mb='20px'>
						<Typography variant='subtitle2' sx={style.typo}>
							Send the tenant an invite by
						</Typography>
						<FormControl sx={style.formControl}>
							<RadioGroup
								row
								defaultValue={'one'}
								name='selectedOption'
								value={formik.values.selectedOption}
								onChange={formik.handleChange}
							>
								{option.map((option, index) => (
									<Grid container item xs={4} key={index}>
										<FormControlLabel
											value={option.value}
											control={<Radio size='small' />}
											label={option.label}
											sx={style.radioLabel}
										/>
									</Grid>
								))}
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid
						container
						spacing={2}
						sx={{ mt: 0.5 }}
						alignItems={'center'}
						textAlign='center'
					>
						<Grid item xs={6}>
							<Button sx={style.plainButton}>Cancel </Button>
						</Grid>
						<Grid item xs={6}>
							<Button type='submit' sx={style.blueButton}>
								Invite Tenant{' '}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			)}
			{isModalOpen && (
				<AddTenantModal
					open={isModalOpen}
					onClose={() => {
						setOpenModal(false);
					}}
					message={apiMessage}
				/>
			)}
		</FormLayout>
	);
};

export default AddTenant;
