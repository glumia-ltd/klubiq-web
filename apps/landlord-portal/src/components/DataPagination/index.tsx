import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC, useState } from 'react';

type PaginationType = {
	getCurrentPage?: (value?: any) => void;
	getItemsPerPageCount?: (value?: any) => void;
	pageCount?: number;
};

export const DataPagination: FC<PaginationType> = ({
	getCurrentPage,
	getItemsPerPageCount,
	pageCount,
}) => {
	// const [itemsPerPage, _] = useState(20);

	const handlePaginationChange = (value: any) => {
		getCurrentPage && getCurrentPage(value);
	};

	const handleItemsPerPageChange = (event: any) => {
		getItemsPerPageCount && getItemsPerPageCount(event.target.value);
	};

	return (
		<Stack
			spacing={2}
			direction={{ xs: 'column', sm: 'row' }}
			alignItems='center'
			justifyContent='center'
		>
			<Pagination
				count={pageCount}
				shape='rounded'
				variant='outlined'
				showFirstButton
				showLastButton
				onChange={(_, pageNumber) => handlePaginationChange(pageNumber)}
			/>

			<Box width={{ xs: '35%', sm: '15%', lg: '10%' }}>
				<FormControl fullWidth size='small'>
					<InputLabel id='demo-simple-select-label'>Items per page</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						defaultValue={20}
						label='Properties per page'
						onChange={handleItemsPerPageChange}
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
