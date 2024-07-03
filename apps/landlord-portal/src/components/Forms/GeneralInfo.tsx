import React, { useState } from 'react';
import {
	Card,
	Typography,
	Button,
	IconButton,
	FormControlLabel,
	Checkbox,
	Dialog,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CountryList from '../../helpers/countryList.json';
import StateList from '../../helpers/stateList.json';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import styles from './style';
import { Grid } from '@mui/material';

const validationSchema = yup.object({
	streetAddress: yup.string().required('This field is required'),
	apartment: yup.string().required('This field is required'),
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
			guestBaths: yup
				.number()
				.required('Required')
				.min(0, 'Guest Baths must be non-negative'),
			floorPlan: yup.string().required('Required'),
			amenities: yup.array().of(yup.string()),
		}),
	),
});

type FormValues = {
	streetAddress: string;
	apartment: string;
	country: string;
	postalCode: string;
	state: string;
	city: string;
	units: {
		name: string;
		beds: number;
		baths: number;
		guestBaths: number;
		floorPlan: string;
		amenities: string[];
	}[];
};

const states = StateList.map((item) => ({
	value: item.name,
	label: item.name,
}));

const countries = CountryList.map((item) => ({
	value: item.name,
	label: item.name,
}));

const GeneralInfo: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

	const handleOpen = (index: number) => {
		setCurrentUnitIndex(index);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const onSubmit = async (values: FormValues) => {
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
			units: [
				{
					name: 'Unit 1',
					beds: 5,
					baths: 5,
					guestBaths: 1,
					floorPlan: '',
					amenities: [],
				},
			],
		},
		validationSchema,
		onSubmit,
	});

	const addUnit = () => {
		formik.setFieldValue('units', [
			...formik.values.units,
			{
				name: '',
				beds: 0,
				baths: 0,
				guestBaths: 0,
				floorPlan: '',
				amenities: [],
			},
		]);
	};

	// const removeUnit = (index: number) => {
	// 	const units = [...formik.values.units];
	// 	units.splice(index, 1);
	// 	formik.setFieldValue('units', units);
	// };

	const amenitiesOptions = [
		'A/C',
		'Furnished',
		'Pool',
		'Wheel chair access',
		'Pets allowed',
		'Balcony/Desk',
	];

	const renderAmenities = () => {
		if (formik.values.units[currentUnitIndex]) {
			return amenitiesOptions.map((amenity) => (
				<FormControlLabel
					key={amenity}
					control={
						<Checkbox
							name={`units.${currentUnitIndex}.amenities`}
							value={amenity}
							//   checked={formik.values.units[currentUnitIndex].amenities.includes(amenity)}
							onChange={formik.handleChange}
						/>
					}
					label={amenity}
				/>
			));
		}
		return null;
	};

	return (
		<Grid container spacing={1}>
			<Grid xs={12}>
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
								options={countries}
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
										muiOutlinedInput: '40px',
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
										muiOutlinedInput: '40px',
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
										muiOutlinedInput: '40px',
									},
								}}
							/>
						</Grid>
					</Grid>
				</Card>
			</Grid>

			<Grid xs={12}>
				<Card sx={styles.cardTwo}>
					<Grid container spacing={0}>
						<Grid item xs={12} sx={styles.addButton}>
							<Button color='primary' onClick={addUnit} startIcon={<AddIcon />}>
								Add Unit
							</Button>
						</Grid>
						{formik.values.units.map((unit, index) => (
							<Grid container spacing={0} key={index} sx={styles.boxContent}>
								<Grid item xs={12}>
									<Card sx={styles.titleDiv}>
										<Typography
											fontWeight={'500'}
											fontSize={'16px'}
											variant='h6'
										>
											Title
										</Typography>
										<IconButton edge='end'>
											<MoreHorizIcon />
										</IconButton>
									</Card>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='h6' sx={styles.subText}>
										Unit number or name
									</Typography>
								</Grid>
								<Grid item xs={12} md={12}>
									<ControlledTextField
										name={`units.${index}.name`}
										label='Description'
										formik={formik}
										inputProps={{
											sx: {
												height: '40px',
											},
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='h6' sx={styles.subText}>
										Unit Details
									</Typography>
								</Grid>

								<Grid item xs={6} sx={styles.unitIcon}>
									<IconButton onClick={() => handleOpen(index)}>
										<BedIcon />
										<Typography>{unit.beds}</Typography>
									</IconButton>
									<IconButton onClick={() => handleOpen(index)}>
										<BathtubIcon />
										<Typography>{unit.baths}</Typography>
									</IconButton>
								</Grid>
								{/* <Grid item xs={12}>
									<Button
										variant='outlined'
										color='secondary'
										onClick={() => removeUnit(index)}
										startIcon={<DeleteIcon />}
									>
										Remove Unit
									</Button>
								</Grid> */}
							</Grid>
						))}
					</Grid>{' '}
				</Card>
			</Grid>

			<Dialog open={open} onClose={handleClose} maxWidth='sm'>
				<Card sx={{ padding: '25px' }}>
					<Typography variant='h6'>Unit Details</Typography>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units.${currentUnitIndex}.beds`}
								label='Bedrooms'
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
								name={`units.${currentUnitIndex}.baths`}
								label='Bathrooms'
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
								name={`units.${currentUnitIndex}.guestBaths`}
								label='Guest Bathrooms'
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
								name={`units.${currentUnitIndex}.floorPlan`}
								label='Floor Plan'
								formik={formik}
								inputProps={{
									sx: {
										height: '40px',
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='subtitle1'>Amenities</Typography>
							{renderAmenities()}
						</Grid>
						<Grid item xs={12}>
							<Button variant='contained' color='primary' onClick={handleClose}>
								Copy details and Add New Unit
							</Button>
						</Grid>
					</Grid>
				</Card>
			</Dialog>
		</Grid>
	);
};

export default GeneralInfo;
