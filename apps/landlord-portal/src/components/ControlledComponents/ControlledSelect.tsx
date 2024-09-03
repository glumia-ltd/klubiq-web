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
	options: { [key: string]: string }[];
	inFieldLabel?: boolean;
	[key: string]: any;
	color?: string;
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
	color,

	...props
}) => {
	return (
		<Stack
			sx={{
				justifyContent: 'center',
				m: 0.1,
				minWidth: 230,
				...sx,
			}}
			spacing={1.2}
		>
			{!inFieldLabel && (
				<Typography fontWeight={500} fontSize={'16px'} color={color}>
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
					{options?.map(({ id, displayText }) => (
						<MenuItem value={id} key={`${displayText}-${id}`}>
							{displayText}
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
