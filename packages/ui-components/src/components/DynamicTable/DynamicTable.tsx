import React, { useState, MouseEvent, KeyboardEvent } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Button,
	Box,
	Stack,
	Collapse,
	IconButton,
	Card,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { DynamicAvatar } from '../DynamicAvatar/DynamicAvatar';

function getValue(obj: any, path: string) {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export interface TableColumn {
	key: string;
	label: string;
	render?: (row: any) => React.ReactNode;
	width?: string | number;
	align?: 'left' | 'right' | 'center';
	children?: TableColumn[];
}
export interface DynamicTableStyles {
	borderStyle?: 'none' | 'outlined' | 'bordered';
	buttonVariant?: 'text' | 'contained' | 'outlined';
	borderRadius?: number;
	borderWidth?: number;
	paperElevation: number;
	titleVariant?: 'h4' | 'h5' | 'h6';
	titleFontWeight?: number;
	headerVariant?:
		| 'body1'
		| 'body2'
		| 'subtitle1'
		| 'subtitle2'
		| 'caption'
		| 'button'
		| 'overline';
	headerFontWeight?: number;
	cellAlign?: 'left' | 'right' | 'center';
}

export interface DynamicTableColors {
	headerBg: string;
	headerColor: string;
	rowBg: string;
	rowHoverBg: string;
	borderColor: string;
	cellColor: string;
	tableBorderColor: string;
	cellBorderColor?: string;
	headerBorderColor?: string;
	cardBorderColor?: string;
	cardBgColor?: string;
}

export interface DynamicTableProps {
	columns: TableColumn[];
	rows: any[];
	header?: string;
	subHeader?: string;
	buttonLabel?: string;
	onButtonClick?: () => void;
	onRowClick?: (row: any) => void;
	avatarColumnKey?: string;
	colors: DynamicTableColors;
	styles: DynamicTableStyles;
	getNestedRows?: (row: any) => any[] | undefined;
	nestedColumns?: TableColumn[];
	showHeader?: boolean;
	cellAlign?: 'left' | 'right' | 'center';
}

const NestedTable: React.FC<{
	columns: TableColumn[];
	rows: any[];
	colors: DynamicTableColors;
	styles: DynamicTableStyles;
}> = ({ columns, rows, colors, styles }) => (
	<Table
		size='small'
		sx={{
			background: colors?.headerBg,
			borderColor: colors?.tableBorderColor || 'inherit',
			borderStyle: styles?.borderStyle || 'inherit',
			borderRadius: styles?.borderRadius || 'inherit',
		}}
	>
		<TableHead>
			<TableRow>
				{columns.map((col) => (
					<TableCell key={col.key} align={col.align || 'left'}>
						{col.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
		<TableBody>
			{rows.map((row, idx) => (
				<TableRow
					key={row.id || idx}
					hover
					sx={{
						background: colors?.rowBg,
						'&:hover': { background: colors?.rowHoverBg },
					}}
				>
					{columns.map((col) => (
						<TableCell key={col.key} align={col.align || 'left'}>
							{col.render ? col.render(row) : renderCellValue(row, col)}
						</TableCell>
					))}
				</TableRow>
			))}
		</TableBody>
	</Table>
);

// Helper to render cell value safely
function renderCellValue(row: any, col: TableColumn, avatarColumnKey?: string) {
	const value = getValue(row, col.key);
	if (col.render) {
		return col.render(row);
	}
	if (col.key === avatarColumnKey && value) {
		return (
			<Stack direction='row' alignItems='center' spacing={1}>
				<DynamicAvatar items={[value]} size='small' />
				<Typography fontWeight={600}>
					{value?.name || value?.label || ''}
				</Typography>
			</Stack>
		);
	}
	if (
		React.isValidElement(value) ||
		typeof value === 'string' ||
		typeof value === 'number'
	) {
		return value;
	}
	return value !== undefined && value !== null ? String(value) : '';
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
	columns,
	rows,
	header,
	subHeader,
	buttonLabel,
	onButtonClick,
	onRowClick,
	avatarColumnKey,
	colors,
	styles,
	getNestedRows,
	nestedColumns,
	showHeader = true,
	cellAlign = 'left',
}) => {
	// Destructure colors with defaults
	const {
		headerBg = '#f8fbfd',
		headerColor = '#222',
		rowBg = '#fff',
		rowHoverBg = '#f0f4fa',
		cellColor = '#222',
		borderColor = '#e0e0e0',
		headerBorderColor = borderColor,
		cellBorderColor = borderColor,
		cardBorderColor = borderColor,
		cardBgColor = '#fff',
	} = colors;

	// Destructure styles with defaults
	const {
		borderStyle = 'none',
		buttonVariant = 'contained',
		borderRadius = 3,
		borderWidth = 1,
		headerVariant = 'body1',
		titleVariant = 'h4',
		titleFontWeight = 700,
		headerFontWeight = 400,
	} = styles;

	// Get border styles based on borderStyle prop
	const getBorderStyles = () => {
		switch (borderStyle) {
			case 'outlined':
				return {
					border: `${borderWidth}px solid ${borderColor}`,
					'& .MuiTableCell-root': {
						borderBottom: `${borderWidth}px solid ${cellBorderColor}`,
					},
				};
			case 'bordered':
				return {
					border: `${borderWidth}px solid ${borderColor}`,
					'& .MuiTableCell-root': {
						border: `${borderWidth}px solid ${cellBorderColor}`,
					},
				};
			default:
				return {
					'& .MuiTableCell-root': {
						borderBottom: `${borderWidth}px solid ${cellBorderColor}`,
					},
				};
		}
	};

	const [openRow, setOpenRow] = useState<string | number | null>(null);

	const handleExpandClick = (
		e: MouseEvent | KeyboardEvent,
		rowId: string | number,
	) => {
		e.stopPropagation();
		setOpenRow(openRow === rowId ? null : rowId);
	};

	return (
		<Card
			sx={{
				p: 2,
				borderColor: cardBorderColor,
				background: cardBgColor,
				...getBorderStyles(),
			}}
		>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				mb={1}
			>
				<Box>
					{header && (
						<Typography
							variant={titleVariant}
							fontWeight={titleFontWeight}
							color={headerColor}
						>
							{header}
						</Typography>
					)}
					{subHeader && (
						<Typography
							variant={headerVariant}
							fontWeight={headerFontWeight}
							color={cellColor}
						>
							{subHeader}
						</Typography>
					)}
				</Box>
				{buttonLabel && (
					<Button variant={buttonVariant} onClick={onButtonClick}>
						{buttonLabel}
					</Button>
				)}
			</Stack>
			<TableContainer>
				<Table
					sx={{
						borderColor: borderColor,
						borderStyle: borderStyle,
						borderRadius: borderRadius,
					}}
				>
					{showHeader && (
						<TableHead
							sx={{ background: headerBg, borderColor: headerBorderColor }}
						>
							<TableRow>
								{getNestedRows && nestedColumns && <TableCell />}
								{columns.map((col) => (
									<TableCell
										key={col.key}
										sx={{
											fontWeight: headerFontWeight,
										}}
										align={col.align || 'left'}
										width={col.width}
										color={headerColor}
									>
										{col.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
					)}
					<TableBody>
						{rows.map((row, idx) => {
							const rowId = row.id || idx;
							const hasNested =
								getNestedRows && nestedColumns && getNestedRows(row)?.length;
							return (
								<React.Fragment key={rowId}>
									<TableRow
										hover
										sx={{
											cursor: onRowClick ? 'pointer' : 'default',
											background: rowBg,
											'&:hover': { background: rowHoverBg },
										}}
										onClick={onRowClick ? () => onRowClick(row) : undefined}
									>
										{hasNested && (
											<TableCell align={cellAlign}>
												<IconButton
													size='small'
													onClick={(e) => handleExpandClick(e, rowId)}
													onKeyDown={(e) => {
														if (e.key === 'Enter' || e.key === ' ') {
															handleExpandClick(e, rowId);
														}
													}}
													aria-label={
														openRow === rowId ? 'Collapse row' : 'Expand row'
													}
													aria-expanded={openRow === rowId}
													tabIndex={0}
												>
													{openRow === rowId ? (
														<KeyboardArrowUp />
													) : (
														<KeyboardArrowDown />
													)}
												</IconButton>
											</TableCell>
										)}
										{!hasNested && getNestedRows && nestedColumns && (
											<TableCell align={cellAlign} />
										)}
										{columns.map((col) => (
											<TableCell key={col.key} align={col.align || 'left'}>
												{renderCellValue(row, col, avatarColumnKey)}
											</TableCell>
										))}
									</TableRow>
									{hasNested && (
										<TableRow>
											<TableCell
												colSpan={columns.length + 1}
												sx={{
													p: 0,
													background: headerBg,
													borderColor: borderColor,
													color: headerColor,
												}}
											>
												<Collapse
													in={openRow === rowId}
													timeout='auto'
													unmountOnExit
												>
													<Box sx={{ m: 2 }}>
														<NestedTable
															columns={nestedColumns}
															rows={getNestedRows(row) || []}
															colors={colors}
															styles={styles}
														/>
													</Box>
												</Collapse>
											</TableCell>
										</TableRow>
									)}
								</React.Fragment>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	);
};
