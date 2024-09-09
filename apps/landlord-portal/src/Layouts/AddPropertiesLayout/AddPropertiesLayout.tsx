import { Button, Container, Grid, Typography } from '@mui/material';
import { FC, ReactElement, useState } from 'react';
import styles from './AddPropertiesStyle';
import { CustomStepper } from '../../components/CustomStepper';
import { ArrowLeftIcon } from '../../components/Icons/CustomIcons';
import { RightArrowIcon } from '../../components/Icons/RightArrowIcon';
import { useNavigate } from 'react-router-dom';
import { RouteObjectType } from '../../shared/type';

import {
	HomeIcon,
	PropertyDetailsIcon,
	UnitTypeIcon,
} from '../../components/Icons/CustomIcons';

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

	const handleAllPropertiesClick = () => {
		navigate('/properties');
	};

	return (
		<Container sx={styles.containerStyle}>
			<>
				<Grid container>
					<Grid container sx={styles.addPropertiesContainer}>
						<Grid
							item
							sx={styles.addPropertiesContent}
							onClick={handleAllPropertiesClick}
						>
							<ArrowLeftIcon sx={styles.addPropertiesImage} />
							<Typography sx={styles.addPropertiesText} fontWeight={600}>
								All properties
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
						<ArrowLeftIcon />
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
