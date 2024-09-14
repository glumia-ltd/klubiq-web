import { Button, Container, Grid, Typography } from '@mui/material';
import { FC, ReactElement, useEffect, useState } from 'react';
import styles from './AddPropertiesStyle';
import { CustomStepper } from '../../components/CustomStepper';
import { ArrowLeftIcon } from '../../components/Icons/CustomIcons';
import { RightArrowIcon } from '../../components/Icons/RightArrowIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import { RouteObjectType } from '../../shared/type';

import {
	HomeIcon,
	PropertyDetailsIcon,
	UnitTypeIcon,
} from '../../components/Icons/CustomIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getAddPropertyState } from '../../store/AddPropertyStore/AddPropertySlice';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';

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

const STEPPERPATHS: Record<string, number> = {
	'property-category': 0,
	'property-details': 1,
	'unit-type': 2,
};

export const AddPropertiesLayout: FC<{ children: ReactElement }> = ({
	children,
}) => {
	const [activeStep, setActiveStep] = useState(0);
	const formState = useSelector(getAddPropertyState);

	const { categoryId, typeId, name } = formState;

	const navigate = useNavigate();

	const location = useLocation();

	const dispatch = useDispatch();

	const currentLocation = location.pathname.split('/')[2] || '';

	const handleBeforeUnload = (event: BeforeUnloadEvent) => {
		// event.preventDefault();
		// event.returnValue = '';
		// dispatch(
		// 	openSnackbar({
		// 		message: 'Are you sure you want to leave this page?',
		// 		severity: 'info',
		// 		isOpen: true,
		// 	}),
		// );
		// window.alert('Are you sure you want to leave this page???');
	};

	useEffect(() => {
		const activeStepByPathName = STEPPERPATHS[currentLocation] || 0;

		setActiveStep(activeStepByPathName);
	}, [currentLocation]);

	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	const navigateToStep = (step: number) => {
		const routeKey = steps[step];

		if (!routeKey) return;

		const route = routeObject[routeKey]?.label;

		navigate(route as string);
	};

	const handleForwardButton = () => {
		if (activeStep > steps.length) return;

		if (location.pathname.includes('property-category') && !categoryId) {
			dispatch(
				openSnackbar({
					message: 'Please select a property category before you proceed!',
					severity: 'info',
					isOpen: true,
				}),
			);

			return;
		} else if (
			location.pathname.includes('property-details') &&
			!typeId &&
			!name
		) {
			dispatch(
				openSnackbar({
					message:
						'Please ensure all the fields are properly filled before you proceed!',
					severity: 'info',
					isOpen: true,
				}),
			);

			return;
		}
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
					{!(activeStep === steps.length - 1) && (
						<>
							<Button
								variant='contained'
								sx={styles.directionButton}
								onClick={handleForwardButton}
								disabled={activeStep === steps.length - 1}
							>
								<Typography>Next</Typography>
								<RightArrowIcon />
							</Button>
						</>
					)}

					{activeStep === steps.length - 1 && (
						<Button
							variant='contained'
							sx={styles.directionButton}
							// onClick={handleForwardButton}
							// disabled={activeStep === steps.length - 1}
						>
							<Typography>Save</Typography>
						</Button>
					)}
				</Grid>
			</>
		</Container>
	);
};
