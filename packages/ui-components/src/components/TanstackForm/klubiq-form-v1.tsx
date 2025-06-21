// packages/ui-components/src/components/DynamicForm/klubiq-form.tsx
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useState, useEffect, useCallback } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	StepIconProps,
	styled,
	Card,
	CardContent,
	CardHeader,
	Stack,
	stepConnectorClasses,
	StepConnector,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Backdrop,
	CircularProgress,
	Typography,
	IconButton,
	Alert,
	AlertTitle,
} from '@mui/material';
import {
	DynamicTanstackFormProps,
	FormFieldV1,
	FormStep,
	GroupFormFieldV1,
	type ArrayFormFieldV1,
	CustomFormFieldV1,
} from './types';
import { KlubiqTSFormFields } from './klubiq-formfields';
import { style } from './style';
import {
	ArrowBack,
	Error,
	ArrowForward,
	CheckCircle,
	RadioButtonUnchecked,
} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const StepIconRoot = styled('div')<{
	ownerState: { active?: boolean; completed?: boolean; error?: boolean };
}>(({ theme, ownerState }) => ({
	backgroundColor:
		theme.palette.mode === 'dark'
			? theme.palette.grey[700]
			: theme.palette.grey[400],
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
	// ...(ownerState.error && {
	// 	backgroundColor: theme.palette.error.main,
	// }),
}));

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
const LineConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 18,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.palette.primary.main,
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.palette.success.main,
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor:
			theme.palette.mode === 'dark'
				? theme.palette.grey[700]
				: theme.palette.grey[400],
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
				<StepIconRoot
					className='MuiStepIcon-root'
					ownerState={{ active, completed, error }}
				>
					{step.icon.completedIcon}
				</StepIconRoot>
			);
		// if (error && step.icon?.errorIcon)
		// 	return (
		// 		<StepIconRoot
		// 			className='MuiStepIcon-root'
		// 			ownerState={{ active, completed, error }}
		// 		>
		// 			{step.icon.errorIcon}
		// 		</StepIconRoot>
		// 	);
		if (active && step.icon?.icon)
			return (
				<StepIconRoot
					className='MuiStepIcon-root'
					ownerState={{ active, completed, error }}
				>
					{step.icon.icon}
				</StepIconRoot>
			);
		// fallback to step number if no icon
		return (
			<StepIconRoot
				className='MuiStepIcon-root'
				ownerState={{ active, completed, error }}
			>
				{step.icon?.icon || icon}
			</StepIconRoot>
		);
	}
	// Fallback to default
	return (
		<StepIconRoot
			className='MuiStepIcon-root'
			ownerState={{ active, completed, error }}
		>
			{icon}
		</StepIconRoot>
	);
};

