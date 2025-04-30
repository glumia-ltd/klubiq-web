import { useState } from 'react';
import {
	Card,
	Typography,
	Button,
	IconButton,
	FormControlLabel,
	Checkbox,
	Dialog,
	InputAdornment,
	Select,
	MenuItem,
	Tooltip,
	Collapse,
	Chip,
	Stack,
	Menu,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import StateList from '../../helpers/stateList.json';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import styles from './style';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
// import { getAddPropertyState } from '../../store/AddPropertyStore/AddPropertySlice';
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
import { MoreVert } from '@mui/icons-material';
import { MEASUREMENTS } from '../../helpers/utils';

type CardProps = {
	formik: any;
	selectedUnitType?: string;
	amenities: { id: number; name: string }[];
};

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
	const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
	const dispatch = useDispatch();
	const openDropdown = Boolean(anchorElement);

	const handleClickDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElement(event.currentTarget);
	};
	const handleCloseDropdown = () => {
		setAnchorElement(null);
	};

	const customAmenitiesArray = formik?.values?.customAmenities?.map(
		(amenity: string) => ({
			id: amenity,
			name: amenity,
		}),
	);

	const allAmenities = amenities ? [...amenities, ...customAmenitiesArray] : [];

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
				amenities: null,
			},
		]);
	};

	const cloneUnit = (index: number) => {
		const unitToClone = formik.values.units?.[index];
		if (!unitToClone) return;
		const clonedUnit = {
			...unitToClone,
			unitNumber: unitToClone.unitNumber
				? `${unitToClone.unitNumber}-clone`
				: `unit-${formik.values.units.length + 1}`,
		};

		formik.setFieldValue('units', [...formik.values.units, clonedUnit]);
	};
	

	const handleRemoveUnit = (index: number) => {
		const units = [...formik.values.units];
		units.splice(index, 1);
		formik.setFieldValue('units', units);
	};

	const renderAmenities = (amenities: any) => {
		if (
			(currentUnitIndex !== null &&
				formik?.values?.units &&
				formik?.values?.units[currentUnitIndex]) ||
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
									(formik?.values?.units &&
										formik?.values?.units[
											currentUnitIndex
										]?.amenities?.includes(amenity?.name)) ||
									false
								}
								onChange={formik?.handleChange}
							/>
						}
						label={amenity?.name}
					/>
				),
			);
		}
		return null;
	};

	const getNameByPropertyCategory = () => {
		const categoryMetaData = formik.values.categoryMetaData;

		if (categoryMetaData?.hasBedrooms) {
			return 'bedrooms';
		} else if (categoryMetaData?.hasOffices) {
			return 'offices';
		} else if (categoryMetaData?.hasRooms) {
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
								required
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

						<Grid item xs={12} sm={6} md={6}>
							<ControlledSelect
								required
								name='address.country'
								label='Country'
								type='text'
								formik={formik}
								options={countries}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<ControlledTextField
								name='address.postalCode'
								label='Postal Code'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<ControlledTextField
								name='address.state'
								label='State (Province or Region)'
								formik={formik}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
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
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<ControlledTextField
									required
									name={`units[${currentUnitIndex}].${getNameByPropertyCategory()}`}
									label={`${capitalize(getNameByPropertyCategory())}`}
									type='number'
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].bathrooms`}
									label='Bathrooms'
									type='number'
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].toilets`}
									label='Toilets'
									type='number'
									formik={formik}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ControlledTextField
									required
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
							<Grid item xs={12} sm={12}>
								<Typography variant='subtitle1'>Amenities</Typography>
								{renderAmenities(allAmenities)}
								<br />

								<Typography fontSize={'14px'}>
									<i
										style={{ cursor: 'pointer' }}
										onClick={() => setOpenCustomAmenities(true)}
									>
										+ Add custom amenities
									</i>
								</Typography>
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

							{formik.values?.units?.map((unit: any, unitIndex: number) => (
								<Grid
									container
									spacing={0}
									key={`${unitIndex}-${unitIndex}-unit`}
								>
									<Grid container spacing={0} sx={styles.boxContent}>
										<Grid item xs={12}>
											<Card sx={styles.titleDiv}>
												<Typography
													fontWeight={'500'}
													fontSize={'16px'}
													variant='h6'
												>
													{getIn(
														formik.values,
														`units[${unitIndex}].unitNumber`,
													)}
												</Typography>
												<Stack direction={'row'} alignItems={'center'} gap={2}>
													{collapseUnit.includes(unitIndex) ? (
														<IconButton
															edge='end'
															onClick={() => {
																const updatedValue = without(
																	collapseUnit,
																	unitIndex,
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
																		`units[${unitIndex}].unitNumber`,
																	)
																) {
																	dispatch(
																		openSnackbar({
																			message: 'Unit name cannot be empty',
																			severity: 'info',
																			isOpen: true,
																		}),
																	);
																	return;
																}
																setCollapseUnit([...collapseUnit, unitIndex]);
															}}
														>
															<ExpandLessIcon />
														</IconButton>
													)}
													{/* <IconButton edge='end'> */}
													<Grid sx={{ cursor: 'pointer' }}>
														<span onClick={handleClickDropdown}>
															<MoreVert />
														</span>

														<Menu
															anchorEl={anchorElement}
															open={openDropdown}
															onClose={handleCloseDropdown}
														>
															<MenuItem
																onClick={() => {
																	cloneUnit(unitIndex);
																}}
															>
																<CloneIcon
																	sx={{ marginRight: '5px', height: '12px' }}
																/>
																Clone unit
															</MenuItem>
															<MenuItem
																onClick={() => {
																	handleRemoveUnit(unitIndex);
																	handleCloseDropdown();
																}}
																disabled={formik.values.units.length <= 1}
															>
																<RemoveIcon
																	sx={{ marginRight: '5px', height: '12px' }}
																/>
																Remove unit
															</MenuItem>
														</Menu>
													</Grid>
													{/* </IconButton> */}
												</Stack>
											</Card>
										</Grid>

										<Collapse
											sx={{ width: '100%' }}
											orientation='vertical'
											in={collapseUnit.includes(unitIndex) ? false : true}
										>
											<Grid container spacing={0} sx={styles.cardContent}>
												<Grid item xs={12} md={12}>
													<Typography variant='h6' sx={styles.subText}>
														Unit name
													</Typography>
													<ControlledTextField
														name={`units[${unitIndex}].unitNumber`}
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
														title={`Click to adjust ${getNameByPropertyCategory().slice(
															0,
															-1,
														)} count`}
													>
														<IconButton onClick={() => handleOpen(unitIndex)}>
															{getNameByPropertyCategory() === 'offices' ? (
																<EmojiOneBuildingIcon sx={{ height: '15px' }} />
															) : (
																<Bedroom />
															)}
															<Typography>
																{unit[getNameByPropertyCategory()]}
															</Typography>
														</IconButton>
													</Tooltip>
													<Tooltip title={`Click to adjust bathroom count`}>
														<IconButton onClick={() => handleOpen(unitIndex)}>
															<ShowerIcon sx={{ height: '15px' }} />
															<Typography>{unit?.bathrooms}</Typography>
														</IconButton>
													</Tooltip>
													<Tooltip title={`Click to adjust toilet count`}>
														<IconButton onClick={() => handleOpen(unitIndex)}>
															<Bathroom />
															<Typography>{unit?.toilets}</Typography>
														</IconButton>
													</Tooltip>
													<Tooltip title={`Click to adjust floor plan`}>
														<IconButton onClick={() => handleOpen(unitIndex)}>
															<FloorPlan />
															<Typography>
																{unit?.area.value}{' '}
																{unit?.area.value &&
																	(find(MEASUREMENTS, {
																		unit: unit?.area.unit,
																	})?.symbol ||
																		find(MEASUREMENTS, {
																			unit: 'SqM',
																		})?.symbol)}
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
															`units[${unitIndex}].amenities`,
														)?.length > 0 &&
															getIn(
																formik.values,
																`units[${unitIndex}].amenities`,
															)?.map(
																(amenity: string, amenityIndex: number) => {
																	return (
																		<Chip
																			key={`--${amenity}--${amenityIndex}`}
																			sx={{
																				border: '1px solid #757575',

																				'& .MuiChip-deleteIcon': {
																					color: '#757575', // Correct class targeting for delete icon color
																				},
																			}}
																			label={amenity}
																			variant='outlined'
																			onDelete={() =>
																				deselectAmenity(
																					`units[${unitIndex}].amenities`,
																					amenity,
																				)
																			}
																		/>
																	);
																},
															)}
													</Stack>
												</Grid>
											</Grid>
										</Collapse>
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
								name={`units[${currentUnitIndex}].${getNameByPropertyCategory()}`}
								label={`${capitalize(getNameByPropertyCategory())}`}
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
								Save unit details
							</Button>
						</Grid>
					</Grid>
				</Card>
			</Dialog>
		</Grid>
	);
};

export default GeneralInfo;
