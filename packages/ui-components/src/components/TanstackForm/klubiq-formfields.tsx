import {
	FormFieldV1,
	FormFieldApi,
	GroupFormFieldV1,
	ArrayFormFieldV1,
	FormFieldV1WithArrayFlag,
} from './types';
import {
	TextField,
	FormControl,
	FormHelperText,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
	Slider,
	Button,
	InputAdornment,
	IconButton,
	TextareaAutosize,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Tooltip,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { GooglePlacesAutocomplete } from './GooglePlacesAutoComplete';
import { FileUpload } from './FileUpload';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { getLocaleFormat } from '../../utils';
import { ExpandMore, Delete, ContentCopy } from '@mui/icons-material';

type ArrayFormFieldWithAccordion = ArrayFormFieldV1;

// Add useDebounce hook
const useDebounce = (callback: Function, delay: number) => {
	const timeoutRef = useRef<NodeJS.Timeout>();
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);
	return (...args: any[]) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};

// Helper functions for common operations
const renderHelperText = (
	error: string | undefined,
	helperText: string | undefined,
) =>
	(error || helperText) && (
		<FormHelperText error={!!error}>{error || helperText}</FormHelperText>
	);

const renderLabel = (
	label: string | undefined,
	required: boolean | undefined,
	hasInlineLabel: boolean,
) =>
	!hasInlineLabel && label ? (
		<Typography variant='subtitle1' component='label' gutterBottom>
			{label}
			{required && (
				<Typography variant='subtitle2' component='span' sx={{ ml: 0.5 }}>
					<i>(required)</i>
				</Typography>
			)}
		</Typography>
	) : null;

