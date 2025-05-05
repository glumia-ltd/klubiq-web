// // src/components/DynamicForm/DynamicForm.tsx
// 'use client';

// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import { Button, Stack, Box, Tooltip } from '@mui/material';
// import { DynamicFormProps, FormGroup, FormField } from './types';
// import { KlubiqFormFields } from './klubiq-formfields';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { style } from './style';
// import dayjs from 'dayjs';

// export interface KlubiqFormProps extends DynamicFormProps {
// 	// ... any additional props ...
// }

// export const KlubiqForm: React.FC<KlubiqFormProps> = ({
// 	fields,
// 	onSubmit,
// 	initialValues = {},
// 	submitButtonText = 'Submit',
// 	enableReset = false,
// 	resetButtonText = 'Reset',
// }) => {
// 	// Generate validation schema based on fields
// 	const validationSchema = Yup.object().shape(
// 		fields.reduce(
// 			(acc, field) => {
// 				if (field.validation) {
// 					if (field.type === 'date') {
// 						acc[field.name] = Yup.date()
// 							.transform((value) => (value ? dayjs(value).toDate() : null))
// 							.nullable()
// 							.test('date-validation', 'Invalid date', function (value) {
// 								const { path, parent, createError } = this;
// 								if (field.minDate) {
// 									const minDateValue = parent[field.minDate];
// 									if (
// 										value &&
// 										minDateValue &&
// 										dayjs(value).isBefore(dayjs(minDateValue))
// 									) {
// 										return createError({
// 											path,
// 											message: `Date must be greater than or equal to ${dayjs(minDateValue).format('DD/MM/YYYY')}`,

// 										});
// 									}
// 								}
// 								if (field.maxDate) {
// 									const maxDateValue = parent[field.maxDate];
// 									if (
// 										value &&
// 										maxDateValue &&
// 										dayjs(value).isAfter(dayjs(maxDateValue))
// 									) {
// 										return createError({
// 											path,
// 											message: `Date must be less than or equal to ${dayjs(maxDateValue).format('DD/MM/YYYY')}`,
// 										});
// 									}
// 								}
// 								return true;
// 							})
// 							.when('*', (values: any, schema: any) => {
// 								// Access other field values through the parent object
// 								field.dependsOn?.forEach((dependsOn) => {
// 									const parentField = dependsOn.field;
//                   const parentFieldValue = dependsOn.value || values[parentField];
// 									if (parentField && parentFieldValue) {
// 										return schema.min(
// 											Yup.ref(parentField),
// 											`Must be after ${parentFieldValue}`,
// 										);
// 									}
// 								});
// 								return schema;
// 							});
// 					}
// 					acc[field.name] = field.validation;
// 				} else if (field.required) {
// 					switch (field.type) {
// 						case 'date':
// 							acc[field.name] = Yup.date()
// 								.transform((value) => (value ? dayjs(value).toDate() : null))
// 								.nullable()
// 								.required(`${field.label} is required`)
// 								.test('date-validation', 'Invalid date', function (value) {
// 									const { path, parent, createError } = this;
// 									if (field.minDate) {
// 										const minDateValue = parent[field.minDate];
// 										if (
// 											value &&
// 											minDateValue &&
// 											dayjs(value).isBefore(dayjs(minDateValue))
// 										) {
// 											return createError({
// 												path,
// 												message: `Date must be greater than or equal to ${dayjs(minDateValue).format('DD/MM/YYYY')}`,
// 											});
// 										}
// 									}
// 									if (field.maxDate) {
// 										const maxDateValue = parent[field.maxDate];
// 										if (
// 											value &&
// 											maxDateValue &&
// 											dayjs(value).isAfter(dayjs(maxDateValue))
// 										) {
// 											return createError({
// 												path,
// 												message: `Date must be less than or equal to ${dayjs(maxDateValue).format('DD/MM/YYYY')}`,
// 											});
// 										}
// 									}
// 									return true;
// 								})
// 								.when('*', (values: any, schema: any) => {
// 									// Access other field values through the parent object
// 									field.dependsOn?.forEach((dependsOn) => {
// 										const parentField = dependsOn.field;
//                     const parentFieldValue = dependsOn.value || values[parentField];
// 										if (parentField && parentFieldValue) {
// 											return schema.min(
// 												Yup.ref(parentField),
// 												`Must be after ${parentFieldValue}`,
// 											);
// 										}
// 									});
// 									return schema;
// 								});
// 							break;
// 						case 'number':
// 						case 'decimal':
// 							acc[field.name] = Yup.number()
// 								.nullable()
// 								.transform((value) => (isNaN(value) ? null : value))
// 								.required(`${field.label} is required`)
// 								.min(field.min || -Infinity)
// 								.max(field.max || Infinity);
// 							break;
// 						case 'email':
// 							acc[field.name] = Yup.string()
// 								.email('Invalid email format')
// 								.required(`${field.label} is required`);
// 							break;
// 						default:
// 							acc[field.name] = Yup.string().required(
// 								`${field.label} is required`,
// 							);
// 					}
// 				}

