import { Card, Stack, Chip, Typography, Divider } from '@mui/material';
import { styles } from './style';
import bukky from '../../assets/images/bukky.png';
import * as KlubiqIcons from '../Icons/CustomIcons';
import { FC } from 'react';

type LeasePropertyCardType = {
	propertyName: string;
	isMultiUnitProperty: boolean;
	propertyAddress: string;
	propertyType: string;
	tenants?: any[];
};

const LeasePropertyCard: FC<LeasePropertyCardType> = ({
	propertyName,
	isMultiUnitProperty,
	propertyAddress,
	propertyType,
}) => {
	return (
		<Stack spacing='2' width='100%'>
			<Card sx={styles.container}>
				<Stack
					spacing={2}
					direction='row'
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Stack spacing={2} direction={'column'}>
						<Stack direction={'row'} spacing={{ xs: 1, sm: 2, md: 1 }}>
							<Chip
								label={propertyType}
								color={'primary'}
								variant='outlined'
								sx={styles.chip}
							/>
						</Stack>
						<Stack
							direction='row'
							divider={<Divider orientation='vertical' flexItem />}
							spacing={2.5}
						>
							<Typography sx={styles.typoText}>{propertyName}</Typography>
							<Typography sx={styles.typoText}>
								{isMultiUnitProperty ? 'Multi Unit' : 'Single Unit'}
							</Typography>
						</Stack>{' '}
						<Stack direction={'row'} sx={styles.addressDiv}>
							<KlubiqIcons.Place
								sx={{
									color: 'text.primary',
								}}
							/>
							<Typography>{propertyAddress}</Typography>
						</Stack>
					</Stack>
					<Stack
						direction={'column'}
						spacing={{ xs: 1, sm: 2, md: 2 }}
						sx={styles.addressDiv}
					>
						<img
							src={bukky}
							alt='tenant picture'
							width={'64px'}
							height={'64px'}
						/>
						<Typography sx={styles.nameText}>TODO</Typography>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
};

export default LeasePropertyCard;
