import React from 'react';
import { Dialog, Grid, Typography, Card, Button } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
type Props = {};

const UnitModal = (props: Props) => {
	return (
		<Dialog open={open} onClose={handleClose} maxWidth='sm'>
			<Card sx={{ padding: '25px' }}>
				<Typography variant='h6'>Unit Details</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<ControlledTextField
							name={`units.${currentUnitIndex}.beds`}
							label='Bedrooms'
							type='number'
							formik={formik}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<ControlledTextField
							name={`units.${currentUnitIndex}.baths`}
							label='Bathrooms'
							type='number'
							formik={formik}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<ControlledTextField
							name={`units.${currentUnitIndex}.guestBaths`}
							label='Guest Bathrooms'
							type='number'
							formik={formik}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<ControlledTextField
							name={`units.${currentUnitIndex}.floorPlan`}
							label='Floor Plan'
							formik={formik}
							inputProps={{
								sx: {
									height: '40px',
								},
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>Amenities</Typography>
						{renderAmenities()}
					</Grid>
					<Grid item xs={12}>
						<Button variant='contained' color='primary' onClick={handleClose}>
							Copy details and Add New Unit
						</Button>
					</Grid>
				</Grid>
			</Card>
		</Dialog>
	);
};

export default UnitModal;