// 				return acc;
// 			},
// 			{} as Record<string, Yup.AnySchema>,
// 		),
// 	);

// 	// Generate initial values based on fields
// 	const generateInitialValues = () => {
// 		return fields.reduce(
// 			(acc, field) => {
// 				acc[field.name] = initialValues[field.name] || field.defaultValue || '';
// 				return acc;
// 			},
// 			{} as Record<string, any>,
// 		);
// 	};

// 	return (
// 		<Formik
// 			initialValues={generateInitialValues()}
// 			validationSchema={validationSchema}
// 			onSubmit={onSubmit}
// 			validateOnMount={true} // Add this to validate on initial render
// 			validateOnChange={true} // Validate on every change
// 		>
// 			{({ handleReset, isSubmitting, isValid, dirty, errors }) => (
// 				<Box sx={style.container}>
// 					<Form>
// 						<Stack spacing={2}>
// 							{fields.map((field) => (
// 								<Box key={field.name}>
// 									{field.customComponent || (
// 										<LocalizationProvider dateAdapter={AdapterDayjs}>
// 											<KlubiqFormFields field={field} />
// 										</LocalizationProvider>
// 									)}
// 								</Box>
// 							))}

// 							<Stack direction='row' spacing={2} justifyContent='flex-end'>
// 								{enableReset && (
// 									<Button
// 										type='button'
// 										variant='text'
// 										onClick={handleReset}
// 										disabled={isSubmitting || !dirty}
// 									>
// 										{resetButtonText}
// 									</Button>
// 								)}
// 								<Tooltip
// 									title={isValid ? '' : Object.values(errors).join(', ')}
// 									open={!isValid && dirty}
// 								>
// 									<span>
// 										<Button
// 											type='submit'
// 											variant='contained'
// 											disabled={isSubmitting || !isValid || !dirty}
// 										>
// 											{submitButtonText}
// 										</Button>
// 									</span>
// 								</Tooltip>
// 							</Stack>
// 						</Stack>
// 					</Form>
// 				</Box>
// 			)}
// 		</Formik>
// 	);
// };

// src/components/DynamicForm/DynamicForm.tsx

/// DO NOT UNCOMMENT THE CODE ABOVE //
/// IT IS THE OLD CODE THAT IS NOT WORKING //
/// THE CODE BELOW IS THE NEW CODE THAT IS WORKING //
/// WE WILL DELETE THE CODE ABOVE AFTER WE HAVE TESTED THE NEW CODE //

'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Stack, Box, Tooltip } from '@mui/material';
import { DynamicFormProps, FormGroup, FormField } from './types';
import { KlubiqFormFields } from './klubiq-formfields';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { style } from './style';
import dayjs from 'dayjs';

export interface KlubiqFormProps extends DynamicFormProps {}

