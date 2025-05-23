// packages/ui-components/src/components/DynamicForm/klubiq-form.tsx
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useState } from 'react';
import { 
  Box, 
  Button, 
  Step, 
  StepLabel, 
  Stepper,
  StepIconProps,
  styled,
  Typography
} from '@mui/material';
import { DynamicTanstackFormProps, FormFieldV1, FormStep } from './types';
import { KlubiqFormFields } from './klubiq-formfields';
import { style } from './style';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ErrorIcon from '@mui/icons-material/Error';

const StepIconRoot = styled('div')<{ ownerState: { active?: boolean; completed?: boolean; error?: boolean } }>(
  ({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
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
        <CheckCircleIcon />
      ) : error ? (
        <ErrorIcon />
      ) : active ? (
        <RadioButtonUncheckedIcon />
      ) : (
        icon
      )}
    </StepIconRoot>
  );
}

export const KlubiqForm: React.FC<DynamicTanstackFormProps> = ({
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
  const steps = isMultiStep ? (fields as FormStep[]) : [{ fields: fields as FormFieldV1[] }];

  const createStepSchema = (stepFields: FormFieldV1[]) => {
    const schemaObject: Record<string, z.ZodType<any>> = {};
    
    stepFields.forEach(field => {
      if (field.validation?.schema) {
        let schema = field.validation.schema;

        if (field.validation.dependencies) {
          field.validation.dependencies.forEach(dep => {
            schema = schema.refine(
              (value: any) => {
                const dependentValue = form.state.values[dep.field];
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
              { message: dep.message }
            );
          });
        }

        schemaObject[field.name] = schema;
      }
    });

    return z.object(schemaObject);
  };

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value }) => {
      try {
        await onSubmit(value);
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    },
  });

  const validateStep = (stepIndex: number) => {
    const stepFields = steps[stepIndex].fields;
    const stepSchema = createStepSchema(stepFields);
    
    try {
      stepSchema.parse(form.state.values);
      return false;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
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
      setStepErrors(prev => {
        const newErrors = [...prev];
        newErrors[currentStep] = true;
        return newErrors;
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      onStepChange?.(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      onStepChange?.(currentStep - 1);
    }
  };

  const renderFields = (fields: FormFieldV1[]) => {
    return fields.map((field) => {
      if (field.showIf && !field.showIf(form.state.values)) {
        return null;
      }

      // Array field support
      if (field.type === 'array') {
        const arrayValue = form.state.values[field.name] || [];
        const arrayLength = typeof (field as any).getArrayLength === 'function'
          ? (field as any).getArrayLength(form.state.values)
          : arrayValue.length || 1;

        // Ensure the array is the correct length
        if (arrayValue.length !== arrayLength) {
          form.setFieldValue(
            field.name,
            Array.from({ length: arrayLength }, (_, i) => arrayValue[i] || {})
          );
        }

        return (
          <Box key={field.name}>
            {Array.from({ length: arrayLength }).map((_, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {field.label} {arrayLength > 1 ? idx + 1 : ''}
                </Typography>
                {(field as any).fields.map((subField: any) => (
                  <form.Field
                    key={subField.name}
                    name={`${field.name}[${idx}].${subField.name}`}
                  >
                    {(subFieldApi) => (
                      <KlubiqFormFields
                        field={subFieldApi}
                        form={form}
                        fieldConfig={subField}
                      />
                    )}
                  </form.Field>
                ))}
              </Box>
            ))}
          </Box>
        );
      }

      // Default: single field
      return (
        <form.Field
          key={field.name}
          name={field.name}
          validators={{
            onChange: ({ value }) => {
              try {
                if (field.validation?.schema) {
                  field.validation.schema.parse(value);
                }
                return undefined;
              } catch (error) {
                if (error instanceof z.ZodError) {
                  return error.errors[0].message;
                }
                return 'Invalid value';
              }
            },
            onChangeAsync: async ({ value }) => {
              if (field.validation?.dependencies) {
                for (const dep of field.validation.dependencies) {
                  const dependentValue = form.state.values[dep.field];
                  if (dep.type === 'min' && value <= dependentValue) {
                    return dep.message || `${field.label} must be greater than ${dep.field}`;
                  }
                  // Add other dependency validations as needed
                }
              }
              return undefined;
            },
          }}
        >
          {(fieldApi) => (
            <KlubiqFormFields
              field={fieldApi}
              form={form}
              fieldConfig={fields.find(f => f.name === field.name)!}
            />
          )}
        </form.Field>
      );
    });
  };

  return (
    <Box sx={{ ...style.container, width: formWidth }}>
      {isMultiStep && (
        <Stepper 
          activeStep={currentStep} 
          alternativeLabel
          sx={{ mb: 4 }}
        >
          {steps.map((step, index) => (
            <Step 
              key={index}
              completed={index < currentStep}
              expanded={index === currentStep}
            >
              <StepLabel
                StepIconComponent={({ active, completed, error }) => (
                  <Box>
                    {'icon' in step ? (
                      <>
                        {completed && step.icon?.completedIcon}
                        {error && step.icon?.errorIcon}
                        {active && step.icon?.activeIcon}
                        {!completed && !error && !active && step.icon?.icon}
                      </>
                    ) : (
                      <StepIcon active={active} completed={completed} error={error} icon={index + 1} />
                    )}
                  </Box>
                )}
                error={stepErrors[index]}
                optional={'description' in step ? step.description : undefined}
              >
                {'title' in step ? step.title : 'Step ' + (index + 1)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Box sx={{ mb: 3 }}>
          {renderFields(steps[currentStep].fields)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Box>
            {isMultiStep && currentStep > 0 && (
              <Button 
                onClick={handleBack}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
          </Box>

          <Box>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <>
                  {isMultiStep && currentStep < steps.length - 1 ? (
                    <Button 
                      onClick={handleNext}
                      variant="contained"
                      color="primary"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? 'Submitting...' : submitButtonText}
                    </Button>
                  )}

                  {enableReset && (
                    <Button
                      onClick={() => form.reset()}
                      disabled={isSubmitting}
                      sx={{ ml: 1 }}
                    >
                      {resetButtonText}
                    </Button>
                  )}
                </>
              )}
            </form.Subscribe>
          </Box>
        </Box>
      </form>
    </Box>
  );
};