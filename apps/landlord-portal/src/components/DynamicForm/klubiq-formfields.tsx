// src/components/DynamicForm/FormFields.tsx
import { Field } from 'formik';
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
  FormLabel,
  InputAdornment,
  Stack,
  Typography,
  
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DynamicFormProps, FormatType, FormField, FormGroup } from './types';
import { getLocaleFormat, parseCurrency, parsePercentage } from '../../helpers/utils';
import React from 'react';

interface FormFieldsProps {
  field: FormField;
  formatters?: DynamicFormProps['formatters'];
  orgSettings?: DynamicFormProps['orgSettings'];
}

export const KlubiqFormFields = ({ field, formatters, orgSettings }: FormFieldsProps) => {
    if (field.hidden) {
        return (
            <Field name={field.name}>
                {({ form }: any) => {
                    // Set predefined value if provided
                    React.useEffect(() => {
                        if (field.predefinedValue !== undefined) {
                            form.setFieldValue(field.name, field.predefinedValue);
                        }
                    }, [field.predefinedValue]);
                    
                    return null; // Don't render anything for hidden fields
                }}
            </Field>
        );
    }
    // Add type guard to check if field is a FormGroup
    const isFormGroup = (field: FormField | FormGroup): field is FormGroup => {
        return 'fields' in field;
    };
    // If it's a FormGroup, render the group of fields
    if (isFormGroup(field)) {
        return (
            <Stack spacing={2}>
                {field.label && (
                    <Typography variant="subtitle1" component="h3">
                        {field.label}
                    </Typography>
                )}
                <Stack 
                    direction={field.columns && field.columns > 1 ? "row" : "column"} 
                    spacing={2}
                    sx={{
                        '& > *': { 
                            flex: field.columns && field.columns > 1 ? 1 : 'auto',
                            minWidth: field.columns && field.columns > 1 ? `calc(100% / ${field.columns} - ${(field.columns - 1) * 8}px)` : 'auto'
                        }
                    }}
                >
                    {field.fields.map((subField, index) => (
                        <KlubiqFormFields
                            key={`${subField.name}-${index}`}
                            field={subField}
                            formatters={formatters}
                            orgSettings={orgSettings}
                        />
                    ))}
                </Stack>
            </Stack>
        );
    }
    const getInputProps = (formikField: any, meta: any) => {
        const baseProps = {
          ...formikField,
          fullWidth: true,
          label: field.label,
          placeholder: field.placeholder,
          error: meta.touched && !!meta.error,
          helperText: meta.touched && meta.error ? meta.error : field.helperText,
          disabled: field.disabled,
        };
    
        // Handle adornments
        if (field.adornment) {
          baseProps.InputProps = {
            ...baseProps.InputProps,
            startAdornment: field.adornment.prefix && (
              <InputAdornment position="start">
                {field.adornment.prefix}
              </InputAdornment>
            ),
            endAdornment: field.adornment.suffix && (
              <InputAdornment position="end">
                {field.adornment.suffix}
              </InputAdornment>
            ),
          };
        }
    
        return baseProps;
    };   
    const formatValue = (value: any, formatType?: FormatType) => {
        if (!value && value !== 0) {
          return '';
        }
    
        if (field.formatFunction) {
          return field.formatFunction(value);
        }
        if(formatType && orgSettings){
            return getLocaleFormat(orgSettings, value, formatType, field.decimals);
        }
        return value;
    }; 
    const parseValue = (value: string) => {
        if (!value) {
          return '';
        }
    
        if (field.parseFunction) {
          return field.parseFunction(value);
        }
    
        switch (field.formatType) {
          case 'currency':
            return parseCurrency(value);
          case 'percent':
            return parsePercentage(value);
          default:
            return value;
        }
      };    
    switch (field.type) {
    case 'select':
      return (
        <Field name={field.name}>
          {({ field: formikField, meta }: any) => (
            <FormControl 
              fullWidth 
              error={meta.touched && !!meta.error}
            >
              <InputLabel>{field.label}</InputLabel>
              <Select
                {...formikField}
                label={field.label}
                multiple={field.multiple}
                disabled={field.disabled}
              >
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {meta.touched && meta.error && (
                <FormHelperText>{meta.error}</FormHelperText>
              )}
            </FormControl>
          )}
        </Field>
      );

    case 'checkbox':
      return (
        <Field name={field.name}>
          {({ field: formikField, meta }: any) => (
            <FormControl error={meta.touched && !!meta.error}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...formikField}
                    checked={formikField.value}
                  />
                }
                label={field.label}
              />
              {meta.touched && meta.error && (
                <FormHelperText>{meta.error}</FormHelperText>
              )}
            </FormControl>
          )}
        </Field>
      );

    case 'radio':
      return (
        <Field name={field.name}>
          {({ field: formikField, meta }: any) => (
            <FormControl error={meta.touched && !!meta.error}>
              <FormLabel>{field.label}</FormLabel>
              <RadioGroup {...formikField}>
                {field.options?.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
              {meta.touched && meta.error && (
                <FormHelperText>{meta.error}</FormHelperText>
              )}
            </FormControl>
          )}
        </Field>
      );

    case 'date':
      return (
        <Field name={field.name}>
        {({ field: formikField, form, meta }: any) => {
            // Create a memoized onChange handler
            const handleDateChange = React.useCallback((value: any) => {
              form.setFieldValue(field.name, value);
            }, [form, field.name]);

            return (
          <DatePicker
            label={field.label}
            value={formikField.value || null}
            onChange={handleDateChange}
            disabled={field.disabled}
            readOnly={field.readonly}
            slotProps={{
              textField: {
                error: meta.touched && !!meta.error,
                helperText: meta.touched && meta.error ? meta.error : field.helperText,
                fullWidth: true,
                disabled: field.disabled,
                InputProps: {
                  readOnly: field.readonly,
                }
              }
            }}
          />
        )}}
      </Field>
      );

    case 'textarea':
      return (
        <Field name={field.name}>
          {({ field: formikField, meta }: any) => (
            <TextField
              {...formikField}
              fullWidth
              multiline
              rows={field.rows || 4}
              label={field.label}
              placeholder={field.placeholder}
              error={meta.touched && !!meta.error}
              helperText={meta.touched && meta.error ? meta.error : field.helperText}
              disabled={field.disabled}
            />
          )}
        </Field>
      );

    case 'currency':
    case 'percent':
      return (
        <Field name={field.name}>
          {({ field: formikField, form, meta }: any) => (
        <TextField
          {...getInputProps(formikField, meta)}
          value={formatValue(formikField.value, field.formatType)}
          onChange={(e) => {
            const parsedValue = parseValue(e.target.value);
            form.setFieldValue(field.name, parsedValue);
          }}
          onBlur={(e) => {
            formikField.onBlur(e);
            const parsedValue = parseValue(e.target.value);
            form.setFieldValue(field.name, parsedValue);
          }}
        />
      )}
    </Field>
  );
    
    default:
      return (
        <Field name={field.name}>
          {({ field: formikField, meta }: any) => (
            <TextField
              {...formikField}
              fullWidth
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              error={meta.touched && !!meta.error}
              helperText={meta.touched && meta.error ? meta.error : field.helperText}
              disabled={field.disabled}
              InputProps={{
                inputProps: {
                  min: field.min,
                  max: field.max,
                },
              }}
            />
          )}
        </Field>
      );
    }
};