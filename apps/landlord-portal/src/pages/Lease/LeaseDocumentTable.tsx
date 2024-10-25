import React, { useState } from 'react';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Grid,
	Typography,
	Card,
	Stack,
	IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { styles } from '../../components/PropertyUnitComponent/style';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
type LeaseTableComponentType = {
	documentTableData: any;
};

export const LeaseDocumentTable: FC<LeaseTableComponentType> = ({
	documentTableData,
}) => {
	const documentTableBodyRows = documentTableData?.row;
	const documentTableColumns = documentTableData?.column;
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]; // Safe check for files array
		if (file) {
			setSelectedFile(file);
			console.log('Selected file:', file);
		}
	};
	return (
		<TableContainer component={Card} sx={styles.tableContainer}>
			<Box sx={styles.iconDiv}>
				<Typography sx={{ ...styles.tableCell }}>Documents</Typography>
				<Stack direction='row' alignItems='center'>
					<div style={{ textAlign: 'center' }}>
						<input
							accept='image/*'
							style={{ display: 'none' }}
							id='upload-button'
							type='file'
							onChange={handleFileChange}
						/>
						<label htmlFor='upload-button'>
							<IconButton
								color='primary'
								aria-label='upload file'
								component='span'
							>
								<CloudUploadOutlinedIcon
									style={{ fontSize: 24, marginRight: '5px' }}
								/>
								<Typography sx={styles.iconText}>Upload Document</Typography>
							</IconButton>
						</label>
					</div>
				</Stack>
			</Box>
			{documentTableBodyRows?.length > 0 ? (
				<Table>
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
									<InsertDriveFileOutlinedIcon />
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
			) : (
				// <Table stickyHeader aria-label='sticky table'>
				// 	<TableHead>
				// 		<TableRow>
				// 			<TableCell
				// 				key={'name'}
				// 				align={'left'}
				// 				sx={{
				// 					...styles.tableHeaderCellStyle,
				// 					fontSize: '20px',
				// 				}}
				// 			>
				// 				Name
				// 			</TableCell>
				// 			<TableCell
				// 				key={'name'}
				// 				align={'left'}
				// 				sx={{ ...styles.tableHeaderCellStyle, fontSize: '20px' }}
				// 			>
				// 				Date
				// 			</TableCell>
				// 			{/* {documentTableColumns?.map((column: any) => (
				// 				<TableCell
				// 					key={column.label}
				// 					align={'left'}
				// 					sx={styles.tableHeaderCellStyle}
				// 				>
				// 					{column.label}
				// 				</TableCell>
				// 			))} */}
				// 		</TableRow>
				// 	</TableHead>

				// 	<TableBody>
				// 		{documentTableBodyRows?.map((row: any) => {
				// 			return (
				// 				<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
				// 					{documentTableColumns.map((column: any) => {
				// 						const key: string = column.id;
				// 						const value = row[key];

				// 						return (
				// 							<TableCell
				// 								key={column.id}
				// 								align={'left'}
				// 								sx={styles.tableBodyStyle}
				// 							>
				// 								{typeof value === 'string' ? (
				// 									value
				// 								) : (
				// 									<span style={styles.tenantInfoStyle}>
				// 										<img src={value.image} alt='tenant picture' />{' '}
				// 										{value.name}
				// 									</span>
				// 								)}
				// 							</TableCell>
				// 						);
				// 					})}
				// 				</TableRow>
				// 			);
				// 		})}
				// 	</TableBody>
				// </Table>
				<Grid sx={{ marginTop: '20px' }}>
					<Grid sx={styles.uploadDocumentContainer}>
						<Grid item sx={styles.documentTitleContainer}>
							<Typography fontWeight={600} variant='h6'>
								Lease Documents
							</Typography>

							<Typography fontSize={16}>
								Keep track of all documents related to this lease in one place.
							</Typography>
						</Grid>

						<Grid sx={styles.uploadDocumentText}>
							<CloudUploadOutlinedIcon />
							<Typography onClick={() => {}} sx={styles.addDocumentText}>
								Upload Document
							</Typography>
						</Grid>
					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Box sx={styles.documentBoxContainer}>
							<Box
								component='label'
								htmlFor='upload-photo'
								display='flex'
								alignItems='center'
								width='250px'
								height='170px'
								sx={styles.documentBox}
							>
								<Box>
									<CloudUploadOutlinedIcon sx={styles.documentUploadIcon} />
								</Box>
								<input
									type='file'
									id='upload-photo'
									style={{ display: 'none' }}
									multiple
									accept='image/png, image/jpeg'
									onChange={() => {}}
								/>
							</Box>
						</Box>

						<Grid sx={styles.noDocumentsStyle}>
							<Typography sx={styles.documentText} fontWeight={600}>
								No Documents Found
							</Typography>

							<Typography sx={styles.documentSubText}>
								Upload or drag document here
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			)}
		</TableContainer>
	);
};
