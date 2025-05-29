// packages/ui-components/src/components/DynamicForm/klubiq-form.tsx
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	StepIconProps,
	styled,
	Typography,
	Card,
	CardContent,
	CardHeader,
	Stack,
	stepConnectorClasses,
	StepConnector,
} from '@mui/material';
import {
	DynamicTanstackFormProps,
	FormFieldV1,
	FormStep,
	GroupFormFieldV1,
} from './types';
import { KlubiqTSFormFields } from './klubiq-formfields';
import { style } from './style';
import { ArrowBack, Error, ArrowForward, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

const StepIconRoot = styled('div')<{
	ownerState: { active?: boolean; completed?: boolean; error?: boolean };
}>(
	({ theme, ownerState }) => ({
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400],
		zIndex: 1,
		color: '#fff',
		width: 40,
		height: 40,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 24,
		boxSizing: 'border-box',
		verticalAlign: 'middle',
		margin: '0 auto',
		position: 'relative',
		...(ownerState.active && {
			backgroundColor: theme.palette.primary.main,
		}),
		...(ownerState.completed && {
			backgroundColor: theme.palette.success.main,
		}),
		...(ownerState.error && {
			backgroundColor: theme.palette.error.main,
		}),
	}),
);

function StepIcon(props: StepIconProps) {
	const { active, completed, error, icon } = props;

	return (
		<StepIconRoot ownerState={{ active, completed, error }}>
			{completed ? (
				<CheckCircle />
			) : error ? (
				<Error />
			) : active ? (
				<RadioButtonUnchecked />
			) : (
				icon
			)}
		</StepIconRoot>
	);
}
const LineConnector = styled(StepConnector)(() => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 18,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: '#002147',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: '#002147',
			color: '#fff',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor: '#D1D5DB',
		borderRadius: 1,
	},
}));

// CustomStepIcon for Stepper
const CustomStepIcon = (props: StepIconProps & { step?: any }) => {
	const { active, completed, error, icon, step } = props;
	// If step has custom icons, use them
	if (step && 'icon' in step) {
		if (completed && step.icon?.completedIcon)
			return (
				<StepIconRoot className="MuiStepIcon-root" ownerState={{ active, completed, error }}>
					{step.icon.completedIcon}
				</StepIconRoot>
			);
		if (error && step.icon?.errorIcon)
			return (
				<StepIconRoot className="MuiStepIcon-root" ownerState={{ active, completed, error }}>
					{step.icon.errorIcon}
				</StepIconRoot>
			);
		if (active && step.icon?.icon)
			return (
				<StepIconRoot className="MuiStepIcon-root" ownerState={{ active, completed, error }}>
					{step.icon.icon}
				</StepIconRoot>
			);
		// fallback to step number if no icon
		return (
			<StepIconRoot className="MuiStepIcon-root" ownerState={{ active, completed, error }}>
				{step.icon?.icon || icon}
			</StepIconRoot>
		);
	}
	// Fallback to default
	return (
		<StepIconRoot className="MuiStepIcon-root" ownerState={{ active, completed, error }}>
			{icon}
		</StepIconRoot>
	);
};

