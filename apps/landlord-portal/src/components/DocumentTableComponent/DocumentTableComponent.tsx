import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Grid,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { styles } from '../PropertyUnitComponent/style';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

type DocumentTableComponentType = {
	documentTableData: any;
};

export const DocumentTableComponent: FC<DocumentTableComponentType> = ({
	documentTableData,
}) => {
	const documentTableBodyRows = documentTableData?.row;
	const documentTableColumns = documentTableData?.column;
	return (
		<TableContainer>
			{documentTableBodyRows?.length > 0 ? (
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{documentTableColumns?.map((column: any) => (
								<TableCell
									key={column.label}
									align={'center'}
									sx={styles.tableHeaderCellStyle}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{documentTableBodyRows?.map((row: any) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
									{documentTableColumns.map((column: any) => {
										const key: string = column.id;
										const value = row[key];

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
			) : (
				<Grid sx={{ marginTop: '20px' }}>
					<Grid sx={styles.uploadDocumentContainer}>
						<Grid item sx={styles.documentTitleContainer}>
							<Typography fontWeight={600} variant='h6'>
								Property Documents
							</Typography>

							<Typography fontSize={16}>
								Keep track of all documents related to this property in one
								place.
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
