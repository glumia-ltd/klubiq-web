import {
	Button,
	Container,
	Grid,
	Typography,
	Skeleton,
	Box,
} from '@mui/material';
import { FC, ReactElement, useState, useEffect } from 'react';
import styles from './AddPropertiesStyle';
import leftArrow from '../../assets/images/arrow-left.svg';
import { CustomStepper } from '../../components/CustomStepper';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { RightArrowIcon } from '../../components/Icons/RightArrowIcon';
import { useNavigate } from 'react-router-dom';

interface RouteObjectType {
	'Property Category': string;
	'Property Details': string;
	'Unit Type': string;
	'Bank Account': string;
	//index signature
	[key: string]: string;
}

const routeObject: RouteObjectType = {
	'Property Category': 'property-category',
	'Property Details': 'property-details',
	'Unit Type': 'unit-type',
	'Bank Account': 'bank-account',
};

const steps = Object.keys(routeObject);

export const AddPropertiesLayout: FC<{ children: ReactElement }> = ({
	children,
}) => {
	const [activeStep, setActiveStep] = useState(0);
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(true);

	const navigateToStep = (step: number) => {
		const routeKey = steps[step];

		if (!routeKey) return;

		const route = routeObject[routeKey];

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
	useEffect(() => {
		setTimeout(() => setLoading(false), 20000);
	}, []);

	return (
		<Container sx={styles.containerStyle}>
			{loading ? (
				<Grid container spacing={0}>
					<Grid item xs={12} sx={styles.firstDiv}>
						<Box>
							<Skeleton variant='rectangular' height={10} width='100px' />
						</Box>
						<Box>
							<Skeleton variant='rectangular' sx={styles.buttonBorder} />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box sx={styles.boxThree}>
							<Skeleton variant='circular' height={'60px'} width='60px' />
							<Skeleton variant='rectangular' height={10} width='250px' />
							<Skeleton variant='circular' height={'60px'} width='60px' />
							<Skeleton variant='rectangular' height={10} width='250px' />
							<Skeleton variant='circular' height={'60px'} width='60px' />
							<Skeleton variant='rectangular' height={10} width='250px' />
							<Skeleton variant='circular' height={'60px'} width='60px' />
						</Box>
					</Grid>

					<Grid item xs={12} sx={styles.buttonContainer}>
						<Box>
							<Skeleton variant='rectangular' sx={styles.buttonBorder} />
						</Box>
						<Box>
							<Skeleton variant='rectangular' sx={styles.buttonBorder} />
						</Box>
					</Grid>
				</Grid>
			) : (
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
				</>
			)}
		</Container>
	);
};
