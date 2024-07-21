/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
	Stack,
	Typography,
	InputAdornment,
	CircularProgress,
	TextareaAutosize,
} from '@mui/material';
import { SxProps } from '@mui/material';

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
	loading,
	formik,
	sx,
	InputProps,
	disableOnChange,
	label,
	name,
	type,
	inFieldLabel,
	inputProps,
	prioritizeError,
	onFileSelect,
	color,
	...props
}) => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (disableOnChange) {
			return;
		}
		if (type === 'file') {
			onFileSelect?.(e.target.files);
		}
		formik.handleChange(e);
	};

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
				<Typography fontWeight={500} fontSize={'16px'} color={color}>
					{label}
				</Typography>
			)}
			<TextareaAutosize
				fullWidth
				id={name}
				name={name}
				size='small'
				variant='outlined'
				label={inFieldLabel && label}
				type={type || 'text'}
				value={
					(props.value !== undefined && props.value) || formik.values[name]
				}
				onChange={onChange}
				error={
					Boolean(prioritizeError) ||
					(Boolean(formik.touched[name]) && Boolean(formik.errors[name]))
				}
				InputProps={{
					endAdornment: loading ? (
						<InputAdornment position='end'>
							<CircularProgress size={20} />
						</InputAdornment>
					) : undefined,
					...InputProps,
				}}
				helperText={
					prioritizeError ||
					(formik.touched[name] && formik.errors[name]) ||
					' '
				}
				inputProps={inputProps}
				{...props}
			/>
		</Stack>
	);
};

export default ControlledTextArea;
