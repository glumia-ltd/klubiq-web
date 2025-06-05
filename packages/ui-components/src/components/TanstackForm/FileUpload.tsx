// packages/ui-components/src/components/TanstackForm/FileUpload.tsx
import {
	Card,
	CardContent,
	Box,
	Typography,
	IconButton,
	styled,
	Grid,
	Tooltip,
	Stack,
	Button,
	LinearProgress,
	Snackbar,
	Alert,
} from '@mui/material';
import {
	CloudUpload,
	Favorite,
	FavoriteBorder,
	Delete,
	Image,
	Upload,
} from '@mui/icons-material';
import { useRef, useState, useEffect } from 'react';
import { StorageUploadResult } from './types'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const ThumbnailContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	paddingTop: '75%', // 4:3 aspect ratio
	borderRadius: theme.shape.borderRadius,
	overflow: 'hidden',
	'& img': {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
}));


// Extend FileWithPreview to include storage result
interface FileWithPreview extends File {
	preview?: string;
	isFavorite: boolean;
	storageResult: StorageUploadResult | null;
}

interface FileUploadProps {
	accept?: string;
	maxSize?: number; // in bytes
	value: FileList | null;
	onChange: (value: FileList | null) => void;
	onBlur: () => void;
	error?: boolean;
	helperText?: string;
	multiple?: boolean;
	subtitle?: string;
	caption?: string;
	maxFavorites?: number;
	tooltipMessages?: {
		favorite?: string;
		unfavorite?: string;
		delete?: string;
		sizeLimit?: string;
		upload?: string;
		maxFavoritesReached?: string;
	};
	onUpload?: (files: File[]) => Promise<StorageUploadResult[]>;
	onDelete?: (publicId: string) => Promise<void>;
	uploadButtonText?: string;
	onUploadComplete?: (
		results: (StorageUploadResult & { isFavorite: boolean })[],
	) => void;
	onValidationError?: (message: string) => void;
	form?: any; // Add form prop for TanStack Form
	fieldName?: string; // Add fieldName prop for the form field to update
}

