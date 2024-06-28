/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Stack,
	Typography,
	SxProps,
} from '@mui/material';

type ControlledSelectProps = {
	loading?: boolean;
	formik: any;
	sx?: SxProps;
	label: string;
	name: string;
	disableOnChange?: boolean;
	options: { value: any; label: string }[];
	inFieldLabel?: boolean;
	[key: string]: any;
};

const ControlledSelect: React.FC<ControlledSelectProps> = ({
	// loading,
	formik,
	sx,
	label,
	name,
	disableOnChange,
	options,
	inFieldLabel,
	...props
}) => {
	return (
		<Stack
			sx={{
				justifyContent: 'center',
				m: 0.1,
				minWidth: 50,
				...sx,
			}}
			spacing={1.2}
		>
			{!inFieldLabel && (
				<Typography fontWeight={500} fontSize={'16px'}>
					{label}
				</Typography>
			)}
			<FormControl
				sx={{ minWidth: 230 }}
				variant='outlined'
				fullWidth
				error={Boolean(formik.touched[name]) && Boolean(formik.errors[name])}
				{...props}
			>
				{inFieldLabel && <InputLabel>{label}</InputLabel>}

				<Select
					name={name}
					size='small'
					id={name}
					value={props.value || formik.values[name]}
					onChange={!disableOnChange ? formik.handleChange : undefined}
					MenuProps={{
						sx: {
							maxHeight: 'calc(100% - 200px)',
						},
					}}
				>
					{options.map(({ value, label }) => (
						<MenuItem value={value} key={value}>
							{label}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>
					{(formik.touched[name] && formik.errors[name]) || ' '}
				</FormHelperText>
			</FormControl>
		</Stack>
	);
};

export default ControlledSelect;
