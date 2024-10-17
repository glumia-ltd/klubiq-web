import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC } from 'react';

type PaginationType = {
	getCurrentPage?: (value?: any) => void;
	getItemsPerPageCount?: (value?: any) => void;
	pageCount?: number;
	currentPage?: number;
};

export const DataPagination: FC<PaginationType> = ({
	getCurrentPage,
	getItemsPerPageCount,
	pageCount,
	currentPage,
}) => {
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
				page={currentPage}
				shape='rounded'
				variant='outlined'
				showFirstButton
				showLastButton
				onChange={(_, pageNumber) => {
					handlePaginationChange(pageNumber);
				}}
			/>

			<Box width={{ xs: '35%', sm: '15%', lg: '10%' }}>
				<FormControl fullWidth size='small'>
					<InputLabel id='demo-simple-select-label'>Items per page</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						defaultValue={24}
						label='Properties per page'
						onChange={handleItemsPerPageChange}
					>
						<MenuItem value={12}>12</MenuItem>
						<MenuItem value={24}>24</MenuItem>
						<MenuItem value={36}>36</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</Stack>
	);
};
