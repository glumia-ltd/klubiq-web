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
import { getIn } from 'formik';

type ControlledSelectProps = {
	loading?: boolean;
	formik?: any;
	sx?: SxProps;
	label?: string;
	name: string;
	disableOnChange?: boolean;
	options: { [key: string]: string }[];
	inFieldLabel?: boolean;
	[key: string]: any;
	color?: string;
	placeholder?: string;
	required?: boolean;
};

const ControlledSelect: React.FC<ControlledSelectProps> = ({
	formik,
	sx,
	label,
	name,
	disableOnChange,
	options,
	inFieldLabel,
	color,
	required,
	...props
}) => {
	const fieldValue = getIn(formik.values, name);
	const fieldError = getIn(formik.errors, name);
	const fieldTouched = getIn(formik.touched, name);
	return (
		<Stack
			sx={{
				justifyContent: 'center',
				m: 0.3,
				minWidth: 230,
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
			<FormControl
				sx={{ minWidth: 230 }}
				variant='outlined'
				fullWidth
				error={Boolean(fieldTouched) && Boolean(fieldError)}
				{...props}
			>
				{inFieldLabel && <InputLabel>{label}</InputLabel>}

				<Select
					name={name}
					size='small'
					id={name}
					value={props.value || fieldValue}
					onChange={!disableOnChange ? formik.handleChange : undefined}
					onBlur={formik.handleBlur}
					MenuProps={{
						sx: {
							maxHeight: 'calc(100% - 200px)',
						},
					}}
				>
					{options?.map(({ id, name }) => (
						<MenuItem value={id} key={`${name}-${id}-`}>
							{name}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>{(fieldTouched && fieldError) || ' '}</FormHelperText>
			</FormControl>
		</Stack>
	);
};

export default ControlledSelect;
