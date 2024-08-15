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
import Filter from '../../components/Filter/Filter';
import { LeftArrowIcon } from '../../components/Icons/LeftArrowIcon';
import { styles } from './styles';
import FormLayout from '../../Layouts/FormLayout';
import { data, filterOptions } from './data';
import { useNavigate } from 'react-router-dom';
import Maintenance from '../../components/SingleUnitForms/Maintenance/MaintenanceForm';
import AddUnit from '../../components/MultiUnitForms/AddUnit/AddUnit';
import { api } from '../../api';
import { propertiesEndpoints } from '../../helpers/endpoints';

type PropertyType = {
	title: string;
	address: string;
	bedrooms: number;
	bathrooms: number;
	sqm: number;
	type: string;
	status: string;
	image: string;
	propertyType: string;
	unitType: string;
	purpose: string;
}[];

const Properties = () => {
	const [layout, setLayout] = useState<'row' | 'column'>('column');
	const [allProperties, setAllProperties] = useState<PropertyType>(data);
	const [filter, setFilter] = useState<Record<string, string | string[]>>({});
	const [searchText, setSearchText] = useState('');
	const navigate = useNavigate();

	const purpose = filter?.Purpose;
	const unitType = filter['Unit type'];
	const propertyType = filter['Property Type'];

	const filterObjectHasProperties = Object.keys(filter).length > 0;

	const filteredProperties = allProperties
		.filter((property) => {
			if (purpose) {
				return property.purpose === purpose;
			} else {
				return property;
			}
		})
		.filter((property) => {
			if (unitType) {
				return property.unitType === unitType;
			} else {
				return property;
			}
		})
		.filter((property) => {
			if (propertyType) {
				return property.propertyType === propertyType;
			} else {
				return property;
			}
		});

	const inputRef = useRef<HTMLElement>(null);

	const toggleLayout = () => {
		setLayout((prevLayout) => (prevLayout === 'row' ? 'column' : 'row'));
	};

	const handleAddProperties = () => {
		navigate('/properties/property-category');
	};

	const getAllProperties = async () => {
		try {
			const {
				data: { data },
			} = await api.get(propertiesEndpoints.getProperties());

			console.log(data);
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
		getAllProperties();
	}, []);

	return (
		<ViewPort>
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
								getFilterResult={(options) => setFilter(options)}
							/>
						</Grid>
						<Grid xs={12}>
							{filterObjectHasProperties ? (
								<Typography sx={styles.filterResultText}>
									<span style={styles.filterResultNumber}>
										{filteredProperties.length}
									</span>{' '}
									{`Result${filteredProperties.length > 1 ? 's' : ''}`} Found
								</Typography>
							) : null}
						</Grid>

						<Grid container spacing={3}>
							{(filterObjectHasProperties
								? filteredProperties
								: allProperties
							).map((property, index) => (
								<Grid
									xs={12}
									sm={layout === 'row' ? 12 : 6}
									md={layout === 'row' ? 12 : 4}
									lg={layout === 'row' ? 12 : 3}
									key={index}
								>
									<PropertyCard {...property} layout={layout} />
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</ViewPort>
	);
};

export default Properties;
