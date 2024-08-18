import { FC, useEffect, useRef, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { styles } from './style';
import editImage from '../../assets/images/edit.svg';

type OverviewType = {
	initialText: string;
};

export const Overview: FC<OverviewType> = ({ initialText }) => {
	const [, setNeedsTruncation] = useState<boolean>(false);
	const [truncateText, setTruncateText] = useState<boolean>(true);
	const [textContent, setTextContent] = useState<string>(initialText);
	const [showTextField, setShowTextField] = useState<boolean>(false);

	const overviewContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (overviewContentRef.current) {
			const element = overviewContentRef.current;

			setNeedsTruncation(element.scrollHeight > element.clientHeight);
		}
	}, [truncateText]);

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

	const handleSaveText = () => {
		console.log('saved');
		setShowTextField(false);
	};
	return (
		<Grid container sx={styles.overviewStyle}>
			<Grid sx={styles.overviewHeader}>
				<Typography variant='h3'>Overview</Typography>
				<img
					src={editImage}
					alt='edit image '
					style={styles.editImageStyle}
					onClick={handleEditOverview}
				/>
			</Grid>

			<Grid sx={styles.overviewTextContainer}>
				{!showTextField ? (
					<Typography
						ref={overviewContentRef}
						sx={{
							WebkitLineClamp: truncateText ? 2 : 'none',
							...styles.overviewContent,
						}}
					>
						{textContent}
					</Typography>
				) : (
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
							},
						}}
						sx={styles.textFieldStyle}
					/>
				)}

				{!showTextField ? (
					<Button onClick={toggleTextView} sx={styles.showHideTextStyle}>
						{truncateText ? 'Read more' : 'Hide Text'}
					</Button>
				) : (
					<Button onClick={handleSaveText} sx={styles.saveTextButton}>
						Save
					</Button>
				)}
			</Grid>
		</Grid>
	);
};
