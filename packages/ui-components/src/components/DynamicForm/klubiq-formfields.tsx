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
	Radio,
	RadioGroup,
	InputAdornment,
	Stack,
	Typography,
	IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DynamicFormProps, FormatType, FormField, FormGroup } from './types';
import { getLocaleFormat } from '../../utils';
import React, { useEffect, useState } from 'react';
import { style } from './style';

interface FormFieldsProps {
	field: FormField;
	formatters?: DynamicFormProps['formatters'];
}

export const KlubiqFormFields = ({ field, formatters }: FormFieldsProps) => {
	const [perDecimalDisplayValue, setPerDecimalDisplayValue] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};
	// Add effect to handle form reset

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
					<Typography variant='subtitle1' component='h3'>
						{field.label}
					</Typography>
				)}
				<Stack
					direction={field.columns && field.columns > 1 ? 'row' : 'column'}
					spacing={2}
					sx={{
						'& > *': {
							flex: field.columns && field.columns > 1 ? 1 : 'auto',
							minWidth:
								field.columns && field.columns > 1
									? `calc(100% / ${field.columns} - ${(field.columns - 1) * 8}px)`
									: 'auto',
						},
					}}
				>
					{field.fields.map((subField, index) => (
						<KlubiqFormFields
							key={`${subField.name}-${index}`}
							field={subField}
							formatters={formatters}
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
			label: field.isInFieldLabel && field.label,
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
					<InputAdornment position='start'>
						{field.adornment.prefix}
					</InputAdornment>
				),
				endAdornment: field.adornment.suffix && (
					<InputAdornment position='end'>
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
		const num = parseFloat(value);
		if (isNaN(num)) {
			return '';
		}

		if (formatType) {
			const formattedValue = getLocaleFormat(value, formatType, field.decimals);
			return formattedValue.toLocaleString();
		}
		return value;
	};
	const parseValue = (value: string) => {
		if (!value) {
			return '';
		}
		// Remove any non-numeric characters except decimal point
		const cleaned = value.replace(/[^\d.]/g, '');
		// Ensure only one decimal point
		const parts = cleaned.split('.');
		if (parts.length > 2) {
			return parts[0] + '.' + parts.slice(1).join('');
		}
		return cleaned;
	};
	switch (field.type) {
		case 'select':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) => (
						<FormControl fullWidth error={meta.touched && !!meta.error}>
							<Stack sx={style.fieldStack}>
								<Typography variant='subtitle1' component='h3'>
									{field.label}
									{field.required && '*'}
								</Typography>
								<Select
									{...formikField}
									sx={{ width: field.width || '100%' }}
									label={field.label}
									multiple={field.multiple}
									value={
										field.readonly
											? field.predefinedValue
											: formikField.value || null
									}
									disabled={field.disabled}
								>
									{field.options?.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Select>
							</Stack>

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
							<Stack sx={style.fieldStack}>
								{!field.isInFieldLabel && (
									<Typography variant='subtitle1' component='h3'>
										{field.label}
										{field.required && '*'}
									</Typography>
								)}
								<FormControlLabel
									sx={{ width: field.width || '100%' }}
									control={
										<Checkbox {...formikField} checked={formikField.value} />
									}
									label={field.isInFieldLabel && field.label}
								/>
							</Stack>

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
							<Stack sx={style.fieldStack}>
								<Typography variant='subtitle1' component='h3'>
									{field.label}
									{field.required && '*'}
								</Typography>
								<RadioGroup
									{...formikField}
									row={field.radioGroupDirection === 'row'}
									sx={{ width: field.width || '100%' }}
								>
									{field.options?.map((option) => (
										<FormControlLabel
											key={option.value}
											value={option.value}
											control={<Radio />}
											label={option.label}
										/>
									))}
								</RadioGroup>
							</Stack>
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
					{({ field: formikField, meta }: any) => {
						return (
							<Stack sx={style.fieldStack}>
								{!field.isInFieldLabel && (
									<Typography variant='subtitle1' component='h3'>
										{field.label}
										{field.required && '*'}
									</Typography>
								)}
								<DatePicker
									sx={{ width: field.width || '100%' }}
									label={field.isInFieldLabel && field.label}
									value={
										field.readonly
											? field.predefinedValue
											: formikField.value || null
									}
									onChange={(value) => {
										// Update formik value
										formikField.onChange({
											target: { name: field.name, value: value },
										});
										// Mark field as touched
										// Use setTimeout to ensure the value is updated before validation
										setTimeout(() => {
											formikField.onBlur({
												target: { name: field.name },
											});
										}, 0);
									}}
									onClose={() => {
										if (formikField.value) {
											formikField.onBlur({
												target: { name: field.name },
											});
										}
									}}
									// onChange={handleDateChange}
									disabled={field.disabled}
									readOnly={field.readonly}
									slotProps={{
										textField: {
											error: meta.touched && !!meta.error,
											helperText: meta.touched ? meta.error : field.helperText,
											//meta.error || field.helperText,
											fullWidth: true,
											disabled: field.disabled,
											InputProps: {
												readOnly: field.readonly,
											},
											onBlur: (e) => {
												// Only show error if the field has a value or has been touched
												if (formikField.value || meta.touched) {
													formikField.onBlur(e);
												}
											},
										},
									}}
								/>
							</Stack>
						);
					}}
				</Field>
			);

		case 'textarea':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) => (
						<Stack sx={style.fieldStack}>
							{!field.isInFieldLabel && (
								<Typography variant='subtitle1' component='h3'>
									{field.label}
									{field.required && '*'}
								</Typography>
							)}
							<TextField
								{...formikField}
								sx={{ width: field.width || '100%' }}
								fullWidth
								multiline
								value={
									field.readonly ? field.predefinedValue : formikField.value
								}
								rows={field.rows || 4}
								label={field.isInFieldLabel && field.label}
								placeholder={field.placeholder}
								error={meta.touched && !!meta.error}
								helperText={
									meta.touched && meta.error ? meta.error : field.helperText
								}
								disabled={field.disabled}
								readOnly={field.readonly}
							/>
						</Stack>
					)}
				</Field>
			);

		case 'decimal':
		case 'percent':
			return (
				<Field name={field.name}>
					{({ field: formikField, form, meta }: any) => {
						useEffect(() => {
							// If formik value is empty and form is pristine, reset display value
							if (!formikField.value && !form.dirty) {
								setPerDecimalDisplayValue('');
							}
						}, [form.dirty, formikField.value]);
						return (
							<Stack sx={style.fieldStack}>
								{!field.isInFieldLabel && (
									<Typography variant='subtitle1' component='h3'>
										{field.label}
										{field.required && '*'}
									</Typography>
								)}
								<TextField
									readOnly={field.readonly}
									disabled={field.disabled}
									sx={{ width: field.width || '100%' }}
									{...getInputProps(formikField, meta)}
									// Remove the touched condition and use raw value during input
									value={
										field.readonly
											? formatValue(field.predefinedValue, field.formatType) ??
												''
											: perDecimalDisplayValue ||
												formatValue(formikField.value, field.formatType) ||
												''
									}
									onChange={(e) => {
										// Allow direct input of numbers and decimal point
										const inputValue = e.target.value;
										const unformatted = parseValue(inputValue);
										// Only allow numbers and one decimal point
										if (
											inputValue === '' ||
											/^-?\d*\.?\d*$/.test(unformatted)
										) {
											setPerDecimalDisplayValue(unformatted);
											form.setFieldValue(field.name, unformatted);
										}
									}}
									onFocus={() => {
										// When focused, ensure we're showing the unformatted value
										if (formikField.value) {
											const unformatted = parseValue(formikField.value);
											setPerDecimalDisplayValue(unformatted);
										}
									}}
									onBlur={(e) => {
										formikField.onBlur(e);
										const value = parseValue(e.target.value);
										// Parse and format only when leaving the field
										if (value && value !== '') {
											setPerDecimalDisplayValue(
												formatValue(value, field.formatType),
											);
											form.setFieldValue(field.name, value);
										} else {
											setPerDecimalDisplayValue('');
											form.setFieldValue(field.name, '');
										}
									}}
								/>
							</Stack>
						);
					}}
				</Field>
			);
		case 'password':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) => (
						<Stack sx={style.fieldStack}>
							{!field.isInFieldLabel && (
								<Typography variant='subtitle1' component='h3'>
									{field.label}
									{field.required && '*'}
								</Typography>
							)}
							<TextField
								{...formikField}
								sx={{ width: field.width || '100%' }}
								type={showPassword ? 'text' : 'password'}
								label={field.isInFieldLabel && field.label}
								placeholder={field.placeholder}
								error={meta.touched && !!meta.error}
								helperText={
									meta.touched && meta.error ? meta.error : field.helperText
								}
								disabled={field.disabled}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleTogglePassword}
												edge='end'
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Stack>
					)}
				</Field>
			);

		default:
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) => (
						<Stack sx={style.fieldStack}>
							{!field.isInFieldLabel && (
								<Typography variant='subtitle1' component='h3'>
									{field.label}
									{field.required && '*'}
								</Typography>
							)}
							<TextField
								{...formikField}
								sx={{ width: field.width || '100%' }}
								fullWidth
								type={field.type}
								label={field.isInFieldLabel && field.label}
								placeholder={field.placeholder}
								error={meta.touched && !!meta.error}
								value={
									field.readonly ? field.predefinedValue : formikField.value
								}
								helperText={
									meta.touched && meta.error ? meta.error : field.helperText
								}
								disabled={field.disabled}
								readOnly={field.readonly}
								InputProps={{
									inputProps: {
										min: field.min,
										max: field.max,
									},
								}}
							/>
						</Stack>
					)}
				</Field>
			);
	}
};
