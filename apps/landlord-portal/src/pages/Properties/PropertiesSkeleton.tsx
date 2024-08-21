import { useState } from 'react';

import {
	Stack,
	Box,
	Button,
	Paper,
	IconButton,
	InputBase,
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';

import SearchIcon from '@mui/icons-material/Search';

import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { styles } from './styles';

import PropertiesCardSkeleton from './PropertiesCardSkeleton';

import { FilterSkeleton } from './FilterSkeleton';
import { Container } from '@mui/system';

export const PropertiesSkeleton = () => {
	const [layout] = useState<'row' | 'column'>('column');

	return (
		<Container maxWidth={'xl'} sx={styles.container}>
			<Grid container rowSpacing={2}>
				<Grid
					xs={12}
					display='flex'
					justifyContent={{
						xs: 'flex-start',
						md: 'flex-end',
					}}
					alignItems={'center'}
				>
					<Stack
						sx={{
							cursor: 'pointer',
							pointerEvents: 'auto',
						}}
						direction={'row'}
						spacing={2}
						alignItems={'center'}
					>
						<Button variant='contained' sx={styles.addPropertyButton}>
							<LeftArrowIcon />
							Add New Property
						</Button>
					</Stack>
				</Grid>

				<Grid xs={12} container rowSpacing={1}>
					<Grid xs={12}>
						<Paper component='form' sx={styles.inputStyle}>
							<IconButton aria-label='search'>
								<SearchIcon />
							</IconButton>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder='Search Properties'
								inputProps={{ 'aria-label': 'search properties' }}
							/>
						</Paper>
					</Grid>

					<Grid xs={12}>
						<Stack
							direction='row'
							useFlexGap
							flexWrap='wrap'
							spacing={{ xs: 1, sm: 2 }}
							alignItems={{ xs: 'flex-start', sm: 'center' }}
							justifyContent={'flex-start'}
							sx={styles.filterSkeletonContainer}
						>
							{[1, 2, 3, 4, 5].map((filter) => (
								<FilterSkeleton key={filter} />
							))}
						</Stack>
					</Grid>
					<Grid xs={12} mb={3}></Grid>

					<Grid xs={12} container spacing={3}>
						{[1, 2, 3, 4, 5]?.map((index) => (
							<Grid
								xs={12}
								sm={layout === 'row' ? 12 : 6}
								md={layout === 'row' ? 12 : 4}
								lg={layout === 'row' ? 12 : 4}
								xl={layout === 'row' ? 12 : 3}
								key={index}
							>
								<PropertiesCardSkeleton layout={layout} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};
