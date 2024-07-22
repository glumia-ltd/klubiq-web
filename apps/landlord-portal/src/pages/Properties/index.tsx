import { useEffect, useRef, useState } from 'react';
import {
	Grid,
	Button,
	Paper,
	IconButton,
	InputBase,
	Typography,
} from '@mui/material';
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

	useEffect(() => {
		if (inputRef.current) {
			const inputElement: HTMLInputElement | null =
				inputRef.current.querySelector('.MuiInputBase-input');

			inputElement && inputElement.focus();
		}
	}, []);

	return (
		<ViewPort>
			{/* <Grid sx={styles.container}>
				<Grid sx={styles.buttons}>
					<div onClick={toggleLayout}>
						{layout === 'column' ? <FormatListBulletedIcon /> : <GridOnIcon />}
					</div>
					<Button
						variant='contained'
						sx={styles.addPropertyButton}
						onClick={handleAddProperties}
					>
						<LeftArrowIcon />
						Add New Property
					</Button>
				</Grid>

				<Grid>
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

				<Grid sx={styles.filterContainer}>
					<Filter
						filterList={filterOptions}
						getFilterResult={(options) => setFilter(options)}
					/>
				</Grid>

				{filterObjectHasProperties ? (
					<Typography sx={styles.filterResultText}>
						<span style={styles.filterResultNumber}>
							{filteredProperties.length}
						</span>{' '}
						{`Result${filteredProperties.length > 1 ? 's' : ''}`} Found
					</Typography>
				) : null}

				<Grid container spacing={1.5} mt={3} pl={0.5}>
					{(filterObjectHasProperties ? filteredProperties : allProperties).map(
						(property, index) => (
							<Grid
								item
								xs={12}
								sm={layout === 'row' ? 12 : 6}
								md={layout === 'row' ? 12 : 4}
								key={index}
							>
								<PropertyCard {...property} layout={layout} />
							</Grid>
						),
					)}
				</Grid>
			</Grid> */}

			<Maintenance />
		</ViewPort>
	);
};

export default Properties;
