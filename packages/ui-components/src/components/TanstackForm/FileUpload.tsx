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
	useTheme,
	useMediaQuery,
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
import { StorageUploadResult } from './types';

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
	// New: variant selection
	variant?: 'card' | 'button';
	tooltipMessages?: {
		favorite?: string;
		unfavorite?: string;
		delete?: string;
		sizeLimit?: string;
		upload?: string;
		maxFavoritesReached?: string;
	};
	// Base upload API
	onUpload?: (formData: FormData) => Promise<StorageUploadResult[]>;
	// New: upload API variants
	onUploadLogo?: (formData: FormData) => Promise<StorageUploadResult>;
	onUploadProfile?: (formData: FormData) => Promise<StorageUploadResult>;
	uploadContext?: 'logo' | 'profile';
	onDelete?: (publicId: string) => Promise<boolean>;
	uploadButtonText?: string;
	onUploadComplete?: (
		results: (StorageUploadResult & { isFavorite: boolean })[],
	) => void;
	onValidationError?: (message: string) => void;
	form?: any; // Add form prop for TanStack Form
	fieldName?: string; // Add fieldName prop for the form field to update
	// New: external preview renderer for button variant
	renderExternalPreview?: (
		results: (StorageUploadResult & { isFavorite: boolean })[],
	) => React.ReactNode;
	// New: auto upload immediately after selection (defaults true for button variant)
	autoUploadOnSelect?: boolean;
	uploadButtonVariant?:
		| 'klubiqMainButton'
		| 'klubiqSecondaryButton'
		| 'klubiqOutlinedButton'
		| 'klubiqTextButton';
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
	variant = 'card',
	tooltipMessages = {
		favorite: 'Click to mark as favorite',
		unfavorite: 'Click to remove from favorites',
		delete: 'Click to delete',
		sizeLimit: 'Maximum file size: {size}MB',
		upload: 'Click or drag files here to upload',
		maxFavoritesReached: 'Maximum number of favorites reached',
	},
	onUpload,
	onUploadLogo,
	onUploadProfile,
	uploadContext,
	onDelete,
	onUploadComplete,
	onValidationError,
	uploadButtonText = 'Upload Files',
	form,
	fieldName = 'uploadedFiles',
	renderExternalPreview,
	autoUploadOnSelect,
	uploadButtonVariant = 'klubiqMainButton',
}): JSX.Element => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const inputRef = useRef<HTMLInputElement>(null);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [localFiles, setLocalFiles] = useState<FileWithPreview[]>([]);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [deleteProgress, setDeleteProgress] = useState<number>(0);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
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
	// New: hold last upload results for external preview rendering
	const [lastUploadResults, setLastUploadResults] = useState<
		(StorageUploadResult & { isFavorite: boolean })[]
	>([]);
	const isFile = (file: any): file is File => {
		return (
			typeof window !== 'undefined' &&
			typeof window.File !== 'undefined' &&
			file instanceof window.File
		);
	};
	// Initialize and sync localFiles with form value
	useEffect(() => {
		// If we have files with storage results, preserve them even if value is empty
		const hasStorageResults = localFiles.some((file) => file.storageResult);
		// If we have storage results, always preserve the files
		const filesWaitingForUpload =
			localFiles.length - (form?.getFieldValue(fieldName) || []).length;
		form?.setFieldValue('filesWaitingForUpload', filesWaitingForUpload);
		localStorage.setItem(
			'filesWaitingForUpload',
			filesWaitingForUpload.toString(),
		);
		if (hasStorageResults) {
			setHasUploadedFiles(true);
			return;
		}

		// Handle new files from value prop
		if (value) {
			// Get uploaded files from form if available
			const formUploadedFiles = form?.getFieldValue(fieldName) || [];
			const filesWithPreview = Array.from(value).map((file) => {
				// First try to find a matching file in form values
				const formFile = Array.isArray(formUploadedFiles)
					? formUploadedFiles.find(
							(f: any) =>
								f.externalId?.includes(file.name) ||
								('externalId' in file &&
									f.externalId === file.externalId &&
									'url' in file &&
									f.url === file.url),
						)
					: undefined;

				if (formFile && isFile(file)) {
					//console.log('formFile found:', formFile);
					// Restore storage result from form value

					const fileWithPreview = file as FileWithPreview;
					fileWithPreview.preview = formFile.url;
					fileWithPreview.isFavorite = formFile.isMain;
					fileWithPreview.storageResult = {
						secure_url: formFile.url,
						url: formFile.url,
						public_id: formFile.externalId,
						bytes: formFile.fileSize,
						original_filename: formFile.fileName,
					};
					return fileWithPreview;
				} else if (
					formFile &&
					!isFile(file) &&
					'externalId' in file &&
					'url' in file
				) {
					return {
						preview: formFile.url,
						isFavorite: formFile.isMain,
						storageResult: {
							secure_url: formFile.url,
							url: formFile.url,
							public_id: formFile.externalId,
							bytes: formFile.fileSize,
							original_filename: formFile.fileName,
						},
					} as FileWithPreview;
				}

				// If no form file found, check local files
				const existingFileWithStorage = localFiles.find(
					(f) => f.name === file.name && f.storageResult,
				);

				const existingFile =
					existingFileWithStorage ||
					localFiles.find((f) => f.name === file.name);

				const fileWithPreview = file as FileWithPreview;

				if (existingFile) {
					// Keep existing preview URL and favorite status if file exists
					fileWithPreview.preview =
						// existingFile.storageResult?.secure_url ||
						// existingFile.storageResult?.url ||
						existingFile.preview;
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

			// Only update if the files have actually changed and we're not in the middle of an upload
			if (
				JSON.stringify(filesWithPreview) !== JSON.stringify(localFiles) &&
				!isUploading
			) {
				setLocalFiles(filesWithPreview);
			}

			// Update hasUploadedFiles based on whether any files have storage results
			const hasUploads = filesWithPreview.some((file) => file.storageResult);
			if (hasUploads !== hasUploadedFiles) {
				setHasUploadedFiles(hasUploads);
			}
		}
	}, [value, isUploading, hasUploadedFiles, localFiles, form, fieldName]);

	// Clean up preview URLs when component unmounts or files change
	useEffect(() => {
		// Store current blob URLs to clean up
		const currentBlobUrls = new Set<string>();

		// Create new blob URLs for files that need them
		const newFiles = localFiles.map((file) => {
			// If we have a storage URL, use that instead of blob URL
			if (file.storageResult?.secure_url || file.storageResult?.url) {
				return {
					...file,
					preview: file.storageResult.secure_url || file.storageResult.url,
				};
			}

			// If we don't have a preview URL, create one
			if (!file.preview) {
				//console.log('file is not preview: ', file);
				const blobUrl = URL.createObjectURL(file);
				currentBlobUrls.add(blobUrl);
				return {
					...file,
					preview: blobUrl,
				};
			}

			// Keep existing preview URL
			currentBlobUrls.add(file.preview);
			return file;
		});

		// Update local files if needed and we're not uploading
		if (
			JSON.stringify(newFiles) !== JSON.stringify(localFiles) &&
			!isUploading
		) {
			setLocalFiles(newFiles);
		}

		// Cleanup function
		return () => {
			// Revoke all blob URLs that are no longer needed
			localFiles.forEach((file) => {
				if (
					file.preview &&
					!file.storageResult?.url &&
					!file.storageResult?.secure_url &&
					!currentBlobUrls.has(file.preview)
				) {
					URL.revokeObjectURL(file.preview);
				}
			});
		};
	}, [localFiles, isUploading, hasUploadedFiles]);

	// Add a cleanup effect for component unmount
	useEffect(() => {
		return () => {
			// Clean up all blob URLs when component unmounts
			localFiles.forEach((file) => {
				if (
					file.preview &&
					!file.storageResult?.url &&
					!file.storageResult?.secure_url
				) {
					URL.revokeObjectURL(file.preview);
				}
			});
		};
	}, []);

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

		// For button variant, auto-upload immediately after selection
		const shouldAutoUpload =
			autoUploadOnSelect !== undefined
				? autoUploadOnSelect
				: variant === 'button';
		if (shouldAutoUpload) {
			// Defer to allow local state to sync from value
			setTimeout(() => {
				void handleUpload();
			}, 0);
		}
	};

	const handleServerFavorite = async (index: number) => {
		if (!form || !fieldName) {
			return;
		}
		const serverFiles = form?.getFieldValue(fieldName) || [];

		const currentFavorites = serverFiles.filter(
			(file: any) => file.isMain,
		).length;
		const fileToUpdate = serverFiles[index];

		// Check if we're trying to add a favorite when max is reached
		if (!fileToUpdate.isFavorite && currentFavorites >= maxFavorites) {
			// setSnackbar({
			// 	open: true,
			// 	message:
			// 		tooltipMessages.maxFavoritesReached ||
			// 		'Maximum number of favorites reached',
			// 	severity: 'info',
			// });
			return;
		}
		const updatedServerFiles = serverFiles.map((file: any, i: number) => {
			if (i === index) {
				return {
					...file,
					isMain: !file.isMain,
				};
			}
			return file;
		});
		form.setFieldValue(fieldName, updatedServerFiles);
	};

	const handleFavorite = async (index: number) => {
		const currentFavorites = localFiles.filter(
			(file) => file.isFavorite,
		).length;
		const fileToUpdate = localFiles[index];
		const uploadedVersionIndex = form
			?.getFieldValue(fieldName)
			?.findIndex((file: any) => file.externalId.includes(fileToUpdate.name));
		if (uploadedVersionIndex !== -1) {
			await handleServerFavorite(uploadedVersionIndex);
		}

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

	const handleServerFilesDelete = async (index: number, publicId: string) => {
		try {
			//console.log('handleServerFilesDelete: ', form, fieldName, publicId);
			if (!onDelete || !form || !fieldName || !publicId) {
				throw new Error('Missing required parameters for server file deletion');
			}
			setDeleteProgress(20);
			const deletedFile = await onDelete(publicId);
			if (deletedFile) {
				const serverFiles = form?.getFieldValue(fieldName) || [];
				const updatedServerFiles = serverFiles.filter(
					(file: any, i: number) => i !== index,
				);
				//console.log('updatedServerFiles: ', updatedServerFiles);
				form?.setFieldValue(fieldName, updatedServerFiles);
				setDeleteProgress(40);
				// If server-side files are now empty, also clear external previews
				if (updatedServerFiles.length === 0) {
					setHasUploadedFiles(false);
					setLastUploadResults([]);
				}
			} else {
				throw new Error('Failed to delete file from server');
			}
		} catch (error) {
			throw error;
		}
	};
	const handleDelete = async (index: number) => {
		//console.log('form?.getFieldValue(fieldName) before delete: ', form?.getFieldValue(fieldName));
		const fileToDelete = localFiles[index];
		//console.log('fileToDelete: ', fileToDelete);
		try {
			setIsDeleting(true);
			setDeleteProgress(0);
			const uploadedVersion = (form?.getFieldValue(fieldName) || []).find(
				(file: any) =>
					file.externalId.includes(fileToDelete.name) ||
					file.externalId === fileToDelete.storageResult?.public_id,
			);
			//console.log('uploadedVersion: ', uploadedVersion);
			if (uploadedVersion) {
				setDeleteProgress(10);
				await handleServerFilesDelete(index, uploadedVersion.externalId);
			}
			const deleteProgressInterval = setInterval(() => {
				setDeleteProgress((prev) => {
					if (prev >= 90) {
						clearInterval(deleteProgressInterval);
						return prev;
					}
					return prev + 10;
				});
			}, 500);
			// Remove the file from local state
			const dataTransfer = new DataTransfer();
			const newFiles = [...localFiles];
			//console.log('newFiles: ', newFiles);
			// Clean up the blob URL before removing the file (only revoke blob URLs)
			const previewUrl = newFiles[index].preview;
			if (previewUrl && previewUrl.startsWith('blob:')) {
				URL.revokeObjectURL(previewUrl);
			}

			newFiles.splice(index, 1);
			// After removing, ensure remaining previews are valid; if none remain, clear uploaded flag
			if (newFiles.length === 0) {
				setHasUploadedFiles(false);
			}

			newFiles.forEach((file) => {
				if (isFile(file)) {
					dataTransfer.items.add(file);
				}
			});
			const localFilesCount = newFiles.length;
			// Update form value
			if (dataTransfer.files?.length > 0) {
				onChange(dataTransfer.files);
			} else {
				// Clear input selection when no files remain
				onChange(null);
			}
			setLocalFiles(newFiles);
			if (newFiles.length === 0) {
				// Clear any external previews when nothing is left
				setLastUploadResults([]);
			}
			// If we have storage results, always preserve the files
			//console.log('form?.getFieldValue(fieldName) after delete: ', form?.getFieldValue(fieldName));
			//console.log('localFiles: ', localFiles);
			const filesWaitingForUpload =
				localFilesCount - (form?.getFieldValue(fieldName) || []).length;
			form?.setFieldValue('filesWaitingForUpload', filesWaitingForUpload);
			localStorage.setItem(
				'filesWaitingForUpload',
				filesWaitingForUpload.toString(),
			);
			clearInterval(deleteProgressInterval);
			setDeleteProgress(100);
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
		} finally {
			setIsDeleting(false);
		}
	};

	const getTooltipMessage = (file: FileWithPreview, index: number) => {
		if (file.isFavorite) {
			return tooltipMessages.unfavorite;
			} else {
			return tooltipMessages.favorite;
		}
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
		const resolvedUpload =
			uploadContext === 'logo' && onUploadLogo
				? onUploadLogo
				: uploadContext === 'profile' && onUploadProfile
					? onUploadProfile
					: onUpload;

		if (!resolvedUpload || localFiles.length === 0) {
			return;
		}

		// Calculate total size of all files
		const totalSize = localFiles.reduce((sum, file) => sum + file.size, 0);
		if (totalSize > maxSize) {
			setSnackbar({
				open: true,
				message: `Total file size (${(totalSize / (1024 * 1024)).toFixed(2)}MB) exceeds the maximum allowed size of ${maxSize / (1024 * 1024)}MB`,
				severity: 'error',
			});
			return;
		}

		try {
			setIsUploading(true);
			setUploadProgress(0);

			const progressInterval = setInterval(() => {
				setUploadProgress((prev) => {
					if (prev >= 90) {
						clearInterval(progressInterval);
						return prev;
					}
					return prev + 10;
				});
			}, 500);

			const formData = new FormData();
			localFiles.forEach((file) => {
				formData.append('files', file);
			});

			const uploadResponse = await resolvedUpload(formData);
			const storageResults = Array.isArray(uploadResponse)
				? uploadResponse
				: [uploadResponse];
			const uploadedFilesCount = storageResults.length;
			// Update local files with storage results while preserving existing state
			const updatedFiles = localFiles.map((file, index) => {
				const storageResult = storageResults[index];
				const updatedFile = {
					...file,
					preview:
						storageResult?.secure_url || storageResult?.url || file.preview,
					isFavorite: file.isFavorite,
					storageResult: storageResult,
				};
				form?.setFieldValue('filesWaitingForUpload', 0);
				localStorage.setItem('filesWaitingForUpload', '0');

				// Clean up blob URL if we now have a storage URL
				if (file.preview && (storageResult?.secure_url || storageResult?.url)) {
					URL.revokeObjectURL(file.preview);
				}

				return updatedFile;
			});

			// Update local state first
			setLocalFiles(updatedFiles);
			setHasUploadedFiles(true); // Set this before updating form value

			// Transform the data into PropertyImage format
			const serverFiles = updatedFiles.map((file, index) => ({
				isMain:
					file.isFavorite ||
					(index === 0 && !updatedFiles.some((f) => f.isFavorite)),
				fileSize: file.storageResult?.bytes,
				url: file.storageResult?.secure_url || file.storageResult?.url || '',
				externalId: file.storageResult?.public_id || '',
				fileName: file.storageResult?.original_filename || file.name,
			}));

			const resultsWithFavorite = storageResults.map((result, index) => ({
				...result,
				isFavorite: updatedFiles[index].isFavorite || false,
			}));
			setLastUploadResults(resultsWithFavorite);
			if (onUploadComplete) {
				onUploadComplete(resultsWithFavorite);
			}

			if (form && fieldName) {
				form.setFieldValue(fieldName, serverFiles);
			}

			// Don't update the form value with an empty FileList
			// This was causing localFiles to be cleared
			// onChange(dataTransfer.files);
			// If we have storage results, always preserve the files

			clearInterval(progressInterval);
			setUploadProgress(100);

			setSnackbar({
				open: true,
				message: 'Files uploaded successfully!',
				severity: 'success',
			});
		} catch (error) {
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

	// Button-only variant rendering
	if (variant === 'button') {
		return (
			<Box>
				<Button
					variant={uploadButtonVariant}
					onClick={handleClick}
					startIcon={<Upload />}
				>
					{isUploading ? 'Uploading...' : uploadButtonText}
				</Button>
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
				{renderExternalPreview && lastUploadResults?.length > 0 && (
					<Box sx={{ mt: 2 }}>{renderExternalPreview(lastUploadResults)}</Box>
				)}
				{isUploading && (
					<Box sx={{ width: '100%', mt: 1 }}>
						<LinearProgress variant='determinate' value={uploadProgress} />
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
				<Snackbar
					open={snackbar.open}
					autoHideDuration={6000}
					onClose={handleCloseSnackbar}
					anchorOrigin={{
						vertical: 'top',
						horizontal: isMobile ? 'center' : 'right',
					}}
					sx={{
						width: '100%',
						maxWidth: isMobile ? '100%' : '600px',
						fontFamily: 'Maven Pro, sans-serif',
						fontSize: '16px',
					}}
				>
					<Alert
						onClose={handleCloseSnackbar}
						severity={snackbar.severity}
						variant='filled'
					>
						{snackbar.message}
					</Alert>
				</Snackbar>
			</Box>
		);
	}

	return (
		<Card variant='outlined'>
			<CardContent>
				{(form?.getFieldValue(fieldName) || []).length === 0 && (
					<>
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
									cursor: isUploading ? 'not-allowed' : 'pointer',
									transition: 'all 0.2s',
									backgroundColor: isDragging ? 'action.hover' : 'transparent',
									opacity: isUploading ? 0.7 : 1,
									'&:hover': {
										borderColor: isUploading ? 'grey.400' : 'primary.main',
										backgroundColor: isUploading
											? 'transparent'
											: 'action.hover',
									},
								}}
								onClick={isUploading ? undefined : handleClick}
								onDragEnter={isUploading ? undefined : handleDragEnter}
								onDragLeave={isUploading ? undefined : handleDragLeave}
								onDragOver={isUploading ? undefined : handleDragOver}
								onDrop={isUploading ? undefined : handleDrop}
								tabIndex={isUploading ? -1 : 0}
								aria-label={caption}
								aria-disabled={isUploading}
							>
								<IconButton
									color='primary'
									component='span'
									tabIndex={-1}
									disableRipple
									disabled={isUploading}
								>
									<CloudUpload fontSize='large' />
								</IconButton>
								<Typography
									variant='body2'
									color='textSecondary'
									align='center'
								>
									{isUploading
										? 'Uploading files...'
										: isDragging
											? 'Drop files here'
											: caption}
								</Typography>
								<Typography
									variant='caption'
									color='textSecondary'
									align='center'
								>
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
					</>
				)}
				{localFiles.length > 0 && (
					<>
						<Grid container spacing={2} sx={{ mt: 2 }}>
							{localFiles.map((file, index) => (
								<Grid item xs={12} sm={6} md={4} key={index}>
									<Tooltip title={file.name} arrow>
										<ThumbnailContainer>
											{file.preview ? (
												<img
													src={file.preview}
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
												<Tooltip title={getTooltipMessage(file, index)} arrow>
													<IconButton
														size='small'
														onClick={(e) => {
															e.stopPropagation();
															handleFavorite(index);
														}}
														sx={{ color: 'white' }}
													>
														{file.isFavorite ? (
															<Favorite />
														) : (
															<FavoriteBorder />
														)}
													</IconButton>
												</Tooltip>
												<Tooltip title={tooltipMessages.delete} arrow>
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
												</Tooltip>
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
								{!hasUploadedFiles && (
									<Button
										variant='klubiqMainButton'
										onClick={handleUpload}
										disabled={isUploading || hasUploadedFiles}
										startIcon={<Upload />}
									>
										{isUploading ? 'Uploading...' : uploadButtonText}
									</Button>
								)}
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
							{isDeleting && (
								<Box sx={{ width: '100%', mt: 1 }}>
									<LinearProgress
										variant='determinate'
										value={deleteProgress}
									/>
									<Typography
										variant='caption'
										color='error'
										align='center'
										display='block'
									>
										{deleteProgress}% Complete
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
				anchorOrigin={{
					vertical: 'top',
					horizontal: isMobile ? 'center' : 'right',
				}}
				sx={{
					width: '100%',
					maxWidth: isMobile ? '100%' : '600px',
					fontFamily: 'Maven Pro, sans-serif',
					fontSize: '16px',
				}}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					variant='filled'
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Card>
	);
};
