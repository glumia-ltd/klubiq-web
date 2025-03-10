import { Card, Typography, Grid, Stack } from '@mui/material';
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
	checkedValue?: string;
	name?: string;
	value?: string;
	headerText?: string;
	required?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioCard = React.memo(
	({
		options,
		defaultValue,
		headerText,
		name,
		onChange,
		checkedValue,
		required,
	}: Props) => {
		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			onChange && onChange(event);
		};

		return (
			<Grid container spacing={1}>
				<Card sx={styles.card}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Stack direction={'row'} alignItems={'center'} gap={1}>
								<Typography variant='h6' sx={styles.typo}>
									{headerText}
								</Typography>

								<Typography
									fontWeight={100}
									fontSize={'12px'}
									sx={{
										...styles.typo,
										textTransform: 'none',
										fontSize: '12px',
									}}
								>
									{required ? <i>(required)</i> : ''}
								</Typography>
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<FormControl sx={styles.formControl}>
								<RadioGroup
									defaultValue={defaultValue}
									name={name}
									onChange={handleChange}
								>
									{options?.map((option) => (
										<FormControlLabel
											key={option?.id}
											value={option?.id}
											control={<Radio />}
											checked={String(checkedValue) === String(option?.id)}
											sx={styles.box}
											label={
												<Stack direction={'column'} gap={1}>
													<Typography variant='body1'>
														{option?.displayText}
													</Typography>

													{option?.subtext && (
														<Typography variant='body2'>
															{option?.subtext}
														</Typography>
													)}
												</Stack>
											}
										/>
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
