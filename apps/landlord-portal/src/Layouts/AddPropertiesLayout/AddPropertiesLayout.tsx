import { Button, Container, Grid, Typography } from '@mui/material';
import { FC, ReactElement, useState } from 'react';
import styles from './AddPropertiesStyle';
import leftArrow from '../../assets/images/arrow-left.svg';
import { CustomStepper } from '../../components/CustomStepper';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { RightArrowIcon } from '../../components/Icons/RightArrowIcon';

const steps = [
	'Property Category',
	'Property Details',
	'Unit Type',
	'Bank Account',
];

export const AddPropertiesLayout: FC<{ children: ReactElement }> = ({
	children,
}) => {
	const [activeStep, setActiveStep] = useState(0);

	const handleForwardButton = () => {
		if (activeStep > steps.length) return;
		setActiveStep((prev) => prev + 1);
	};

	const handleBackwardButton = () => {
		if (activeStep === 0) return;
		setActiveStep((prev) => prev - 1);
	};
	return (
		<Container sx={styles.containerStyle}>
			<Grid container>
				<Grid container sx={styles.addPropertiesContainer}>
					<Grid item sx={styles.addPropertiesContent}>
						<img
							src={leftArrow}
							alt='back arrow'
							style={styles.addPropertiesImage}
						/>
						<Typography sx={styles.addPropertiesText} fontWeight={600}>
							Add properties
						</Typography>
					</Grid>

					<Button variant='text' sx={styles.button}>
						<Typography>Save draft</Typography>
					</Button>
				</Grid>

				<Grid sx={styles.stepperContainer}>
					<CustomStepper active={activeStep} steps={steps} />
				</Grid>
			</Grid>

			{children}

			<Grid sx={styles.buttonContainer}>
				<Button
					variant='text'
					sx={styles.directionButton}
					onClick={handleBackwardButton}
					disabled={activeStep <= 0}
				>
					<LeftArrowIcon />
					<Typography>Previous</Typography>
				</Button>
				<Button
					variant='contained'
					sx={styles.directionButton}
					onClick={handleForwardButton}
					disabled={activeStep === steps.length}
				>
					<Typography>Next</Typography>
					<RightArrowIcon />
				</Button>
			</Grid>
		</Container>
	);
};
