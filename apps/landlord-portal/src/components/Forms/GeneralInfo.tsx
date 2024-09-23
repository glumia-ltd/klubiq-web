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
	Tooltip,
	Collapse,
	Chip,
	Stack,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StateList from '../../helpers/stateList.json';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import styles from './style';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAddPropertyState } from '../../store/AddPropertyStore/AddPropertySlice';
import countriesList from '../../helpers/countries-meta.json';
import { AutoComplete } from '../AutoComplete/AutoComplete';
import { without, some, toLower, capitalize, find } from 'lodash';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import {
	Bathroom,
	Bedroom,
	FloorPlan,
	ShowerIcon,
	CloneIcon,
	EmojiOneBuildingIcon,
} from '../Icons/CustomIcons';
import { getIn } from 'formik';

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
	const [measurement, setMeasurement] = useState<string>(MEASUREMENTS[0].unit);
	const [openCustomAmenities, setOpenCustomAmenities] = useState(false);
	const [collapseUnit, setCollapseUnit] = useState<number[]>([]);
	const dispatch = useDispatch();

	const customAmenitiesArray = formik.values.customAmenities.map(
		(amenity: string) => ({
			id: amenity,
			name: amenity,
		}),
	);

	const allAmenities = amenities ? [...amenities, ...customAmenitiesArray] : [];

	const formState = useSelector(getAddPropertyState);

	// console.log('store', formState);
	// console.log('formik', formik.values);

	const handleMeasurementChange = (event: any) => {
		setMeasurement(event.target.value);
		formik.handleChange(event);
	};

	const handleOpen = (index: number) => {
		setCurrentUnitIndex(index);
		setOpen(true);
	};

	const handleClose = () => setOpen(false);
	const handleCustomAmenitiesClose = () => setOpenCustomAmenities(false);

	const handleAddCustomAmenites = () => {
		const { newAmenity, customAmenities } = formik.values;
		if (
			some(allAmenities, (item) => toLower(item.name) === toLower(newAmenity))
		) {
			dispatch(
				openSnackbar({
					message: `${newAmenity} exists in amenities list`,
					severity: 'info',
					isOpen: true,
					duration: 2000,
				}),
			);
			return;
		}

		if (newAmenity.trim()) {
			formik.setValues({
				...formik.values,
				customAmenities: [...customAmenities, newAmenity.trim()],
				newAmenity: '',
			});
		}
	};

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

	const handleRemoveUnit = (index: number) => {
		const units = [...formik.values.units];
		units.splice(index, 1);
		formik.setFieldValue('units', units);
	};

	const renderAmenities = (amenities: any) => {
		if (
			(currentUnitIndex !== null && formik.values.units[currentUnitIndex]) ||
			selectedUnitType !== 'multi'
		) {
			return amenities?.map(
				(amenity: { id: string | number; name: string }, index: number) => (
					<FormControlLabel
						key={amenity?.id || amenity?.name}
						control={
							<Checkbox
								name={`units[${currentUnitIndex}].amenities`}
								key={`${amenity?.name}--${index}`}
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
				),
			);
		}
		return null;
	};

	const getNameByPropertyCategory = (category: number) => {
		if (Number(category) === 1) {
			return 'bedrooms';
		} else if (Number(category) === 2) {
			return 'offices';
		} else if (Number(category) === 3) {
			return 'rooms';
		} else {
			return 'bedrooms';
		}
	};

	const deselectAmenity = (name: string, valueToDeselect: string) => {
		const selectedAmenities = getIn(formik.values, name);

		const updatedAmenities = without(selectedAmenities, valueToDeselect);
		formik.setFieldValue(name, updatedAmenities);
	};

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
									name={`units[${currentUnitIndex}].${getNameByPropertyCategory(formik.values.categoryId)}`}
									label={`${capitalize(getNameByPropertyCategory(formik.values.categoryId))}`}
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
									name={`units[${currentUnitIndex}].toilets`}
									label='Toilets'
									type='number'
									formik={formik}
								/>
							</Grid>
							<Grid item xs={6}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].area.value`}
									label='Floor Plan'
									formik={formik}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<Select
													name={`units[${currentUnitIndex}].area.unit`}
													value={measurement}
													onChange={handleMeasurementChange}
													sx={{
														'.MuiOutlinedInput-notchedOutline': {
															border: 'none',
														},
													}}
												>
													{MEASUREMENTS.map((entry, index) => (
														<MenuItem
															value={entry.unit}
															key={`single-${entry.symbol}-${index}`}
														>
															{entry.symbol}
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
								{renderAmenities(allAmenities)}
								<br />

								<i
									style={{ cursor: 'pointer' }}
									onClick={() => setOpenCustomAmenities(true)}
								>
									+ Add custom amenities
								</i>
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
													{getIn(formik.values, `units[${index}].unitNumber`)}
												</Typography>
												<Box>
													{collapseUnit.includes(index) ? (
														<IconButton
															edge='end'
															onClick={() => {
																const updatedValue = without(
																	collapseUnit,
																	index,
																);
																setCollapseUnit([...updatedValue]);
															}}
														>
															<ExpandMoreIcon />
														</IconButton>
													) : (
														<IconButton
															edge='end'
															onClick={() => {
																if (
																	!getIn(
																		formik.values,
																		`units[${index}].unitNumber`,
																	)
																) {
																	dispatch(
																		openSnackbar({
																			message: 'Unit name is cannot be empty',
																			severity: 'info',
																			isOpen: true,
																		}),
																	);
																	return;
																}
																setCollapseUnit([...collapseUnit, index]);
															}}
														>
															<ExpandLessIcon />
														</IconButton>
													)}
													<IconButton edge='end'>
														<Tooltip title='Remove unit'>
															<RemoveIcon
																onClick={() => handleRemoveUnit(index)}
															/>
														</Tooltip>
													</IconButton>
												</Box>
											</Card>
										</Grid>

										<Collapse
											sx={{ width: '100%' }}
											orientation='vertical'
											in={collapseUnit.includes(index) ? false : true}
										>
											<Grid container spacing={0} sx={styles.cardContent}>
												<Grid item xs={12} md={12}>
													<Typography variant='h6' sx={styles.subText}>
														Unit name
													</Typography>
													<ControlledTextField
														name={`units[${index}].unitNumber`}
														formik={formik}
													/>
												</Grid>
												<Grid item xs={12}>
													<Typography variant='h3' sx={styles.subText}>
														Unit Details
													</Typography>
												</Grid>

												<Grid item xs={6} sx={styles.unitIcon}>
													<Tooltip
														title={`Click to adjust ${getNameByPropertyCategory(
															formik.values.categoryId,
														).slice(0, -1)} count`}
													>
														<IconButton onClick={() => handleOpen(index)}>
															{getNameByPropertyCategory(
																formik.values.categoryId,
															) === 'offices' ? (
																<EmojiOneBuildingIcon sx={{ height: '15px' }} />
															) : (
																<Bedroom />
															)}
															<Typography>
																{
																	unit[
																		getNameByPropertyCategory(
																			formik.values.categoryId,
																		)
																	]
																}
															</Typography>
														</IconButton>
													</Tooltip>
													<Tooltip title={`Click to adjust bathroom count`}>
														<IconButton onClick={() => handleOpen(index)}>
															<ShowerIcon sx={{ height: '15px' }} />
															<Typography>{unit?.bathrooms}</Typography>
														</IconButton>
													</Tooltip>
													<Tooltip title={`Click to adjust toilet count`}>
														<IconButton onClick={() => handleOpen(index)}>
															<Bathroom />
															<Typography>{unit?.toilets}</Typography>
														</IconButton>
													</Tooltip>
													<Tooltip title={`Click to adjust floor plan`}>
														<IconButton onClick={() => handleOpen(index)}>
															<FloorPlan />
															<Typography>
																{unit?.area.value}{' '}
																{unit?.area.value &&
																	find(MEASUREMENTS, {
																		unit: unit?.area.unit,
																	})?.symbol}
															</Typography>
														</IconButton>
													</Tooltip>
												</Grid>

												<Grid item xs={12}>
													<Stack
														direction='row'
														flexWrap={'wrap'}
														gap={1}
														sx={{ maxWidth: '100%' }}
													>
														{getIn(
															formik.values,
															`units[${currentUnitIndex}].amenities`,
														)?.map((amenity: string) => {
															return (
																<Chip
																	sx={{
																		border: '1px solid #757575',
																		'&.MuiChip-deleteIcon': {
																			color: '#757575 !important',
																		},
																	}}
																	label={amenity}
																	variant='outlined'
																	onDelete={() =>
																		deselectAmenity(
																			`units[${currentUnitIndex}].amenities`,
																			amenity,
																		)
																	}
																/>
															);
														})}
													</Stack>
												</Grid>
											</Grid>
										</Collapse>
									</Grid>
									<Grid item xs={12}>
										<IconButton
											onClick={() => cloneUnit(index)}
											sx={styles.cloneButton}
										>
											<CloneIcon sx={{ marginRight: '5px', height: '12px' }} />

											<Typography sx={styles.cloneText}>Clone unit</Typography>
										</IconButton>
									</Grid>
								</Grid>
							))}
						</Grid>{' '}
					</Card>
				</Grid>
			)}

			<Dialog open={openCustomAmenities} onClose={handleCustomAmenitiesClose}>
				<Card sx={{ padding: '25px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<ControlledTextField
								name='newAmenity'
								label='Add Custom Amenites'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={12}>
							{renderAmenities(customAmenitiesArray)}
						</Grid>

						<Grid item xs={12}>
							<Button
								variant='contained'
								color='primary'
								onClick={handleAddCustomAmenites}
							>
								Add Amenity
							</Button>
							{/* <Button
								variant='contained'
								color='primary'
								onClick={handleCustomAmenitiesClose}
							>
								Close
							</Button> */}
						</Grid>
					</Grid>
				</Card>
			</Dialog>

			<Dialog open={open} onClose={handleClose} maxWidth='sm'>
				<Card sx={{ padding: '25px' }}>
					<Typography variant='h3' mb={2}>
						Unit Details
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units[${currentUnitIndex}].${getNameByPropertyCategory(formik.values.categoryId)}`}
								label={`${capitalize(getNameByPropertyCategory(formik.values.categoryId))}`}
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
								name={`units[${currentUnitIndex}].toilets`}
								label='Toilets'
								type='number'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={6}>
							<ControlledTextField
								name={`units[${currentUnitIndex}].area.value`}
								label='Floor Plan'
								formik={formik}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<Select
												name={`units[${currentUnitIndex}].area.unit`}
												value={measurement}
												onChange={handleMeasurementChange}
												defaultValue={measurement}
												sx={{
													'.MuiOutlinedInput-notchedOutline': {
														border: 'none',
													},
												}}
											>
												{MEASUREMENTS.map((measurement) => (
													<MenuItem
														value={measurement?.unit}
														key={`multi-${measurement?.unit}`}
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
							{renderAmenities(allAmenities)}

							<i
								style={{ cursor: 'pointer' }}
								onClick={() => setOpenCustomAmenities(true)}
							>
								+ Add custom amenities
							</i>
						</Grid>
						<Grid item xs={12}>
							<Button variant='contained' color='primary' onClick={handleClose}>
								Close
							</Button>
						</Grid>
					</Grid>
				</Card>
			</Dialog>
		</Grid>
	);
};

export default GeneralInfo;
