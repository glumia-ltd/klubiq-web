import { FC, useEffect, useRef, useState } from 'react';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { styles } from './style';
// import editImage from '../../assets/images/edit.svg';
import { EditIcon, CloseIcon } from '../Icons/CustomIcons';
import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { useDispatch } from 'react-redux';
import { FormFieldV1, KlubiqFormV1 } from '@klubiq/ui-components';
import { usePatchPropertyMutation } from '../../store/PropertyPageStore/propertyApiSlice';

type OverviewType = {
	initialText?: string;
	propertyUuid: string;
};

export const Overview: FC<OverviewType> = ({ initialText, propertyUuid }) => {
	const [needsTruncation, setNeedsTruncation] = useState<boolean>(false);
	const [truncateText, setTruncateText] = useState<boolean>(true);
	const [textContent, setTextContent] = useState<string>(initialText || '');
	const [showTextField, setShowTextField] = useState<boolean>(false);
	const [updatePropertyDescription] = usePatchPropertyMutation();
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

	const handleCancelText = () => {
		setShowTextField(false);
		setTextContent(initialText || '');
	};
	const onSubmit = async (values: any) => {
		handleSaveText(values.overview);
		const result = await updatePropertyDescription({
			uuid: propertyUuid,
			data: {
				description: values.overview,
			},
		}).unwrap();
		if (result) {
			dispatch(
				openSnackbar({
					message: 'Overview updated successfully',
					severity: 'success',
					isOpen: true,
					duration: 2000,
				}),
			);
			setShowTextField(false);
			setTextContent(values.overview);
		} else {
			dispatch(
				openSnackbar({
					message: 'Failed to update overview',
					severity: 'error',
					isOpen: true,
					duration: 2000,
				}),
			);
		}
		return result;
	};

	const handleSaveText = (text: string) => {
		const maximumLength = 100;
		const splitTextContent = text.split(' ');

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
	const overvieField: FormFieldV1[] = [
		{
			name: 'overview',
			label: '',
			type: 'textarea',
			required: true,
		},
	];
	return (
		<>
			<Card sx={styles.overviewStyle}>
				<CardContent>
					<Stack
						direction='column'
						alignItems='stretch'
						justifyContent='center'
						spacing={2}
					>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'
						>
							<Typography variant='h4'>Overview</Typography>
							{!showTextField && (
								<EditIcon
									onClick={handleEditOverview}
									style={styles.editImageStyle}
								/>
							)}
							{showTextField && (
								<CloseIcon
									onClick={handleCancelText}
									style={styles.editImageStyle}
								/>
							)}
						</Stack>
						<Stack direction='column' spacing={2}>
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
								<KlubiqFormV1
									fields={overvieField}
									initialValues={{ overview: textContent }}
									onSubmit={onSubmit}
									fullWidthButtons={false}
									horizontalAlignment='right'
									verticalAlignment='top'
									submitButtonText='Save'
								/>
							)}

							{!showTextField && needsTruncation && (
								<Button variant='klubiqMainButton' onClick={toggleTextView}>
									{truncateText ? 'Read more' : 'Hide Text'}
								</Button>
							)}
						</Stack>
					</Stack>
				</CardContent>
			</Card>
		</>
	);
};
