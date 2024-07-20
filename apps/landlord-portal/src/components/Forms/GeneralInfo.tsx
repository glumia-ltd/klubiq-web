import { useState } from 'react';
import {
	Card,
	Typography,
	Button,
	IconButton,
	FormControlLabel,
	Checkbox,
	Dialog,
	Box,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
import cloneIcon from '../../assets/images/Vector.svg';

const validationSchema = yup.object({
	streetAddress: yup.string().required('This field is required'),
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
};

type FormValues = {
	streetAddress: string;
	apartment: string;
	country: string;
	postalCode: string;
	state: string;
	city: string;
	units: {
		description: string;
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

const GeneralInfo = ({ selectedUnitType }: CardProps) => {
	const [open, setOpen] = useState(false);
	const [currentUnitIndex, setCurrentUnitIndex] = useState<number | null>(null);

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
					description: '',
					beds: 0,
					baths: 0,
					guestBaths: 0,
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
				description: '',
				beds: 0,
				baths: 0,
				guestBaths: 0,
				floorPlan: '',
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

	const amenitiesOptions = [
		'A/C',
		'Furnished',
		'Pool',
		'Wheel chair access',
		'Pets allowed',
		'Balcony/Desk',
	];

	const renderAmenities = () => {
		if (currentUnitIndex !== null && formik.values.units[currentUnitIndex]) {
			return amenitiesOptions.map((amenity) => (
				<FormControlLabel
					key={amenity}
					control={
						<Checkbox
							name={`units.${currentUnitIndex}.amenities`}
							value={amenity}
							// checked={
							// 	formik.values.units[currentUnitIndex]?.amenities.includes(amenity) || false
							//   }
							onChange={formik.handleChange}
						/>
					}
					label={amenity}
				/>
			));
		}
		return null;
	};
	console.log(formik.values, 'val3');

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
						{selectedUnitType === 'one' && (
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
						)}

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

			<Grid container>
				<Card sx={styles.cardTwo}>
					<Grid container spacing={0}>
						{selectedUnitType === 'other' && (
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

						{formik.values.units.map((unit, index) => (
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
												// label='Description'
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
