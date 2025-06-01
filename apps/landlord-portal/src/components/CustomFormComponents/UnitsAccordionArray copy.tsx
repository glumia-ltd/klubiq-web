import { useState, useEffect } from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	//Button,
	Stack,
	IconButton,
	Box,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import {
	FormFieldApi,
	ArrayFormFieldV1,
	KlubiqTSFormFields,
	FormFieldV1,
} from '@klubiq/ui-components';
import { AmenitiesDialog } from './AmenitiesDialog';

// interface Unit {
// 	unitNumber: string;
// 	bedrooms: number | null;
// 	bathrooms: number | null;
// 	toilets: number | null;
// 	rooms: number | null;
// 	offices: number | null;
// 	area: {
// 		value: number | null;
// 		unit: string;
// 	};
// 	amenities: string[];
// }

export const UnitsAccordionArray = ({
	fieldApi,
	fieldConfig,
	form,
	maxSubUnits,
}: {
	fieldApi: FormFieldApi;
	fieldConfig: ArrayFormFieldV1;
	form: any;
	maxSubUnits?: number;
}) => {
	const units = Array.isArray(fieldApi.state.value)
		? (fieldApi.state.value as any[])
		: [];
	const [expanded, setExpanded] = useState<number | false>(0);
	const [unitNumbers, setUnitNumbers] = useState<Record<number, string>>({});
	const totalUnits = form.state.values.unitDetails?.totalUnits;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	// Update unit numbers when units change
	useEffect(() => {
		const newUnitNumbers = units.reduce(
			(acc, unit, idx) => {
				acc[idx] = unit.unitNumber || `Unit ${idx + 1}`;
				return acc;
			},
			{} as Record<number, string>,
		);
		setUnitNumbers(newUnitNumbers);
	}, [units]);

	// Watch for unit number field changes
	useEffect(() => {
		const fieldValue = form.state.values[fieldConfig.name];

		if (!fieldValue) {
			setUnitNumbers({});
			return;
		}

		// Convert object to array if needed
		const unitsArray = Array.isArray(fieldValue)
			? fieldValue
			: Object.values(fieldValue);

		try {
			const newUnitNumbers = unitsArray.reduce(
				(acc: Record<number, string>, unit: any, idx: number) => {
					acc[idx] = unit?.unitNumber || `Unit ${idx + 1}`;
					return acc;
				},
				{},
			);
			setUnitNumbers(newUnitNumbers);
		} catch (error) {
			console.error('Error processing units:', error);
			setUnitNumbers({});
		}
	}, [form.state.values, fieldConfig.name]);

	// Effect to handle total units changes
	// useEffect(() => {
	// 	if (totalUnits) {
	// 		const numUnits = parseInt(totalUnits);
	// 		const currentUnits = units.length;

	// 		if (currentUnits < numUnits) {
	// 			// Add new units
	// 			const newUnits = [...units];
	// 			for (let i = currentUnits; i < numUnits; i++) {
	// 				newUnits.push({
	// 					unitNumber: `Unit ${i + 1}`,
	// 					bedrooms: null,
	// 					bathrooms: null,
	// 					toilets: null,
	// 					rooms: null,
	// 					offices: null,
	// 					area: {
	// 						value: null,
	// 						unit: 'SqM',
	// 					},
	// 					amenities: [],
	// 				});
	// 			}
	// 			fieldApi.handleChange(newUnits);
	// 			form.validateField(fieldConfig.name);
	// 		} else if (currentUnits > numUnits) {
	// 			// Remove excess units
	// 			const newUnits = units.slice(0, numUnits);
	// 			fieldApi.handleChange(newUnits);
	// 			form.validateField(fieldConfig.name);
	// 			setExpanded(false);
	// 		}
	// 	}
	// }, [totalUnits, units.length, fieldApi]);

	useEffect(() => {
		if (totalUnits) {
			const numUnits = parseInt(totalUnits);
			const currentUnits = units.length;

			if (currentUnits < numUnits) {
				// Add new units
				const newUnits = [...units];
				for (let i = currentUnits; i < numUnits; i++) {
					// Get default values from parent field config
					const defaultUnit: Record<string, any> = {};

					// Get subfields from parent config
					const subFields =
						typeof fieldConfig.fields === 'function'
							? fieldConfig.fields(form.state.values)
							: fieldConfig.fields || [];

					// Set defaults based on field type
					subFields.forEach((field) => {
						if (
							field.type === 'number' ||
							field.type === 'decimal' ||
							field.type === 'percent'
						) {
							defaultUnit[field.name] = null;
						} else if (field.type === 'array') {
							defaultUnit[field.name] = [];
						} else if (field.type === 'group') {
							if (field.name === 'area') {
								defaultUnit[field.name] = {
									value: null,
									unit: 'SqM',
								};
							} else {
								defaultUnit[field.name] = {};
							}
						} else {
							defaultUnit[field.name] = '';
						}
					});

					// Set unit number
					defaultUnit.unitNumber = `Unit ${i + 1}`;
					newUnits.push(defaultUnit);
				}
				fieldApi.handleChange(newUnits);
				form.validateField(fieldConfig.name);
			} else if (currentUnits > numUnits) {
				// Remove excess units
				const newUnits = units.slice(0, numUnits);
				fieldApi.handleChange(newUnits);
				form.validateField(fieldConfig.name);
				setExpanded(false);
			}
		}
	}, [totalUnits, units.length, fieldApi, fieldConfig, form]);

	const handleRemove = (idx: number) => {
		if (units.length > 1) {
			const newUnits = units.filter((_: any, i: number) => i !== idx);
			fieldApi.handleChange(newUnits);
			form.setFieldValue('unitDetails.totalUnits', newUnits.length.toString());
			form.validateField(fieldConfig.name);
			setExpanded(false);
		}
	};

	const handleClone = (idx: number) => {
		if (units.length < (maxSubUnits || parseInt(totalUnits))) {
			const clone = { ...units[idx] };
			const newUnits = [
				...units.slice(0, idx + 1),
				clone,
				...units.slice(idx + 1),
			];
			fieldApi.handleChange(newUnits);
			form.setFieldValue('unitDetails.totalUnits', newUnits.length.toString());
			form.validateField(fieldConfig.name);
			setExpanded(idx + 1);
		}
	};

	const subFields = (
		typeof fieldConfig.fields === 'function'
			? (fieldConfig.fields as (values: Record<string, any>) => FormFieldV1[])(
					form.state.values,
				)
			: fieldConfig.fields || []
	) as FormFieldV1[];
	return (
		
		<form.Field name={fieldConfig.name}
			validators={{
				onChange: ({ value }: { value: unknown }) => {
					// Validate array length
					if (!Array.isArray(value) || value.length === 0) {
						return 'At least one unit is required';
					}

					// Validate each unit has required fields
					const hasInvalidUnits = value.some((unit: any) => {
						return !unit.unitNumber || 
							unit.bedrooms === null || 
							unit.bathrooms === null || 
							unit.toilets === null || 
							!unit.area?.value;
					});

					if (hasInvalidUnits) {
						return 'All units must have required fields filled';
					}

					return undefined;
				}
			}}
		>
			<Stack key={fieldConfig.name} spacing={2}>
			{/* <pre>{JSON.stringify(form.state, null, 2)}</pre> */}
				{units.map((_, idx: number) => (
					<Accordion
						key={idx}
						expanded={expanded === idx}
						onChange={(_, isExpanded) => setExpanded(isExpanded ? idx : false)}
					>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant='h6'>
								{unitNumbers[idx] || `Unit ${idx + 1}`}
							</Typography>
							<Box ml='auto' display='flex' alignItems='center' gap={1}>
								{(!maxSubUnits || units.length < maxSubUnits) && (
									<IconButton
										onClick={(e) => {
											e.stopPropagation();
											handleClone(idx);
										}}
										size='small'
										aria-label='Clone unit'
										disabled={
											units.length >= (maxSubUnits || parseInt(totalUnits))
										}
									>
										<ContentCopyIcon fontSize='small' />
									</IconButton>
								)}
								<IconButton
									onClick={(e) => {
										e.stopPropagation();
										handleRemove(idx);
									}}
									size='small'
									aria-label='Remove unit'
									disabled={units.length === 2}
								>
									<DeleteIcon fontSize='small' />
								</IconButton>
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							<Stack
								direction={isMobile ? 'column' : 'row'}
								justifyContent='space-between'
								flexWrap='wrap'
								gap={1}
							>
								{subFields.map((subField: FormFieldV1, subIdx: number) => {
									// Check showIf condition for subfield
									if (subField.showIf) {
										const { values } = form.state;
										if (!subField.showIf(values)) {
											return null;
										}
									}
									// Special handling for amenities field
									if (subField.name === 'amenities') {
										return (
											<form.Field
												key={`${fieldConfig.name}[${idx}].${subField.name}-${subIdx}`}
												name={`${fieldConfig.name}[${idx}].${subField.name}`}
												validators={{
													onChange: ({ value }: { value: unknown }) => {
														// 1. Schema validation if present
														if (subField.validation?.schema) {
															try {
																subField.validation.schema.parse(value);
																// Mark parent array as touched and validate
																form.setFieldMeta(fieldConfig.name, {
																	...form.getFieldMeta(fieldConfig.name),
																	isTouched: true,
																});
																form.validateField(fieldConfig.name);
																form.validate();
																return undefined;
															} catch (e: unknown) {
																if (e && typeof e === 'object' && 'errors' in e && Array.isArray((e as any).errors)) {
																	return (e as any).errors?.[0]?.message || 'Invalid value';
																}
																return `${subField.label} is invalid`;
															}
														}
														// 2. Required check if no schema
														if (subField.required) {
															if (
																value === undefined ||
																value === null ||
																value === '' ||
																(Array.isArray(value) && value.length === 0)
															) {
																// Mark parent array as touched and validate
																form.setFieldMeta(fieldConfig.name, {
																	...form.getFieldMeta(fieldConfig.name),
																	isTouched: true,
																});
																form.validateField(fieldConfig.name);
																form.validate();
																return `${subField.label} is required`;
															}
														}
														// 3. Mark parent array as touched and validate
														form.setFieldMeta(fieldConfig.name, {
															...form.getFieldMeta(fieldConfig.name),
															isTouched: true,
														});
														form.validateField(fieldConfig.name);
														form.validate();
														return undefined;
													},
												}}
											>
												{(subFieldApi: FormFieldApi) => (
													<Box sx={{ width: '100%' }}>
														<KlubiqTSFormFields
															field={subFieldApi}
															form={form}
															fieldConfig={{
																...subField,
																customComponent: (f: FormFieldApi) => (
																	<AmenitiesDialog
																		field={{
																			fieldConfig: {
																				...subField,
																				options: Array.isArray(subField.options)
																					? subField.options.map(
																							(opt: any) => ({
																								...opt,
																								value: String(opt.value),
																							}),
																						)
																					: typeof subField.options ===
																						  'function'
																						? subField
																								.options(form.state.values)
																								.map((opt: any) => ({
																									...opt,
																									value: String(opt.value),
																								}))
																						: [],
																			},
																			state: f.state,
																			handleChange: f.handleChange,
																		}}
																		form={form}
																	/>
																),
															}}
														/>
													</Box>
												)}
											</form.Field>
										);
									}

									// Special handling for unit number field
									if (subField.name === 'unitNumber') {
										return (
											<form.Field
												key={`${fieldConfig.name}[${idx}].${subField.name}-${subIdx}`}
												name={`${fieldConfig.name}[${idx}].${subField.name}`}
												validators={{
													onChange: ({ value }: { value: unknown }) => {
														// 1. Schema validation if present
														if (subField.validation?.schema) {
															try {
																subField.validation.schema.parse(value);
																// Mark parent array as touched and validate
																form.setFieldMeta(fieldConfig.name, {
																	...form.getFieldMeta(fieldConfig.name),
																	isTouched: true,
																});
																form.validateField(fieldConfig.name);
																form.validate();
																return undefined;
															} catch (e: unknown) {
																if (e && typeof e === 'object' && 'errors' in e && Array.isArray((e as any).errors)) {
																	return (e as any).errors?.[0]?.message || 'Invalid value';
																}
																return `${subField.label} is invalid`;
															}
														}
														// 2. Required check if no schema
														if (subField.required && (value === undefined || value === null || value === '')) {
															// Mark parent array as touched and validate
															form.setFieldMeta(fieldConfig.name, {
																...form.getFieldMeta(fieldConfig.name),
																isTouched: true,
															});
															form.validateField(fieldConfig.name);
															form.validate();
															return `${subField.label} is required`;
														}
														// 3. Mark parent array as touched and validate
														form.setFieldMeta(fieldConfig.name, {
															...form.getFieldMeta(fieldConfig.name),
															isTouched: true,
														});
														form.validateField(fieldConfig.name);
														form.validate();
														return undefined;
													}
												}}
											>
												{(subFieldApi: FormFieldApi) => (
													<Box sx={{ width: '100%' }}>
														<KlubiqTSFormFields
															field={subFieldApi}
															form={form}
															fieldConfig={subField}
														/>
													</Box>
												)}
											</form.Field>
										);
									}

									// Regular fields layout
									return (
										<form.Field
											key={`${fieldConfig.name}[${idx}].${subField.name}-${subIdx}`}
											name={`${fieldConfig.name}[${idx}].${subField.name}`}
											validators={{
												onChange: ({ value }: { value: unknown }) => {
													console.log('Forme meta', form)
													// 1. Schema validation if present
													if (subField.validation?.schema) {
														try {
															subField.validation.schema.parse(value);
															// Mark parent array as touched and validate
															form.setFieldMeta(fieldConfig.name, {
																...form.getFieldMeta(fieldConfig.name),
																isTouched: true,
															});
															form.validateField(fieldConfig.name);
															form.validate();
															return undefined;
														} catch (e: unknown) {
															if (e && typeof e === 'object' && 'errors' in e && Array.isArray((e as any).errors)) {
																return (e as any).errors?.[0]?.message || 'Invalid value';
															}
															return `${subField.label} is invalid`;
														}
													}
													// 2. Required check if no schema
													if (subField.required) {
														if (
															value === undefined ||
															value === null ||
															value === '' ||
															(Array.isArray(value) && value.length === 0)
														) {
															// Mark parent array as touched and validate
															form.setFieldMeta(fieldConfig.name, {
																...form.getFieldMeta(fieldConfig.name),
																isTouched: true,
															});
															form.validateField(fieldConfig.name);
															form.validate();
															return `${subField.label} is required`;
														}
													}
													// 3. Mark parent array as touched and validate
													form.setFieldMeta(fieldConfig.name, {
														...form.getFieldMeta(fieldConfig.name),
														isTouched: true,
													});
													form.validateField(fieldConfig.name);
													form.validate();
													return undefined;
												},
											}}
										>
											{(subFieldApi: FormFieldApi) => (
												<Box
													sx={{
														width: isMobile ? '100%' : '48%',
														flex: isMobile ? '1 1 100%' : '0 0 48%',
													}}
												>
													<KlubiqTSFormFields
														field={subFieldApi}
														form={form}
														fieldConfig={subField}
													/>
												</Box>
											)}
										</form.Field>
									);
								})}
							</Stack>
						</AccordionDetails>
					</Accordion>
				))}
				{/* <Stack direction="row" justifyContent="end">
        <Button
          variant="klubiqMainButton"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={units.length >= parseInt(totalUnits)}
        >
          Add Unit
        </Button>
      </Stack> */}
			</Stack>
		</form.Field>
	);
};
