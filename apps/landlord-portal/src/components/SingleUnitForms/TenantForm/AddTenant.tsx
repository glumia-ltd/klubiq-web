import FormLayout from '../../../Layouts/FormLayout';
import { Grid, Typography, Button } from '@mui/material';
import style from './style';
import ControlledTextField from '../../ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import {
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import AddTenantModal from '../../Modals/AddTenantModal';

const AddTenant = () => {
	const [isModalOpen, setOpenModal] = useState(false);

	const validationSchema = yup.object({
		firstName: yup.string().required('This field is required'),
		lastName: yup.string().required('This field is required'),
		selectedOption: yup.string().required('Option is required'),
		email: yup
			.string()
			.email('Invalid email format')
			.required('Email is required'),
	});

	type formValues = {
		firstName: string;
		lastName: string;
		email: string;
		selectedOption: string;
	};

	const onSubmit = async (values: formValues) => {
		console.log(values, 'val');
		setOpenModal(true);
	};

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			selectedOption: 'one',
		},
		validationSchema,
		onSubmit,
	});
	const option = [
		{ value: 'one', label: 'Email' },
		{ value: 'two', label: 'Text' },
		{ value: 'three', label: 'Email & Text' },
	];
	console.log(formik.errors, 'err');
	return (
		<FormLayout Header='Add Tenant' sx={style.card}>
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
				<Grid item xs={12} sm={6}>
					<ControlledTextField
						name='firstName'
						label='First Name'
						formik={formik}
						type='text'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<ControlledTextField
						name='lastName'
						label='Last Name'
						formik={formik}
						type='text'
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
				{formik.values.selectedOption === 'one' && (
					<Grid item xs={12}>
						<ControlledTextField
							name='email'
							label='Email '
							formik={formik}
							type='text'
						/>
					</Grid>
				)}

				<Grid item xs={6}>
					<Button sx={style.plainButton}>Cancel </Button>
				</Grid>
				<Grid item xs={6}>
					<Button type='submit' sx={style.blueButton}>
						Invite Tenant{' '}
					</Button>
				</Grid>
			</Grid>
			{isModalOpen && (
				<AddTenantModal
					open={isModalOpen}
					onClose={() => {
						setOpenModal(false);
					}}
				/>
			)}
		</FormLayout>
	);
};

export default AddTenant;
