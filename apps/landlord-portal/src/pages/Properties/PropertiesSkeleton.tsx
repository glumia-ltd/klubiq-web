import { Button, Grid, IconButton, InputBase, Paper } from '@mui/material';
import { Box, Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { styles } from './styles';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { FilterSkeleton } from './FilterSkeleton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridOnIcon from '@mui/icons-material/GridOn';
import PropertiesCardSkeleton from './PropertiesCardSkeleton';
import { FC } from 'react';

export const PropertiesSkeleton: FC<{ layout: 'row' | 'column' }> = ({
	layout,
}) => {
	return (
		<Box>
			<Grid container rowSpacing={2} sx={styles.container}>
				<Grid
					mt={2}
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
						{
							<div>
								{layout === 'column' ? (
									<FormatListBulletedIcon />
								) : (
									<GridOnIcon />
								)}
							</div>
						}
						<Button variant='contained' sx={styles.addPropertyButton}>
							<LeftArrowIcon />
							Add New Property
						</Button>
					</Stack>
				</Grid>

				<Grid xs={12} container rowSpacing={1} mt={2}>
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

					<Grid mt={3} xs={12} display={'flex'} gap={1}>
						<FilterSkeleton />
						<FilterSkeleton />
						<FilterSkeleton />
						<FilterSkeleton />
						<FilterSkeleton />
					</Grid>

					<Grid
						container
						spacing={3}
						columnGap={3}
						padding={3}
						mt={5}
						sx={{ border: '2px solid green' }}
					>
						{[1, 2, 3, 4, 5]?.map((index) => (
							<Grid
								xs={12}
								sm={layout === 'row' ? 12 : 6}
								md={layout === 'row' ? 12 : 4}
								lg={layout === 'row' ? 12 : 4}
								xl={layout === 'row' ? 12 : 3}
								key={index}
							>
								{<PropertiesCardSkeleton layout={layout} />}
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};
