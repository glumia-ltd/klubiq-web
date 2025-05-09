

import { Card, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { TableBody } from "@mui/material";

import { Skeleton } from '@mui/material';

export const TableSkeleton = () => {
	return (
		<TableContainer component={Card}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align='left' colSpan={8}>
							<Skeleton variant='text' width='100%' height={40} />
						</TableCell>
					</TableRow>
				</TableHead>
				<TableHead>
					<TableRow>
						<TableCell align='center'>
							<Skeleton variant='text' width='100%' height={40} />
						</TableCell>
						<TableCell align='center'>
							<Skeleton variant='text' width='100%' height={40} />
						</TableCell>
						<TableCell align='center'>
							<Skeleton variant='text' width='100%' height={40} />
						</TableCell>
						<TableCell align='center'>
							<Skeleton variant='text' width='100%' height={40} />
						</TableCell>
						<TableCell align='center'>
							<Skeleton variant='text' width='100%' height={40} />
						</TableCell>
						<TableCell align='center'>
							<Skeleton variant='text' width='100%' height={40} />
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.from({ length: 10 }).map((_, index) => (
						<TableRow
							key={index}
							hover
						>
							<TableCell align='center'><Skeleton variant='text' width='100%' height={40} /></TableCell>
							<TableCell align='center'><Skeleton variant='text' width='100%' height={40} /></TableCell>
							<TableCell align='center'><Skeleton variant='text' width='100%' height={40} /></TableCell>
							<TableCell align='center'><Skeleton variant='text' width='100%' height={40} /></TableCell>
							<TableCell align='center'><Skeleton variant='text' width='100%' height={40} /></TableCell>
							<TableCell align='center'><Skeleton variant='text' width='100%' height={40} /></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>           
	);
};

