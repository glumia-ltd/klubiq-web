import React, { useState } from 'react';
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
				sx={{
					width: { xs: '50px', sm: '250px', md: '320px' },
					height: '45px',
					padding: '0 4 0 4',
					outline: '1px solid #e4e4e4',
					border: { xs: 'none' },

					'& fieldset': {
						border: isSmallScreen ? 'none' : undefined,
					},
				}}
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
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '80%',
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography id='modal-title' variant='h6' component='h2'>
						Enter Text
					</Typography>
					<TextField
						variant='outlined'
						value={text}
						onChange={handleChange}
						fullWidth
					/>
					<Button onClick={handleClose} variant='contained' sx={{ mt: 2 }}>
						Close
					</Button>
				</Box>
			</Modal>
		</>
	);
};

export default ResponsiveTextFieldWithModal;
