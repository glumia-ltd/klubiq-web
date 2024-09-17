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
	InputAdornment,
	Select,
	MenuItem,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import StateList from '../../helpers/stateList.json';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import styles from './style';
import { Grid } from '@mui/material';
import cloneIcon from '../../assets/images/Vector.svg';
import { useSelector } from 'react-redux';
import { getAddPropertyState } from '../../store/AddPropertyStore/AddPropertySlice';
import countriesList from '../../helpers/countries-meta.json';
import { AutoComplete } from '../AutoComplete/AutoComplete';

const MEASUREMENTS: any[] = [
	{
		unit: 'SqM',
		symbol: <span>m&sup2;</span>,
	},
	{
		unit: 'SqCm',
		symbol: <span>cm&sup2;</span>,
	},
	{
		unit: 'SqFt',
		symbol: <span>ft&sup2;</span>,
	},
	{
		unit: 'SqIn',
		symbol: <span>in&sup2;</span>,
	},
];

type CardProps = {
	formik: any;
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

const GeneralInfo = ({ amenities, formik }: CardProps) => {
	const selectedUnitType = formik?.values?.unitType;
	const [open, setOpen] = useState(false);
	const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
	const [measurement, setMeasurement] = useState<string>('');

	const formState = useSelector(getAddPropertyState);

	console.log(formik.values);

	const handleMeasurementChange = (event: any) => {
		setMeasurement(event.target.value);
	};

	const handleOpen = (index: number) => {
		setCurrentUnitIndex(index);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

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
				amenities: [''],
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
							name={`units[${currentUnitIndex}].amenities`}
							value={amenity?.name}
							checked={
								formik.values.units[currentUnitIndex]?.amenities?.includes(
									amenity?.name,
								) || false
							}
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
		formik.setFieldValue('address', formState?.address);

		formik.setFieldValue('units', formState?.units);
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
								name={'address.addressLine1'}
								label={'Street Address'}
							/>
						</Grid>

						<Grid item xs={12}>
							<ControlledTextField
								name='address.addressLine2'
								label='Apartment, suite, etc.'
								formik={formik}
							/>
						</Grid>

						<Grid item xs={12} md={6}>
							<ControlledSelect
								name='address.country'
								label='Country'
								type='text'
								formik={formik}
								options={countries}
								placeholder=''
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<ControlledTextField
								name='address.postalCode'
								label='Postal Code'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<ControlledTextField
								name='address.state'
								label='State (Province or Region)'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<ControlledTextField
								name='address.city'
								label='City'
								formik={formik}
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
									name={`units[${currentUnitIndex}].bedrooms`}
									label='Bedrooms'
									type='number'
									formik={formik}
								/>
							</Grid>
							<Grid item xs={6}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].bathrooms`}
									label='Bathrooms'
									type='number'
									formik={formik}
								/>
							</Grid>
							<Grid item xs={6}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].guestBaths`}
									label='Guest Bathrooms'
									type='number'
									formik={formik}
								/>
							</Grid>
							<Grid item xs={6}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].floor`}
									label='Floor Plan'
									formik={formik}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<Select
													value={measurement}
													onChange={handleMeasurementChange}
												>
													{MEASUREMENTS.map((measurement) => (
														<MenuItem
															value={measurement.unit}
															key={measurement.symbol}
														>
															{measurement.symbol}
														</MenuItem>
													))}
												</Select>
											</InputAdornment>
										),
									}}
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

							{formik.values?.units?.map((unit: any, index: number) => (
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
													name={`units[${index}].description`}
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
								name={`units[${currentUnitIndex}].bedrooms`}
								label='Bedrooms'
								type='number'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units[${currentUnitIndex}].bathrooms`}
								label='Bathrooms'
								type='number'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units[${currentUnitIndex}].guestBaths`}
								label='Guest Bathrooms'
								type='number'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units[${currentUnitIndex}].floor`}
								label='Floor Plan'
								formik={formik}
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
