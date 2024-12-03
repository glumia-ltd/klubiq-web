/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import  styles from './style';
import { TextField, Stack, Typography, SxProps } from '@mui/material';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { getIn } from 'formik';

type ControlledPhoneInputProps = {
	formik: any;
	sx?: SxProps;
	classes: any;
	InputProps?: any;
	disableOnChange?: boolean;
	label?: string;
	name: string;
	type?: string;
	inFieldLabel?: boolean;
	prioritizeError?: any;
	value?: any;
};

const ControlledPhoneInput: React.FC<ControlledPhoneInputProps> = ({
	formik,
	sx,
	classes,
	// InputProps,
	disableOnChange,
	label,
	name,
	// type,
	inFieldLabel,
	// inputProps,
	prioritizeError,
	...props
}) => {
	// const theme = useTheme();
	const handleChange = (value: string) => {
		formik.handleChange({
			target: {
				name,
				value,
			},
		});
	};

	const fieldValue = getIn(formik.values, name);
	const fieldError = getIn(formik.errors, name);
	const fieldTouched = getIn(formik.touched, name);
	const style = styles()

	return (
		<Stack
			sx={style.controlledPhoneInputContainer}
			spacing={1.2}
		>
			{!inFieldLabel && (
				<Typography style={style.controlledPhoneInputTypography}>
					{label}
				</Typography>
			)}
			<ReactPhoneInput
				component={TextField}
				inputProps={{
					variant: 'outlined',
					label: undefined,
					size: 'small',
					id: name,
					name,
					fullWidth: true,
					autoComplete: 'new-password',
					error:
						Boolean(prioritizeError) ||
						(Boolean(fieldTouched) && Boolean(fieldError)),
					helperText: prioritizeError || (fieldTouched && fieldError) || ' ',
					sx: {
						'MuiOutlinedInput-input *': {
							bgcolor: 'red!important',
						},
						'&.form-control': {
							height: '40px!important',
							width: '100%!important',
							paddingLeft: '39px!important',
							'& .MuiOutlinedInput-input': {
								boxSizing: 'content-box !important',
							},
						},
					},
				}}
				placeholder={''}
				// defaultCountry={'ng'}
				inputClass={classes.field}
				value={props.value || fieldValue}
				onChange={disableOnChange ? undefined : handleChange}
				defaultMask={'... .... .... ...'}
				{...props}
			/>
		</Stack>
	);
};

export default ControlledPhoneInput;
