// src/components/DynamicForm/DynamicForm.tsx
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Stack,
  Box,
} from '@mui/material';
import { DynamicFormProps } from './types';
import { KlubiqFormFields } from './klubiq-formfields';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const KlubiqForm = ({
  fields,
  onSubmit,
  initialValues = {},
  submitButtonText = 'Submit',
  enableReset = false,
  resetButtonText = 'Reset',
  orgSettings ={}
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
    >
      {({ handleReset, isSubmitting }) => (
        <Box sx={{width: 'auto', p: 2}}>
<Form>
          <Stack spacing={3}>
            {fields.map((field) => (
              <Box key={field.name}>
                {field.customComponent || 
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <KlubiqFormFields field={field} orgSettings={orgSettings} />
                 </LocalizationProvider>
                }
              </Box>
            ))}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {enableReset && (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  {resetButtonText}
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {submitButtonText}
              </Button>
            </Stack>
          </Stack>
        </Form>
        </Box>
        
      )}
    </Formik>
  );
};