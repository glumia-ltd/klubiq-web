import React, { useState } from 'react';
import { styles } from './style';
import {
	TextField,
	Modal,
	Box,
	useMediaQuery,
	Theme,
	Button,
	Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ResponsiveTextFieldWithModal: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('sm'),
	);

	const handleOpen = () => {
		if (isSmallScreen) {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	return (
		<>
			<TextField
				value={text}
				onChange={handleChange}
				onClick={handleOpen}
				id='input-with-icon-textfield'
				placeholder='Search Transactions,customers'
				sx={styles.textFieldWithModalSx}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					),

					sx: {
						height: '45px',
					},
				}}
				variant='outlined'
			/>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-title'
				aria-describedby='modal-description'
			>
				<Box
					sx={styles.textFieldWithModalBox}
				>
					<Typography  sx={styles.textFieldWithModalTypography}>
					</Typography>
					<TextField
						variant='outlined'
						value={text}
						onChange={handleChange}
						fullWidth
					/>
					<Button onClick={handleClose} variant='contained' sx={styles.textFieldWithModalButton}>
						Close
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default ResponsiveTextFieldWithModal;
