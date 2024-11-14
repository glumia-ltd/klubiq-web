import FormLayout from '../../../Layouts/FormLayout';
import { Grid, Typography, Skeleton, Button, Link } from '@mui/material';
import style from './style';
import ControlledTextField from '../../ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ControlledSelect from '../../ControlledComponents/ControlledSelect';
import Logo from '../../../assets/images/info.svg';
import { useState, useEffect } from 'react';
import { consoleLog } from '../../../helpers/debug-logger';
import { Stack } from '@mui/system';

const AddLeaseForm = () => {
	const [loading, setLoading] = useState<boolean>(true);

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

	const property = [
		{
			value: 'A',
			label: 'A',
		},
		{
			value: 'B',
			label: 'B',
		},
	];

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
	useEffect(() => {
		setTimeout(() => setLoading(false), 20);
	}, []);
	return (
		<FormLayout Header='LEASE INFORMATION' sx={style.card}>
			{loading ? (
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
							options={property}
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledSelect
							name='unit'
							label='Unit'
							type='text'
							formik={formik}
							options={property}
							disabled={true}
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
							options={property}
						/>
					</Grid>
					<Grid xs={12}>
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
							options={property}
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
