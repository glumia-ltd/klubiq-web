import { Card, Grid, Typography, Box, TextField, Button } from '@mui/material';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
type Props = {};
import * as yup from 'yup';
import { useFormik, FieldArray } from 'formik';
import CountryList from '../../helpers/countryList.json';
import StateList from '../../helpers/stateList.json';
import styles from './style';
import { Add, Delete } from '@mui/icons-material';

const validationSchema = yup.object({
	Apartment: yup.string().required('This field is required'),
	streetAdress: yup.string().required('This field is required'),
	city: yup.string().required('This field is required'),
	postalCode: yup.string().required('This field is required'),
	country: yup.string().required('Select an option'),
	state: yup.string().required('Select an option'),
	units: yup.array().of(
		yup.object({
			name: yup.string().required('Required'),
			beds: yup
				.number()
				.required('Required')
				.min(0, 'Beds must be non-negative'),
			baths: yup
				.number()
				.required('Required')
				.min(0, 'Baths must be non-negative'),
		}),
	),
});

type formValues = {
	streetAddress: string;
	apartment: string;
	country: string;
	postalCode: string;
	state: string;
	city: string;
	// units: Unit[];
	units: {
		name: string;
		beds: number;
		baths: number;
	}[];
};
const states = StateList.map((item) => ({
	value: item.name,
	label: item.name,
}));
const country = CountryList.map((item) => ({
	value: item.name,
	label: item.name,
}));
const GeneralInfo = (props: Props) => {
	const onSubmit = async (values: formValues) => {
		console.log(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			streetAddress: '',
			apartment: '',
			country: '',
			postalCode: '',
			state: '',
			city: '',
			units: [{ name: 'Unit 1', beds: 5, baths: 5 }],
		},
		validationSchema,
		onSubmit,
	});
	const addUnit = () => {
		formik.setFieldValue('units', [
			...formik.values.units,
			{ name: '', beds: 0, baths: 0 },
		]);
	};

	const removeUnit = (index: number) => {
		const units = [...formik.values.units];
		units.splice(index, 1);
		formik.setFieldValue('units', units);
	};
	return (
		<Grid container spacing={1}>
			<Card sx={styles.card}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h6' sx={styles.typo}>
							General Information
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<ControlledTextField
							name='streetAddress'
							label='Street Address'
							formik={formik}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledTextField
							name='apartment'
							label='Apartment, suite etc  '
							formik={formik}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<ControlledSelect
							name='country'
							label='Country'
							type='text'
							formik={formik}
							options={country}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<ControlledTextField
							name='postalCode'
							label='Postal Code'
							formik={formik}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<ControlledSelect
							name='state'
							label='State'
							type='text'
							formik={formik}
							options={states}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<ControlledTextField
							name='city'
							label='City'
							formik={formik}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
				</Grid>
			</Card>
			<Card sx={styles.cardTwo}>
				<Grid container spacing={2}>
					<Box>
						{formik.values.units.map((unit, index) => (
							<Box key={index} mb={2} border={1} padding={2}>
								<Typography variant='h6'>Unit {index + 1}</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<ControlledTextField
											name={`units.${index}.name`}
											label='Unit number or name'
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
											name={`units.${index}.beds`}
											label='Beds'
											type='number'
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
											name={`units.${index}.baths`}
											label='Baths'
											type='number'
											formik={formik}
											inputProps={{
												sx: {
													height: '40px',
												},
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											variant='outlined'
											color='secondary'
											onClick={() => removeUnit(index)}
											startIcon={<Delete />}
										>
											Remove Unit
										</Button>
									</Grid>
								</Grid>
							</Box>
						))}
						<Button
							variant='contained'
							color='primary'
							onClick={addUnit}
							startIcon={<Add />}
						>
							Add Unit
						</Button>
					</Box>
				</Grid>
			</Card>
		</Grid>
	);
};

export default GeneralInfo;