// Utility to check if a field should be included in validation
function isFieldVisible(
	field: FormFieldV1,
	values: Record<string, any>,
): boolean {
	if (field.showIf && !field.showIf(values)) {
		return false;
	}
	if (field.dependsOn && Array.isArray(field.dependsOn)) {
		return field.dependsOn.every((dep) => {
			const actual = values[dep.field];
			switch (dep.operator) {
				case 'equals':
					return actual === dep.value;
				case 'notEquals':
					return actual !== dep.value;
				case 'contains':
					return Array.isArray(actual) && actual.includes(dep.value);
				case 'greaterThan':
					return actual > dep.value;
				case 'lessThan':
					return actual < dep.value;
				default:
					return actual === dep.value;
			}
		});
	}
	return true;
}

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
	showTopBackButton = false,
	showBackdrop = false,
	backdropText = 'Submitting form...',
	nextAction,
	topBackButton = {
		text: 'Back',
		onClick: () => {},
		variant: 'klubiqMainButton',
		startIcon: <ArrowBack />,
		showDialog: false,
		dialogTitle: 'Are you sure you want to leave?',
		dialogDescription:
			'You have unsaved changes. If you leave, your changes will be lost.',
		dialogConfirmButtonText: 'Leave Without Saving',
		dialogCancelButtonText: 'Cancel',
	},
	// New props with defaults
	header,
	subHeader,
	underSubmitButtonNode,
	horizontalAlignment = 'left',
	verticalAlignment = 'top',
	fullWidthButtons = false,
	buttonLoadingText = 'Submitting...',
	enableErrorAlert = true,
	errorAlertTitle = 'Form Validation Error',
	errorAlertMessage = 'Please check the form for errors. All required fields must be filled correctly.',
}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [stepErrors, setStepErrors] = useState<boolean[]>([]);
	const [stepValidations, setStepValidations] = useState<boolean[]>([]);
	const [returnDialogOpen, setReturnDialogOpen] = useState(false);
	const [showNextAction, setShowNextAction] = useState(false);
	const [showPreSubmitDialog, setShowPreSubmitDialog] = useState(false);
	const [preSubmitDialogMessage, setPreSubmitDialogMessage] = useState('');
	const [preSubmitDialogTitle, setPreSubmitDialogTitle] = useState('');
	const [submittedData, setSubmittedData] = useState<any>(null);
	const [submissionResult, setSubmissionResult] = useState<any>(null);
	const [nextActionDialogOpen, setNextActionDialogOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showErrorAlert, setShowErrorAlert] = useState(false);
	const [errorAlertData, setErrorAlertData] = useState<{title: string, message: string}>({title: '', message: ''});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const normalizedFields = Array.isArray(fields) ? fields : [fields];
	const steps = isMultiStep
		? (normalizedFields as FormStep[])
		: [{ fields: normalizedFields as FormFieldV1[] }];
	const createStepSchema = (stepFields: FormFieldV1[]) => {
		const schemaObject: Record<string, z.ZodType<any>> = {};

		const visibleStepFields = stepFields.filter((field) =>
			isFieldVisible(field, form.state.values),
		);
		const processField = (field: FormFieldV1, prefix = '') => {
			const fieldName = prefix ? `${prefix}.${field.name}` : field.name;

			if (field.type === 'group' && field.groupFields) {
				const subFields =
					typeof field.groupFields === 'function'
						? field.groupFields(form.state.values)
						: field.groupFields || [];
				const visibleSubFields = subFields.filter((subField) =>
					isFieldVisible(subField, form.state.values),
				);
				const groupSchema: Record<string, z.ZodType<any>> = {};
				// Process each visible subfield
				visibleSubFields.forEach((subField: FormFieldV1) => {
					const subFieldName = `${fieldName}.${subField.name}`;
					const schema = getFieldSchema(
						subField,
						form.state.values,
						subFieldName,
					);
					if (schema) {
						groupSchema[subField.name] = schema;
					}
				});
				if (Object.keys(groupSchema).length > 0) {
					schemaObject[fieldName] = z.object(groupSchema);
				}
			} else if (field.type === 'array' && (field as any).fields) {
				const { fields } = field as ArrayFormFieldV1;
				const subFields =
					typeof fields === 'function'
						? fields(form.state.values)
						: fields || [];
				const visibleSubFields = subFields.filter((subField) => {
					return isFieldVisible(subField, form.state.values);
				});
				const arraySchema = z.array(
					z.object(
						visibleSubFields.reduce(
							(acc: Record<string, z.ZodType<any>>, subField: FormFieldV1) => {
								const schema = getFieldSchema(
									subField,
									form.state.values,
									`${fieldName}[${fieldName}]`,
								);
								if (schema) {
									acc[subField.name] = schema;
								} else if (subField.required) {
									acc[subField.name] = getRequiredSchema(
										subField,
										`${fieldName}[${fieldName}].${subField.name}`,
									);
								}
								return acc;
							},
							{},
						),
					),
				);
				schemaObject[fieldName] = arraySchema;
			} else {
				const visibleField =
					isFieldVisible(field, form.state.values) && field.type !== 'hidden';
				if (visibleField) {
					const schema = getFieldSchema(field, form.state.values, fieldName);
					if (schema) {
						schemaObject[fieldName] = schema;
					}
				}
			}
		};

		visibleStepFields.forEach((field) => processField(field));
		return z.object(schemaObject);
	};

	const getRequiredSchema = (
		field: FormFieldV1,
		fullPath: string,
	): z.ZodType<any> => {
		if (field.customComponent) {
			return z.any().refine((val) => {
				// For custom components, we need to check if the value is a valid selection
				return (
					val !== undefined &&
					val !== null &&
					val !== '' &&
					val !== '0' &&
					val !== 0
				);
			}, `${field.label || 'This field'} is required`);
		} else if (field.type === 'array') {
			return z.array(z.any()).min(field.required ? 1 : 0, `${field.label} is required`);
		} else if (field.type === 'checkbox') {
			return z
				.boolean()
				.refine(
					field.required ? (val) => val === true : () => true,
					`${field.label} is required`,
				);
		} else if (field.type === 'select' && (field as any).multiple) {
			return z.array(z.any()).min(field.required ? 1 : 0, `${field.label || 'This field'} is required`);
		} else if (field.type === 'radio') {
			return z.string().min(field.required ? 1 : 0, `${field.label || 'This field'} is required`);
		} else if (field.type === 'file') {
			return z.array(z.any()).min(field.required ? 1 : 0, `${field.label || 'This field'} is required`);
		} else {
			return z.string().min(field.required ? 1 : 0, `${field.label || 'This field'} is required`);
		}
	};

	const getFieldSchema = (
		field: FormFieldV1,
		formValues: any,
		fullPath: string,
	): z.ZodType<any> | undefined => {
		if (field.validation?.schema) {
			let { schema } = field.validation;
			if (field.validation.dependencies) {
				schema = addDependenciesToSchema(schema, field, formValues);
			}
			return schema;
		} else if (field.required) {
			return getRequiredSchema(field, fullPath);
		}
		return undefined;
	};

	const addDependenciesToSchema = (
		schema: z.ZodType<any>,
		field: FormFieldV1,
		formValues: any,
	) => {
		return (
			field.validation?.dependencies?.reduce((currentSchema, dep) => {
				return currentSchema.refine(
					(value: any) => {
						const dependentValue = formValues[dep.field];
						if (dependentValue === undefined || dependentValue === null) {
							return true;
						}
						if (!field.required && (value === null || value === undefined)) {
							return true;
						}
						switch (dep.type) {
							case 'min':
								return value > dependentValue;
							case 'max':
								return value < dependentValue;
							case 'equals':
								return value === dependentValue;
							case 'notEquals':
								return value !== dependentValue;
							default:
								return true;
						}
					},
					{ message: dep.message },
				);
			}, schema) || schema
		);
	};

	const validateFieldValue = (
		value: any,
		field: FormFieldV1,
		formValues: any,
		fullPath: string,
	) => {
		try {
			const schema = getFieldSchema(field, formValues, fullPath);
			if (schema) {
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

	const validateFieldDependencies = async (
		value: any,
		field: FormFieldV1,
		formValues: any,
	) => {
		if (field.validation?.dependencies) {
			for (const dep of field.validation.dependencies) {
				const fieldPath = dep.field.split('.');
				const dependentFieldValue = fieldPath.reduce((acc, curr) => {
					// Handle array indices in the path
					if (curr.includes('[') && curr.includes(']')) {
						const [fieldName, index] = curr.split('[');
						const idx = parseInt(index.replace(']', ''));
						return acc[fieldName]?.[idx];
					}
					return acc[curr];
				}, formValues);
				// Skip validation if dependent value is undefined
				if (dependentFieldValue === undefined || dependentFieldValue === null) {
					continue;
				}
				if (!field.required && (value === null || value === undefined)) {
					return undefined;
				}

				let isValid = true;
				switch (dep.type) {
					case 'min':
						isValid = value > dependentFieldValue;
						break;
					case 'max':
						isValid = value < dependentFieldValue;
						break;
					case 'equals':
						isValid = value === dependentFieldValue;
						break;
					case 'notEquals':
						isValid = value !== dependentFieldValue;
						break;
					default:
						isValid = true;
				}
				if (!isValid) {
					return dep.message || getDefaultDependencyMessage(dep.type, field.label, dep.field);
				}
			}
		}
		return undefined;
	};

	const getDefaultDependencyMessage = (type: string, fieldLabel: string, dependentField: string) => {
		switch (type) {
			case 'min':
				return `${fieldLabel} must be greater than ${dependentField}`;
			case 'max':
				return `${fieldLabel} must be less than ${dependentField}`;
			case 'equals':
				return `${fieldLabel} must be equal to ${dependentField}`;
			case 'notEquals':
				return `${fieldLabel} must be not equal to ${dependentField}`;
			default:
				return `${fieldLabel} is invalid`;
		}
	};

	const getFieldValidators = (field: FormFieldV1, formValues: any, fullPath: string) => ({
		onChange: ({ value }: { value: any }) => {
			try {
				// For group fields, update the parent object
				if (field.type === 'group') {
					const parentValue = formValues[field.name] || {};
					const newParentValue = {
						...parentValue,
						[field.name]: value,
					};
					form.setFieldValue(field.name, newParentValue);
				}
				// Validate the field
				const schemaResult = validateFieldValue(value, field, formValues, fullPath);
				if (schemaResult) {
					return schemaResult;
				}

				// Force step validation after field validation
				setTimeout(() => {
					validateCurrentStep();
				}, 0);

				return undefined;
			} catch (error) {
				if (error instanceof z.ZodError) {
					return error.errors[0].message;
				}
				return `${field.label} is invalid`;
			}
		},
		onChangeAsync: async ({ value }: { value: any }) => {
			const syncResult = validateFieldValue(value, field, formValues, fullPath);
			if (syncResult) {
				return syncResult;
			}
			return validateFieldDependencies(value, field, formValues);
		},
		onChangeAsyncDebounceMs: 500,
	});

	const confirmSubmission = async () => {
		form.setFieldValue('filesWaitingForUpload', 0);
		setShowPreSubmitDialog(false);
		await form.handleSubmit();
	};

	const form = useForm({
		defaultValues: initialValues,
		onSubmit: async ({ value }) => {
			try {
				const filesWaitingForUpload = form.getFieldValue(
					'filesWaitingForUpload',
				);
				if (filesWaitingForUpload > 0) {
					setShowPreSubmitDialog(true);
					setPreSubmitDialogMessage(
						'Please upload all files before submitting',
					);
					setPreSubmitDialogTitle('Files not uploaded');
					return 'Please wait for all files to upload';
				}
				const result = await onSubmit(value);
				setSubmittedData(value);
				setSubmissionResult(result);
				setIsSubmitted(true);
				setShowErrorAlert(false);
				form.reset();
				// Only show next action if configured
				if (nextAction?.showAfterSubmit) {
					setShowNextAction(true);
					if ('buttons' in nextAction) {
						setNextActionDialogOpen(true);
					}
				} else {
					// Only reset form if there's no next action
					return result;
				}
			} catch (error: any) {
				console.error('Form submission error:', error);
				setIsSubmitted(false);
				setErrorAlertData({title: '', message: error.message || 'An error occurred while submitting the form. Please try again.'});
				setShowErrorAlert(true);
				throw error;
			}
		},
		validators: {
			onChange: ({ value }) => {
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
			},
			onSubmit: ({ value }) => {

				// Only validate the current step for submission
				const stepFields = steps[currentStep].fields;
				const stepSchema = createStepSchema(stepFields);
				try {
					stepSchema.parse(value);
					setShowErrorAlert(false);
					return undefined;
				} catch (error) {
					setShowErrorAlert(true);
					if (error instanceof z.ZodError) {
						return error.errors[0].message;
					}
					return 'Form is invalid';
				}
			},
		},
	});

	// Add effect to handle form submission state
	useEffect(() => {
		if (form.state.isSubmitting) {
			setIsSubmitted(false);
		}
	}, [form.state.isSubmitting]);

	// Add effect to ensure group values are properly structured
	useEffect(() => {
		const { values } = form.state;
		let hasChanges = false;

		// Process each step's fields
		steps.forEach((step) => {
			step.fields.forEach((field) => {
				if (field.type === 'group' && field.groupFields) {
					const subFields =
						typeof field.groupFields === 'function'
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
						if (
							values[subFieldPath] !== undefined &&
							values[field.name][subField.name] === undefined
						) {
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
			stepFields.forEach((field) => {
				if (field.type === 'group' && field.groupFields) {
					const subFields =
						typeof field.groupFields === 'function'
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
			setStepValidations((prev) => {
				const newValidations = [...prev];
				newValidations[currentStep] = true;
				return newValidations;
			});
			setStepErrors((prev) => {
				const newErrors = [...prev];
				newErrors[currentStep] = false;
				return newErrors;
			});
			return true;
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
			setStepValidations((prev) => {
				const newValidations = [...prev];
				newValidations[currentStep] = false;
				return newValidations;
			});
			setStepErrors((prev) => {
				const newErrors = [...prev];
				newErrors[currentStep] = true;
				return newErrors;
			});
			return false;
		}
	};

	// Add effect to validate current step when form values change
	useEffect(() => {
		validateCurrentStep();
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

	const handleNextAction = () => {
		if (!nextAction) {
			return;
		}
		if ('onClick' in nextAction) {
			nextAction.onClick(submittedData, submissionResult);
		} else {
			setNextActionDialogOpen(true);
		}
	};

	const handleDialogClose = () => {
		if (!nextAction || !('onClose' in nextAction)) {
			return;
		}
		nextAction.onClose?.(submittedData, submissionResult);
		setNextActionDialogOpen(false);
	};

	const getDialogTitle = () => {
		if (!nextAction || !('title' in nextAction)) {
			return '';
		}
		const { title } = nextAction;
		return typeof title === 'function' ? title(submissionResult) : title;
	};

	const getDialogDescription = () => {
		if (!nextAction || !('description' in nextAction)) {
			return '';
		}
		const { description } = nextAction;
		return typeof description === 'function'
			? description(submissionResult)
			: description;
	};

	const shouldShowNextAction = () => {
		if (!nextAction) {
			return false;
		}
		if ('showAfterSubmit' in nextAction) {
			return nextAction.showAfterSubmit;
		}
		return true;
	};

	const renderFields = (fields: FormFieldV1[]) => {
		return fields.map((field, idx) => {
			// For multi-step forms, render fields directly without form.Subscribe
			if (isMultiStep) {
				// Custom field support
				if (field.showIf && !field.showIf(form.state.values)) {
					return null;
				}

				// Custom field support
				if (field.type === 'custom') {
					const customField = field as CustomFormFieldV1;
					const fieldMeta = form.getFieldMeta(field.name);
					return (
						<Box key={`${field.name}-${idx}`}>
							{typeof customField.component === 'function'
								? customField.component(fieldMeta as any, field, form)
								: customField.component}
						</Box>
					);
				}

				// Array field support
				if (field.type === 'array') {
					// Ensure the array exists in state
					if (!Array.isArray(form.state.values[field.name])) {
						form.setFieldValue(field.name, []);
					}
					const arrayValue = form.state.values[field.name] || [];
					return (
						<form.Field
							key={`${field.name}-${idx}`}
							name={field.name}
							mode='array'
							asyncAlways={true}
							validators={getFieldValidators(field, form.state.values, field.name)}
						>
							{(fieldApi) => (
								<Card key={field.name} sx={{ mb: 3, boxShadow: 1 }}>
									<CardHeader
										title={field.label}
										titleTypographyProps={{ variant: 'h6' }}
									/>
									<CardContent>
										{field.customComponent ? (
											typeof field.customComponent === 'function' ? (
												field.customComponent(fieldApi, field, form)
											) : (
												field.customComponent
											)
										) : (
											<KlubiqTSFormFields
												field={fieldApi}
												form={form}
												fieldConfig={field}
											/>
										)}
									</CardContent>
								</Card>
							)}
						</form.Field>
					);
				}

				// Group field support
				if (field.type === 'group') {
					const groupConfig = field as GroupFormFieldV1;
					const subFields =
						typeof groupConfig.groupFields === 'function'
							? groupConfig.groupFields(form.state.values)
							: groupConfig.groupFields || [];
					const visibleSubFields = subFields.filter((subField) =>
						isFieldVisible(subField, form.state.values),
					);
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
										justifyContent:
											groupConfig.layout === 'row' ? 'space-between' : undefined,
										flexDirection:
											groupConfig.layout === 'column' ? 'column' : 'row',
										flexWrap: 'wrap',
										gap: groupConfig.spacing || 2,
										'& > *': {
											flex: visibleSubFields.some((f: FormFieldV1) => f.width)
												? '0 0 auto'
												: '1 1 100%',
										},
									}}
								>
									{visibleSubFields.map(
										(subField: FormFieldV1, index: number) => {
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
														key={`ff-${fieldPath}-${index}`}
														name={fieldPath}
														asyncAlways={true}
														validators={getFieldValidators(subField, form.state.values, fieldPath)}
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
										},
									)}
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
						asyncAlways={true}
						validators={getFieldValidators(field, form.state.values, field.name)}
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
			}

			// For non-multi-step forms, use form.Subscribe for reactive rendering
			return (
				<form.Subscribe
					key={field.name}
					selector={(state) => state.values}
					children={(values) => {
						const shouldShow = field.showIf ? field.showIf(values) : true;
						if (!shouldShow) return null;

						// Custom field support
						if (field.type === 'custom') {
							const customField = field as CustomFormFieldV1;
							const fieldMeta = form.getFieldMeta(field.name);
							return (
								<Box key={field.name}>
									{typeof customField.component === 'function'
										? customField.component(fieldMeta as any, field, form)
										: customField.component}
								</Box>
							);
						}

						// Array field support
						if (field.type === 'array') {
							// Ensure the array exists in state
							if (!Array.isArray(form.state.values[field.name])) {
								form.setFieldValue(field.name, []);
							}
							return (
								<form.Field
									key={field.name}
									name={field.name}
									asyncAlways={true}
									mode='array'
									validators={getFieldValidators(field, values, field.name)}
								>
									{(fieldApi) => (
										<Stack key={field.name} direction='column' gap={1}>
											<Typography variant='h6'>{field.label}</Typography>
											<Box>
												{field.customComponent ? (
													typeof field.customComponent === 'function' ? (
														field.customComponent(fieldApi, field, form)
													) : (
														field.customComponent
													)
												) : (
													<KlubiqTSFormFields
														field={fieldApi}
														form={form}
														fieldConfig={field}
													/>
												)}
											</Box>
										</Stack>
									)}
								</form.Field>
							);
						}

						// Group field support
						if (field.type === 'group') {
							const groupConfig = field as GroupFormFieldV1;
							const subFields =
								typeof groupConfig.groupFields === 'function'
									? groupConfig.groupFields(values)
									: groupConfig.groupFields || [];
							const visibleSubFields = subFields.filter((subField) =>
								isFieldVisible(subField, values),
							);
							return (
								<Stack key={field.name} direction='column' gap={1}>
									<Typography variant='h6'>{field.label}</Typography>
									<Box
										sx={{
											display: 'flex',
											justifyContent:
												groupConfig.layout === 'row'
													? 'space-between'
													: undefined,
											flexDirection:
												groupConfig.layout === 'column' ? 'column' : 'row',
											flexWrap: 'wrap',
											gap: groupConfig.spacing || 2,
											'& > *': {
												flex: visibleSubFields.some((f: FormFieldV1) => f.width)
													? '0 0 auto'
													: '1 1 100%',
											},
										}}
									>
										{visibleSubFields.map(
											(subField: FormFieldV1, index: number) => {
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
															key={`ff-${fieldPath}-${index}`}
															name={fieldPath}
															asyncAlways={true}
															validators={getFieldValidators(subField, values, fieldPath)}
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
											},
										)}
									</Box>
								</Stack>
							);
						}

						// Default: single field
						return (
							<form.Field
								key={field.name}
								name={field.name}
								asyncAlways={true}
								validators={getFieldValidators(field, values, field.name)}
							>
								{(fieldApi) => (
									<KlubiqTSFormFields
										field={fieldApi}
										form={form}
										fieldConfig={field}
									/>
								)}
							</form.Field>
						);
					}}
				/>
			);
		});
	};

	const handleLeaveWithoutSaving = () => {
		setReturnDialogOpen(false);
		form.reset();
		topBackButton?.onClick?.();
	};
	const handleNonMultiStepSubmit = async (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		if (!isMultiStep) {
			e.preventDefault();
			e.stopPropagation();
			try {
				setIsSubmitted(false);
				await form.handleSubmit();
			} catch (error) {
				setShowErrorAlert(true);
				setIsSubmitted(false);
			}
		}
	};
	const getErrorAlertTitle = () => {
		if (typeof errorAlertTitle === 'function') {
			return errorAlertTitle();
		} else if (errorAlertData.title) {
			return errorAlertData.title;
		}
		return errorAlertTitle;
	};
	const getErrorAlertMessage = () => {
		if (typeof errorAlertMessage === 'function') {
			return errorAlertMessage();
		} else if (errorAlertData.message) {
			return errorAlertData.message;
		}
		return errorAlertMessage;
	};

	return (
		<Stack
			sx={{
				...style.container,
				width: formWidth,
				justifyContent:
					verticalAlignment === 'center'
						? 'center'
						: verticalAlignment === 'bottom'
							? 'flex-end'
							: 'flex-start',
				minHeight: verticalAlignment === 'center' ? '100vh' : 'auto',
				position: 'relative',
			}}
			spacing={4}
		>
			{/* Add submission overlay */}
			{!showBackdrop && isSubmitted && !nextAction && !form.state.isSubmitting && (
				<Box
					sx={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(255, 255, 255, 0.7)',
						zIndex: (theme) => theme.zIndex.drawer + 2,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<CircularProgress />
				</Box>
			)}

			{showBackdrop && (
				<Backdrop
					sx={{
						color: '#fff',
						zIndex: (theme) => theme.zIndex.drawer + 1,
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 2,
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
					}}
					open={form.state.isSubmitting}
				>
					<CircularProgress color='inherit' />
					<Typography
						variant='h6'
						color='inherit'
						sx={{
							textAlign: 'center',
							px: 2,
							maxWidth: '90%',
							wordBreak: 'break-word',
						}}
					>
						{backdropText || 'Submitting form...'}
					</Typography>
				</Backdrop>
			)}

			{showTopBackButton && (
				<Stack direction='row' justifyContent='start' alignItems='center'>
					<Button
						onClick={
							topBackButton.showDialog
								? () => setReturnDialogOpen(true)
								: handleLeaveWithoutSaving
						}
						variant={topBackButton.variant}
						startIcon={topBackButton.startIcon}
					>
						{topBackButton.text}
					</Button>
				</Stack>
			)}

			{header && <Box sx={{ width: '100%' }}>{header}</Box>}

			{subHeader && <Box sx={{ width: '100%' }}>{subHeader}</Box>}

			{isMultiStep && (
				<Box width={'100%'}>
					<Stepper
						activeStep={currentStep}
						connector={<LineConnector />}
						alternativeLabel
						sx={{ mb: 3 }}
					>
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
									//error={stepErrors[index]}
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
				key={`form`}
				onSubmit={async (e) => {
					e.preventDefault();
					e.stopPropagation();
					try {
						// Get the current form values
						const values = form.state.values;

						// Ensure array fields are properly formatted
						const processedValues = Object.entries(values).reduce(
							(acc, [key, value]) => {
								// Handle array fields
								if (Array.isArray(value)) {
									acc[key] = value.filter(
										(item) => item !== null && item !== undefined,
									);
								} else {
									acc[key] = value;
								}
								return acc;
							},
							{} as Record<string, any>,
						);

						// Update form values with processed data
						Object.entries(processedValues).forEach(([key, value]) => {
							form.setFieldValue(key, value);
						});

						// Execute form submission
						await form.handleSubmit();
					} catch (error) {
						console.error('Form handleSubmit error:', error);
						setShowErrorAlert(true);
						setIsSubmitted(false);
					}
				}}
			>
				{enableErrorAlert && showErrorAlert && (
					<Alert
						severity='error'
						sx={{
							mb: 3,
							backgroundColor: 'error.main',
							color: 'error.contrastText',
							'& .MuiAlert-icon': {
								color: 'error.contrastText',
							},
							'& .MuiAlert-message': {
								color: 'error.contrastText',
							},
						}}
						onClose={() => setShowErrorAlert(false)}
					>
						{getErrorAlertTitle() && <AlertTitle>{getErrorAlertTitle()}</AlertTitle>}
						{getErrorAlertMessage() && <Typography variant='body1'>{getErrorAlertMessage()}</Typography>}
					</Alert>
				)}

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Stack spacing={3} key={`fields`}>
						{renderFields(steps[currentStep].fields)}
					</Stack>
				</LocalizationProvider>

				<Stack
					direction={'row'}
					justifyContent={horizontalAlignment}
					alignItems='center'
					spacing={isMultiStep ? 2 : 0}
					mt={3}
				>
					<Stack direction='row' spacing={2}>
						{isMultiStep && currentStep > 0 && (
							<Button
								onClick={handleBack}
								startIcon={<ArrowBack />}
								variant='klubiqOutlinedButton'
								fullWidth={fullWidthButtons}
							>
								Back
							</Button>
						)}
					</Stack>

					<Stack
						direction={fullWidthButtons && !isMultiStep ? 'column' : 'row'}
						spacing={2}
						sx={{ width: fullWidthButtons && !isMultiStep ? '100%' : 'auto' }}
					>
						{(() => {
							const { isSubmitting } = form.state;
							const isFormValid = (() => {
								try {
									if (isMultiStep) {
										const stepFields = steps[currentStep].fields;
										const stepSchema = createStepSchema(stepFields);
										stepSchema.parse(form.state.values);
									} else {
										// For single-step forms, validate all fields
										const formFields = Array.isArray(fields)
											? fields
											: (fields as FormStep[])[0].fields;

										// Create a schema that only validates required fields
										const formSchema = z.object(
											(formFields as FormFieldV1[]).reduce(
												(acc, field) => {
													const isRequired =
														typeof field.required === 'function'
															? field.required(form.state.values)
															: field.required;
													const isGroup = field.type === 'group';
													if (isGroup) {
														const groupFields = typeof field.groupFields === 'function' ? field.groupFields(form.state.values) : field.groupFields;
														const groupSchema = z.object(groupFields.reduce((acc: Record<string, z.ZodType<any>>, groupField: FormFieldV1) => {
															const groupFieldRequired = typeof groupField.required === 'function' ? groupField.required(form.state.values) : groupField.required;
															if (groupFieldRequired) {
																acc[groupField.name] = getFieldSchema(groupField, form.state.values, groupField.name) || z.any();
															}
															return acc;
														}, {} as Record<string, z.ZodType<any>>));
														acc[field.name] = groupSchema;
														return acc;
													} else {
														if (isRequired) {
															acc[field.name] =
																getFieldSchema(
																	field,
																	form.state.values,
																	field.name,
																) || z.any();
														}
														return acc;
													}
												},
												{} as Record<string, z.ZodType<any>>,
											),
										);

										formSchema.parse(form.state.values);
									}
									return true;
								} catch (e) {
									return false;
								}
							})();
							const isLastStep = currentStep === steps.length - 1;
							return (
								<>
									{enableReset && (
										<Button
											onClick={() => form.reset()}
											disabled={isSubmitting}
											fullWidth={fullWidthButtons}
										>
											{resetButtonText}
										</Button>
									)}
									{isMultiStep && !isLastStep ? (
										<Button
											onClick={handleNext}
											endIcon={<ArrowForward />}
											variant='klubiqMainButton'
											disabled={!isFormValid}
											fullWidth={fullWidthButtons}
										>
											Next
										</Button>
									) : (
										<>
											{isSubmitting ? (
												<LoadingButton
													variant='klubiqOutlinedButton'
													loading={isSubmitting}
													sx={style.loadingButton}
												></LoadingButton>
											) : (
												<Button
													type='submit'
													variant='klubiqMainButton'
													disabled={!isFormValid || isSubmitting || isSubmitted}
													fullWidth={fullWidthButtons}
													onClick={handleNonMultiStepSubmit}
												>
													{submitButtonText}
												</Button>
											)}
											{shouldShowNextAction() && nextAction && (
												<>
													{'onClick' in nextAction ? (
														<Button
															onClick={handleNextAction}
															variant={nextAction.variant}
															startIcon={nextAction.startIcon}
															fullWidth={fullWidthButtons}
														>
															{nextAction.text}
														</Button>
													) : (
														<Dialog
															open={nextActionDialogOpen}
															onClose={handleDialogClose}
															aria-labelledby='next-action-dialog-title'
															aria-describedby='next-action-dialog-description'
															maxWidth={nextAction.maxWidth}
															fullWidth={nextAction.fullWidth}
														>
															<DialogTitle id='next-action-dialog-title'>
																{getDialogTitle()}
																{nextAction.closeIcon && (
																	<IconButton
																		aria-label='close'
																		onClick={handleDialogClose}
																		sx={{
																			position: 'absolute',
																			right: 8,
																			top: 8,
																		}}
																	>
																		{nextAction.closeIcon}
																	</IconButton>
																)}
															</DialogTitle>
															<DialogContent>
																<DialogContentText id='next-action-dialog-description'>
																	{getDialogDescription()}
																</DialogContentText>
																{'renderContent' in nextAction &&
																	nextAction.renderContent && (
																		<Box mt={2}>
																			{nextAction.renderContent(
																				submissionResult,
																			)}
																		</Box>
																	)}
															</DialogContent>
															<DialogActions>
																{nextAction.buttons.map((button, index) => (
																	<Button
																		key={index}
																		onClick={() =>
																			button.onClick(
																				submittedData,
																				submissionResult,
																			)
																		}
																		variant={button.variant}
																		startIcon={button.startIcon}
																		endIcon={button.endIcon}
																		color={button.color}
																		autoFocus={button.autoFocus}
																		fullWidth={fullWidthButtons}
																	>
																		{button.text}
																	</Button>
																))}
															</DialogActions>
														</Dialog>
													)}
												</>
											)}
										</>
									)}
								</>
							);
						})()}
					</Stack>
				</Stack>
			</form>

			{underSubmitButtonNode && !isSubmitted && (
				<Box sx={{ width: '100%' }}>{underSubmitButtonNode}</Box>
			)}

			<Dialog
				open={returnDialogOpen}
				onClose={() => setReturnDialogOpen(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{topBackButton.dialogTitle}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{topBackButton.dialogDescription}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant='klubiqOutlinedButton'
						onClick={() => setReturnDialogOpen(false)}
					>
						{topBackButton.dialogCancelButtonText}
					</Button>
					<Button
						variant='klubiqMainButton'
						onClick={handleLeaveWithoutSaving}
						autoFocus
					>
						{topBackButton.dialogConfirmButtonText}
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={showPreSubmitDialog}
				onClose={() => setShowPreSubmitDialog(false)}
				aria-labelledby='pre-submit-dialog-title'
				aria-describedby='pre-submit-dialog-description'
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle id='pre-submit-dialog-title'>
					{preSubmitDialogTitle}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='pre-submit-dialog-description'>
						{preSubmitDialogMessage}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant='klubiqMainButton'
						onClick={() => setShowPreSubmitDialog(false)}
					>
						Cancel Submission
					</Button>
					<Button variant='klubiqMainButton' onClick={confirmSubmission}>
						Continue Submission
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
};
