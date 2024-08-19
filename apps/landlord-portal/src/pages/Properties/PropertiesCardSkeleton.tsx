import {
	Skeleton,
	Box,
	Card,
	CardContent,
	Typography,
	Stack,
	CardActions,
} from '@mui/material';

import { FC } from 'react';
import CardStyle from '../../components/PropertyCard/CardStyle';

const PropertiesCardSkeleton: FC<{ layout: 'column' | 'row' }> = ({
	layout,
}) => {
	return layout === 'column' ? (
		<Card sx={CardStyle.cardContainerColumn}>
			<CardContent
				sx={{
					padding: '1.5rem 1rem',
				}}
			>
				<Typography variant='cardHeader' noWrap={true}>
					<Skeleton width={'50%'} height={15} />
				</Typography>
				<Skeleton width={'100%'} height={300} />
				<Stack direction='row' spacing={2} justifyContent='space-between'>
					<Typography variant='cardTitle' noWrap={true}>
						<Skeleton width={'100%'} height={15} variant='rectangular' />
					</Typography>
					<Skeleton
						width={'15%'}
						height={25}
						variant='rectangular'
						sx={{ borderRadius: '10px' }}
					/>
				</Stack>
				<Stack
					direction='row'
					spacing={1}
					justifyContent='flex-start'
					alignItems='center'
				>
					<Typography variant='cardContentText' noWrap={true}>
						<Skeleton width='50%' height={15} />
					</Typography>
				</Stack>
				<Stack
					sx={{
						paddingTop: '0.5rem',
					}}
					direction='row'
					spacing={1}
					justifyContent='flex-start'
					alignItems='center'
				>
					<Skeleton width='50%' />
				</Stack>
				{
					<Stack
						sx={{
							paddingTop: '0.5rem',
						}}
						direction='row'
						spacing={1}
						justifyContent='flex-start'
						alignItems='center'
					>
						<Skeleton width='50%' />
					</Stack>
				}
				<Stack
					sx={{
						paddingTop: '1rem',
					}}
					direction='row'
					spacing={1}
				>
					<Skeleton width='50%' />
				</Stack>
			</CardContent>
			<Box pl={2} pr={2}>
				<hr></hr>
			</Box>

			<CardActions
				sx={{
					paddingTop: '2rem',
					paddingBottom: '2rem',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
				disableSpacing
			>
				<Typography variant='link'>View Properties</Typography>
			</CardActions>
		</Card>
	) : (
		<Card sx={CardStyle.cardContainerRow}>
			<Stack
				sx={{
					padding: '1rem',
				}}
				spacing={1}
			>
				<Typography variant='cardHeader'>
					<Skeleton width={'10%'} height={15} />
				</Typography>
				<Stack direction='row' spacing={2}>
					<Box width={'160px'} height={'100px'}>
						<Skeleton width={'100%'} height={100} />
					</Box>
					<Stack pt={1} width={'100%'} spacing={1.5}>
						<Stack direction='row' spacing={1} justifyContent='space-between'>
							<Skeleton width={'50%'} height={15} />
							<Skeleton
								width={'5%'}
								height={25}
								variant='rectangular'
								sx={{ borderRadius: '10px' }}
							/>
						</Stack>
						<Stack
							direction='row'
							justifyContent='flex-start'
							alignItems='center'
						>
							<Typography variant='cardContentText'>
								<Skeleton width='50%' height={15} />
							</Typography>
						</Stack>
						<Stack
							direction='row'
							spacing={1}
							justifyContent='flex-start'
							alignItems='center'
						>
							<Skeleton width='30%' />
						</Stack>
						<Stack direction='row' spacing={1} justifyContent='space-between'>
							<Skeleton width='10%' />
							<Typography variant='link'>View Properties</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Card>
	);
};

export default PropertiesCardSkeleton;
