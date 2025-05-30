import { FormFieldV1, FormFieldApi, GroupFormFieldV1, ArrayFormFieldV1 } from './types';
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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { GooglePlacesAutocomplete } from './GooglePlacesAutoComplete';
import { FileUpload } from './FileUpload';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { getLocaleFormat } from '../../utils';

export const KlubiqTSFormFields: React.FC<{
	field: FormFieldApi;
	form: any;
	fieldConfig: FormFieldV1;
}> = ({ field, form, fieldConfig }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [perDecimalDisplayValue, setPerDecimalDisplayValue] = useState('');

	const error = field.state.meta.isTouched && field.state.meta.errors[0];

	const hasInlineLabel =
		'isInFieldLabel' in fieldConfig && fieldConfig.isInFieldLabel;
	const hasRadioGroupDirection = Boolean(
		'radioGroupDirection' in fieldConfig && fieldConfig.radioGroupDirection,
	);

	const renderLabel = () =>
		!hasInlineLabel && fieldConfig.label ? (
			<Typography variant='subtitle1' component='label' gutterBottom>
				{fieldConfig.label}
				{fieldConfig.required && (
					<Typography variant='subtitle2' component='span' sx={{ ml: 0.5 }}>
						<i>(required)</i>
					</Typography>
				)}
			</Typography>
		) : null;

	const formatValue = (value: any, formatType?: string) => {
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
				fieldConfig.decimals,
				fieldConfig.currencyCode,
			);
			return formattedValue.toLocaleString();
		}
		return value;
	};

	const parseValue = (value: string) => {
		if (!value) {
			return '';
		}
		const cleaned = value.replace(/[^\d.]/g, '');
		const parts = cleaned.split('.');
		if (parts.length > 2) {
			return parts[0] + '.' + parts.slice(1).join('');
		}
		return cleaned;
	};

	if (fieldConfig.customComponent) {
		if (typeof fieldConfig.customComponent === 'function') {
			const CustomComponent = fieldConfig.customComponent as (
				field: FormFieldApi,
				fieldConfig: FormFieldV1,
				form: any,
			) => JSX.Element;
			return (
				<Stack spacing={1}>
					{renderLabel()}
					{CustomComponent(field, fieldConfig, form)}
					{(error || fieldConfig.helperText) && (
						<FormHelperText error={!!error}>
							{error || fieldConfig.helperText}
						</FormHelperText>
					)}
				</Stack>
			);
		}
		return (
			<Stack spacing={1}>
				{renderLabel()}
				{fieldConfig.customComponent}
				{(error || fieldConfig.helperText) && (
					<FormHelperText error={!!error}>
						{error || fieldConfig.helperText}
					</FormHelperText>
				)}
			</Stack>
		);
	}

	switch (fieldConfig.type) {
		case 'text':
		case 'email':
			return (
				<Stack spacing={1}>
					{renderLabel()}
					<TextField
						fullWidth
						type={'text'}
						label={hasInlineLabel ? fieldConfig.label : undefined}
						value={field.state.value ?? ''}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						error={!!error}
						helperText={error || fieldConfig.helperText}
						disabled={fieldConfig.disabled}
					/>
				</Stack>
			);
		case 'textarea':
			return (
				<Stack spacing={1}>
					{renderLabel()}
					<TextareaAutosize
						aria-label={hasInlineLabel ? fieldConfig.label : undefined}
						value={field.state.value ?? ''}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						disabled={fieldConfig.disabled}
						minRows={fieldConfig.rows || 4}
						style={{
							width: '100%',
							borderRadius: '4px',
							padding: '16.5px 14px',
						}}
					/>
					{(error || fieldConfig.helperText) && (
						<FormHelperText error={!!error}>
							{error || fieldConfig.helperText}
						</FormHelperText>
					)}
				</Stack>
			);
		case 'number':
			return (
				<Stack spacing={1}>
					{renderLabel()}
					<TextField
						fullWidth
						type='text'
						label={hasInlineLabel ? fieldConfig.label : undefined}
						value={field.state.value ?? ''}
						onChange={(e) => {
							const { value } = e.target;
							if (/^\d*$/.test(value)) {
								const numValue = value === '' ? null : parseInt(value, 10);
								field.handleChange(numValue);
							}
						}}
						onBlur={field.handleBlur}
						error={!!error}
						helperText={error || fieldConfig.helperText}
						disabled={fieldConfig.disabled}
						InputProps={{
							inputProps: {
								inputMode: 'numeric',
								pattern: '[0-9]*',
								onKeyPress: (e) => {
									if (!/[\d]/.test(e.key)) {
										e.preventDefault();
									}
								},
							},
						}}
					/>
				</Stack>
			);

		case 'checkbox':
			return (
				<FormControl error={!!error}>
					<FormControlLabel
						control={
							<Checkbox
								checked={!!field.state.value}
								onChange={(e) => field.handleChange(e.target.checked)}
								onBlur={field.handleBlur}
								disabled={fieldConfig.disabled}
							/>
						}
						label={hasInlineLabel ? fieldConfig.label : ''}
					/>
					{!hasInlineLabel && renderLabel()}
					{(error || fieldConfig.helperText) && (
						<FormHelperText>{error || fieldConfig.helperText}</FormHelperText>
					)}
				</FormControl>
			);

		case 'checkbox-group':
			return (
				<FormControl error={!!error} component='fieldset'>
					{renderLabel()}
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
												Array.isArray(field.state.value)
													? field.state.value.includes(option.value)
													: false
											}
											onChange={(e) => {
												const checked = e.target.checked;
												let newValue = Array.isArray(field.state.value)
													? [...field.state.value]
													: [];
												if (checked) {
													newValue.push(option.value);
												} else {
													newValue = newValue.filter((v) => v !== option.value);
												}
												field.handleChange(newValue);
											}}
											onBlur={field.handleBlur}
											disabled={fieldConfig.disabled}
										/>
									}
									label={option.label}
								/>
							))}
					</Stack>
					{(error || fieldConfig.helperText) && (
						<FormHelperText>{error || fieldConfig.helperText}</FormHelperText>
					)}
				</FormControl>
			);

		case 'radio':
			return (
				<FormControl error={!!error}>
					{renderLabel()}
					<RadioGroup
						row={!!((fieldConfig as any)?.radioGroupDirection === 'row')}
						value={field.state.value}
						onChange={(e) => {
							field.handleChange(e.target.value);
						}}
						onBlur={field.handleBlur}
					>
						{Array.isArray(fieldConfig.options)
							? fieldConfig.options.map((option: any) => (
									<FormControlLabel
										key={option.value}
										value={option.value}
										control={<Radio disabled={fieldConfig.disabled} />}
										label={option.label}
									/>
								))
							: null}
					</RadioGroup>
					{(error || fieldConfig.helperText) && (
						<FormHelperText>{error || fieldConfig.helperText}</FormHelperText>
					)}
				</FormControl>
			);

		case 'select':
			const options = Array.isArray(fieldConfig.options)
				? fieldConfig.options
				: typeof fieldConfig.options === 'function'
					? fieldConfig.options(form.state.values)
					: [];
			return (
				<FormControl fullWidth error={!!error}>
					{hasInlineLabel ? (
						<InputLabel>{fieldConfig.label}</InputLabel>
					) : (
						renderLabel()
					)}
					<Select
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						label={hasInlineLabel ? fieldConfig.label : undefined}
						multiple={!!fieldConfig.multiple}
						disabled={fieldConfig.disabled}
					>
						{options.map((option: any) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					{(error || fieldConfig.helperText) && (
						<FormHelperText>{error || fieldConfig.helperText}</FormHelperText>
					)}
				</FormControl>
			);

		case 'range':
			return (
				<Stack spacing={1}>
					{renderLabel()}
					<Slider
						value={field.state.value ?? fieldConfig.min ?? 0}
						onChange={(_, value) => field.handleChange(value)}
						onBlur={field.handleBlur}
						min={fieldConfig.min}
						max={fieldConfig.max}
						step={fieldConfig.step}
						disabled={fieldConfig.disabled}
						valueLabelDisplay='auto'
						aria-labelledby={fieldConfig.label}
					/>
					{(error || fieldConfig.helperText) && (
						<Typography variant='caption' color='error'>
							{error || fieldConfig.helperText}
						</Typography>
					)}
				</Stack>
			);

		case 'date':
			return (
				<DatePicker
					label={fieldConfig.label}
					value={field.state.value}
					onChange={(newValue) => field.handleChange(newValue)}
					slotProps={{
						textField: {
							fullWidth: true,
							error: !!error,
							helperText: error || fieldConfig.helperText,
						},
					}}
				/>
			);

		case 'address':
			return (
				<GooglePlacesAutocomplete
					apiKey={fieldConfig.addressConfig?.apiKey ?? ''}
					value={field.state.value}
					onChange={field.handleChange}
					onBlur={field.handleBlur}
					error={!!error}
					helperText={error || fieldConfig.helperText}
					country={fieldConfig.addressConfig?.country}
					types={fieldConfig.addressConfig?.types}
					required={typeof fieldConfig.required === 'function' ? fieldConfig.required(form.state.values) : fieldConfig.required}
				/>
			);

		case 'file':
			return (
				<FileUpload
					accept={fieldConfig.fileConfig?.accept}
					maxSize={fieldConfig.fileConfig?.maxSize}
					multiple={fieldConfig.fileConfig?.multiple}
					value={field.state.value}
					onChange={field.handleChange}
					onBlur={field.handleBlur}
					error={!!error}
					helperText={error || fieldConfig.helperText}
					subtitle={fieldConfig.fileConfig?.subtitle}
					caption={fieldConfig.fileConfig?.caption}
					tooltipMessages={fieldConfig.fileConfig?.tooltipMessages}
				/>
			);

		case 'group': {
			const groupConfig = fieldConfig as GroupFormFieldV1;
			const subFields = typeof groupConfig.groupFields === 'function'
				? groupConfig.groupFields(form.state.values)
				: groupConfig.groupFields || [];
			return (
				<Stack spacing={groupConfig.spacing || 2}>
					{renderLabel()}
					<Stack
						direction={groupConfig.layout === 'column' ? 'column' : 'row'}
						flexWrap='wrap'
						spacing={groupConfig.spacing || 2}
						justifyContent={
							groupConfig.layout === 'row' ? 'space-between' : undefined
						}
					>
						{subFields.map(
							(subField: FormFieldV1, index: number) => {
								// Check showIf condition for subfield
								if (subField.showIf) {
									// Get the full form values
									const { values: formValues } = form.state;
									if (!subField.showIf(formValues)) {
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
											width:
												subField.width ||
												(groupConfig.layout === 'row' ? '50%' : '100%'),
											flex: subField.width
												? `0 0 ${subField.width}`
												: groupConfig.layout === 'row'
													? '0 0 50%'
													: '1 1 100%',
										}}
									>
										<form.Field 
										key={`ff-${fieldConfig.name}.${subField.name}-${index}`}
										name={`${fieldConfig.name}.${subField.name}`}>
											{(subFieldApi: FormFieldApi) => {
												// Ensure value is never undefined
												if (subFieldApi.state.value === undefined) {
													subFieldApi.handleChange('');
												}
												return (
													<KlubiqTSFormFields
														field={subFieldApi}
														form={form}
														fieldConfig={subField}
													/>
												);
											}}
										</form.Field>
									</Stack>
								);
							},
						)}
					</Stack>
					{(error || fieldConfig.helperText) && (
						<FormHelperText error={!!error}>
							{error || fieldConfig.helperText}
						</FormHelperText>
					)}
				</Stack>
			);
		}

		case 'password':
			return (
				<Stack spacing={1}>
					{renderLabel()}
					<TextField
						fullWidth
						type={showPassword ? 'text' : 'password'}
						label={hasInlineLabel ? fieldConfig.label : undefined}
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						error={!!error}
						helperText={error || fieldConfig.helperText}
						disabled={fieldConfig.disabled}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => setShowPassword(!showPassword)}
										edge='end'
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
				if (!field.state.value && !form.state.isDirty) {
					setPerDecimalDisplayValue('');
				}
			}, [form.state.isDirty, field.state.value]);

			return (
				<Stack spacing={1}>
					{renderLabel()}
					<TextField
						fullWidth
						label={hasInlineLabel ? fieldConfig.label : undefined}
						value={
							fieldConfig.readonly
								? (formatValue(
										fieldConfig.predefinedValue,
										fieldConfig.formatType,
									) ?? '')
								: perDecimalDisplayValue ||
									formatValue(field.state.value, fieldConfig.formatType) ||
									''
						}
						onChange={(e) => {
							const inputValue = e.target.value;
							const unformatted = parseValue(inputValue);
							if (inputValue === '' || /^-?\d*\.?\d*$/.test(unformatted)) {
								setPerDecimalDisplayValue(unformatted);
								field.handleChange(unformatted);
							}
						}}
						onFocus={() => {
							if (field.state.value) {
								const unformatted = parseValue(field.state.value);
								setPerDecimalDisplayValue(unformatted);
							}
						}}
						onBlur={(e) => {
							field.handleBlur();
							const value = parseValue(e.target.value);
							if (value && value !== '') {
								setPerDecimalDisplayValue(
									formatValue(value, fieldConfig.formatType),
								);
								field.handleChange(value);
							} else {
								setPerDecimalDisplayValue('');
								field.handleChange('');
							}
						}}
						error={!!error}
						helperText={error || fieldConfig.helperText}
						disabled={fieldConfig.disabled}
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
			// If there's a custom component, use it
			if (fieldConfig.customComponent) {
				if (typeof fieldConfig.customComponent === 'function') {
					const CustomComponent = fieldConfig.customComponent as (
						field: FormFieldApi,
						fieldConfig: FormFieldV1,
						form: any,
					) => JSX.Element;
					// Ensure value is never undefined
					if (field.state.value === undefined) {
						field.handleChange([]);
					}
					return (
						<Stack spacing={1}>
							{renderLabel()}
							{CustomComponent(field, fieldConfig, form)}
							{(error || fieldConfig.helperText) && (
								<FormHelperText error={!!error}>
									{error || fieldConfig.helperText}
								</FormHelperText>
							)}
						</Stack>
					);
				}
				return (
					<Stack spacing={1}>
						{renderLabel()}
						{fieldConfig.customComponent}
						{(error || fieldConfig.helperText) && (
							<FormHelperText error={!!error}>
								{error || fieldConfig.helperText}
							</FormHelperText>
						)}
					</Stack>
				);
			}

			// Default array rendering if no custom component
			const arrayValue = form.state.values[fieldConfig.name] ?? [{}];
			const arrayLength = arrayValue.length;

			// Handlers
			const handleAdd = () => {
				form.setFieldValue(fieldConfig.name, [...arrayValue, {}]);
			};

			const handleRemove = (idx: number) => {
				if (arrayValue.length > 1) {
					form.setFieldValue(
						fieldConfig.name,
						arrayValue.filter((_: any, i: number) => i !== idx),
					);
				}
			};

			const handleClone = (idx: number) => {
				const clone = { ...arrayValue[idx] };
				form.setFieldValue(fieldConfig.name, [
					...arrayValue.slice(0, idx + 1),
					clone,
					...arrayValue.slice(idx + 1),
				]);
			};

			const { fields } = fieldConfig as ArrayFormFieldV1;
			const subFields = typeof fields === 'function'
				? fields(form.state.values)
				: fields || [];

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
								{fieldConfig.label} {arrayValue.length > 1 ? idx + 1 : ''}
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
							{subFields.map(
								(subField: any, index: number) => (
									<form.Field
										key={`ff-${fieldConfig.name}[${idx}].${subField.name}-${index}`}
										name={`${fieldConfig.name}[${idx}].${subField.name}`}
									>
										{(subFieldApi: FormFieldApi) => {
											// Ensure value is never undefined
											if (subFieldApi.state.value === undefined) {
												subFieldApi.handleChange('');
											}
											return (
												<KlubiqTSFormFields
													field={subFieldApi}
													form={form}
													fieldConfig={subField}
												/>
											);
										}}
									</form.Field>
								),
							)}
						</Stack>
					))}
					<Button
						variant='contained'
						color='primary'
						onClick={handleAdd}
						sx={{ mt: 2 }}
					>
						Add {fieldConfig.label}
					</Button>
				</Stack>
			);
		}
	}
};