export const KlubiqForm: React.FC<KlubiqFormProps> = ({
	fields,
	onSubmit,
	initialValues = {},
	submitButtonText = 'Submit',
	enableReset = false,
	resetButtonText = 'Reset',
	formWidth = '100%',
}) => {
	const createDateValidation = (field: FormField, isRequired: boolean) => {
		const getFieldValue = (fieldPath: string, parent: any) => {
			const parts = fieldPath.split('.');
			if (parts.length === 1) {
				return parent[fieldPath];
			}
			const [groupName, fieldName] = parts;
			if (groupName && fieldName) {
				return parent?.[groupName]?.[fieldName];
			}
			return undefined;
		};

		let schema = Yup.date()
			.transform((value) => (value ? dayjs(value).toDate() : null))
			.nullable()
			.test('date-validation', 'Invalid date', function (value) {
				const { path, parent, createError } = this;

				if (!value) {
					return !isRequired;
				}

				if (field.minDate) {
					const minDateValue = getFieldValue(field.minDate, parent);
					if (minDateValue && dayjs(value).isBefore(minDateValue)) {
						return createError({
							path,
							message: `${field.label} must be after ${field.minDate}`,
						});
					}
				}

				// Handle maxDate constraint
				if (field.maxDate) {
					const maxDateValue = getFieldValue(field.maxDate, parent);
					if (maxDateValue && dayjs(value).isAfter(dayjs(maxDateValue))) {
						return createError({
							path,
							message: `${field.label} must be before ${field.maxDate}`,
						});
					}
				}

				return true;
			});

		if (isRequired) {
			schema = schema.required(`${field.label} is required`);
		}

		// Handle dependencies
		if (field.dependsOn?.length) {
			schema = schema.when('*', (_, schema) => {
				return field.dependsOn!.reduce((acc, { field: parentField }) => {
					const fieldName = parentField.split('.').pop()!;
					return acc.test(
						`depends-on-${fieldName}`,
						`Must be after ${fieldName}`,
						function (value) {
							if (!value) return true;
							const dependentValue = getFieldValue(parentField, this.parent);
							if (
								dependentValue &&
								dayjs(value).isBefore(dayjs(dependentValue))
							) {
								return this.createError({
									path: this.path,
									message: `${field.label} must be after ${fieldName}`,
								});
							}
							return true;
						},
					);
				}, schema);
			});
		}

		return schema;
	};

	// const createDependentValidation = (field: FormField, isRequired: boolean) => {
	// 	const getFieldValue = (fieldPath: string, parent: any) => {
	// 		const parts = fieldPath.split('.');
	// 		if (parts.length === 1) {
	// 			return parent[fieldPath];
	// 		}
	// 		const [groupName, fieldName] = parts;
	// 		if (groupName && fieldName) {
	// 			return parent?.[groupName]?.[fieldName];
	// 		}
	// 		return undefined;
	// 	};

	// 	let schema = Yup.string();

	// 	// Handle dependencies
	// 	if (field.dependsOn?.length) {
	// 		schema = schema.when('*', (_, schema) => {
	// 			return field.dependsOn!.reduce((acc, { field: parentField, value: requiredValue }) => {
	// 				const fieldName = parentField.split('.').pop()!;
	// 				return acc.test(
	// 					`depends-on-${fieldName}`,
	// 					`Must be equal to ${requiredValue}`,
	// 					function () {
	// 						const dependentValue = getFieldValue(parentField, this.parent);
	// 						if (
	// 							dependentValue &&
	// 							dependentValue === requiredValue
	// 						) {
	// 							schema = schema.required(`${field.label} is required`);
	// 						}
	// 					},
	// 				);
	// 			}, schema);
	// 		});
	// 	} else if (isRequired) {
	// 		schema = schema.required(`${field.label} is required`);
	// 	}
	// 	return schema;
	// };

	const createDependentValidation = (field: FormField, isRequired: boolean) => {
		// If there are dependencies
		if (field.dependsOn?.length) {
			// Collect dependency field names
			const dependencyFields = field.dependsOn.map((dep) => dep.field);
			console.log(dependencyFields);

			// Use Yup's .when() with array of dependencies
			return Yup.string().when(dependencyFields, (...args) => {
				// The last argument is the schema
				const schema = args[args.length - 1];
				// The dependency values are in order
				const dependencyValues = args.slice(0, -1);
				console.log(dependencyValues);

				// Check if all dependencies match their required values
				const allMatch = field.dependsOn!.every(
					(dep, idx) => dependencyValues[idx] === dep.value,
				);

				if (allMatch) {
					return Yup.string().required(`${field.label} is required`);
				}
				return Yup.string().notRequired();
			});
		}

		// If no dependencies, just required or not
		return isRequired
			? Yup.string().required(`${field.label} is required`)
			: Yup.string();
	};
	const createFieldValidation = (field: FormField) => {
		if (field.validation) {
			if (field.type === 'date') {
				return createDateValidation(field, field.required ?? false);
			}
			return field.validation;
		}

		if (!field.required) {
			return Yup.mixed().nullable();
		}

		switch (field.type) {
			case 'date':
				return createDateValidation(field, true);
			case 'number':
			case 'decimal':
				return Yup.number()
					.nullable()
					.transform((value) => (isNaN(value) ? null : value))
					.required(`${field.label} is required`)
					.min(field.min || -Infinity)
					.max(field.max || Infinity);
			case 'email':
				return Yup.string()
					.email('Invalid email format')
					.required(`${field.label} is required`);
			default:
				return createDependentValidation(field, field.required ?? false);
		}
	};

	// Generate validation schema
	const validationSchema = Yup.object().shape(
		fields.reduce(
			(acc, field: FormField | FormGroup) => {
				if ('fields' in field) {
					// Handle group fields
					const groupSchema = field.fields.reduce(
						(groupAcc, groupField) => {
							// Use the full path for nested fields (e.g., 'leaseDetails.startDate')
							groupAcc[groupField.name.split('.').pop()!] =
								createFieldValidation(groupField);
							return groupAcc;
						},
						{} as Record<string, Yup.AnySchema>,
					);
					// Create a nested object schema for the group
					acc[field.name] = Yup.object().shape(groupSchema);
				} else {
					acc[field.name] = createFieldValidation(field);
				}
				return acc;
			},
			{} as Record<string, Yup.AnySchema>,
		),
	);
	// Generate initial values
	const generateInitialValues = () => {
		return fields.reduce(
			(acc, field: FormField | FormGroup) => {
				if ('fields' in field) {
					// Handle group fields
					acc[field.name] = field.fields.reduce(
						(groupAcc, groupField) => {
							const fieldName = groupField.name.split('.').pop()!;
							groupAcc[fieldName] =
								initialValues[groupField.name] ??
								groupField.defaultValue ??
								getDefaultValueByType(groupField.type);
							return groupAcc;
						},
						{} as Record<string, any>,
					);
				} else {
					acc[field.name] =
						initialValues[field.name] ??
						field.defaultValue ??
						getDefaultValueByType(field.type);
				}
				return acc;
			},
			{} as Record<string, any>,
		);
	};
	// Helper function to get default values by field type
	const getDefaultValueByType = (type?: string) => {
		switch (type) {
			case 'number':
			case 'decimal':
				return ''; // Changed from null to empty string
			case 'date':
				return null; // Keep null for date fields as they handle null differently
			case 'boolean':
				return false;
			case 'select':
			case 'multiselect':
				return ''; // Added handling for select inputs
			default:
				return '';
		}
	};

	// Render form buttons
	const FormButtons = ({
		isSubmitting,
		isValid,
		dirty,
		handleReset,
		errors,
	}: any) => (
		<Stack direction='row' spacing={2} justifyContent='flex-end'>
			{enableReset && (
				<Button
					type='button'
					variant='text'
					onClick={handleReset}
					disabled={isSubmitting || !dirty}
				>
					{resetButtonText}
				</Button>
			)}
			<Tooltip
				title={'Form is invalid. Please check the fields and try again.'}
				open={!isValid && dirty}
			>
				<span>
					<Button
						type='submit'
						variant='contained'
						disabled={isSubmitting || !isValid || !dirty}
					>
						{submitButtonText}
					</Button>
				</span>
			</Tooltip>
		</Stack>
	);

	return (
		<Formik
			initialValues={generateInitialValues()}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			validateOnMount={true}
			validateOnChange={true}
		>
			{({ handleReset, isSubmitting, isValid, dirty, errors, values }) => (
				<Box sx={{ ...style.container, width: formWidth }}>
					<Form>
						<Stack spacing={2}>
							{fields.map((field) => {
								const shouldShowField = !field.showIf || field.showIf(values);
								if (!shouldShowField) {
									return null;
								}
								return (
									<Box key={field.name}>
										{field.customComponent || (
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<KlubiqFormFields field={field} />
											</LocalizationProvider>
										)}
									</Box>
								);
							})}
							<FormButtons
								isSubmitting={isSubmitting}
								isValid={isValid}
								dirty={dirty}
								handleReset={handleReset}
								errors={errors}
							/>
						</Stack>
					</Form>
				</Box>
			)}
		</Formik>
	);
};
