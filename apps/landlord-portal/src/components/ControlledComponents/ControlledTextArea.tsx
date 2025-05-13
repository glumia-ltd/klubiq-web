/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
	Stack,
	Typography,
	// InputAdornment,
	// CircularProgress,
	TextareaAutosize,
} from '@mui/material';
import { SxProps } from '@mui/material';
import { getIn } from 'formik';
import { consoleLog } from '../../helpers/debug-logger';

type ControlledTextFieldProps = {
	loading?: boolean;
	formik?: any;
	sx?: SxProps;
	InputProps?: any;
	disableOnChange?: boolean;
	label?: string;
	name: string;
	type?: string;
	inFieldLabel?: boolean;
	inputProps?: any;
	prioritizeError?: any;
	[key: string]: any;
	color?: string;
};

const ControlledTextArea: React.FC<ControlledTextFieldProps> = ({
	//loading,
	formik,
	sx,
	//InputProps,
	disableOnChange,
	label,
	name,
	type,
	inFieldLabel,
	//inputProps,
	prioritizeError,
	onFileSelect,
	color,
	...props
}) => {
	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (disableOnChange) {
			return;
		}
		if (e.target instanceof HTMLInputElement && type === 'file') {
			const files = e.target.files;
			if (files) {
				// Handle file input
				consoleLog(files);
				onFileSelect?.(e.target.files);
			}
		}
		formik.handleChange(e);
	};

	const fieldValue = getIn(formik.values, name);
	const fieldError = getIn(formik.errors, name);
	const fieldTouched = getIn(formik.touched, name);

	return (
		<Stack
			sx={{
				justifyContent: 'center',
				minWidth: 150,
				m: 0.1,
				flexDirection: 'column',
				...sx,
			}}
			spacing={1.2}
		>
			{!inFieldLabel && (
				<Typography variant='subtitle1' color={color}>
					{label}
				</Typography>
			)}
			<TextareaAutosize
				id={name}
				name={name}
				value={(props.value !== undefined && props.value) || fieldValue}
				onChange={onChange}
				// InputProps={{
				// 	endAdornment: loading ? (
				// 		<InputAdornment position='end'>
				// 			<CircularProgress size={20} />
				// 		</InputAdornment>
				// 	) : undefined,
				// 	...InputProps,
				// }}
				// helperText={
				// 	prioritizeError ||
				// 	(formik.touched[name] && formik.errors[name]) ||
				// 	' '
				// }
				// inputProps={inputProps}
				{...props}
			/>
			{Boolean(prioritizeError) ||
				(Boolean(fieldTouched) && Boolean(fieldError) && (
					<Typography fontWeight={500} fontSize={'16px'} color={color}>
						{label}
					</Typography>
				))}
		</Stack>
	);
};

export default ControlledTextArea;
