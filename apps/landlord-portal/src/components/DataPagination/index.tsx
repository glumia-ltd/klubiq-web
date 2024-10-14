import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC, useState } from 'react';

type PaginationType = {
	getCurrentPage?: (value?: any) => void;
};

export const DataPagination: FC<PaginationType> = ({ getCurrentPage }) => {
	const [itemsPerPage, _] = useState(20);

	const handleChange = (value: any) => {
		getCurrentPage && getCurrentPage(value);
	};

	return (
		<Stack
			spacing={2}
			direction={'row'}
			alignItems='center'
			justifyContent='center'
		>
			<Pagination
				count={10}
				shape='rounded'
				variant='outlined'
				showFirstButton
				showLastButton
				onChange={(_, pageNumber) => handleChange(pageNumber)}
			/>

			<Box width='10%'>
				<FormControl fullWidth size='small'>
					<InputLabel id='demo-simple-select-label'>Items per page</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={itemsPerPage}
						label='Properties per page'
						onChange={handleChange}
					>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
						<MenuItem value={30}>30</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</Stack>
	);
};
