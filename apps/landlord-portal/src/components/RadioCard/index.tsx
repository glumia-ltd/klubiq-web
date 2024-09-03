import { Card, Typography, Grid } from '@mui/material';
import {
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import styles from './Style';
import React from 'react';

type RadioOption = {
	value?: string;
	label?: string;
	subtext?: string;
	id?: string | number;
	displayText?: string;
	name?: string;
};

type Props = {
	options: RadioOption[];
	defaultValue?: string;
	name?: string;
	value?: string;
	headerText?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioCard = React.memo(
	({ options, defaultValue, headerText, name, onChange }: Props) => {
		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			onChange && onChange(event);
		};

		return (
			<Grid container spacing={1}>
				<Card sx={styles.card}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography variant='h6' sx={styles.typo}>
								{headerText}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FormControl sx={styles.formControl}>
								<RadioGroup
									defaultValue={defaultValue}
									name={name}
									onChange={handleChange}
								>
									{options?.map((option, index) => (
										<Grid container item xs={12} key={index} sx={styles.box}>
											<FormControlLabel
												value={option?.id}
												control={<Radio />}
												label={option?.displayText}
												sx={styles.radioLabel}
											/>
											{option?.subtext && (
												<Typography variant='body2' sx={styles.subText}>
													{option?.subtext}
												</Typography>
											)}
										</Grid>
									))}
								</RadioGroup>
							</FormControl>
						</Grid>
					</Grid>
				</Card>
			</Grid>
		);
	},
);

export default RadioCard;
