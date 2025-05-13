/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
	FormControl,
	InputLabel,
	Autocomplete,
	MenuItem,
	FormHelperText,
	Stack,
	Typography,
	TextField,
	SxProps,
} from '@mui/material';
import { getIn } from 'formik';

type ControlledAutocompleteProps = {
	formik: any;
	sx?: SxProps;
	label: string;
	name: string;
	disableOnChange?: boolean;
	options: { value: any; label: string }[];
	inFieldLabel?: boolean;
	[key: string]: any;
};

const ControlledAutocomplete: React.FC<ControlledAutocompleteProps> = ({
	formik,
	sx,
	label,
	name,
	disableOnChange,
	options,
	inFieldLabel,
	...props
}) => {
	const fieldValue = getIn(formik.values, name);
	const fieldError = getIn(formik.errors, name);
	const fieldTouched = getIn(formik.touched, name);

	return (
		<Stack
			sx={{
				justifyContent: 'center',
				m: 0.2,
				minWidth: 230,
				...sx,
			}}
			spacing={1.2}
		>
			{!inFieldLabel && (
				<Typography variant='subtitle1'>
					{label}
				</Typography>
			)}
			<FormControl
				sx={{ m: 1, minWidth: 230 }}
				variant='outlined'
				fullWidth
				error={fieldTouched && Boolean(fieldError)}
			>
				{inFieldLabel && <InputLabel>{label}</InputLabel>}

				<Autocomplete
					id={props.name}
					size='small'
					autoHighlight
					autoComplete
					autoSelect
					value={fieldValue}
					onChange={(_, newValue) => {
						!disableOnChange
							? formik.handleChange({
									target: {
										name,
										value: newValue && newValue.value,
										id: name,
									},
								})
							: undefined;
					}}
					isOptionEqualToValue={(option, value) => option.value === value}
					options={options}
					getOptionLabel={(value) => {
						if (typeof value === 'string') {
							const option = options.find((option) => option.value === value);
							return option?.label || '';
						} else {
							return value.label;
						}
					}}
					renderOption={(props, option) => (
						<MenuItem {...props}>{option.label}</MenuItem>
					)}
					renderInput={(params) => (
						<TextField
							{...params}
							name={name}
							label={inFieldLabel && label}
							error={fieldTouched && Boolean(fieldError)}
							inputProps={{
								...params.inputProps,
								autoComplete: 'new-password',
							}}
						/>
					)}
					{...props}
				/>
				{fieldTouched && <FormHelperText>{fieldError}</FormHelperText>}
			</FormControl>
		</Stack>
	);
};

export default ControlledAutocomplete;
