// packages/ui-components/src/components/DynamicForm/klubiq-formfields.tsx
import { FieldApi } from '@tanstack/react-form';
import { FormFieldV1, FormFieldApi } from './types';
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
	Box,
	Typography,
	Slider,
	Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { GooglePlacesAutocomplete } from './GooglePlacesAutoComplete';
import { FileUpload } from './FileUpload';

export const KlubiqFormFields: React.FC<{
	field: FormFieldApi;
	form: any;
	fieldConfig: FormFieldV1;
}> = ({ field, form, fieldConfig }) => {
	const error = field.state.meta.isTouched && field.state.meta.errors[0];

	const hasInlineLabel = 'isInFieldLabel' in fieldConfig && fieldConfig.isInFieldLabel;
	const hasRadioGroupDirection = Boolean('radioGroupDirection' in fieldConfig && fieldConfig.radioGroupDirection);

	const renderLabel = () =>
		!hasInlineLabel && fieldConfig.label ? (
			<Typography variant="subtitle1" component="label" gutterBottom>
				{fieldConfig.label}
				{fieldConfig.required && ' *'}
			</Typography>
		) : null;

	if (fieldConfig.customComponent) {
		return typeof fieldConfig.customComponent === 'function'
			? fieldConfig.customComponent(field)
			: fieldConfig.customComponent;
	}

	switch (fieldConfig.type) {
		case 'text':
		case 'email':
		case 'password':
		case 'number':
		case 'textarea':
			return (
				<Box>
					{renderLabel()}
					<TextField
						fullWidth
						type={fieldConfig.type}
						label={hasInlineLabel ? fieldConfig.label : undefined}
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						error={!!error}
						helperText={error || fieldConfig.helperText}
						disabled={fieldConfig.disabled}
						multiline={fieldConfig.type === 'textarea'}
						rows={fieldConfig.rows}
					/>
				</Box>
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
				<FormControl error={!!error} component="fieldset">
					{renderLabel()}
					<Box
						display="flex"
						flexDirection={(fieldConfig as any)?.checkboxGroupDirection === 'row' ? 'row' : 'column'}
					>
						{Array.isArray(fieldConfig.options) &&
							fieldConfig.options.map((option: any) => (
								<FormControlLabel
									key={option.value}
									control={
										<Checkbox
											checked={Array.isArray(field.state.value) ? field.state.value.includes(option.value) : false}
											onChange={(e) => {
												const checked = e.target.checked;
												let newValue = Array.isArray(field.state.value) ? [...field.state.value] : [];
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
					</Box>
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
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
					>
						{Array.isArray(fieldConfig.options) ? fieldConfig.options.map((option: any) => (
							<FormControlLabel
								key={option.value}
								value={option.value}
								control={<Radio disabled={fieldConfig.disabled} />}
								label={option.label}
							/>
						)) : null}
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
				? fieldConfig.options(form.getValues())
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
				<Box>
					{renderLabel()}
					<Slider
						value={field.state.value ?? fieldConfig.min ?? 0}
						onChange={(_, value) => field.handleChange(value)}
						onBlur={field.handleBlur}
						min={fieldConfig.min}
						max={fieldConfig.max}
						step={fieldConfig.step}
						disabled={fieldConfig.disabled}
						valueLabelDisplay="auto"
						aria-labelledby={fieldConfig.label}
					/>
					{(error || fieldConfig.helperText) && (
						<Typography variant="caption" color="error">
							{error || fieldConfig.helperText}
						</Typography>
					)}
				</Box>
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
					apiKey={fieldConfig.addressConfig?.apiKey?? ''}
					value={field.state.value}
					onChange={field.handleChange}
					onBlur={field.handleBlur}
					error={!!error}
					helperText={error || fieldConfig.helperText}
					country={fieldConfig.addressConfig?.country}
					types={fieldConfig.addressConfig?.types}
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
				/>
			);

		case 'array': {
			const arrayValue = form.getValues()[fieldConfig.name] || [{}];
			const arrayLength = arrayValue.length;

			// Handlers
			const handleAdd = () => {
				form.setFieldValue(
					fieldConfig.name,
					[...arrayValue, {}]
				);
			};

			const handleRemove = (idx: number) => {
				if (arrayValue.length > 1) {
					form.setFieldValue(
						fieldConfig.name,
						arrayValue.filter((_: any, i: number) => i !== idx)
					);
				}
			};

			const handleClone = (idx: number) => {
				const clone = { ...arrayValue[idx] };
				form.setFieldValue(
					fieldConfig.name,
					[
						...arrayValue.slice(0, idx + 1),
						clone,
						...arrayValue.slice(idx + 1)
					]
				);
			};

			return (
				<Box>
					{arrayValue.map((_: any, idx: number) => (
						<Box key={idx} sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 2, position: 'relative' }}>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>
								{fieldConfig.label} {arrayValue.length > 1 ? idx + 1 : ''}
							</Typography>
							<Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
								<Button size="small" variant="outlined" color="primary" onClick={() => handleClone(idx)}>
									Clone
								</Button>
								<Button size="small" variant="outlined" color="error" onClick={() => handleRemove(idx)} disabled={arrayValue.length === 1}>
									Remove
								</Button>
							</Box>
							{(fieldConfig as any).fields.map((subField: any) => (
								<KlubiqFormFields
									key={subField.name}
									field={form.getFieldApi(`${fieldConfig.name}[${idx}].${subField.name}`)}
									form={form}
									fieldConfig={subField}
								/>
							))}
						</Box>
					))}
					<Button
						variant="contained"
						color="primary"
						onClick={handleAdd}
						sx={{ mt: 2 }}
					>
						Add {fieldConfig.label}
					</Button>
				</Box>
			);
		}

		// Add more field types as needed
	}
};
