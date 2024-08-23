import { Key, useEffect, useRef, useState } from 'react';

import {
	Stack,
	Button,
	Paper,
	IconButton,
	InputBase,
	Typography,
	Skeleton,
	Container,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Unstable_Grid2';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridOnIcon from '@mui/icons-material/GridOn';
import SearchIcon from '@mui/icons-material/Search';
import PropertyCard from '../../components/PropertyCard';
import Filter from '../../components/Filter/Filter';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { styles } from './styles';
import { filterOptions as initialFilterOptions } from './data';
import { useNavigate } from 'react-router-dom';
// import Maintenance from '../../components/SingleUnitForms/Maintenance/MaintenanceForm';
// import AddUnit from '../../components/MultiUnitForms/AddUnit/AddUnit';
import { api } from '../../api';
import { propertiesEndpoints } from '../../helpers/endpoints';
import PropertiesCardSkeleton from './PropertiesCardSkeleton';
import { PropertyDataType } from '../../shared/type';
import { PropertiesSkeleton } from './PropertiesSkeleton';
import { useGetPropertiesQuery } from '../../store/apiSlice';

const DEFAULT_PARAMS = { page: 1, take: 10, sortBy: 'name' };

const Properties = () => {
	const isMobile = useMediaQuery('(max-width: 500px)');
	const [layout, setLayout] = useState<'row' | 'column'>('column');
	const [filter, setFilter] = useState<Record<string, string | number>>({});
	const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
	const [searchText, setSearchText] = useState('');
	const navigate = useNavigate();

	const { data, isLoading, isFetching } = useGetPropertiesQuery({
		...filter,
		...DEFAULT_PARAMS,
	});

	const allProperties = data?.pageData;

	const filterObjectLength = Object.keys(filter).length;

	const filterObjectHasProperties = filterObjectLength > 0;
	const filterObjectHasOnlyOrderProperty =
		filterObjectHasProperties &&
		Object.keys(filter).includes('order') &&
		filterObjectLength === 1;

	const showFilterResultOnlyWhenFiltered =
		filterObjectHasProperties && !filterObjectHasOnlyOrderProperty;

	const allPropertiesLength = Boolean(allProperties?.length);

	const inputRef = useRef<HTMLElement>(null);

	const toggleLayout = () => {
		setLayout((prevLayout) => (prevLayout === 'row' ? 'column' : 'row'));
	};

	const handleAddProperties = () => {
		navigate('/properties/property-category');
	};

	const getPropertiesMetaData = async () => {
		try {
			const {
				data: { data },
			} = await api.get(propertiesEndpoints.getPropertiesMetaData());

			const { filterOptions } = data;

			setFilterOptions(filterOptions);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			const inputElement: HTMLInputElement | null =
				inputRef.current.querySelector('.MuiInputBase-input');

			inputElement && inputElement.focus();
		}
	}, []);

	useEffect(() => {
		getPropertiesMetaData();
	}, []);

	return (
		<>
			{isLoading ? (
				<PropertiesSkeleton />
			) : (
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
								{allPropertiesLength && !isMobile && (
									<div onClick={toggleLayout}>
										{layout === 'column' ? (
											<FormatListBulletedIcon />
										) : (
											<GridOnIcon />
										)}
									</div>
								)}
								<Button
									variant='contained'
									sx={styles.addPropertyButton}
									onClick={handleAddProperties}
								>
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
										ref={inputRef}
										sx={{ ml: 1, flex: 1 }}
										placeholder='Search Properties'
										inputProps={{ 'aria-label': 'search properties' }}
										value={searchText}
										onChange={(e) => setSearchText(e.target.value)}
									/>
								</Paper>
							</Grid>

							<Grid xs={12}>
								{
									<Filter
										filterList={filterOptions}
										getFilterResult={(options) => {
											setFilter(options);
										}}
										disable={filterObjectLength ? false : !allPropertiesLength}
									/>
								}
							</Grid>
							<Grid xs={12} mb={3}>
								{showFilterResultOnlyWhenFiltered ? (
									isFetching ? (
										<Typography variant='filterResultText'>
											<Typography variant='filterResultNumber'>
												<Skeleton
													variant='rectangular'
													height={40}
													width={'15%'}
													sx={{ borderRadius: '8px' }}
												/>
											</Typography>{' '}
										</Typography>
									) : (
										<Typography variant='filterResultText'>
											<Typography variant='filterResultNumber'>
												{allProperties?.length}
											</Typography>{' '}
											{`Result${allProperties && allProperties?.length > 1 ? 's' : ''}`}{' '}
											Found
										</Typography>
									)
								) : null}
							</Grid>

							<Grid xs={12} container spacing={3}>
								{allProperties?.map(
									(
										property: PropertyDataType,
										index: Key | null | undefined,
									) => (
										<Grid
											xs={12}
											sm={layout === 'row' ? 12 : 6}
											md={layout === 'row' ? 12 : 4}
											lg={layout === 'row' ? 12 : 4}
											xl={layout === 'row' ? 12 : 3}
											key={index}
										>
											{isFetching ? (
												<PropertiesCardSkeleton layout={layout} />
											) : (
												<PropertyCard
													propertyData={property}
													layout={isMobile ? 'column' : layout}
												/>
											)}
										</Grid>
									),
								)}
							</Grid>
						</Grid>
					</Grid>
				</Container>
			)}
		</>
	);
};

export default Properties;
