import { Button, Container, Grid, Typography } from '@mui/material';
import { FC, ReactElement, useState } from 'react';
import styles from './AddPropertiesStyle';
import leftArrow from '../../assets/images/arrow-left.svg';
import { CustomStepper } from '../../components/CustomStepper';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { RightArrowIcon } from '../../components/Icons/RightArrowIcon';
import { useNavigate } from 'react-router-dom';

import {
	HomeIcon,
	PropertyDetailsIcon,
	UnitTypeIcon,
} from '../../components/Icons/CustomIcons';

interface RouteObjectType {
	'Property Category': { label: string; icon: React.ReactNode };
	'Property Details': { label: string; icon: React.ReactNode };
	'Unit Type': { label: string; icon: React.ReactNode };
	[key: string]: { label: string; icon: React.ReactNode };
}

const routeObject: RouteObjectType = {
	'Property Category': {
		label: 'property-category',
		icon: <HomeIcon />,
	},
	'Property Details': {
		label: 'property-details',
		icon: <PropertyDetailsIcon />,
	},
	'Unit Type': { label: 'unit-type', icon: <UnitTypeIcon /> },
};

const steps = Object.keys(routeObject);

export const AddPropertiesLayout: FC<{ children: ReactElement }> = ({
	children,
}) => {
	const [activeStep, setActiveStep] = useState(0);
	const navigate = useNavigate();

	const navigateToStep = (step: number) => {
		const routeKey = steps[step];

		if (!routeKey) return;

		const route = routeObject[routeKey]?.label;

		navigate(route as string);
	};

	const handleForwardButton = () => {
		if (activeStep > steps.length) return;

		setActiveStep((prev) => prev + 1);

		navigateToStep(activeStep + 1);
	};

	const handleBackwardButton = () => {
		if (activeStep === 0) return;
		setActiveStep((prev) => prev - 1);
		navigateToStep(activeStep - 1);
	};

	return (
		<Container sx={styles.containerStyle}>
			<>
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
						<CustomStepper active={activeStep} routes={routeObject} />
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
						disabled={activeStep === steps.length - 1}
					>
						<Typography>Next</Typography>
						<RightArrowIcon />
					</Button>
				</Grid>
			</>
		</Container>
	);
};
