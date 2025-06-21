// src/components/Forms/LeaseDateField.tsx
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface CustomDateFieldProps {
  fieldApi: any;
  fieldConfig: any;
  form: any;
  dependencyField?: string;
}

export const CustomDateField = ({
  fieldApi,
  fieldConfig,
  form,
  dependencyField,
}: CustomDateFieldProps) => {
  const dependencyFieldValue = dependencyField 
    ? form.getFieldValue(dependencyField)
    : null;

  const handleChange = (newValue: Date | null) => {
    fieldApi.handleChange(newValue);
    if ((fieldConfig.required || newValue !== null) && dependencyFieldValue) {
      form.validateField(dependencyField!);
    }
  };

  return (
    <Box>
      <DatePicker
        label={fieldConfig.isInFieldLabel ? fieldConfig.label : undefined}
        value={
          fieldConfig.readonly
            ? fieldConfig.predefinedValue
            : fieldApi.state.value
              ? dayjs(fieldApi.state.value)
              : null
        }
        onChange={(newValue) => {
          if (newValue && dayjs.isDayjs(newValue)) {
            handleChange(newValue.toDate());
          } else {
            handleChange(null);
          }
        }}
        slotProps={{
          textField: {
            sx: {
              borderRadius: '0.5rem',
              height: '2.7rem',
              color: 'inherit',
            },
            size: 'small',
            fullWidth: true,
            error: !!form.state.errors[fieldConfig.name],
            helperText:
              form.state.errors[fieldConfig.name] || fieldConfig.helperText,
            disabled: fieldConfig.disabled || fieldConfig.readonly,
            inputProps: {
              readOnly: fieldConfig.readonly,
            },
          },
        }}
        disabled={fieldConfig.disabled || fieldConfig.readonly}
      />
    </Box>
  );
};