import {
	Button,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { styles } from './style';
import { FC } from 'react';

type ColumnType = { id: string; label: string };
type RowType = {
	id: string;
	tenant: { name: string; image: string };
	phone: string;
	email: string;
	startDate: string;
	cutOffDate: string;
};

type TenantAndLeaseTableProps = {
	handleAdd?: (path: string) => void;
	title: string;
	buttonText: string;
	columns: ColumnType[];
	tableBodyRows: RowType[];
	showSecondHeader?: boolean;
};

export const TenantAndLeaseTable: FC<TenantAndLeaseTableProps> = ({
	title,
	handleAdd,
	buttonText,
	columns,
	tableBodyRows,
	showSecondHeader = true,
}) => {
	const path = title === 'Tenant' ? 'add-tenant' : 'add-lease';

	const handleClick = () => {
		handleAdd && handleAdd(path);
	};

	return (
		<Grid sx={styles.tenantTableContainer}>
			<TableContainer>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							<TableCell align='left' colSpan={2} sx={{ ...styles.tableCell }}>
								{title}
							</TableCell>
							<TableCell align='right' colSpan={3} sx={styles.tableCell}>
								<Grid item xs={6} sm={6} md={9} lg={9}>
									<Button
										variant='propertyButton'
										onClick={handleClick}
										sx={styles.tableButton}
									>
										{buttonText}
									</Button>
								</Grid>
							</TableCell>
						</TableRow>
						{showSecondHeader && (
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.label}
										align={'center'}
										sx={styles.tableHeaderCellStyle}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						)}
					</TableHead>
					<TableBody>
						{tableBodyRows.map((row) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
									{columns.map((column) => {
										const key: string = column.id;
										const value = row[key as keyof RowType];

										return (
											<TableCell
												key={column.id}
												align={'center'}
												sx={styles.tableBodyStyle}
											>
												{typeof value === 'string' ? (
													value
												) : (
													<span style={styles.tenantInfoStyle}>
														<img src={value.image} alt='tenant picture' />{' '}
														{value.name}
													</span>
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};
