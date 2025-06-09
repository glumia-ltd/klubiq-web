
import { Field, FormikConsumer } from 'formik';
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
	Box,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DynamicFormProps, FormatType, FormField, FormGroup } from './types';
import { getLocaleFormat } from '../../utils';
import React, { useEffect, useState } from 'react';
import { style } from './style';
import { Button, Link } from '@mui/material';

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

	if (field.hidden) {
		return (
			<Field name={field.name}>
				{({ form }: any) => {
					React.useEffect(() => {
						if (field.predefinedValue !== undefined) {
							form.setFieldValue(field.name, field.predefinedValue);
						}
					}, [field.predefinedValue]);
					return null;
				}}
			</Field>
		);
	}

	const isFormGroup = (field: FormField | FormGroup): field is FormGroup => {
		return 'fields' in field;
	};

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
					<FormikConsumer>
						{({ values }) => (
							<>
								{field.fields.map((subField, index) => {
									const shouldShow =
										!subField?.showIf || subField?.showIf(values);
									if (!shouldShow) return null;
									return (
										<KlubiqFormFields
											key={`${subField?.name}-${index}`}
											field={subField}
											formatters={formatters}
										/>
									);
								})}
							</>
						)}
					</FormikConsumer>
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
		if (!value && value !== 0) return '';
		const num = parseFloat(value);
		if (isNaN(num)) return '';

		if (formatType) {
			const formattedValue = getLocaleFormat(value, formatType, field.decimals);
			return formattedValue.toLocaleString();
		}
		return value;
	};

	const parseValue = (value: string) => {
		if (!value) return '';
		const cleaned = value.replace(/[^\d.]/g, '');
		const parts = cleaned.split('.');
		if (parts.length > 2) {
			return parts[0] + '.' + parts.slice(1).join('');
		}
		return cleaned;
	};

	const renderInfoMessage = (formikField: any) => {
		if (!field.infoMessage) return null;

		const message =
			typeof field.infoMessage.message === 'function'
				? field.infoMessage.message(formikField.value)
				: field.infoMessage.message;

		const shouldShow =
			!field.infoMessage.showIf || field.infoMessage.showIf(formikField.value);
		if (!shouldShow) return null;

		return (
			<Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 1 }}>
				{field.infoMessage.icon && (
					<Box
						component='img'
						src={field.infoMessage.icon as string}
						alt='info'
						sx={{ width: 24, height: 24 }}
					/>
				)}
				<Typography variant='subtitle2' color='text.secondary'>
					{message}
				</Typography>
			</Stack>
		);
	};

	const renderFieldWithLayout = (content: React.ReactNode) => {
		if (field.layout === 'row') {
			return (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						gap: 2,
						width: '100%',
						'& > *': {
							flex: 1,
							minWidth: 0, // Prevents flex items from overflowing
						},
					}}
				>
					{content}
				</Box>
			);
		}
		return content;
	};

	const renderFieldWithAction = (formikField: any, meta: any) => {
		const renderField = () => {
			switch (field.type) {
				case 'select':
					return (
						<Select
							{...formikField}
							sx={{ width: field.width || '100%' }}
							label={field.isInFieldLabel && field.label}
							multiple={field.multiple}
							value={
								field.readonly
									? field.predefinedValue
									: formikField.value || null
							}
							disabled={field.disabled}
							onChange={(e) => {
								formikField.onChange(e);
								if (field?.onChange) {
									field?.onChange(e.target.value);
								}
							}}
						>
							{(() => {
								const options =
									typeof field.options === 'function'
										? field.options(formikField.form.values)
										: field.options || [];
								return options.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								));
							})()}
						</Select>
					);
				case 'date':
					return (
						<DatePicker
							sx={{ width: field.width || '100%' }}
							label={field.isInFieldLabel && field.label}
							value={
								field.readonly
									? field.predefinedValue
									: formikField.value || null
							}
							onChange={(value) => {
								formikField.onChange({
									target: { name: field.name, value: value },
								});
								if (field.onChange) {
									field.onChange(value);
								}
							}}
							disabled={field.disabled}
							readOnly={field.readonly}
							slotProps={{
								textField: {
									error: meta.touched && !!meta.error,
									helperText: meta.touched ? meta.error : field.helperText,
									fullWidth: true,
								},
							}}
						/>
					);
				default:
					return (
						<TextField
							{...formikField}
							sx={{ width: field.width || '100%' }}
							fullWidth
							type={field.type}
							label={field.isInFieldLabel && field.label}
							placeholder={field.placeholder}
							error={meta.touched && !!meta.error}
							value={field.readonly ? field.predefinedValue : formikField.value}
							helperText={
								meta.touched && meta.error ? meta.error : field.helperText
							}
							disabled={field.disabled}
							readOnly={field.readonly}
							onChange={(e) => {
								formikField.onChange(e);
								if (field.onChange) {
									field.onChange(e.target.value);
								}
							}}
						/>
					);
			}
		};

		return renderFieldWithLayout(
			<Stack sx={style.fieldStack}>
				{!field.isInFieldLabel && (
					<Typography variant='subtitle1' component='h3'>
						{field.label}
						{field.required && '*'}
					</Typography>
				)}
				<Stack direction='row' spacing={1} alignItems='center'>
					{field.actionButton?.position === 'start' && field.actionButton && (
						<Button
							component={Link}
							variant='text'
							onClick={() => field.actionButton?.onClick(formikField.value)}
							sx={{ whiteSpace: 'nowrap' }}
						>
							{field.actionButton.label}
						</Button>
					)}
					{renderField()}
					{field.actionButton?.position !== 'start' && field.actionButton && (
						<Button
							component={Link}
							variant='text'
							onClick={() => field.actionButton?.onClick(formikField.value)}
							sx={{ whiteSpace: 'nowrap' }}
						>
							{field.actionButton.label}
						</Button>
					)}
				</Stack>
			</Stack>,
		);
	};

	switch (field.type) {
		case 'select':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) =>
						renderFieldWithLayout(
							<FormControl fullWidth error={meta.touched && !!meta.error}>
								<Stack sx={style.fieldStack}>
									{!field.isInFieldLabel && (
										<Typography variant='subtitle1' component='h3'>
											{field.label}
											{field.required && '*'}
										</Typography>
									)}
									<Select
										{...formikField}
										sx={{ width: field.width || '100%' }}
										label={field.isInFieldLabel && field.label}
										multiple={field.multiple}
										value={
											field.readonly
												? field.predefinedValue
												: formikField.value || null
										}
										disabled={field.disabled}
										onChange={(e) => {
											formikField.onChange(e);
											if (field.onChange) {
												field.onChange(e.target.value);
											}
										}}
									>
										{(() => {
											const options =
												typeof field.options === 'function'
													? field.options(formikField.form.values)
													: field.options || [];
											return options.map((option, idx) => (
												<MenuItem key={idx} value={option.value}>
													{option.label}
												</MenuItem>
											));
										})()}
									</Select>
								</Stack>
								{meta.touched && meta.error && (
									<FormHelperText>{meta.error}</FormHelperText>
								)}
							</FormControl>,
						)
					}
				</Field>
			);

		case 'checkbox':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) =>
						renderFieldWithLayout(
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
											<Checkbox
												{...formikField}
												checked={formikField.value}
												onChange={(e) => {
													formikField.onChange(e);
													if (field.onChange) {
														field.onChange(e.target.checked);
													}
												}}
											/>
										}
										label={field.isInFieldLabel && field.label}
									/>
								</Stack>
								{meta.touched && meta.error && (
									<FormHelperText>{meta.error}</FormHelperText>
								)}
							</FormControl>,
						)
					}
				</Field>
			);

		case 'radio':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) =>
						renderFieldWithLayout(
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
										onChange={(e) => {
											formikField.onChange(e);
											if (field.onChange) {
												field.onChange(e.target.value);
											}
										}}
									>
										{(() => {
											const options =
												typeof field.options === 'function'
													? field.options(formikField.form.values)
													: field.options || [];
											return options.map((option, idx) => (
												<FormControlLabel
													key={idx}
													value={option.value}
													control={<Radio />}
													label={option.label}
												/>
											));
										})()}
									</RadioGroup>
								</Stack>
								{meta.touched && meta.error && (
									<FormHelperText>{meta.error}</FormHelperText>
								)}
							</FormControl>,
						)
					}
				</Field>
			);

		case 'date':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) =>
						renderFieldWithLayout(
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
										formikField.onChange({
											target: { name: field.name, value: value },
										});
										if (field.onChange) {
											field.onChange(value);
										}
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
									disabled={field.disabled}
									readOnly={field.readonly}
									slotProps={{
										textField: {
											error: meta.touched && !!meta.error,
											helperText: meta.touched ? meta.error : field.helperText,
											fullWidth: true,
											disabled: field.disabled,
											InputProps: {
												readOnly: field.readonly,
											},
											onBlur: (e:React.FocusEvent<any>) => {
												if (formikField.value || meta.touched) {
													formikField.onBlur(e);
												}
											},
										},
									}}
								/>
							</Stack>,
						)
					}
				</Field>
			);

		case 'textarea':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) =>
						renderFieldWithLayout(
							<Stack sx={style.fieldStack}>
								{!field.isInFieldLabel && (
									<Typography variant='subtitle1' component='h3'>
										{field.label}
										{field.required && '*'}
									</Typography>
								)}
								<TextField
									{...formikField}
									sx={{ width: field.width || '100%', height: '100%' }}
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
									onChange={(e) => {
										formikField.onChange(e);
										if (field.onChange) {
											field.onChange(e.target.value);
										}
									}}
								/>
							</Stack>,
						)
					}
				</Field>
			);

		case 'decimal':
		case 'percent':
			return (
				<Field name={field.name}>
					{({ field: formikField, form, meta }: any) => {
						useEffect(() => {
							if (!formikField.value && !form.dirty) {
								setPerDecimalDisplayValue('');
							}
						}, [form.dirty, formikField.value]);
						return renderFieldWithLayout(
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
									value={
										field.readonly
											? formatValue(field.predefinedValue, field.formatType) ??
												''
											: perDecimalDisplayValue ||
												formatValue(formikField.value, field.formatType) ||
												''
									}
									onChange={(e) => {
										const inputValue = e.target.value;
										const unformatted = parseValue(inputValue);
										if (
											inputValue === '' ||
											/^-?\d*\.?\d*$/.test(unformatted)
										) {
											setPerDecimalDisplayValue(unformatted);
											form.setFieldValue(field.name, unformatted);

											if (field.onChange) {
												field.onChange(unformatted);
											}
										}
									}}
									onFocus={() => {
										if (formikField.value) {
											const unformatted = parseValue(formikField.value);
											setPerDecimalDisplayValue(unformatted);
										}
									}}
									onBlur={(e) => {
										formikField.onBlur(e);
										const value = parseValue(e.target.value);
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
							</Stack>,
						);
					}}
				</Field>
			);

		case 'password':
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) =>
						renderFieldWithLayout(
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
									onChange={(e) => {
										formikField.onChange(e);
										if (field.onChange) {
											field.onChange(e.target.value);
										}
									}}
								/>
							</Stack>,
						)
					}
				</Field>
			);

		default:
			return (
				<Field name={field.name}>
					{({ field: formikField, meta }: any) => (
						<>
							{renderFieldWithAction(formikField, meta)}
							{renderInfoMessage(formikField)}
						</>
					)}
				</Field>
			);
	}
};
