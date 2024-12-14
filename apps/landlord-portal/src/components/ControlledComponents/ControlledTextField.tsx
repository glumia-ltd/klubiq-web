/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
	TextField,
	Stack,
	Typography,
	InputAdornment,
	CircularProgress,
} from '@mui/material';
import { SxProps } from '@mui/material';
import { getIn } from 'formik';

type ControlledTextFieldProps = {
	loading?: boolean;
	formik?: any;
	sx?: SxProps;
	sxTwo?: SxProps;
	InputProps?: any;
	disableOnChange?: boolean;
	label?: string;
	name: string;
	type?: string;
	inFieldLabel?: boolean;
	inputprops?: any;
	prioritizeError?: any;
	[key: string]: any;
	color?: string;
	inputRef?: React.Ref<HTMLInputElement>;
	required?: boolean;
	autoComplete?: string;
	showCurrency?: boolean;
	currencySymbol?: string;
};

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
	loading,
	formik,
	sx,
	InputProps,
	disableOnChange,
	label,
	name,
	type,
	inFieldLabel,
	inputprops,
	prioritizeError,
	onFileSelect,
	color,
	sxTwo,
	placeholder,
	required,
	autoComplete,
	showCurrency,
	currencySymbol,
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

	const fieldValue = getIn(formik.values, name);
	const fieldError = getIn(formik.errors, name);
	const fieldTouched = getIn(formik.touched, name);

	return (
		<Stack
			sx={{
				justifyContent: 'center',
				minWidth: 150,
				m: 0.3,
				flexDirection: 'column',
				...sx,
			}}
			spacing={1.2}
		>
			{!inFieldLabel && (
				<Stack direction={'row'} alignItems={'end'} gap={1}>
					<Typography fontWeight={500} fontSize={'16px'} color={color}>
						{label}
					</Typography>

					<Typography fontWeight={100} fontSize={'12px'}>
						{required ? <i>(required)</i> : ''}
					</Typography>
				</Stack>
			)}

			<TextField
				fullWidth
				id={name}
				name={name}
				size='small'
				variant='outlined'
				placeholder={placeholder}
				label={inFieldLabel && label}
				type={type || 'text'}
				value={(props.value !== undefined && props.value) || fieldValue || ''}
				onChange={onChange}
				onBlur={formik?.handleBlur}
				autoComplete={autoComplete}
				error={
					Boolean(prioritizeError) ||
					(Boolean(fieldTouched) && Boolean(fieldError))
				}
				InputProps={{
					endAdornment: loading ? (
						<InputAdornment position='end'>
							<CircularProgress size={20} />
						</InputAdornment>
					) : undefined,
					startAdornment: showCurrency ? (
						<InputAdornment position='start'>{currencySymbol}</InputAdornment>
					) : undefined,
					...InputProps,
				}}
				helperText={prioritizeError || (fieldTouched && fieldError) || ' '}
				inputProps={inputprops}
				{...props}
				sx={sxTwo}
			/>
		</Stack>
	);
};
export default ControlledTextField;
