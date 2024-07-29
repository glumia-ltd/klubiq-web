/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
	TextField,
	Stack,
	Typography,
	InputAdornment,
	CircularProgress,
	IconButton,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { SxProps } from '@mui/material';

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
	inputProps?: any;
	prioritizeError?: any;
	[key: string]: any;
	color?: string;
};

const ControlledNumberField: React.FC<ControlledTextFieldProps> = ({
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
	sxTwo,
	...props
}) => {
	const [value, setValue] = useState<number>(formik.values[name] || 0);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (disableOnChange) {
			return;
		}
		if (type === 'file') {
			onFileSelect?.(e.target.files);
		}
		setValue(Number(e.target.value));
		formik.handleChange(e);
	};

	const handleIncrement = () => {
		setValue((prevValue) => prevValue + 1);
		formik.setFieldValue(name, value + 1);
	};

	const handleDecrement = () => {
		setValue((prevValue) => prevValue - 1);
		formik.setFieldValue(name, value - 1);
	};

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
				<Typography fontWeight={500} fontSize={'16px'} color={color}>
					{label}
				</Typography>
			)}
			<TextField
				fullWidth
				id={name}
				name={name}
				size='small'
				variant='outlined'
				label={inFieldLabel && label}
				type={type || 'text'}
				value={value}
				onChange={onChange}
				error={
					Boolean(prioritizeError) ||
					(Boolean(formik.touched[name]) && Boolean(formik.errors[name]))
				}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<IconButton onClick={handleDecrement}>
								<Remove />
							</IconButton>
						</InputAdornment>
					),
					endAdornment: loading ? (
						<InputAdornment position='end'>
							<CircularProgress size={20} />
						</InputAdornment>
					) : (
						<InputAdornment position='end'>
							<IconButton onClick={handleIncrement}>
								<Add />
							</IconButton>
						</InputAdornment>
					),
					...InputProps,
				}}
				helperText={
					prioritizeError ||
					(formik.touched[name] && formik.errors[name]) ||
					' '
				}
				inputProps={inputProps}
				{...props}
				sx={sxTwo}
			/>
		</Stack>
	);
};

export default ControlledNumberField;
