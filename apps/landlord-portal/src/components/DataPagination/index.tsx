import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC } from 'react';

type PaginationType = {
	getCurrentPage?: (value?: any) => void;
	getItemsPerPageCount?: (value?: any) => void;
	itemsPerPageOptions?: number[];
	pageCount?: number;
	currentPage?: number;
};

const DEFAULTITEMSPERPAGE = [10, 24, 36];

export const DataPagination: FC<PaginationType> = ({
	getCurrentPage,
	getItemsPerPageCount,
	pageCount,
	currentPage,
	itemsPerPageOptions,
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
						sx={{ pl: '16px' }}
						defaultValue={
							itemsPerPageOptions
								? itemsPerPageOptions[0]
								: DEFAULTITEMSPERPAGE[1]
						}
						label='Properties per page'
						onChange={handleItemsPerPageChange}
					>
						{itemsPerPageOptions
							? itemsPerPageOptions?.map((item: number) => {
									return (
										<MenuItem key={item} value={item}>
											{item}
										</MenuItem>
									);
								})
							: DEFAULTITEMSPERPAGE.map((item: number) => {
									return (
										<MenuItem key={item} value={item}>
											{item}
										</MenuItem>
									);
								})}
					</Select>
				</FormControl>
			</Box>
		</Stack>
	);
};
