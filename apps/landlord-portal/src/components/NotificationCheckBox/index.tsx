import React from 'react';
import {
	Box,
	Checkbox,
	Divider,
	TextField,
	Typography,
	Stack,
} from '@mui/material';
import { styles } from './style';

type NotificationSectionProps = {
	title: string;
	description?: string;
	options: Array<{
		label: string;
		inApp: boolean;
		email: boolean;
		configurableDays?: boolean;
		days?: number;
	}>;
};

const NotificationCheckbox: React.FC<NotificationSectionProps> = ({
	title,
	description,
	options,
}) => {
	return (
		<Box mb={4}>
			<Typography variant='h6' gutterBottom sx={styles.headerText}>
				{title}
			</Typography>
			{description && (
				<Typography variant='body2' sx={styles.subHeaderText} gutterBottom>
					{description}
				</Typography>
			)}
			{options.map((option, index) => (
				<Box key={index} mb={2}>
					<Stack direction='row' alignItems='center' spacing={2}>
						<Box flex={1}>
							<Typography sx={styles.subHeaderText} variant='body2'>
								{option.label}
							</Typography>
							{option.configurableDays && (
								<Box mt={1}>
									<Typography variant='body2' sx={styles.subHeaderText}>
										We'll notify you when {option.label.toLowerCase()} is due
										in:
									</Typography>
									<TextField
										size='small'
										type='number'
										// value={option.days || ''}
										InputProps={{ inputProps: { min: 0 } }}
										sx={{ width: 100, ml: 2 }}
									/>
								</Box>
							)}
						</Box>
						{/* <FormGroup> */}

						<Checkbox

						//  checked={option.inApp}
						/>
						<Checkbox
						// checked={option.email}
						/>
						{/* </FormGroup> */}
					</Stack>
				</Box>
			))}
			<Divider />
		</Box>
	);
};

export default NotificationCheckbox;
