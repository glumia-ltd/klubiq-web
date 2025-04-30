import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Card,
} from '@mui/material';
import { styles } from './styles';
import fileIcon from '../../assets/images/Vector (2).svg';

const TenantDocument = () => {
	const details = [
		{
			name: 'Maintenance fee ',
			dueDate: 'March 13,2025',
		},

		{
			name: 'Insurance fee  ',
			dueDate: 'April 4, 2024',
		},
		{
			name: 'Landmark House unit 1 Lease payment ',
			dueDate: 'March 13,2025',
		},
		{
			name: 'Landmark House unit 2 Lease payment ',
			dueDate: 'April 4, 2024',
		},
	];

	return (
		<TableContainer component={Card}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align='left' colSpan={12} sx={{ ...styles.tableCell }}>
							Tenant Documents
							<Typography sx={styles.subheadText}>
								{' '}
								Keep track of all documents related to this property in one
								place.
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableHead>
					<TableRow>
						<TableCell align='left' sx={styles.headerText3}>
							Name
						</TableCell>
						<TableCell align='left' sx={styles.headerText3}>
							Date
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{details.map((detail, index) => (
						<TableRow key={index}>
							<TableCell sx={styles.tableDiv} align='left'>
								<img src={fileIcon} alt='tenant picture' />
								<Typography sx={styles.cellText} ml='25px'>
									{detail.name}
								</Typography>
							</TableCell>

							<TableCell align='left' sx={styles.cellText}>
								{detail.dueDate}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default TenantDocument;
