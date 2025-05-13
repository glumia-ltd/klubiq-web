import { useState, useEffect } from 'react';
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
	// Collapse,
	Chip,
	Stack,
	Menu,
	DialogTitle,
	DialogContent,
	DialogActions,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import StateList from '../../helpers/stateList.json';
import ControlledSelect from '../../components/ControlledComponents/ControlledSelect';
import ControlledTextField from '../../components/ControlledComponents/ControlledTextField';
import { GeneralFormStyle } from './style';
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
import { getIn, useFormik } from 'formik';
import { MoreVert } from '@mui/icons-material';
import { MEASUREMENTS } from '../../helpers/utils';
import { Close, Add } from '@mui/icons-material';
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
	const [, setNumberOfUnits] = useState(1);
	const [openAddUnit, setOpenAddUnit] = useState(false);
	const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0);
	const [measurement, setMeasurement] = useState<string>(MEASUREMENTS[0].unit);
	const [openCustomAmenities, setOpenCustomAmenities] = useState(false);
	// const [collapseUnit, setCollapseUnit] = useState<number[]>([]);
	const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
	const dispatch = useDispatch();
	const openDropdown = Boolean(anchorElement);
	const [expandedUnit, setExpandedUnit] = useState<number | false>(0);

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
	const emptyUnit = (id: number) => ({
		id: null,
		unitNumber: `unit-${id}`,
		rentAmount: null,
		floor: null,
		bedrooms: null,
		bathrooms: null,
		toilets: null,
		area: {
			value: null,
			unit: MEASUREMENTS[0].unit,
		},
		status: '',
		rooms: null,
		offices: null,
		amenities: null,
	});
	const handleSetNumberOfUnits = async (values: { numberOfUnits: number }) => {
		setNumberOfUnits(values.numberOfUnits);
		setOpenAddUnit(false);
		const units = [...formik.values.units];
		const existingUnitCount = units.length;

		for (let i = 0; i < values.numberOfUnits; i++) {
			const newUnitNumber = `unit-${existingUnitCount + i + 1}`;
			units.push({
				...emptyUnit(existingUnitCount + i + 1),
				unitNumber: newUnitNumber,
			});
		}
		formik.setFieldValue('units', units);
		setNumberOfUnits(0);
	};
	const unitCountFormik = useFormik({
		initialValues: {
			numberOfUnits: 1,
		},
		onSubmit: handleSetNumberOfUnits,
	});

	// const addUnit = () => {
	// 	formik.setFieldValue('units', [
	// 		...formik.values.units,
	// 		{
	// 			id: null,
	// 			unitNumber: '',
	// 			rentAmount: null,
	// 			floor: null,
	// 			bedrooms: null,
	// 			bathrooms: null,
	// 			toilets: null,
	// 			area: {
	// 				value: null,
	// 				unit: '',
	// 			},
	// 			status: '',
	// 			rooms: null,
	// 			offices: null,
	// 			amenities: null,
	// 		},
	// 	]);
	// };

	const cloneUnit = (index: number) => {
		const unitToClone = formik.values.units?.[index];
		if (!unitToClone) {
			return;
		}
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
		const {categoryMetaData} = formik.values;

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

	// Ensure all units have a unit number by default on mount
	useEffect(() => {
		if (Array.isArray(formik.values.units)) {
			const updatedUnits = formik.values.units.map((unit: any, idx: number) => {
				if (!unit.unitNumber || unit.unitNumber === '') {
					return { ...unit, unitNumber: `unit-${idx + 1}` };
				}
				return unit;
			});
			// Only update if something changed
			if (
				JSON.stringify(updatedUnits) !== JSON.stringify(formik.values.units)
			) {
				formik.setFieldValue('units', updatedUnits);
			}
		}
	}, []); // Run only on mount

	return (
		<Stack direction={'column'} spacing={2}>
			<Card sx={GeneralFormStyle.card}>
				<Stack spacing={1}>
					<Typography variant='subtitle1' textTransform={'uppercase'}>
						ADDRESS
					</Typography>

					<Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} spacing={2}>
						<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
							<AutoComplete
								required
								formik={formik}
								name={'address.addressLine1'}
								label={'Street Address'}
							/>
						</Box>
						<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
							<ControlledTextField
								name='address.addressLine2'
								label='Apartment, suite, etc.'
								formik={formik}
							/>
						</Box>
					</Stack>
					<Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} spacing={2}>
						<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
							<ControlledSelect
								required
								name='address.country'
								label='Country'
								type='text'
								formik={formik}
								options={countries}
							/>
						</Box>
						<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
							<ControlledTextField
								name='address.postalCode'
								label='Postal Code'
								formik={formik}
							/>
						</Box>
					</Stack>

					<Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} spacing={2}>
						<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
							<ControlledTextField
								name='address.state'
								label='State (Province or Region)'
								formik={formik}
							/>
						</Box>
						<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
							<ControlledTextField
								name='address.city'
								label='City'
								formik={formik}
							/>
						</Box>
					</Stack>
				</Stack>
			</Card>

			{selectedUnitType !== 'multi' && (
				<Card sx={GeneralFormStyle.cardTwo}>
					<Stack spacing={2}>
						<Typography variant='subtitle1' textTransform={'uppercase'}>
							Unit Details
						</Typography>

						<Stack direction='row' spacing={2}>
							<ControlledTextField
								required
								name={`units[${currentUnitIndex}].${getNameByPropertyCategory()}`}
								label={`${capitalize(getNameByPropertyCategory())}`}
								type='number'
								formik={formik}
								sx={{ flex: 1 }}
							/>
							<ControlledTextField
								name={`units[${currentUnitIndex}].bathrooms`}
								label='Bathrooms'
								type='number'
								formik={formik}
								sx={{ flex: 1 }}
							/>
						</Stack>

						<Stack direction='row' spacing={2}>
							<ControlledTextField
								name={`units[${currentUnitIndex}].toilets`}
								label='Toilets'
								type='number'
								formik={formik}
								sx={{ flex: 1 }}
							/>
							<ControlledTextField
								required
								name={`units[${currentUnitIndex}].area.value`}
								label='Floor Plan'
								formik={formik}
								sx={{ flex: 1 }}
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
						</Stack>

						<Stack spacing={1}>
							<Typography variant='subtitle1'>Amenities</Typography>
							<Stack direction={'row'} flexWrap={'wrap'}>
								{renderAmenities(allAmenities)}
							</Stack>
							<Stack direction={'row'} flexWrap={'wrap'}>
								<Button
									variant='klubiqTextButton'
									startIcon={<Add />}
									onClick={() => setOpenCustomAmenities(true)}
								>
									Add custom amenities
								</Button>
							</Stack>
						</Stack>
					</Stack>
				</Card>
			)}

			{selectedUnitType === 'multi' && (
				<Card sx={GeneralFormStyle.cardTwo}>
					<Stack spacing={2}>
						<Stack direction={'row'} justifyContent={'end'}>
							<Button
								variant='klubiqMainButton'
								onClick={() => setOpenAddUnit(true)}
								startIcon={<AddIcon />}
								//sx={GeneralFormStyle.addButton}
							>
								Add Unit
							</Button>
						</Stack>

						<Stack spacing={1}>
							{formik.values?.units?.map((unit: any, unitIndex: number) => (
								<Accordion
									key={unitIndex}
									expanded={expandedUnit === unitIndex}
									onChange={(_, isExpanded) =>
										setExpandedUnit(isExpanded ? unitIndex : false)
									}
									sx={{ width: '100%' }}
								>
									<AccordionSummary
										expandIcon={
											expandedUnit === unitIndex ? (
												<ExpandLessIcon />
											) : (
												<ExpandMoreIcon />
											)
										}
										aria-controls={`unit-content-${unitIndex}`}
										id={`unit-header-${unitIndex}`}
										sx={GeneralFormStyle.titleDiv}
									>
										<Typography variant='h6'>
											{getIn(formik.values, `units[${unitIndex}].unitNumber`)}
										</Typography>
										<Stack
											direction='row'
											alignItems='center'
											spacing={2}
											ml='auto'
										>
											<IconButton
												onClick={(e) => {
													e.stopPropagation();
													handleClickDropdown(e);
												}}
											>
												<MoreVert />
											</IconButton>
											<Menu
												anchorEl={anchorElement}
												open={openDropdown}
												onClose={handleCloseDropdown}
											>
												<MenuItem
													onClick={() => {
														cloneUnit(unitIndex);
														handleCloseDropdown();
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
										</Stack>
									</AccordionSummary>
									<AccordionDetails>
										<Stack spacing={2} sx={GeneralFormStyle.cardContent}>
											<Stack spacing={1}>
												<Typography variant='h6' sx={GeneralFormStyle.subText}>
													Unit name
												</Typography>
												<ControlledTextField
													name={`units[${unitIndex}].unitNumber`}
													formik={formik}
												/>
											</Stack>

											<Typography variant='h3' sx={GeneralFormStyle.subText}>
												Unit Details
											</Typography>

											<Stack
												direction='row'
												spacing={2}
												sx={GeneralFormStyle.unitIcon}
											>
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
											</Stack>

											<Stack
												direction='row'
												flexWrap='wrap'
												gap={1}
												sx={{ maxWidth: '100%' }}
											>
												{getIn(formik.values, `units[${unitIndex}].amenities`)
													?.length > 0 &&
													getIn(
														formik.values,
														`units[${unitIndex}].amenities`,
													)?.map((amenity: string, amenityIndex: number) => (
														<Chip
															key={`--${amenity}--${amenityIndex}`}
															sx={{
																border: '1px solid #757575',
																'& .MuiChip-deleteIcon': {
																	color: '#757575',
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
													))}
											</Stack>
										</Stack>
									</AccordionDetails>
								</Accordion>
							))}
						</Stack>
					</Stack>
				</Card>
			)}

			<Dialog
				open={openCustomAmenities}
				onClose={handleCustomAmenitiesClose}
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography variant='h7'>Add Custom Amenities</Typography>
						<Close onClick={handleCustomAmenitiesClose} />
					</Stack>
				</DialogTitle>
				<DialogContent>
					<ControlledTextField name='newAmenity' formik={formik} />
				</DialogContent>
				<DialogActions>
					<Button
						variant='klubiqTextButton'
						onClick={handleCustomAmenitiesClose}
					>
						Close
					</Button>
					<Button variant='klubiqMainButton' onClick={handleAddCustomAmenites}>
						{' '}
						Add Amenity{' '}
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
				<DialogTitle>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography variant='h4'>Unit Details</Typography>
						<IconButton onClick={handleClose}>
							<Close />
						</IconButton>
					</Stack>
				</DialogTitle>
				<DialogContent>
					<Stack
						direction={'column'}
						spacing={1}
						justifyContent={'space-between'}
					>
						<Stack
							direction={{ xs: 'column', sm: 'row', md: 'row' }}
							justifyContent={'space-between'}
						>
							<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].${getNameByPropertyCategory()}`}
									label={`${capitalize(getNameByPropertyCategory())}`}
									type='number'
									formik={formik}
								/>
							</Box>

							<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].bathrooms`}
									label='Bathrooms'
									type='number'
									formik={formik}
								/>
							</Box>
						</Stack>
						<Stack
							direction={{ xs: 'column', sm: 'row', md: 'row' }}
							justifyContent={'space-between'}
						>
							<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
								<ControlledTextField
									name={`units[${currentUnitIndex}].toilets`}
									label='Toilets'
									type='number'
									formik={formik}
								/>
							</Box>

							<Box sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}>
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
							</Box>
						</Stack>
						<Stack
							direction={'column'}
							spacing={1}
							justifyContent={'space-between'}
						>
							<Typography variant='subtitle1'>Amenities</Typography>
							<Stack direction={'row'} flexWrap={'wrap'}>
								{renderAmenities(allAmenities)}
							</Stack>
							<Button
								sx={{ width: { xs: '100%', sm: '40%' } }}
								variant='klubiqTextButton'
								startIcon={<Add />}
								onClick={() => setOpenCustomAmenities(true)}
							>
								Add custom amenities
							</Button>
						</Stack>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button variant='klubiqTextButton' onClick={handleClose}>
						Close
					</Button>
					<Button variant='klubiqMainButton' onClick={handleClose}>
						Save unit details
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={openAddUnit}
				onClose={() => setOpenAddUnit(false)}
				maxWidth='xs'
				fullWidth
			>
				<DialogTitle>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography variant='subtitle1'>
							How many units are you adding?
						</Typography>
						<IconButton onClick={() => setOpenAddUnit(false)}>
							<Close />
						</IconButton>
					</Stack>
					<Typography variant='subtitle2'>
						You can add up to {10 - (formik.values.units?.length || 0)} units at
						a time
					</Typography>
				</DialogTitle>
				<DialogContent>
					<ControlledSelect
						name='numberOfUnits'
						type='number'
						formik={unitCountFormik}
						options={Array.from(
							{ length: 10 - (formik.values.units?.length || 0) },
							(_, i) => ({ name: `${i + 1}`, id: `${i + 1}` }),
						)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant='klubiqTextButton'
						onClick={() => setOpenAddUnit(false)}
					>
						Close
					</Button>
					<Button
						variant='klubiqMainButton'
						onClick={() => unitCountFormik.submitForm()}
					>
						Add Units
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
};

export default GeneralInfo;
