import FormLayout from '../../../Layouts/FormLayout';
import { Grid, Typography } from '@mui/material';
import style from './style';
import ControlledTextField from '../../ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ControlledSelect from '../../ControlledComponents/ControlledSelect';
import Logo from '../../../assets/images/info.svg';

const AddLeaseForm = () => {
	const validationSchema = yup.object({
		propertyName: yup.string().required('Please enter the property name'),
		description: yup.string().required('This field is required'),
		propertyType: yup.string().required('Select an option'),
		propertyImage: yup
			.array()
			.min(1, 'You need to upload at least one image')
			.max(4, 'You can upload a maximum of 4 images')
			.required('Images are required'),
	});

	type formValues = {
		propertyName: string;
		description: string;
		propertyType: string;
		propertyImage: string[];
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
		console.log(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			description: '',
			propertyName: '',
			propertyType: '',
			propertyImage: [],
		},
		validationSchema,
		onSubmit,
	});

	return (
		<FormLayout Header='LEASE INFORMATION' sx={style.card}>
			<Grid container spacing={0} sx={style.content}>
				<Grid item xs={12}>
					<ControlledTextField
						name='description'
						label='Lease Nickname'
						formik={formik}
						type='text'
					/>
				</Grid>
				<Grid item xs={12}>
					<ControlledSelect
						name='propertyType'
						label='Property Name'
						type='text'
						formik={formik}
						options={property}
						inputProps={{
							sx: {
								height: '40px',
							},
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<ControlledSelect
						name='propertyType'
						label='Unit '
						type='text'
						formik={formik}
						options={property}
						inputProps={{
							sx: {
								height: '40px',
							},
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<ControlledSelect
						name='propertyType'
						label='Tenant'
						type='text'
						formik={formik}
						options={property}
						inputProps={{
							sx: {
								height: '40px',
							},
						}}
					/>
				</Grid>
				<Grid xs={12}>
					<ControlledTextField
						name='description'
						label='Rent Amount '
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
						inputProps={{
							sx: {
								height: '40px',
							},
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<ControlledTextField
						name='frequency'
						label='Payment Frequency *'
						formik={formik}
						type='text'
					/>
				</Grid>
				<Grid item xs={6}></Grid>

				<Grid item xs={6} sm={6} md={3} lg={3}>
					<ControlledTextField
						name='startDate'
						label='Lease Start Date '
						formik={formik}
						type='date'
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3}>
					<ControlledTextField
						name='endDate'
						label='Lease End Date '
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
			</Grid>
		</FormLayout>
	);
};

export default AddLeaseForm;
