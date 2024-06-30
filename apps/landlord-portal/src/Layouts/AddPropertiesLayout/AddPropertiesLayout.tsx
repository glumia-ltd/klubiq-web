import { Button, Container, Grid, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import styles from './AddPropertiesStyle';
import leftArrow from '../../assets/images/arrow-left.svg';
import { CustomStepper } from '../../components/CustomStepper';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { RightArrowIcon } from '../../components/Icons/RightArrowIcon';

export const AddPropertiesLayout: FC<{ children: ReactElement }> = ({
	children,
}) => {
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
					<CustomStepper />
				</Grid>
			</Grid>

			{children}

			<Grid sx={styles.buttonContainer}>
				<Button variant='text' sx={styles.directionButton}>
					<LeftArrowIcon />
					<Typography>Previous</Typography>
				</Button>
				<Button variant='contained' sx={styles.directionButton}>
					<Typography>Next</Typography>
					<RightArrowIcon />
				</Button>
			</Grid>
		</Container>
	);
};
