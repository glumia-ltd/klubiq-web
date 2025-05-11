import { FC, useEffect, useRef, useState } from 'react';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { styles } from './style';
// import editImage from '../../assets/images/edit.svg';
import { EditIcon, CloseIcon } from '../Icons/CustomIcons';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { useDispatch } from 'react-redux';

type OverviewType = {
	initialText?: string;
};

export const Overview: FC<OverviewType> = ({ initialText }) => {
	const [needsTruncation, setNeedsTruncation] = useState<boolean>(false);
	const [truncateText, setTruncateText] = useState<boolean>(true);
	const [textContent, setTextContent] = useState<string>(initialText || '');
	const [showTextField, setShowTextField] = useState<boolean>(false);

	const dispatch = useDispatch();

	const overviewContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (overviewContentRef.current) {
			const element = overviewContentRef.current;
			setNeedsTruncation(element.scrollHeight > element.clientHeight);
		}
	}, [textContent, showTextField]);

	const toggleTextView = () => {
		setTruncateText((prev) => !prev);
	};

	const handleEditOverview = () => {
		setShowTextField(true);
	};

	const handleTextFieldChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setTextContent(event.target.value);
	};
	const handleCancelText = () => {
		setShowTextField(false);
		setTextContent(initialText || '');
	};

	const handleSaveText = () => {
		const maximumLength = 100;
		const splitTextContent = textContent.split(' ');

		const extremelyLongWords = splitTextContent.find(
			(word) => word.length > maximumLength,
		);

		if (extremelyLongWords) {
			dispatch(
				openSnackbar({
					message: `A word exceeding 100 characters without spaces has been detected. Please shorten it or add spaces to improve readability.`,
					severity: 'info',
					isOpen: true,
					duration: 2000,
				}),
			);
			return;
		}

		setShowTextField(false);
		setTruncateText(true);
	};
	return (
		<Grid container sx={styles.overviewStyle}>
			<Stack direction='row' sx={styles.overviewHeader}>
				<Typography variant='h3'>Overview</Typography>
				{!showTextField && <EditIcon onClick={handleEditOverview} style={styles.editImageStyle} />}
				{showTextField && <CloseIcon onClick={handleCancelText} style={styles.editImageStyle} />}
			</Stack>
				<Grid sx={styles.overviewTextContainer}>
							{!showTextField && textContent && (
								<Typography
									ref={overviewContentRef}
									sx={{
										WebkitLineClamp: truncateText ? 2 : 'none',
										...styles.overviewContent,
										height: `${truncateText ? '50px' : ''}`,
									}}
								>
									{textContent}
								</Typography>
							)}
			
							{showTextField && (
								<TextField
									id='standard-multiline-flexible'
									variant='outlined'
									defaultValue={textContent}
									multiline
									onChange={handleTextFieldChange}
									fullWidth
									InputProps={{
										sx: {
											alignItems: 'flex-start',
											padding: '8px 12px',
											'&.MuiInputBase-root': {
												maxWidth: '100%',
											},
										},
									}}
									sx={styles.textFieldStyle}
								/>
							) }
			
							{!showTextField ? (
								needsTruncation && (
									<Button
										variant='klubiqMainButton'
										onClick={toggleTextView}
										sx={styles.showHideTextStyle}
									>
										{truncateText ? 'Read more' : 'Hide Text'}
									</Button>
								) 
							) : (
								<Stack direction='row' spacing={2} sx={styles.saveTextButtonStack}>
								<Button
									variant='outlined'
									onClick={handleCancelText}
									sx={styles.saveTextButton}
								>
									Cancel
								</Button>
									<Button
									variant='contained'
									onClick={handleSaveText}
									sx={styles.saveTextButton}
								>
									Save
								</Button>

								</Stack>
							)}
						</Grid>

		</Grid>
	);
};
