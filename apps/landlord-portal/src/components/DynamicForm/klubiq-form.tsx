// src/components/DynamicForm/DynamicForm.tsx
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Stack,
  Box,
  Tooltip,
} from '@mui/material';
import { DynamicFormProps } from './types';
import { KlubiqFormFields } from './klubiq-formfields';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { style } from './style';

export const KlubiqForm = ({
  fields,
  onSubmit,
  initialValues = {},
  submitButtonText = 'Submit',
  enableReset = false,
  resetButtonText = 'Reset',
}: DynamicFormProps) => {
  // Generate validation schema based on fields
  const validationSchema = Yup.object().shape(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      } else if (field.required) {
        acc[field.name] = Yup.string().required('This field is required');
      }
      return acc;
    }, {} as Record<string, Yup.AnySchema>)
  );

  // Generate initial values based on fields
  const generateInitialValues = () => {
    return fields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] || field.defaultValue || '';
      return acc;
    }, {} as Record<string, any>);
  };

  return (
    <Formik
      initialValues={generateInitialValues()}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount={true} // Add this to validate on initial render
      validateOnChange={true} // Validate on every change
    >
      {({ handleReset, isSubmitting, isValid, dirty, errors }) => (
        <Box sx={style.container}>
            <Form>
                <Stack spacing={2}>
                    {fields.map((field) => (
                    <Box key={field.name}>
                        {field.customComponent || 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <KlubiqFormFields field={field} />
                        </LocalizationProvider>}
                    </Box>))}
                    
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        {enableReset && (
                        <Button
                            type="button"
                            variant="text"
                            onClick={handleReset}
                            disabled={isSubmitting || !dirty}>{resetButtonText}
                        </Button>)}
                        <Tooltip 
                            title={isValid ? '' : Object.values(errors).join(', ')}
                            open={!isValid && dirty}
                        >
                            <span>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={isSubmitting || !isValid || !dirty}>
                          {submitButtonText}
                        </Button>
                            </span>
                            
                        </Tooltip>
                    </Stack>
                </Stack>
            </Form>
        </Box>
        
      )}
    </Formik>
  );
};