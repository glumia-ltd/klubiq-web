import { Card, Typography, Grid } from '@mui/material';
import {
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import styles from './Style';

type RadioOption = {
	value: string;
	label: string;
	subtext?: string;
};

type Props = {
	options: RadioOption[];
	defaultValue?: string;
	headerText?: string;
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement>,
		value: string,
	) => void;
};

const index = ({ options, defaultValue, headerText, onChange }: Props) => {
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
							<RadioGroup defaultValue={defaultValue} onChange={onChange}>
								{options.map((option, index) => (
									<Grid container item xs={12} key={index} sx={styles.box}>
										<FormControlLabel
											value={option.value}
											control={<Radio />}
											label={option.label}
											sx={styles.radioLabel}
										/>
										<Typography variant='body2' sx={styles.subText}>
											{option?.subtext}
										</Typography>
									</Grid>
								))}
							</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
};

export default index;
