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

import { data, filterOptions } from './data';

const Properties = () => {
	const [layout, setLayout] = useState<'row' | 'column'>('column');

	const inputRef = useRef<HTMLElement>(null);

	const toggleLayout = () => {
		setLayout((prevLayout) => (prevLayout === 'row' ? 'column' : 'row'));
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
			<Grid sx={styles.container}>
				<Grid sx={styles.buttons}>
					<div onClick={toggleLayout}>
						{layout === 'column' ? <FormatListBulletedIcon /> : <GridOnIcon />}
					</div>
					<Button variant='contained' sx={styles.addPropertyButton}>
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
						/>
					</Paper>
				</Grid>

				<Grid sx={styles.filterContainer}>
					<Filter
						filterList={filterOptions}
						getFilterResult={(options) => console.log(options)}
					/>
				</Grid>

				<Typography sx={styles.filterResultText}>
					<span style={styles.filterResultNumber}>700</span> {`Result`} Found
				</Typography>

				<Grid container spacing={1}>
					{data.map((property, index) => (
						<Grid
							item
							xs={12}
							sm={layout === 'row' ? 12 : 6}
							md={layout === 'row' ? 12 : 4}
							key={index}
						>
							<PropertyCard {...property} layout={layout} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</ViewPort>
	);
};

export default Properties;