const formatValue = (
	value: any,
	formatType?: string,
	decimals?: number,
	currencyCode?: string,
) => {
	if (!value && value !== 0) {
		return '';
	}
	const num = parseFloat(value);
	if (isNaN(num)) {
		return '';
	}

	if (formatType) {
		const formattedValue = getLocaleFormat(
			value,
			formatType as 'percent' | 'unit' | 'decimal' | 'currency',
			decimals,
			currencyCode,
		);
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

// Add this above KlubiqTSFormFields
const FieldWithDefaultValue: React.FC<{
	subFieldApi: FormFieldApi;
	subField: FormFieldV1;
	form: any;
	arrayFieldName?: string;
	arrayIndex?: number;
}> = ({ subFieldApi, subField, form, arrayFieldName, arrayIndex }) => {
	// Only set default value on mount
	useEffect(() => {
		if (subFieldApi.state.value === undefined) {
			subFieldApi.handleChange('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Only run on mount
	return (
		<KlubiqTSFormFields
			field={subFieldApi}
			form={form}
			fieldConfig={{
				...subField,
				_isArraySubField: true,
				...(arrayFieldName !== undefined
					? { _arrayFieldName: arrayFieldName }
					: {}),
				...(arrayIndex !== undefined ? { _arrayIndex: arrayIndex } : {}),
			}}
		/>
	);
};

export const KlubiqTSFormFields: React.FC<{
	field: FormFieldApi;
	form: any;
	fieldConfig: FormFieldV1WithArrayFlag;
}> = ({ field, form, fieldConfig }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [perDecimalDisplayValue, setPerDecimalDisplayValue] = useState('');

	const { value, meta } = field.state;
	const { values, isDirty } = form.state;
	const { label, required, disabled, helperText, type } = fieldConfig;

	const isRequired =
		typeof required === 'function' ? required(values) : required;
	const hasInlineLabel = Boolean(
		'isInFieldLabel' in fieldConfig && fieldConfig.isInFieldLabel,
	);
	const error = meta.isTouched && meta.errors[0];

	const isArraySubField = fieldConfig && fieldConfig._isArraySubField;
	const arrayFieldName = fieldConfig._arrayFieldName;
	const arrayIndex = fieldConfig._arrayIndex;

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const debouncedValidate = useDebounce((fieldName: string) => {
		form.validateField(fieldName);
	}, 500);

	// Common change handler
	const handleChange = (newValue: any) => {
		console.log('Field change:', {
			fieldName: field.name,
			oldValue: field.state.value,
			newValue,
			formValues: form.state.values
		});
		field.handleChange(newValue);
		if (
			isArraySubField &&
			arrayFieldName !== undefined &&
			arrayIndex !== undefined
		) {
			debouncedValidate(arrayFieldName);
		}
	};

	// Early return for custom components
	if (fieldConfig.customComponent) {
		if (typeof fieldConfig.customComponent === 'function') {
			const CustomComponent = fieldConfig.customComponent as (
				field: FormFieldApi,
				fieldConfig: FormFieldV1,
				form: any,
			) => JSX.Element;
			return (
				<Stack spacing={1}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					{CustomComponent(field, fieldConfig, form)}
					{renderHelperText(error, helperText)}
				</Stack>
			);
		}
		return (
			<Stack spacing={1}>
				{renderLabel(label, isRequired, hasInlineLabel)}
				{fieldConfig.customComponent}
				{renderHelperText(error, helperText)}
			</Stack>
		);
	}

	// Common field props
	const commonFieldProps = {
		error: error ? true : undefined,
		disabled,
		onBlur: () => field.handleBlur(),
	};

	switch (type) {
		case 'text':
		case 'email':
			return (
				<Stack spacing={1}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<TextField
						fullWidth
						type='text'
						label={hasInlineLabel ? label : undefined}
						placeholder={fieldConfig.placeholder}
						value={
							fieldConfig.readonly
								? (fieldConfig.predefinedValue ?? '')
								: (value ?? '')
						}
						onChange={(e) => handleChange(e.target.value)}
						{...commonFieldProps}
						helperText={error || helperText}
						inputProps={{
							autoComplete: type === 'email' ? 'email' : 'off',
							readOnly: fieldConfig.readonly,
						}}
						disabled={disabled || fieldConfig.readonly}
					/>
				</Stack>
			);
		case 'textarea':
			return (
				<Stack spacing={1}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<TextareaAutosize
						aria-label={hasInlineLabel ? label : undefined}
						placeholder={fieldConfig.placeholder}
						value={
							fieldConfig.readonly
								? (fieldConfig.predefinedValue ?? '')
								: (value ?? '')
						}
						onChange={(e) => handleChange(e.target.value)}
						onBlur={() => field.handleBlur()}
						disabled={disabled || fieldConfig.readonly}
						minRows={fieldConfig.rows || 4}
						style={{
							width: '100%',
							borderRadius: '0.5rem',
							cursor: fieldConfig.readonly ? 'default' : 'text',
							padding: '16.5px 14px',
							font: 'inherit',
							fontSize: 'inherit',
							fontWeight: 'inherit',
							lineHeight: 'inherit',
							background: 'none',
							letterSpacing: 'inherit',
							color: 'inherit',
							border: error ? '1px solid #d32f2f' : '1px solid inherit',
							opacity: fieldConfig.readonly ? 0.7 : 1,
						}}
						readOnly={fieldConfig.readonly}
					/>
					{renderHelperText(error, helperText)}
				</Stack>
			);
		case 'number':
			return (
				<Stack spacing={1}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<TextField
						fullWidth
						type='text'
						label={hasInlineLabel ? label : undefined}
						placeholder={fieldConfig.placeholder}
						value={
							fieldConfig.readonly
								? (fieldConfig.predefinedValue ?? '')
								: (value ?? '')
						}
						onChange={(e) => {
							const { value } = e.target;
							if (/^\d*$/.test(value)) {
								const numValue = value === '' ? null : parseInt(value, 10);
								handleChange(numValue);
							}
						}}
						{...commonFieldProps}
						helperText={error || helperText}
						inputProps={{
							autoComplete: 'off',
							inputMode: 'numeric',
							pattern: '[0-9]*',
							readOnly: fieldConfig.readonly,
							onKeyPress: (e) => {
								if (!/[\d]/.test(e.key)) {
									e.preventDefault();
								}
							},
						}}
						disabled={disabled || fieldConfig.readonly}
					/>
				</Stack>
			);
		case 'checkbox':
			return (
				<FormControl error={!!error}>
					<FormControlLabel
						control={
							<Checkbox
								checked={
									fieldConfig.readonly ? fieldConfig.predefinedValue : !!value
								}
								onChange={(e) => {
									handleChange(e.target.checked);
									if (
										isArraySubField &&
										arrayFieldName !== undefined &&
										arrayIndex !== undefined
									) {
										debouncedValidate(arrayFieldName);
									}
								}}
								onBlur={() => {
									field.handleBlur();
								}}
								disabled={disabled || fieldConfig.readonly}
							/>
						}
						label={hasInlineLabel ? label : ''}
					/>
					{!hasInlineLabel && renderLabel(label, isRequired, hasInlineLabel)}
					{renderHelperText(error, helperText)}
				</FormControl>
			);
		case 'checkbox-group':
			return (
				<FormControl error={!!error} component='fieldset'>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<Stack
						display='flex'
						flexDirection={
							(fieldConfig as any)?.checkboxGroupDirection === 'row'
								? 'row'
								: 'column'
						}
					>
						{Array.isArray(fieldConfig.options) &&
							fieldConfig.options.map((option: any) => (
								<FormControlLabel
									key={option.value}
									control={
										<Checkbox
											checked={
												fieldConfig.readonly
													? fieldConfig.predefinedValue?.includes(option.value)
													: Array.isArray(value)
														? value.includes(option.value)
														: false
											}
											onChange={(e) => {
												const checked = e.target.checked;
												let newValue = Array.isArray(value) ? [...value] : [];
												if (checked) {
													newValue.push(option.value);
												} else {
													newValue = newValue.filter((v) => v !== option.value);
												}
												handleChange(newValue);
												if (
													isArraySubField &&
													arrayFieldName !== undefined &&
													arrayIndex !== undefined
												) {
													debouncedValidate(arrayFieldName);
												}
											}}
											onBlur={() => {
												field.handleBlur();
											}}
											disabled={disabled || fieldConfig.readonly}
										/>
									}
									label={option.label}
								/>
							))}
					</Stack>
					{renderHelperText(error, helperText)}
				</FormControl>
			);
		case 'radio':
			return (
				<FormControl error={!!error}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<RadioGroup
						row={!!((fieldConfig as any)?.radioGroupDirection === 'row')}
						value={fieldConfig.readonly ? fieldConfig.predefinedValue : value}
						onChange={(e) => {
							handleChange(e.target.value);
							if (
								isArraySubField &&
								arrayFieldName !== undefined &&
								arrayIndex !== undefined
							) {
								debouncedValidate(arrayFieldName);
							}
						}}
						onBlur={() => {
							field.handleBlur();
						}}
					>
						{Array.isArray(fieldConfig.options)
							? fieldConfig.options.map((option: any) => (
									<FormControlLabel
										key={option.value}
										value={option.value}
										control={
											<Radio disabled={disabled || fieldConfig.readonly} />
										}
										label={option.label}
									/>
								))
							: null}
					</RadioGroup>
					{renderHelperText(error, helperText)}
				</FormControl>
			);
		case 'select':
			const options = Array.isArray(fieldConfig.options)
				? fieldConfig.options
				: typeof fieldConfig.options === 'function'
					? fieldConfig.options(values)
					: [];
			return (
				<FormControl fullWidth error={!!error}>
					{hasInlineLabel ? (
						<InputLabel>{label}</InputLabel>
					) : (
						renderLabel(label, isRequired, hasInlineLabel)
					)}
					<Select
						value={fieldConfig.readonly ? fieldConfig.predefinedValue : value}
						placeholder={fieldConfig.placeholder}
						onChange={(e) => {
							handleChange(e.target.value);
							if (
								isArraySubField &&
								arrayFieldName !== undefined &&
								arrayIndex !== undefined
							) {
								debouncedValidate(arrayFieldName);
							}
						}}
						onBlur={() => {
							field.handleBlur();
						}}
						label={hasInlineLabel ? label : undefined}
						multiple={!!fieldConfig.multiple}
						disabled={disabled || fieldConfig.readonly}
					>
						{options.map((option: any) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{renderHelperText(error, helperText)}
				</FormControl>
			);
		case 'range':
			return (
				<Stack spacing={1}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<Slider
						value={
							fieldConfig.readonly
								? (fieldConfig.predefinedValue ?? fieldConfig.min ?? 0)
								: (value ?? fieldConfig.min ?? 0)
						}
						onChange={(_, newValue) => {
							handleChange(newValue);
							if (
								isArraySubField &&
								arrayFieldName !== undefined &&
								arrayIndex !== undefined
							) {
								debouncedValidate(arrayFieldName);
							}
						}}
						onBlur={() => {
							field.handleBlur();
						}}
						min={fieldConfig.min}
						max={fieldConfig.max}
						step={fieldConfig.step}
						disabled={disabled || fieldConfig.readonly}
						valueLabelDisplay='auto'
						aria-labelledby={label}
					/>
					{renderHelperText(error, helperText)}
				</Stack>
			);
		case 'date':
			return (
				<Stack spacing={1}>
						{renderLabel(label, isRequired, hasInlineLabel)}
						<DatePicker
							label={hasInlineLabel ? label : undefined}
							value={
								fieldConfig.readonly
									? fieldConfig.predefinedValue
									: value
										? dayjs(value)
										: null
							}
							onChange={(newValue) => {
								if (newValue && dayjs.isDayjs(newValue)) {
									handleChange(newValue.toDate());
								} else {
									handleChange(null);
								}
								if (
									isArraySubField &&
									arrayFieldName !== undefined &&
									arrayIndex !== undefined
								) {
									debouncedValidate(arrayFieldName);
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
									error: !!error,
									helperText: error || helperText,
									disabled: disabled || fieldConfig.readonly,
									inputProps: {
										readOnly: fieldConfig.readonly,
									},
								},
							}}
							disabled={disabled || fieldConfig.readonly}
						/>
					</Stack>
			);
		case 'address':
			return (
				<GooglePlacesAutocomplete
					apiKey={fieldConfig.addressConfig?.apiKey ?? ''}
					value={value}
					onChange={(newValue) => {
						handleChange(newValue);
						if (
							isArraySubField &&
							arrayFieldName !== undefined &&
							arrayIndex !== undefined
						) {
							debouncedValidate(arrayFieldName);
						}
					}}
					onBlur={() => {
						field.handleBlur();
					}}
					error={!!error}
					helperText={error || helperText}
					country={fieldConfig.addressConfig?.country}
					types={fieldConfig.addressConfig?.types}
					required={
						typeof fieldConfig.required === 'function'
							? fieldConfig.required(values)
							: fieldConfig.required
					}
				/>
			);
		case 'file':
			return (
				<FileUpload
					accept={fieldConfig.fileConfig?.accept}
					maxSize={fieldConfig.fileConfig?.maxSize}
					multiple={fieldConfig.fileConfig?.multiple}
					value={value}
					onChange={(newValue) => {
						handleChange(newValue);
						if (
							isArraySubField &&
							arrayFieldName !== undefined &&
							arrayIndex !== undefined
						) {
							debouncedValidate(arrayFieldName);
						}
					}}
					onBlur={() => {
						field.handleBlur();
					}}
					error={!!error}
					helperText={error || helperText}
					subtitle={fieldConfig.fileConfig?.subtitle}
					caption={fieldConfig.fileConfig?.caption}
					tooltipMessages={fieldConfig.fileConfig?.tooltipMessages}
					onUpload={fieldConfig.fileConfig?.onUpload}
					onDelete={fieldConfig.fileConfig?.onDelete}
					uploadButtonText={fieldConfig.fileConfig?.uploadButtonText}
					maxFavorites={fieldConfig.fileConfig?.maxFavorites}
					onValidationError={(message) => {
						// Trigger validation on the field
						form.validateField(field.name);
						// If this is part of an array field, validate the parent
						if (
							isArraySubField &&
							arrayFieldName !== undefined &&
							arrayIndex !== undefined
						) {
							debouncedValidate(arrayFieldName);
						}
					}}
					onUploadComplete={(results) => {
						// Clear validation by triggering a change
						field.handleChange(value);
						// If this is part of an array field, validate the parent
						if (
							isArraySubField &&
							arrayFieldName !== undefined &&
							arrayIndex !== undefined
						) {
							debouncedValidate(arrayFieldName);
						}
						// Call the parent's onUploadComplete if provided
						if (fieldConfig.fileConfig?.onUploadComplete) {
							fieldConfig.fileConfig.onUploadComplete(results);
						}
					}}
				/>
			);
		case 'group': {
			const groupConfig = fieldConfig as GroupFormFieldV1;
			const subFields =
				typeof groupConfig.groupFields === 'function'
					? groupConfig.groupFields(values)
					: groupConfig.groupFields || [];
			return (
				<Stack spacing={groupConfig.spacing || 2}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<Stack
						direction={groupConfig.layout === 'column' ? 'column' : 'row'}
						flexWrap='wrap'
						spacing={groupConfig.spacing || 2}
						justifyContent={
							groupConfig.layout === 'row' ? 'space-between' : undefined
						}
					>
						{subFields.map((subField: FormFieldV1, index: number) => {
							// Check showIf condition for subfield
							if (subField.showIf) {
								// Get the full form values
								if (!subField.showIf(values)) {
									return null;
								}
							}
							return (
								<Stack
									key={`${subField.name}-${index}`}
									direction={groupConfig.layout === 'row' ? 'row' : 'column'}
									spacing={1}
									sx={{
										justifyContent:
											groupConfig.layout === 'row'
												? 'space-between'
												: undefined,

										width: isMobile
											? '100%'
											: subField.width ||
												(groupConfig.layout === 'row' ? '50%' : '100%'),
										flex: isMobile
											? '1 1 100%'
											: subField.width
												? `0 0 ${subField.width}`
												: groupConfig.layout === 'row'
													? '0 0 50%'
													: '1 1 100%',
									}}
								>
									<form.Field
										key={`ff-${fieldConfig.name}.${subField.name}-${index}`}
										name={`${fieldConfig.name}.${subField.name}`}
										asyncAlways={true}
									>
										{(subFieldApi: FormFieldApi) => (
											<FieldWithDefaultValue
												subFieldApi={subFieldApi}
												subField={subField}
												form={form}
											/>
										)}
									</form.Field>
								</Stack>
							);
						})}
					</Stack>
					{renderHelperText(error, helperText)}
				</Stack>
			);
		}
		case 'password':
			return (
				<Stack spacing={1}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<TextField
						fullWidth
						type={showPassword ? 'text' : 'password'}
						label={hasInlineLabel ? label : undefined}
						placeholder={fieldConfig.placeholder}
						value={
							fieldConfig.readonly ? (fieldConfig.predefinedValue ?? '') : value
						}
						onChange={(e) => handleChange(e.target.value)}
						onBlur={() => field.handleBlur()}
						error={!!error}
						helperText={error || helperText}
						disabled={disabled || fieldConfig.readonly}
						inputProps={{
							autoComplete: 'current-password',
							readOnly: fieldConfig.readonly,
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => setShowPassword(!showPassword)}
										edge='end'
										disabled={disabled || fieldConfig.readonly}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Stack>
			);
		case 'decimal':
		case 'percent':
			useEffect(() => {
				if (!value && !isDirty) {
					setPerDecimalDisplayValue('');
				}
			}, [isDirty, value]);

			return (
				<Stack spacing={1}>
					{renderLabel(label, isRequired, hasInlineLabel)}
					<TextField
						fullWidth
						label={hasInlineLabel ? label : undefined}
						placeholder={fieldConfig.placeholder}
						value={
							fieldConfig.readonly
								? (formatValue(
										fieldConfig.predefinedValue,
										fieldConfig.formatType,
									) ?? '')
								: perDecimalDisplayValue ||
									formatValue(
										value,
										fieldConfig.formatType,
										fieldConfig.decimals,
										fieldConfig.currencyCode,
									) ||
									''
						}
						onChange={(e) => {
							const inputValue = e.target.value;
							const unformatted = parseValue(inputValue);
							if (inputValue === '' || /^-?\d*\.?\d*$/.test(unformatted)) {
								setPerDecimalDisplayValue(unformatted);
								handleChange(unformatted);
							}
							if (
								isArraySubField &&
								arrayFieldName !== undefined &&
								arrayIndex !== undefined
							) {
								debouncedValidate(arrayFieldName);
							}
						}}
						onFocus={() => {
							if (value) {
								const unformatted = parseValue(value);
								setPerDecimalDisplayValue(unformatted);
							}
						}}
						onBlur={(e) => {
							field.handleBlur();

							const value = parseValue(e.target.value);
							if (value && value !== '') {
								setPerDecimalDisplayValue(
									formatValue(
										value,
										fieldConfig.formatType,
										fieldConfig.decimals,
										fieldConfig.currencyCode,
									),
								);
								handleChange(value);
							} else {
								setPerDecimalDisplayValue('');
								handleChange('');
							}
						}}
						error={!!error}
						helperText={error || helperText}
						disabled={disabled || fieldConfig.readonly}
						inputProps={{
							readOnly: fieldConfig.readonly,
						}}
						InputProps={{
							...(fieldConfig.adornment && {
								startAdornment: fieldConfig.adornment.prefix && (
									<InputAdornment position='start'>
										{fieldConfig.adornment.prefix}
									</InputAdornment>
								),
								endAdornment: fieldConfig.adornment.suffix && (
									<InputAdornment position='end'>
										{fieldConfig.adornment.suffix}
									</InputAdornment>
								),
							}),
						}}
					/>
				</Stack>
			);
		case 'array': {
			const arrayFieldConfig = fieldConfig as ArrayFormFieldWithAccordion;
			const arrayValue = values[arrayFieldConfig.name] ?? [];
			const arrayLength =
				typeof arrayFieldConfig.getArrayLength === 'function'
					? arrayFieldConfig.getArrayLength(values)
					: 1;
			useEffect(() => {
				if (!Array.isArray(arrayValue)) {
					return;
				}

				let newArray = [...arrayValue];
				const currentLength = arrayValue.length;
				const targetLength = Number(arrayLength) || 1;

				if (currentLength < targetLength) {
					// Add new items
					const defaultItem =
						typeof arrayFieldConfig.getDefaultItem === 'function'
							? arrayFieldConfig.getDefaultItem(arrayValue)
							: arrayFieldConfig.defaultItem || {};
					for (let i = currentLength; i < targetLength; i++) {
						let item = { ...defaultItem };
						if ('unitNumber' in item) {
							item.unitNumber = `Unit ${i + 1}`;
						}
						newArray.push(item);
					}
					form.setFieldValue(arrayFieldConfig.name, newArray);
				} else if (currentLength > targetLength) {
					// Remove items from the end
					newArray = newArray.slice(0, targetLength);
					form.setFieldValue(arrayFieldConfig.name, newArray);
				}
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, [arrayLength]);

			// Accordion state
			const [expanded, setExpanded] = useState<number | false>(0);

			// Handlers
			const handleAdd = () => {
				let newItem = {};
				if (typeof arrayFieldConfig.getDefaultItem === 'function') {
					newItem = arrayFieldConfig.getDefaultItem(arrayValue);
				} else if (arrayFieldConfig.defaultItem) {
					// fallback to static defaultItem if provided
					newItem = { ...arrayFieldConfig.defaultItem };
					// Optionally set a unique unitNumber
					if ('unitNumber' in newItem) {
						newItem.unitNumber = `Unit ${arrayValue.length + 1}`;
					}
				} else {
					// fallback to empty object
					newItem = {};
				}

				form.setFieldValue(arrayFieldConfig.name, [...arrayValue, newItem]);
				if (arrayFieldConfig.arrayLengthSelectorField) {
					form.setFieldValue(
						arrayFieldConfig.arrayLengthSelectorField,
						(arrayValue.length + 1).toString(),
					);
				}
				setExpanded(arrayValue.length);
			};

			const handleRemove = (idx: number) => {
				if (arrayValue.length > arrayFieldConfig.arrayLengthMin) {
					form.setFieldValue(
						arrayFieldConfig.name,
						arrayValue.filter((_: any, i: number) => i !== idx),
					);
					if (arrayFieldConfig.arrayLengthSelectorField) {
						form.setFieldValue(
							arrayFieldConfig.arrayLengthSelectorField,
							(arrayValue.length - 1).toString(),
						);
					}
					setExpanded(false);
				}
			};

			const handleClone = (idx: number) => {
				if (arrayValue.length < arrayFieldConfig.arrayLengthMax) {
					const clone = {
						unitNumber: `${arrayValue[idx].unitNumber}_clone`,
						...arrayValue[idx],
					};
					form.setFieldValue(arrayFieldConfig.name, [
						...arrayValue.slice(0, idx + 1),
						clone,
						...arrayValue.slice(idx + 1),
					]);
					if (arrayFieldConfig.arrayLengthSelectorField) {
						form.setFieldValue(
							arrayFieldConfig.arrayLengthSelectorField,
							(arrayValue.length + 1).toString(),
						);
					}
					setExpanded(idx + 1);
				}
			};

			const { fields } = arrayFieldConfig as ArrayFormFieldV1;
			const subFields =
				typeof fields === 'function' ? fields(values) : fields || [];
			const visibleSubFields = subFields.filter(
				(subField: any) => !subField.showIf || subField.showIf(values),
			);

			// Utility to get nested value from object by path (e.g., 'area.value')
			function getNestedValue(obj: any, path: string): any {
				if (path.includes('area.value')) {
					const areaValue = obj?.area?.value ?? undefined;
					const areaUnit = obj?.area?.unit ?? undefined;
					return areaValue ? `${areaValue} ${areaUnit}` : undefined;
				}
				return path
					.split('.')
					.reduce(
						(acc, part) =>
							acc && acc[part] !== undefined ? acc[part] : undefined,
						obj,
					);
			}

			if (arrayFieldConfig.useAccordion) {
				return (
					<Stack spacing={2}>
						{arrayValue.map((_: any, idx: number) => {
							const unit = arrayValue[idx];
							return (
								<Accordion
									key={idx}
									expanded={expanded === idx}
									onChange={(_, isExpanded) =>
										setExpanded(isExpanded ? idx : false)
									}
								>
									<AccordionSummary expandIcon={<ExpandMore />}>
										<Stack
											direction='row'
											alignItems='center'
											justifyContent='space-between'
											spacing={2}
											width='100%'
											flexWrap='wrap'
											gap={1}
										>
											{/* Dynamically render summary fields */}
											<Stack
												direction='row'
												alignItems='center'
												justifyContent='start'
												spacing={1}
												flexWrap='wrap'
												flex={1}
												minWidth={0} // Allows text truncation
											>
												{arrayFieldConfig.summaryFields?.map((summary, i) => {
													const value = getNestedValue(unit, summary.field);
													if (
														value === undefined ||
														value === '' ||
														value === null
													) {
														return null;
													}
													return (
														<Stack
															key={i}
															direction='row'
															alignItems='center'
															justifyContent='start'
															spacing={0.5}
															sx={{
																maxWidth: '100%',
																'& .MuiTypography-root': {
																	overflow: 'hidden',
																	textOverflow: 'ellipsis',
																	whiteSpace: 'nowrap',
																},
															}}
														>
															{summary.icon && (
																<Tooltip title={summary.label} arrow>
																	<div>{summary.icon}</div>
																</Tooltip>
															)}
															<Tooltip title={value} arrow>
																<Typography variant='body2' fontWeight={600}>
																	{value}
																</Typography>
															</Tooltip>
														</Stack>
													);
												})}
											</Stack>
											<Box
												display='flex'
												justifyContent='end'
												alignItems='center'
												gap={1}
												flexShrink={0} // Prevents buttons from shrinking
											>
												<Tooltip title={'Clone'} arrow>
													<span>
														<IconButton
															onClick={(e) => {
																e.stopPropagation();
																handleClone(idx);
															}}
															size='small'
															aria-label='Clone'
															disabled={
																arrayValue.length ===
																arrayFieldConfig.arrayLengthMax
															}
														>
															<ContentCopy fontSize='small' />
														</IconButton>
													</span>
												</Tooltip>

												<Tooltip title={'Remove'} arrow>
													<span>
														<IconButton
															onClick={(e) => {
																e.stopPropagation();
																handleRemove(idx);
															}}
															size='small'
															aria-label='Remove'
															disabled={
																arrayValue.length ===
																arrayFieldConfig.arrayLengthMin
															}
														>
															<Delete fontSize='small' />
														</IconButton>
													</span>
												</Tooltip>
											</Box>
										</Stack>
									</AccordionSummary>
									<AccordionDetails>
										<Stack
											direction={isMobile ? 'column' : 'row'}
											justifyContent='space-between'
											flexWrap='wrap'
											gap={1}
										>
											{visibleSubFields.map((subField: any, index: number) => (
												<form.Field
													key={index}
													name={`${arrayFieldConfig.name}[${idx}].${subField.name}`}
													asyncAlways={true}
													validators={{
														onChange: ({ value }: { value: any }) => {
															if (
																subField.required &&
																(value === undefined ||
																	value === null ||
																	value === '')
															) {
																return `${subField.label} is required`;
															}
															if (subField.validation?.schema) {
																try {
																	subField.validation.schema.parse(value);
																} catch (e: any) {
																	return (
																		e.errors?.[0]?.message ||
																		`${subField.label} is invalid`
																	);
																}
															}
															return undefined;
														},
													}}
												>
													{(subFieldApi: FormFieldApi) => (
														<Box
															sx={{
																width: isMobile ? '100%' : '48%',
																flex: isMobile ? '1 1 100%' : '0 0 48%',
															}}
														>
															<FieldWithDefaultValue
																subFieldApi={subFieldApi}
																subField={subField}
																form={form}
																arrayFieldName={arrayFieldConfig.name}
																arrayIndex={idx}
															/>
														</Box>
													)}
												</form.Field>
											))}
										</Stack>
									</AccordionDetails>
								</Accordion>
							);
						})}
						{arrayFieldConfig.showAddButton && (
							<Stack direction='row' justifyContent='end'>
								<Button
									variant='klubiqMainButton'
									color='primary'
									onClick={handleAdd}
									sx={{ mt: 2 }}
								>
									{arrayFieldConfig.addButtonText || `Add ${label}`}
								</Button>
							</Stack>
						)}
					</Stack>
				);
			}

			// Default stack rendering
			return (
				<Stack spacing={2}>
					{arrayValue.map((_: any, idx: number) => (
						<Stack
							key={idx}
							spacing={2}
							sx={{
								mb: 2,
								p: 2,
								border: '1px solid #333',
								borderRadius: 2,
								position: 'relative',
							}}
						>
							<Typography variant='subtitle2' sx={{ mb: 1 }}>
								{label} {arrayValue.length > 1 ? idx + 1 : ''}
							</Typography>
							<Stack
								direction='row'
								spacing={1}
								sx={{ position: 'absolute', top: 8, right: 8 }}
							>
								<Button
									size='small'
									variant='outlined'
									color='primary'
									onClick={() => handleClone(idx)}
								>
									Clone
								</Button>
								<Button
									size='small'
									variant='outlined'
									color='error'
									onClick={() => handleRemove(idx)}
									disabled={arrayValue.length === 1}
								>
									Remove
								</Button>
							</Stack>
							{visibleSubFields.map((subField: any, index: number) => (
								<form.Field
									key={`ff-${arrayFieldConfig.name}[${idx}].${subField.name}-${index}`}
									name={`${arrayFieldConfig.name}[${idx}].${subField.name}`}
									asyncAlways={true}
									validators={{
										onChange: ({ value }: { value: any }) => {
											if (
												subField.required &&
												(value === undefined || value === null || value === '')
											) {
												return `${subField.label} is required`;
											}
											if (subField.validation?.schema) {
												try {
													subField.validation.schema.parse(value);
												} catch (e: any) {
													return (
														e.errors?.[0]?.message ||
														`${subField.label} is invalid`
													);
												}
											}
											return undefined;
										},
									}}
								>
									{(subFieldApi: FormFieldApi) => (
										<FieldWithDefaultValue
											subFieldApi={subFieldApi}
											subField={subField}
											form={form}
											arrayFieldName={arrayFieldConfig.name}
											arrayIndex={idx}
										/>
									)}
								</form.Field>
							))}
						</Stack>
					))}
					<Button
						variant='contained'
						color='primary'
						onClick={handleAdd}
						sx={{ mt: 2 }}
					>
						Add {label}
					</Button>
				</Stack>
			);
		}
	}
};
