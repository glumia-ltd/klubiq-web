/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Stack, SxProps, TextField } from '@mui/material';
import { getIn } from 'formik';

type ControlledPinFieldProps = {
	formik: any;
	sx?: SxProps;
	label?: string;
	name: string;
	type?: string;
	inFieldLabel?: string;
	length?: number;
	validate?: any;
	[key: string]: any;
};

const ControlledPinField: React.FC<ControlledPinFieldProps> = ({
	formik,
	sx,
	// label,
	name,
	type,
	// inFieldLabel,
	// length,
	// validate,
	...props
}) => {
	const InputProps = {
		// Add any custom input props here
	};

	const fieldValue = getIn(formik.values, name);
	const fieldError = getIn(formik.errors, name);
	const fieldTouched = getIn(formik.touched, name);

	return (
		<Stack
			sx={{
				justifyContent: 'center',
				minWidth: 4,
				m: 0.1,
				...sx,
			}}
			direction='row'
			spacing={1.2}
		>
			<TextField
				fullWidth
				id={name}
				name={name}
				sx={{ fontSize: '16px' }}
				variant='outlined'
				type={type || 'text'}
				value={fieldValue}
				onChange={formik.handleChange}
				error={fieldTouched && Boolean(fieldError)}
				InputProps={InputProps}
				helperText={(fieldTouched && fieldError) || ' '}
				{...props}
			/>
		</Stack>
	);
};

export default ControlledPinField;