export const FileUpload: React.FC<FileUploadProps> = ({
	value,
	onChange,
	onBlur,
	error,
	helperText,
	accept,
	maxSize = 5 * 1024 * 1024, // default 5MB
	multiple = false,
	subtitle = 'UPLOAD FILES',
	caption = 'Upload your files here',
	maxFavorites = 3,
	tooltipMessages = {
		favorite: 'Click to mark as favorite',
		unfavorite: 'Click to remove from favorites',
		delete: 'Click to delete',
		sizeLimit: 'Maximum file size: {size}MB',
		upload: 'Click or drag files here to upload',
		maxFavoritesReached: 'Maximum number of favorites reached',
	},
	onUpload,
	onDelete,
	onUploadComplete,
	onValidationError,
	uploadButtonText = 'Upload Files',
	form,
	fieldName = 'uploadedFiles',
}): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [localFiles, setLocalFiles] = useState<FileWithPreview[]>([]);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [snackbar, setSnackbar] = useState<{
		open: boolean;
		message: string;
		severity: 'success' | 'error' | 'info' | 'warning';
	}>({
		open: false,
		message: '',
		severity: 'info',
	});
	const [hasUploadedFiles, setHasUploadedFiles] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	// Initialize and sync localFiles with form value
	useEffect(() => {
		if (value) {
			const filesWithPreview = Array.from(value).map((file) => {
				const existingFile = localFiles.find((f) => f.name === file.name);
				const fileWithPreview = file as FileWithPreview;

				// Keep existing preview URL and favorite status if file exists
				if (existingFile) {
					fileWithPreview.preview = existingFile.preview;
					fileWithPreview.isFavorite = existingFile.isFavorite;
					fileWithPreview.storageResult = existingFile.storageResult;
				} else {
					// Create new preview URL only if it doesn't exist and there's no storage URL
					if (!fileWithPreview.preview && !fileWithPreview.storageResult?.url) {
						fileWithPreview.preview = URL.createObjectURL(file);
					}
					fileWithPreview.isFavorite = false;
				}

				return fileWithPreview;
			});
			setLocalFiles(filesWithPreview);
			// Check if any files have been uploaded
			setHasUploadedFiles(filesWithPreview.some((file) => file.storageResult));
		} else {
			setLocalFiles([]);
			setHasUploadedFiles(false);
		}
	}, [value]);

	// Clean up preview URLs when component unmounts or files change
	useEffect(() => {
		return () => {
			localFiles.forEach((file) => {
				if (file.preview && !file.storageResult?.url) {
					URL.revokeObjectURL(file.preview);
				}
			});
		};
	}, [localFiles]);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const validateFile = (file: File): boolean => {
		if (file.size > maxSize) {
			setErrorMessage(
				`File ${file.name} exceeds the size limit of ${maxSize / (1024 * 1024)}MB`,
			);
			return false;
		}
		return true;
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}

		const newFiles = Array.from(e.target.files);
		const validFiles = newFiles.filter(validateFile);

		if (validFiles.length !== newFiles.length) {
			// Some files were invalid
			return;
		}

		// Create a new FileList with both existing and new files
		const dataTransfer = new DataTransfer();

		// Add existing files
		if (value) {
			Array.from(value).forEach((file) => {
				if (file instanceof File) {
					dataTransfer.items.add(file);
				}
			});
		}

		// Add new files
		validFiles.forEach((file) => {
			dataTransfer.items.add(file);
		});

		onChange(dataTransfer.files);
		onBlur();
	};

	const handleFavorite = (index: number) => {
		const currentFavorites = localFiles.filter(
			(file) => file.isFavorite,
		).length;
		const fileToUpdate = localFiles[index];

		// Check if we're trying to add a favorite when max is reached
		if (!fileToUpdate.isFavorite && currentFavorites >= maxFavorites) {
			setSnackbar({
				open: true,
				message:
					tooltipMessages.maxFavoritesReached ||
					'Maximum number of favorites reached',
				severity: 'info',
			});
			return;
		}

		const dataTransfer = new DataTransfer();
		const newFiles = [...localFiles];
		newFiles[index].isFavorite = !newFiles[index].isFavorite;

		newFiles.forEach((file) => {
			if (file instanceof File) {
				dataTransfer.items.add(file);
			}
		});

		onChange(dataTransfer.files);
	};

	const handleDelete = async (index: number) => {
		const fileToDelete = localFiles[index];

		try {
			// If the file has been uploaded to storage, delete it from there
			if (fileToDelete.storageResult?.public_id && onDelete) {
				await onDelete(fileToDelete.storageResult.public_id);
			}

			// Remove the file from local state
			const dataTransfer = new DataTransfer();
			const newFiles = [...localFiles];
			URL.revokeObjectURL(newFiles[index].preview || '');
			newFiles.splice(index, 1);

			newFiles.forEach((file) => {
				if (file instanceof File) {
					dataTransfer.items.add(file);
				}
			});

			// Update form value
			onChange(dataTransfer.files);
			setLocalFiles(newFiles);

			// Update the uploadedFiles field in the form
			if (form && fieldName) {
				const updatedPropertyImages = newFiles
					.filter((file) => file.storageResult) // Only include files that have been uploaded
					.map((file, index) => ({
						isMain:
							file.isFavorite ||
							(index === 0 && !newFiles.some((f) => f.isFavorite)),
						fileSize: file.storageResult?.bytes,
						url:
							file.storageResult?.secure_url || file.storageResult?.url || '',
						externalId: file.storageResult?.public_id || '',
						fileName: file.name,
					}));
				form.setFieldValue(fieldName, updatedPropertyImages);
			}

			setSnackbar({
				open: true,
				message: 'File deleted successfully',
				severity: 'success',
			});
		} catch (error) {
			setSnackbar({
				open: true,
				message: 'Failed to delete file. Please try again.',
				severity: 'error',
			});
		}
	};

	const getTooltipMessage = (file: FileWithPreview, index: number) => {
		const messages = [];
		if (file.isFavorite) {
			messages.push(tooltipMessages.unfavorite);
		} else {
			messages.push(tooltipMessages.favorite);
		}
		messages.push(tooltipMessages.delete);
		return messages.join('\n');
	};

	// Add validation function
	const validateUploads = (): boolean => {
		if (localFiles.length > 0 && !hasUploadedFiles) {
			const message = 'Please upload your images before proceeding';
			setSnackbar({
				open: true,
				message,
				severity: 'warning',
			});
			if (onValidationError) {
				onValidationError(message);
			}
			return false;
		}
		return true;
	};

	// Expose validation function to parent
	useEffect(() => {
		if (onValidationError) {
			onValidationError(
				validateUploads() ? '' : 'Please upload your images before proceeding',
			);
		}
	}, [hasUploadedFiles, localFiles.length]);

	const handleUpload = async () => {
		if (!onUpload || localFiles.length === 0) {
			return;
		}

		try {
			console.log('Uploading files...');
			setIsUploading(true);
			setUploadProgress(0);

			// Simulate progress updates
			const progressInterval = setInterval(() => {
				setUploadProgress((prev) => {
					if (prev >= 90) {
						clearInterval(progressInterval);
						return prev;
					}
					return prev + 10;
				});
			}, 500);

			// Upload files and get storage results
			const storageResults = await onUpload(localFiles);

			// Update local files with storage results while preserving existing state
			const updatedFiles = localFiles.map((file, index) => {
				const existingFile = localFiles.find((f) => f.name === file.name);
				const updatedFile = {
					...file,
					preview: existingFile?.preview || file.preview,
					isFavorite: existingFile?.isFavorite || file.isFavorite,
					storageResult: storageResults[index],
				};
				return updatedFile;
			});

			// Update local state first
			setLocalFiles(updatedFiles);

			// Create a new FileList with updated files
			const dataTransfer = new DataTransfer();
			updatedFiles.forEach((file) => {
				if (file instanceof File) {
					dataTransfer.items.add(file);
				}
			});

			// Update form value
			onChange(dataTransfer.files);
			setHasUploadedFiles(true);

			// Transform the data into PropertyImage format
			const propertyImages = updatedFiles.map((file, index) => ({
				isMain:
					file.isFavorite ||
					(index === 0 && !updatedFiles.some((f) => f.isFavorite)), // If no favorites, first image is main
				fileSize: file.storageResult?.bytes,
				url: file.storageResult?.secure_url || file.storageResult?.url || '',
				externalId: file.storageResult?.public_id || '',
				fileName: file.name,
			}));

			// Call onUploadComplete with both the storage results and property images
			if (onUploadComplete) {
				const resultsWithFavorite = storageResults.map((result, index) => ({
					...result,
					isFavorite: updatedFiles[index].isFavorite || false,
				}));
				onUploadComplete(resultsWithFavorite);
			}

			// Update the uploadedImages field in the form using TanStack Form API
			if (form && fieldName) {
				form.setFieldValue(fieldName, propertyImages);
			}

			clearInterval(progressInterval);
			setUploadProgress(100);

			setSnackbar({
				open: true,
				message: 'Files uploaded successfully!',
				severity: 'success',
			});
		} catch (error) {
			console.error('Error uploading files:', error);
			setSnackbar({
				open: true,
				message: 'Failed to upload files. Please try again.',
				severity: 'error',
			});
		} finally {
			setIsUploading(false);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const droppedFiles = Array.from(e.dataTransfer.files);
		const validFiles = droppedFiles.filter(validateFile);

		if (validFiles.length !== droppedFiles.length) {
			return;
		}

		// Create a new FileList with both existing and new files
		const dataTransfer = new DataTransfer();

		// Add existing files
		if (value) {
			Array.from(value).forEach((file) => {
				dataTransfer.items.add(file);
			});
		}

		// Add new files
		validFiles.forEach((file) => {
			dataTransfer.items.add(file);
		});

		onChange(dataTransfer.files);
		onBlur();
	};

	// Add a new effect to handle file previews
	useEffect(() => {
		// Create preview URLs for files that don't have them
		const newFiles = localFiles.map((file) => {
			if (!file.preview && !file.storageResult?.url) {
				return {
					...file,
					preview: URL.createObjectURL(file),
				};
			}
			return file;
		});

		if (JSON.stringify(newFiles) !== JSON.stringify(localFiles)) {
			setLocalFiles(newFiles);
		}
	}, [localFiles]);

	return (
		<Card variant='outlined'>
			<CardContent>
				<Typography variant='subtitle1' gutterBottom>
					{subtitle}
				</Typography>
				<Tooltip title={tooltipMessages.upload} arrow>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
						border='1px dashed'
						borderColor={isDragging ? 'primary.main' : 'grey.400'}
						borderRadius={2}
						p={4}
						sx={{
							cursor: 'pointer',
							transition: 'all 0.2s',
							backgroundColor: isDragging ? 'action.hover' : 'transparent',
							'&:hover': {
								borderColor: 'primary.main',
								backgroundColor: 'action.hover',
							},
						}}
						onClick={handleClick}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						tabIndex={0}
						aria-label={caption}
					>
						<IconButton
							color='primary'
							component='span'
							tabIndex={-1}
							disableRipple
						>
							<CloudUpload fontSize='large' />
						</IconButton>
						<Typography variant='body2' color='textSecondary' align='center'>
							{isDragging ? 'Drop files here' : caption}
						</Typography>
						<Typography variant='caption' color='textSecondary' align='center'>
							{tooltipMessages?.sizeLimit?.replace(
								'{size}',
								(maxSize / (1024 * 1024)).toString(),
							) || `Maximum file size: ${maxSize / (1024 * 1024)}MB`}
						</Typography>
						<VisuallyHiddenInput
							ref={inputRef}
							type='file'
							accept={accept}
							multiple={multiple}
							style={{ display: 'none' }}
							onChange={handleFileChange}
							onBlur={onBlur}
							aria-label='File input'
						/>
					</Box>
				</Tooltip>
				{(helperText || errorMessage) && (
					<Typography
						variant='caption'
						color={isError ? 'error' : 'textSecondary'}
						display='block'
						mt={1}
					>
						{errorMessage || helperText}
					</Typography>
				)}
				{localFiles.length > 0 && (
					<>
						<Grid container spacing={2} sx={{ mt: 2 }}>
							{localFiles.map((file, index) => (
								<Grid item xs={12} sm={6} md={4} key={index}>
									<Tooltip title={getTooltipMessage(file, index)} arrow>
										<ThumbnailContainer>
											{file.storageResult?.secure_url ||
											file.storageResult?.url ||
											file.preview ? (
												<img
													src={
														file.storageResult?.secure_url ||
														file.storageResult?.url ||
														file.preview
													}
													alt={file.name}
													style={{
														width: '100%',
														height: '100%',
														objectFit: 'cover',
													}}
												/>
											) : (
												<Box
													display='flex'
													alignItems='center'
													justifyContent='center'
													height='100%'
													bgcolor='grey.100'
												>
													<Image />
												</Box>
											)}
											<Stack
												direction='row'
												spacing={1}
												sx={{
													position: 'absolute',
													top: 8,
													right: 8,
													bgcolor: 'rgba(0, 0, 0, 0.5)',
													borderRadius: 1,
													p: 0.5,
												}}
											>
												<IconButton
													size='small'
													onClick={(e) => {
														e.stopPropagation();
														handleFavorite(index);
													}}
													sx={{ color: 'white' }}
												>
													{file.isFavorite ? <Favorite /> : <FavoriteBorder />}
												</IconButton>
												<IconButton
													size='small'
													onClick={(e) => {
														e.stopPropagation();
														handleDelete(index);
													}}
													sx={{ color: 'white' }}
												>
													<Delete />
												</IconButton>
											</Stack>
										</ThumbnailContainer>
									</Tooltip>
								</Grid>
							))}
						</Grid>
						<Box sx={{ mt: 2, width: '100%' }}>
							<Stack
								direction='row'
								spacing={2}
								justifyContent='flex-end'
								alignItems='center'
							>
								<Button
									variant='klubiqMainButton'
									onClick={handleUpload}
									disabled={isUploading}
									startIcon={<Upload />}
								>
									{isUploading ? 'Uploading...' : uploadButtonText}
								</Button>
							</Stack>
							{isUploading && (
								<Box sx={{ width: '100%', mt: 1 }}>
									<LinearProgress
										variant='determinate'
										value={uploadProgress}
									/>
									<Typography
										variant='caption'
										color='textSecondary'
										align='center'
										display='block'
									>
										{uploadProgress}% Complete
									</Typography>
								</Box>
							)}
						</Box>
					</>
				)}
			</CardContent>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Card>
	);
};
