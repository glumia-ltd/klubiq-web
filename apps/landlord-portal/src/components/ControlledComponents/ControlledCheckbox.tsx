/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { styles } from './style';
import {
	Stack,
	FormHelperText,
	Checkbox,
	FormControl,
	FormControlLabel,
} from '@mui/material';
import { SxProps } from '@mui/material';
import { getIn } from 'formik';

type ControlledCheckBoxProps = {
	loading?: boolean;
	formik: any;
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
};

const ControlledCheckBox: React.FC<ControlledCheckBoxProps> = ({
	// loading,
	formik,
	sx,
	// InputProps,
	disableOnChange,
	label,
	name,
	// type,
	// inFieldLabel,
	// inputProps,
	// prioritizeError,
	// onFileSelect,
	...props
}) => {
	const fieldValue = getIn(formik.values, name);
	const fieldError = getIn(formik.errors, name);
	const fieldTouched = getIn(formik.touched, name);

	return (
		<Stack
			sx={styles.checkboxcontainer}
		>
			<FormControl
				required
				error={(fieldTouched && fieldValue) || ''}
				variant='standard'
			>
				<FormControlLabel
					control={
						<Checkbox
							checked={props.value || fieldValue}
							onChange={!disableOnChange ? formik.handleChange : undefined}
							name={name}
							id={name}
							// error={
							//   Boolean(prioritizeError) ||
							//   (Boolean(formik.touched[name]) && Boolean(formik.errors[name]))
							// }
						/>
					}
					label={label}
					labelPlacement='end'
					sx={styles.formControlLabel}
					componentsProps={styles.checkBoxComponentProps}
				/>
				<FormHelperText sx={styles.formHelperText}>
					{(fieldTouched && fieldError) || ''}
				</FormHelperText>{' '}
			</FormControl>
		</Stack>
	);
};

export default ControlledCheckBox;
