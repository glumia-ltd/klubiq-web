import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
} from '@mui/material';
import { styles } from './style';

export const HistoryTable = () => {
	const details = [
		{
			no: '1234567',
			dueDate: 'April 4, 2024',
			amount: '₦2,000,000',
			action: 'View Lease',
		},

		{
			no: '1234567',
			dueDate: 'April 4, 2024',
			amount: '₦2,000,000',
			action: 'View Lease',
		},
	];

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align='left' colSpan={8} sx={{ ...styles.tableCell }}>
							History
						</TableCell>
					</TableRow>
				</TableHead>
				<TableHead>
					<TableRow>
						<TableCell align='left' sx={styles.headerText2}>
							Invoice No
						</TableCell>
						<TableCell align='left' sx={styles.headerText2}>
							Due Date
						</TableCell>
						<TableCell align='left' sx={styles.headerText2}>
							Amount
						</TableCell>
						<TableCell align='left' sx={styles.headerText2}>
							Action
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{details.map((detail, index) => (
						<TableRow key={index}>
							<TableCell align='left'>{detail.no}</TableCell>
							<TableCell align='left'>{detail.dueDate}</TableCell>
							<TableCell align='left'>{detail.amount}</TableCell>
							<TableCell align='left'>
								<Button> {detail.action}</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
