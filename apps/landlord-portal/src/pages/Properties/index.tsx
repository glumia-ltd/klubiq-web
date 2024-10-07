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
import { useNavigate } from 'react-router-dom';
import PropertiesCardSkeleton from './PropertiesCardSkeleton';
import { PropertyDataType } from '../../shared/type';
import { PropertiesSkeleton } from './PropertiesSkeleton';
import {
	useGetPropertiesQuery,
	useGetPropertiesMetaDataQuery,
} from '../../store/PropertyPageStore/propertyApiSlice';
import { useDispatch } from 'react-redux';
import { setCurrentFilter } from '../../store/PropertyPageStore/PropertySlice';

const DEFAULT_PARAMS = { page: 1, take: 20, sortBy: 'name' };

const Properties = () => {
	const isMobile = useMediaQuery('(max-width: 500px)');
	const [layout, setLayout] = useState<'row' | 'column'>('column');
	const [filter, setFilter] = useState<Record<string, string | number>>({});
	const [searchText, setSearchText] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		data: propertyData,
		isLoading: isPropertyLoading,
		isFetching: isPropertyFetching,
	} = useGetPropertiesQuery({
		...filter,
		...DEFAULT_PARAMS,
	});

	const {
		data: metaData,
		// isLoading: isMetaDataLoading,
		// isFetching: isMetaDataFetching,
	} = useGetPropertiesMetaDataQuery();

	const allProperties = propertyData?.pageData;
	const filterOptions = metaData?.filterOptions;

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
		navigate('/properties/create/property-category');
	};

	useEffect(() => {
		if (inputRef.current) {
			const inputElement: HTMLInputElement | null =
				inputRef.current.querySelector('.MuiInputBase-input');

			inputElement && inputElement.focus();
		}
	}, []);

	useEffect(() => {
		const currentFilter = {
			...filter,
			...DEFAULT_PARAMS,
		};
		dispatch(setCurrentFilter({ currentFilter }));
	}, [dispatch, filter]);

	return (
		<>
			{isPropertyLoading ? (
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
									isPropertyFetching ? (
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
											md={layout === 'row' ? 12 : 6}
											lg={layout === 'row' ? 12 : 4}
											xl={layout === 'row' ? 12 : 3}
											key={index}
										>
											{isPropertyFetching ? (
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
