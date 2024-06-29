import { Button, Container, Grid, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import styles from './AddPropertiesStyle';
import leftArrow from '../../assets/images/arrow-left.svg';

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
			</Grid>
			{children}
		</Container>
	);
};
