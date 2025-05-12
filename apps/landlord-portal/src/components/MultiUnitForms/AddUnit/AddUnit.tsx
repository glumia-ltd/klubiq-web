import FormLayout from '../../../Layouts/FormLayout';
import { useState, useEffect } from 'react';
import {
	Grid,
	Typography,
	FormControlLabel,
	Checkbox,
	Button,
	IconButton,
	Skeleton,
	Box,
} from '@mui/material';
import style from './style';
import ControlledTextField from '../../ControlledComponents/ControlledTextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import cloneIcon from '../../../assets/images/Vector.svg';
import ControlledNumberField from '../../ControlledComponents/ControlledNumberField';
import { consoleLog } from '../../../helpers/debug-logger';

const AddUnit = () => {
	const [loading, setLoading] = useState<boolean>(true);

	const validationSchema = yup.object({
		bed: yup.string().required('This field is required'),
		bath: yup.string().required('This field is required'),
		floor: yup.string().required('This field is required'),
		guestBath: yup.string().required('This field is required'),
		amenities: yup.array().of(yup.string()),
	});

	type formValues = {
		bed: number;
		unit: string;
		bath: number;
		floor: number;
		guestBath: number;
		amenities: string[];
	};

	const onSubmit = async (values: formValues) => {
		consoleLog(values, 'val');
	};

	const formik = useFormik({
		initialValues: {
			bed: 9,
			unit: '',
			bath: 8,
			floor: 7,
			guestBath: 8,
			amenities: [],
		},
		validationSchema,
		onSubmit,
	});
	const amenitiesOptions = [
		'A/C',
		'Furnished',
		'Pool',
		'Wheel chair access',
		'Pets allowed',
		'Balcony/Desk',
	];
	useEffect(() => {
		setTimeout(() => setLoading(false), 20000);
	}, []);
	return (
		<FormLayout Header='ADD UNIT' sx={style.card}>
			{loading ? (
				<Grid container spacing={1} sx={style.content}>
					<Grid item xs={12}>
						<Skeleton variant='text' height={25} width='45%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={6} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={6} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={6} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='50%' />

						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>
					<Grid item xs={6} sx={style.skeleton}>
						<Skeleton variant='text' height={20} width='50%' />
						<Skeleton variant='rectangular' height={30} width='100%' />
					</Grid>{' '}
					<Grid item xs={12}>
						<Skeleton variant='text' height={10} width='100%' />
					</Grid>
					<Grid item xs={6} sx={style.boxTwo}>
						<Box sx={style.boxThree}>
							<Skeleton variant='rectangular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='40px' />
						</Box>
						<Box sx={style.boxThree}>
							<Skeleton variant='rectangular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='40px' />
						</Box>
						<Box sx={style.boxThree}>
							<Skeleton variant='rectangular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='40px' />
						</Box>
					</Grid>
					<Grid item xs={6} />
					<Grid item xs={6} sx={style.boxOne}>
						<Box sx={style.boxThree}>
							<Skeleton variant='rectangular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='160px' />
						</Box>
						<Box sx={style.boxThree}>
							<Skeleton variant='rectangular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='45px' />
						</Box>
					</Grid>
					<Grid item xs={6} />
					<Grid item xs={6} sx={style.boxOne}>
						<Box sx={style.boxThree}>
							<Skeleton variant='rectangular' height={'20px'} width='20px' />
							<Skeleton variant='rectangular' height={10} width='160px' />
						</Box>
					</Grid>
					<Grid item xs={12} sx={style.buttonGrid}>
						<Skeleton variant='rectangular' height={40} width='180px' />

						<Skeleton variant='rectangular' height={40} width='180px' />
					</Grid>
					<Grid item xs={12}>
						<Skeleton variant='text' />
					</Grid>
				</Grid>
			) : (
				<Grid
					container
					spacing={1}
					sx={style.content}
					component='form'
					onSubmit={formik.handleSubmit}
				>
					<Grid item xs={12}>
						<ControlledTextField
							name='unitName'
							label='Unit Number/Name'
							formik={formik}
							type='number'
						/>
					</Grid>
					<Grid item xs={6}>
						<ControlledNumberField
							name='bed'
							label='Bedroom'
							formik={formik}
							type='number'
						/>
					</Grid>{' '}
					<Grid item xs={6}>
						<ControlledNumberField
							name='bath'
							label='Bathroom'
							formik={formik}
							type='number'
						/>
					</Grid>{' '}
					<Grid item xs={6}>
						<ControlledNumberField
							name='guestBath'
							label='Guest Bathroom'
							formik={formik}
							type='number'
						/>
					</Grid>
					<Grid item xs={6}>
						<ControlledNumberField
							name='plan'
							label='Floor Plan'
							formik={formik}
							type='text'
						/>
					</Grid>{' '}
					<Grid item xs={9}>
						<Typography variant='subtitle1'>Amenities</Typography>
						{amenitiesOptions.map((amenity) => (
							<FormControlLabel
								key={amenity}
								control={
									<Checkbox
										name='amenities'
										value={amenity}
										// checked={
										// 	formik.values.units[currentUnitIndex]?.amenities.includes(amenity) || false
										//   }
										onChange={formik.handleChange}
									/>
								}
								label={amenity}
							/>
						))}{' '}
					</Grid>
					<Grid item xs={12} sx={style.buttonGrid}>
						<Button variant='klubiqTextButton'>Cancel </Button>
						<Button type='submit' variant='klubiqMainButton'>
							Add Unit{' '}
						</Button>
					</Grid>
					<Grid item xs={12}>
						<IconButton sx={style.cloneButton}>
							<img src={cloneIcon} alt='icon' style={{ marginRight: '5px' }} />
							<Typography sx={style.cloneText}>
								{' '}
								Copy details and Add New Unit
							</Typography>
						</IconButton>
					</Grid>
				</Grid>
			)}
		</FormLayout>
	);
};

export default AddUnit;
