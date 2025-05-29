// packages/ui-components/src/components/TanstackForm/FileUpload.tsx
import { Card, CardContent, Box, Typography, IconButton, styled, Grid, Tooltip, Stack } from '@mui/material';
import { CloudUpload, Favorite, FavoriteBorder, Delete, Image } from '@mui/icons-material';
import { useRef, useState, useEffect } from 'react';

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

interface FileWithPreview extends File {
  preview?: string;
  isFavorite?: boolean;
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
  tooltipMessages?: {
    favorite?: string;
    unfavorite?: string;
    delete?: string;
    sizeLimit?: string;
    upload?: string;
  };
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
  subtitle = 'COVER PHOTO',
  caption = 'Upload a cover photo for your property',
  tooltipMessages = {
    favorite: 'Click to mark as favorite',
    unfavorite: 'Click to remove from favorites',
    delete: 'Click to delete',
    sizeLimit: 'Maximum file size: {size}MB',
    upload: 'Click or drag files here to upload'
  }
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [localFiles, setLocalFiles] = useState<FileWithPreview[]>([]);

  // Initialize and sync localFiles with form value
  useEffect(() => {
    if (value) {
      const filesWithPreview = Array.from(value).map(file => {
        const existingFile = localFiles.find(f => f.name === file.name);
        const fileWithPreview = file as FileWithPreview;
        
        // Keep existing preview URL and favorite status if file exists
        if (existingFile) {
          fileWithPreview.preview = existingFile.preview;
          fileWithPreview.isFavorite = existingFile.isFavorite;
        } else {
          fileWithPreview.preview = URL.createObjectURL(file);
          fileWithPreview.isFavorite = false;
        }
        
        return fileWithPreview;
      });
      setLocalFiles(filesWithPreview);
    } else {
      setLocalFiles([]);
    }
  }, [value]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize) {
      setErrorMessage(`File ${file.name} exceeds the size limit of ${maxSize / (1024 * 1024)}MB`);
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

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
      Array.from(value).forEach(file => {
        dataTransfer.items.add(file);
      });
    }
    
    // Add new files
    validFiles.forEach(file => {
      dataTransfer.items.add(file);
    });

    onChange(dataTransfer.files);
    onBlur();
  };

  const handleFavorite = (index: number) => {
    const dataTransfer = new DataTransfer();
    const newFiles = [...localFiles];
    newFiles[index].isFavorite = !newFiles[index].isFavorite;
    
    newFiles.forEach(file => {
      dataTransfer.items.add(file);
    });
    
    onChange(dataTransfer.files);
  };

  const handleDelete = (index: number) => {
    const dataTransfer = new DataTransfer();
    const newFiles = [...localFiles];
    URL.revokeObjectURL(newFiles[index].preview || '');
    newFiles.splice(index, 1);
    
    newFiles.forEach(file => {
      dataTransfer.items.add(file);
    });
    
    onChange(dataTransfer.files);
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

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      localFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [localFiles]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {subtitle}
        </Typography>
        <Tooltip title={tooltipMessages.upload} arrow>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            border="1px dashed"
            borderColor="grey.400"
            borderRadius={2}
            p={4}
            sx={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
            onClick={handleClick}
            tabIndex={0}
            aria-label={caption}
          >
            <IconButton color="primary" component="span" tabIndex={-1} disableRipple>
              <CloudUpload fontSize="large" />
            </IconButton>
            <Typography variant="body2" color="textSecondary" align="center">
              {caption}
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center">
              {tooltipMessages?.sizeLimit?.replace('{size}', (maxSize / (1024 * 1024)).toString()) || `Maximum file size: ${maxSize / (1024 * 1024)}MB`}
            </Typography>
            <VisuallyHiddenInput
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              onBlur={onBlur}
              aria-label="File input"
            />
          </Box>
        </Tooltip>
        {(helperText || errorMessage) && (
          <Typography variant="caption" color={error ? 'error' : 'textSecondary'} display="block" mt={1}>
            {errorMessage || helperText}
          </Typography>
        )}
        {localFiles.length > 0 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {localFiles.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Tooltip title={getTooltipMessage(file, index)} arrow>
                  <ThumbnailContainer>
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} />
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        bgcolor="grey.100"
                      >
                        <Image />
                      </Box>
                    )}
                    <Stack
                      direction="row"
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
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(index);
                        }}
                        sx={{ color: 'white' }}
                      >
                        {file.isFavorite ? <Favorite /> : <FavoriteBorder />}
                      </IconButton>
                      <IconButton
                        size="small"
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
        )}
      </CardContent>
    </Card>
  );
};