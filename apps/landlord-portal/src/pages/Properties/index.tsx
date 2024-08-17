import { useEffect, useRef, useState } from 'react';

import {
	Stack,
	Box,
	Button,
	Paper,
	IconButton,
	InputBase,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridOnIcon from '@mui/icons-material/GridOn';
import SearchIcon from '@mui/icons-material/Search';
import PropertyCard from '../../components/PropertyCard';
import ViewPort from '../../components/Viewport/ViewPort';
import Filter, { OptionsType } from '../../components/Filter/Filter';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { styles } from './styles';
import { data, filterOptions as initialFilterOptions } from './data';
import { useNavigate } from 'react-router-dom';
import Maintenance from '../../components/SingleUnitForms/Maintenance/MaintenanceForm';
import AddUnit from '../../components/MultiUnitForms/AddUnit/AddUnit';
import { api } from '../../api';
import { propertiesEndpoints } from '../../helpers/endpoints';
import PropertiesSkeleton from './PropertiesSkeleton';
import { PropertyDataType } from '../../type';

const DEFAULT_PARAMS = { page: 1, take: 10, sortBy: 'name' };

const Properties = () => {
	const [layout, setLayout] = useState<'row' | 'column'>('column');
	const [allProperties, setAllProperties] = useState<PropertyDataType[] | null>(
		null,
	);
	const [filter, setFilter] = useState<Record<string, string | number>>({});
	const [updateFilter, setUpdateFilter] = useState(false);
	const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
	const [searchText, setSearchText] = useState('');
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(true);

	const filterObjectHasProperties = Object.keys(filter).length > 0;

	const filterLength = Object.keys(filter).length || 0;

	const inputRef = useRef<HTMLElement>(null);

	console.log(allProperties);

	const toggleLayout = () => {
		setLayout((prevLayout) => (prevLayout === 'row' ? 'column' : 'row'));
	};

	const handleAddProperties = () => {
		navigate('/properties/property-category');
	};

	const getAllProperties = async () => {
		try {
			const {
				data: {
					data: { pageData },
				},
			} = await api.get(propertiesEndpoints.getProperties(), {
				params: { ...filter, ...DEFAULT_PARAMS },
			});

			setAllProperties(pageData);

			console.log(data);
		} catch (e) {
			console.log(e);
		}
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
		setTimeout(() => setLoading(false), 1000);
	}, []);

	useEffect(() => {
		getAllProperties();
	}, [updateFilter]);

	useEffect(() => {
		getPropertiesMetaData();
	}, []);

	return (
		<ViewPort>
			{loading ? (
				<PropertiesSkeleton />
			) : (
				<Box>
					<Grid container rowSpacing={2} sx={styles.container}>
						<Grid
							xs
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
								<div onClick={toggleLayout}>
									{layout === 'column' ? (
										<FormatListBulletedIcon />
									) : (
										<GridOnIcon />
									)}
								</div>
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

						<Grid container rowSpacing={0.5}>
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
								<Filter
									filterList={filterOptions}
									getFilterResult={(options) => {
										setFilter(options);
										setUpdateFilter((prev) => !prev);
									}}
								/>
							</Grid>
							<Grid xs={12}>
								{filterObjectHasProperties ? (
									<Typography sx={styles.filterResultText}>
										<span style={styles.filterResultNumber}>
											{allProperties?.length}
										</span>{' '}
										{`Result${allProperties && allProperties?.length > 1 ? 's' : ''}`}{' '}
										Found
									</Typography>
								) : null}
							</Grid>

							<Grid container spacing={3}>
								{allProperties?.map((property, index) => (
									<Grid
										xs={12}
										sm={layout === 'row' ? 12 : 6}
										md={layout === 'row' ? 12 : 4}
										lg={layout === 'row' ? 12 : 4}
										xl={layout === 'row' ? 12 : 3}
										key={index}
									>
										<PropertyCard propertyData={property} layout={layout} />
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
				</Box>
			)}
		</ViewPort>
	);
};

export default Properties;