export const KlubiqFormV1: React.FC<DynamicTanstackFormProps> = ({
	fields,
	onSubmit,
	initialValues = {},
	submitButtonText = 'Submit',
	enableReset = false,
	resetButtonText = 'Reset',
	isMultiStep = false,
	onStepChange,
	formWidth = '100%',
}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [stepErrors, setStepErrors] = useState<boolean[]>([]);
	const [stepValidations, setStepValidations] = useState<boolean[]>([]);
	const normalizedFields = Array.isArray(fields) ? fields : [fields];
	const steps = isMultiStep
		? (normalizedFields as FormStep[])
		: [{ fields: normalizedFields as FormFieldV1[] }];
	const createStepSchema = (stepFields: FormFieldV1[]) => {
		const schemaObject: Record<string, z.ZodType<any>> = {};

		const processField = (field: FormFieldV1, prefix = '') => {
			const fieldName = prefix ? `${prefix}.${field.name}` : field.name;

			
			if (field.type === 'group' && field.groupFields) {
				const subFields = typeof field.groupFields === 'function'
					? field.groupFields(form.state.values)
					: field.groupFields || [];
				const groupSchema: Record<string, z.ZodType<any>> = {};
				// Process each subfield
				subFields.forEach((subField: FormFieldV1) => {
					const subFieldName = `${fieldName}.${subField.name}`;
					// Add to group schema with full path
					const schema = getFieldSchema(subField, form.state.values, subFieldName);
					if (schema) {
						groupSchema[subField.name] = schema;
					}
				});
				// Add the group schema
				if (Object.keys(groupSchema).length > 0) {
					schemaObject[fieldName] = z.object(groupSchema);
				}
			} else if (field.type === 'array' && (field as any).fields) {
				const arraySchema = z.array(z.object(
					(field as any).fields.reduce((acc: Record<string, z.ZodType<any>>, subField: FormFieldV1) => {
						const schema = getFieldSchema(subField, form.state.values, `${fieldName}[${fieldName}]`);
						if (schema) {
							acc[subField.name] = schema;
						}
						return acc;
					}, {})
				));
				schemaObject[fieldName] = arraySchema;
			} else {
				const schema = getFieldSchema(field, form.state.values, fieldName);
				if (schema) {
					schemaObject[fieldName] = schema;
				}
			}
		};

		stepFields.forEach((field) => processField(field));
		return z.object(schemaObject);
	};

	const getRequiredSchema = (field: FormFieldV1, fullPath: string): z.ZodType<any> => {
		if (field.customComponent) {
			return z.any().refine((val) => {
				// For custom components, we need to check if the value is a valid selection
				return val !== undefined && val !== null && val !== '' && val !== '0' && val !== 0;
			}, 'Required');
		} else if (field.type === 'array') {
			return z.array(z.any()).min(field.required ? 1 : 0, 'Required');
		} else if (field.type === 'checkbox') {
			return z.boolean().refine(field.required ? (val) => val === true : () => true, 'Required');
		} else if (field.type === 'select' && (field as any).multiple) {
			return z.array(z.any()).min(field.required ? 1 : 0, 'Required');
		} else if (field.type === 'radio') {
			return z.string().min(field.required ? 1 : 0, 'Required');
		} else if (field.type === 'file') {
			return z.array(z.any()).min(field.required ? 1 : 0, 'Required');
		} else if(field.type === 'number' || field.type === 'percent' || field.type === 'decimal') {
			return z.number().refine(field.required ? (val: number) => val > 0 : () => true, 'Required');
		} else {
			return z.string().min(field.required ? 1 : 0, 'Required');
		}
	};

	const getFieldSchema = (field: FormFieldV1, formValues: any, fullPath: string): z.ZodType<any> | undefined => {		
		if (field.validation?.schema) {			let {schema} = field.validation;
			if (field.validation.dependencies) {
				schema = addDependenciesToSchema(schema, field, formValues);
			}
			return schema;
		} else if (field.required) {
			return getRequiredSchema(field, fullPath);
		}
		return undefined;
	};

	const addDependenciesToSchema = (schema: z.ZodType<any>, field: FormFieldV1, formValues: any) => {
		return field.validation?.dependencies?.reduce((currentSchema, dep) => {
			return currentSchema.refine(
				(value: any) => {
					const dependentValue = formValues[dep.field];
					switch (dep.type) {
						case 'min': return value > dependentValue;
						case 'max': return value < dependentValue;
						case 'equals': return value === dependentValue;
						case 'notEquals': return value !== dependentValue;
						default: return true;
					}
				},
				{ message: dep.message }
			);
		}, schema) || schema;
	};

	const validateField = (value: any, field: FormFieldV1, formValues: any, fullPath: string) => {
		try {
			const schema = getFieldSchema(field, formValues, fullPath);
			if (schema) {
				// For group fields, we need to validate the entire group object
				if (field.type === 'group') {
					const groupValue = formValues[field.name] || {};
					schema.parse(groupValue);
				} else {
					schema.parse(value);
				}
			}
			return undefined;
		} catch (error) {
			if (error instanceof z.ZodError) {
				return error.errors[0].message;
			}
			return 'Invalid value';
		}
	};

	const validateDependencies = async (value: any, field: FormFieldV1, formValues: any) => {
		if (field.validation?.dependencies) {
			for (const dep of field.validation.dependencies) {
				const dependentValue = formValues[dep.field];
				if (dep.type === 'min' && value <= dependentValue) {
					return dep.message || `${field.label} must be greater than ${dep.field}`;
				}
			}
		}
		return undefined;
	};

	const form = useForm({
		defaultValues: initialValues,
		onSubmit: async ({ value }) => {
			try {
				await onSubmit(value);
			} catch (error) {
			}
		},
		validators: {
			onSubmit: ({ value }) => {
				// Only validate the current step for submission
				const stepFields = steps[currentStep].fields;
				const stepSchema = createStepSchema(stepFields);
				try {
					stepSchema.parse(value);
					return undefined;
				} catch (error) {
					if (error instanceof z.ZodError) {
						return error.errors[0].message;
					}
					return 'Form is invalid';
				}
			}
		}
	});

	// Add effect to ensure group values are properly structured
	useEffect(() => {
		const { values } = form.state;
		let hasChanges = false;

		// Process each step's fields
		steps.forEach(step => {
			step.fields.forEach(field => {
				if (field.type === 'group' && field.groupFields) {
					const subFields = typeof field.groupFields === 'function'
						? field.groupFields(values)
						: field.groupFields || [];
					// Ensure the group object exists
					if (!values[field.name]) {
						values[field.name] = {};
						hasChanges = true;
					}
					// Ensure each subfield exists in the group
					subFields.forEach((subField: FormFieldV1) => {
						const subFieldPath = `${field.name}.${subField.name}`;
						if (values[subFieldPath] !== undefined && values[field.name][subField.name] === undefined) {
							values[field.name][subField.name] = values[subFieldPath];
							hasChanges = true;
						}
					});
				}
			});
		});

		// Update form values if changes were made
		if (hasChanges) {
			Object.entries(values).forEach(([key, value]) => {
				form.setFieldValue(key, value);
			});
		}
	}, [form.state.values]);

	// Add effect to force re-render when form values change
	useEffect(() => {
		// This will trigger a re-render of the form fields
		form.state.values;
	}, [form.state.values]);

	const validateCurrentStep = () => {
		const stepFields = steps[currentStep].fields;
		const stepSchema = createStepSchema(stepFields);
		try {
			// Ensure group values are properly structured
			const { values } = form.state;
			stepFields.forEach(field => {
				if (field.type === 'group' && field.groupFields) {
					const subFields = typeof field.groupFields === 'function'
						? field.groupFields(values)
						: field.groupFields || [];
					if (!values[field.name]) {
						values[field.name] = {};
					}
					// Ensure each subfield exists in the group
					subFields.forEach((subField: FormFieldV1) => {
						const subFieldName = `${field.name}.${subField.name}`;
						if (values[subFieldName] !== undefined) {
							values[field.name][subField.name] = values[subFieldName];
						}
					});
				}
			});

			// Parse the values with the schema
			stepSchema.parse(values);
			
			// If we get here, validation passed
			setStepValidations(prev => {
				const newValidations = [...prev];
				newValidations[currentStep] = true;
				return newValidations;
			});
			setStepErrors(prev => {
				const newErrors = [...prev];
				newErrors[currentStep] = false;
				return newErrors;
			});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				error.errors.forEach(err => {
					console.log('Zod validation errors:', error.errors);
					const fieldName = String(err.path[0]);
					const field = form.getFieldMeta(fieldName);
					if (field) {
						field.errors.push(err.message);
					}
				});
			}
			setStepValidations(prev => {
				const newValidations = [...prev];
				newValidations[currentStep] = false;
				return newValidations;
			});
			return false;
		}
	};

	// Add validation effect
	useEffect(() => {
		const isValid = validateCurrentStep();
		// Force form validation after step validation
		form.validate('change');
	}, [form.state.values, currentStep]);

	const validateStep = (stepIndex: number) => {
		const stepFields = steps[stepIndex].fields;
		const stepSchema = createStepSchema(stepFields);

		try {
			stepSchema.parse(form.state.values);
			return false;
		} catch (error) {
			if (error instanceof z.ZodError) {
				error.errors.forEach((err) => {
					const fieldName = String(err.path[0]);
					const field = form.getFieldMeta(fieldName);
					if (field) {
						field.errors.push(err.message);
					}
				});
			}
			return true;
		}
	};

	const handleNext = () => {
		const hasErrors = validateStep(currentStep);
		if (hasErrors) {
			setStepErrors((prev) => {
				const newErrors = [...prev];
				newErrors[currentStep] = true;
				return newErrors;
			});
			return;
		}

		if (currentStep < steps.length - 1) {
			setCurrentStep((prev) => prev + 1);
			onStepChange?.(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
			onStepChange?.(currentStep - 1);
		}
	};
	const renderErrors = (form: any) => {
		return form.state.errors.map((error: any) => {
			return <Typography key={error.path[0]} color='error'>{error.message}</Typography>;
		});
	};

	const renderFields = (fields: FormFieldV1[]) => {
		return fields.map((field) => {
			if (field.showIf && !field.showIf(form.state.values)) {
				return null;
			}

			// Array field support
			if (field.type === 'array') {
				// Ensure the array exists in state
				if (!Array.isArray(form.state.values[field.name])) {
					form.setFieldValue(field.name, []);
				}
				const arrayValue = form.state.values[field.name] || [];
				const arrayLength =
					typeof (field as any).getArrayLength === 'function'
						? (field as any).getArrayLength(form.state.values)
						: arrayValue.length || 1;

				// Ensure the array is the correct length
				if (arrayValue.length !== arrayLength) {
					form.setFieldValue(
						field.name,
						Array.from({ length: arrayLength }, (_, i) => arrayValue[i] || {}),
					);
				}

				return (
					<form.Field name={field.name}>
						{(fieldApi) => (
							<Card key={field.name} sx={{ mb: 3, boxShadow: 1 }}>
								<CardHeader
									title={field.label}
									titleTypographyProps={{ variant: 'h6' }}
								/>
								<CardContent>
									{field.customComponent
										? (typeof field.customComponent === 'function'
											? field.customComponent(fieldApi, field, form)
											: field.customComponent)
										: (
											<Box>
												{Array.from({ length: arrayLength }).map((_, idx) => (
													<Box
														key={idx}
														sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 2 }}
													>
														<Typography variant='subtitle2' sx={{ mb: 1 }}>
															{field.label} {arrayLength > 1 ? idx + 1 : ''}
														</Typography>
														{(field as any).fields.map(
															(subField: any, subFieldIndex: number) => (
																<form.Field
																	key={`${field.name}[${idx}].${subField.name}.${subFieldIndex}`}
																	name={`${field.name}[${idx}].${subField.name}`}
																>
																	{(subFieldApi) => (
																		<KlubiqTSFormFields
																			field={subFieldApi}
																			form={form}
																			fieldConfig={subField}
																		/>
																	)}
																</form.Field>
															),
														)}
													</Box>
												))}
											</Box>
										)
									}
								</CardContent>
							</Card>
						)}
					</form.Field>
				);
			}

			// Group field support
			if (field.type === 'group') {
				const groupConfig = field as GroupFormFieldV1;
				const subFields = typeof groupConfig.groupFields === 'function'
					? groupConfig.groupFields(form.state.values)
					: groupConfig.groupFields || [];
				return (
					<Card
						key={field.name}
						sx={{
							mb: 3,
							boxShadow: 1,
							'& .MuiCardHeader-root': {
								pb: 0,
							},
						}}
					>
						<CardHeader
							title={field.label}
							titleTypographyProps={{
								variant: 'h6',
							}}
						/>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									justifyContent:groupConfig.layout === 'row' ? 'space-between' : undefined,
									flexDirection:
										groupConfig.layout === 'column' ? 'column' : 'row',
									flexWrap: 'wrap',
									gap: groupConfig.spacing || 2,
									'& > *': {
										flex: subFields.some((f: FormFieldV1) => f.width)
											? '0 0 auto'
											: '1 1 100%',
									},
								}}
							>
								{subFields.map((subField: FormFieldV1, index: number) => {
									// Check showIf condition for subfield
									if (subField.showIf) {
										const { values } = form.state;
										if (!subField.showIf(values)) {
											return null;
										}
									}
									// Ensure the field path is a string
									const fieldPath = `${field.name}.${subField.name}`;
									return (
										<Box
											key={`${fieldPath}-${index}`}
											sx={{
												width: subField.width || '100%',
												flex: subField.width ? '0 0 auto' : '1 1 100%',
											}}
										>
											<form.Field
												name={fieldPath}
												validators={{
													onChange: ({ value }) => {
														try {
															if (subField.validation?.schema) {
																subField.validation.schema.parse(value);
															}
															// Update the parent group object
															const parentValue = form.state.values[field.name] || {};
															const newParentValue = {
																...parentValue,
																[subField.name]: value
															};
															form.setFieldValue(field.name, newParentValue);
															// Force validation after state update
															setTimeout(() => {
																validateCurrentStep();
															}, 0);
															return undefined;
														} catch (error) {
															if (error instanceof z.ZodError) {
																return error.errors[0].message;
															}
															return 'Invalid value';
														}
													},
													onChangeAsync: async ({ value }) => {
														if (subField.validation?.dependencies) {
															for (const dep of subField.validation
																.dependencies) {
																const dependentValue =
																	form.state.values[dep.field];
																if (
																	dep.type === 'min' &&
																	value <= dependentValue
																) {
																	return (
																		dep.message ||
																		`${subField.label} must be greater than ${dep.field}`
																	);
																}
															}
														}
														return undefined;
													},
												}}
											>
												{(subFieldApi) => (
													<KlubiqTSFormFields
														field={subFieldApi}
														form={form}
														fieldConfig={subField}
													/>
												)}
											</form.Field>
										</Box>
									);
								})}
							</Box>
						</CardContent>
					</Card>
				);
			}

			// Default: single field
			return (
				<form.Field
					key={field.name}
					name={field.name}
					validators={{
						onChange: ({ value }) => validateField(value, field, form.state.values, field.name),
						onChangeAsync: async ({ value }) => validateDependencies(value, field, form.state.values)
					}}
				>
					{(fieldApi) => (
						<KlubiqTSFormFields
							field={fieldApi}
							form={form}
							fieldConfig={fields.find((f) => f.name === field.name)!}
						/>
					)}
				</form.Field>
			);
		});
	};

	return (
		<Stack
			key={'form-container'}
			sx={{ ...style.container, width: formWidth }}
			spacing={4}
		>
			{isMultiStep && (
				<Box width={'100%'}>
					<Stepper activeStep={currentStep} connector={<LineConnector />} alternativeLabel sx={{ mb: 4 }}>
						{steps.map((step, index) => (
							<Step
								key={index}
								completed={stepValidations[index]}
								expanded={index === currentStep}
							>
								<StepLabel
									StepIconComponent={(iconProps) => (
										<CustomStepIcon 
											{...iconProps} 
											step={step}
											completed={stepValidations[index]}
											error={stepErrors[index]}
										/>
									)}
									error={stepErrors[index]}
									optional={
										'description' in step ? step.description : undefined
									}
								>
									{'title' in step ? step.title : 'Step ' + (index + 1)}
								</StepLabel>
							</Step>
						))}
					</Stepper>
				</Box>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<Stack spacing={3}>
					{renderFields(steps[currentStep].fields)}
					{renderErrors(form)}
				</Stack>

				<Stack
					direction='row'
					justifyContent='end'
					alignItems='center'
					spacing={2}
					mt={3}
				>
					<Stack direction='row' spacing={2}>
						{isMultiStep && currentStep > 0 && (
							<Button 
								onClick={handleBack} 
								startIcon={<ArrowBack />} 
								variant='klubiqOutlinedButton'
							>
								Back
							</Button>
						)}
					</Stack>

					<Stack direction='row' spacing={2}>
						{(() => {
							const { isSubmitting } = form.state;
							const isStepValid = stepValidations[currentStep];
							const isLastStep = currentStep === steps.length - 1;
							console.log('Button state:', { 
								isStepValid, 
								isSubmitting,
								isLastStep,
								currentStep,
								totalSteps: steps.length,
								formValues: form.state.values,
								formErrors: form.state.errors
							});
							return (
								<>
									{isMultiStep && !isLastStep ? (
										<Button 
											onClick={handleNext} 
											endIcon={<ArrowForward />} 
											variant='klubiqMainButton'
											disabled={!isStepValid}
										>
											Next
										</Button>
									) : (
										<Button
											type='submit'
											variant='klubiqMainButton'
											disabled={!isStepValid || isSubmitting}
										>
											{isSubmitting ? 'Submitting...' : submitButtonText}
										</Button>
									)}

									{enableReset && (
										<Button
											onClick={() => form.reset()}
											disabled={isSubmitting}
										>
											{resetButtonText}
										</Button>
									)}
								</>
							);
						})()}
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
};