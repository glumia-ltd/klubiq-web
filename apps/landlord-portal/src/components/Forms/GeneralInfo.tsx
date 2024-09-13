import { useEffect, useState } from 'react';
import {
	Card,
	Typography,
	Button,
	IconButton,
	FormControlLabel,
	Checkbox,
	Dialog,
	Box,
	Stack,
	TextField,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import * as yup from 'yup';
import { useFormik } from 'formik';

import StateList from '../../helpers/stateList.json';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import styles from './style';
import { Grid } from '@mui/material';
import cloneIcon from '../../assets/images/Vector.svg';
// import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAddPropertyState,
	saveAddPropertyFormDetail,
} from '../../store/AddPropertyStore/AddPropertySlice';
import countriesList from '../../helpers/countries-meta.json';
import { FormValuesType } from '../../shared/type';
import { AutoComplete } from '../AutoComplete/AutoComplete';

const validationSchema = yup.object({
	addressLine1: yup.string().required('This field is required'),
	apartment: yup.string().required('This field is required'),
	city: yup.string().required('This field is required'),
	postalCode: yup.string().required('This field is required'),
	country: yup.string().required('Select an option'),
	state: yup.string().required('Select an option'),
	units: yup.array().of(
		yup.object({
			description: yup.string().required('Required'),
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
type CardProps = {
	selectedUnitType?: string;
	amenities: { id: number; name: string }[];
};

const states = StateList.map((item) => ({
	value: item.name,
	label: item.name,
}));

const countries = countriesList?.map((item) => ({
	id: item.name,
	name: item.name,
}));

const GeneralInfo = ({ selectedUnitType, amenities }: CardProps) => {
	const [open, setOpen] = useState(false);
	const [currentUnitIndex, setCurrentUnitIndex] = useState<number | null>(null);

	const dispatch = useDispatch();

	const formState = useSelector(getAddPropertyState);

	// console.log(formState);

	const handleOpen = (index: number) => {
		setCurrentUnitIndex(index);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const onSubmit = async (values: FormValuesType) => {
		console.log(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			addressLine1: '',
			addressLine2: '',
			apartment: '',
			country: '',
			postalCode: '',
			state: '',
			city: '',

			units: [
				{
					id: null,
					unitNumber: '',
					rentAmount: null,
					floor: null,
					bedrooms: null,
					bathrooms: null,
					toilets: null,
					area: {
						value: null,
						unit: '',
					},
					status: '',
					rooms: null,
					offices: null,
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
				id: null,
				unitNumber: '',
				rentAmount: null,
				floor: null,
				bedrooms: null,
				bathrooms: null,
				toilets: null,
				area: {
					value: null,
					unit: '',
				},
				status: '',
				rooms: null,
				offices: null,
				amenities: [],
			},
		]);
	};

	const cloneUnit = (index: number) => {
		const unitToClone = { ...formik.values.units[index] };
		formik.setFieldValue('units', [...formik.values.units, unitToClone]);
	};

	// const removeUnit = (index: number) => {
	// 	const units = [...formik.values.units];
	// 	units.splice(index, 1);
	// 	formik.setFieldValue('units', units);
	// };

	// const amenitiesOptions = [
	// 	'A/C',
	// 	'Furnished',
	// 	'Pool',
	// 	'Wheel chair access',
	// 	'Pets allowed',
	// 	'Balcony/Desk',
	// ];

	const renderAmenities = () => {
		if (
			(currentUnitIndex !== null && formik.values.units[currentUnitIndex]) ||
			selectedUnitType !== 'multi'
		) {
			return amenities?.map((amenity) => (
				<FormControlLabel
					key={amenity.id}
					control={
						<Checkbox
							// name={`units.${currentUnitIndex}.amenities`}

							name='units[0].amenities'
							value={amenity?.name}
							// checked={
							// 	formik.values.units[currentUnitIndex]?.amenities.includes(amenity) || false
							//   }
							onChange={formik.handleChange}
						/>
					}
					label={amenity?.name}
				/>
			));
		}
		return null;
	};

	useEffect(() => {
		const addressPayload = {
			addressLine1: formik.values?.addressLine1,
			addressLine2: formik.values?.addressLine2,
			// unit: 'string',
			city: formik.values?.city,
			state: formik.values?.state,
			postalCode: formik.values?.postalCode,
			latitude: 0,
			longitude: 0,
			country: formik.values?.country,
			isManualAddress: true,
		};

		dispatch(
			saveAddPropertyFormDetail({
				address: { ...addressPayload },
				units: [...formik.values.units],
			}),
		);
	}, [
		dispatch,
		formik.values?.addressLine1,
		formik.values?.addressLine2,
		formik.values?.city,
		formik.values?.country,
		formik.values?.postalCode,
		formik.values?.state,
		formik.values?.units,
	]);

	console.log(formik?.values);

	useEffect(() => {
		Object.keys(formState.address).forEach((key) => {
			formik.setFieldValue(key, formState.address[key]);
		});
	}, []);

	return (
		<Grid container spacing={1}>
			<Grid container>
				<Card sx={styles.card}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h6' sx={styles.typo}>
								General Information
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<AutoComplete
								formik={formik}
								name={'addressLine1'}
								label={'Street Address'}
							/>
						</Grid>
						{
							<Grid item xs={12}>
								<ControlledTextField
									name='addressLine2'
									label='Apartment, suite, etc.'
									formik={formik}
									// inputProps={{
									// 	sx: {
									// 		height: '40px',
									// 	},
									// }}
								/>
							</Grid>
						}

						<Grid item xs={12} md={6}>
							<ControlledSelect
								name='country'
								label='Country'
								type='text'
								formik={formik}
								options={countries}
								placeholder=''
								// inputProps={{
								// 	sx: {
								// 		height: '40px',
								// 	},
								// }}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<ControlledTextField
								name='postalCode'
								label='Postal Code'
								formik={formik}
								// inputProps={{
								// 	sx: {
								// 		muiOutlinedInput: '40px',
								// 	},
								// }}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<ControlledTextField
								name='state'
								label='State (Province or Region)'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<ControlledTextField
								name='city'
								label='City'
								formik={formik}
								// inputProps={{
								// 	sx: {
								// 		muiOutlinedInput: '40px',
								// 	},
								// }}
							/>
						</Grid>
					</Grid>
				</Card>
			</Grid>

			{selectedUnitType !== 'multi' && (
				<Grid container mt={1}>
					<Card sx={styles.cardTwo}>
						<Grid item xs={12}>
							<Typography variant='h6' sx={styles.typo}>
								Unit Details
							</Typography>
						</Grid>
						<Grid container>
							<Grid item xs={6}>
								<ControlledTextField
									name='units[0].bedrooms'
									label='Bedrooms'
									type='number'
									formik={formik}
									// inputProps={{
									// 	sx: {
									// 		height: '40px',
									// 	},
									// }}
								/>
							</Grid>
							<Grid item xs={6}>
								<ControlledTextField
									name='units[0].bathrooms'
									label='Bathrooms'
									type='number'
									formik={formik}
									// inputProps={{
									// 	sx: {
									// 		height: '40px',
									// 	},
									// }}
								/>
							</Grid>
							<Grid item xs={6}>
								<ControlledTextField
									name={`units.${currentUnitIndex}.guestBaths`}
									label='Guest Bathrooms'
									type='number'
									formik={formik}
									// inputProps={{
									// 	sx: {
									// 		height: '40px',
									// 	},
									// }}
								/>
							</Grid>
							<Grid item xs={6}>
								<ControlledTextField
									// name={`units.${currentUnitIndex}.floorPlan`}
									name='units[0].floor'
									label='Floor Plan'
									formik={formik}
									// inputProps={{
									// 	sx: {
									// 		height: '40px',
									// 	},
									// }}
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography variant='subtitle1'>Amenities</Typography>
								{renderAmenities()}
							</Grid>
						</Grid>
					</Card>
				</Grid>
			)}
			{selectedUnitType === 'multi' && (
				<Grid container>
					<Card sx={styles.cardTwo}>
						<Grid container spacing={0}>
							{selectedUnitType === 'multi' && (
								<Grid item xs={12} sx={styles.addButton}>
									<Button
										color='primary'
										onClick={addUnit}
										startIcon={<AddIcon />}
									>
										Add Unit
									</Button>
								</Grid>
							)}

							{formik.values?.units?.map((unit, index) => (
								<Grid container spacing={0} key={index}>
									<Grid container spacing={0} sx={styles.boxContent}>
										<Grid item xs={12}>
											<Card sx={styles.titleDiv}>
												<Typography
													fontWeight={'500'}
													fontSize={'16px'}
													variant='h6'
												>
													Title
												</Typography>
												<Box>
													<IconButton edge='end'>
														<ExpandLessIcon />
													</IconButton>
													<IconButton edge='end'>
														<MoreVertIcon />
													</IconButton>
												</Box>
											</Card>
										</Grid>
										<Grid container spacing={0} sx={styles.cardContent}>
											<Grid item xs={12}>
												<Typography variant='h6' sx={styles.subText}>
													Unit number or name
												</Typography>
											</Grid>
											<Grid item xs={12} md={12}>
												<Typography fontWeight={400} fontSize={'14px'}>
													Description{' '}
												</Typography>
												<ControlledTextField
													name={`units.${index}.description`}
													formik={formik}
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
													<Typography>{unit?.bedrooms}</Typography>
												</IconButton>
												<IconButton onClick={() => handleOpen(index)}>
													<BathtubIcon />
													<Typography>{unit?.bathrooms}</Typography>
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
									</Grid>
									<Grid item xs={12}>
										<IconButton
											onClick={() => cloneUnit(index)}
											sx={styles.cloneButton}
										>
											<img
												src={cloneIcon}
												alt='icon'
												style={{ marginRight: '5px' }}
											/>
											<Typography sx={styles.cloneText}>Clone</Typography>
										</IconButton>
									</Grid>
								</Grid>
							))}
						</Grid>{' '}
					</Card>
				</Grid>
			)}

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
								// inputProps={{
								// 	sx: {
								// 		height: '40px',
								// 	},
								// }}
							/>
						</Grid>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units.${currentUnitIndex}.baths`}
								label='Bathrooms'
								type='number'
								formik={formik}
								// inputProps={{
								// 	sx: {
								// 		height: '40px',
								// 	},
								// }}
							/>
						</Grid>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units.${currentUnitIndex}.guestBaths`}
								label='Guest Bathrooms'
								type='number'
								formik={formik}
								// inputProps={{
								// 	sx: {
								// 		height: '40px',
								// 	},
								// }}
							/>
						</Grid>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units.${currentUnitIndex}.floorPlan`}
								label='Floor Plan'
								formik={formik}
								// inputProps={{
								// 	sx: {
								// 		height: '40px',
								// 	},
								// }}
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
