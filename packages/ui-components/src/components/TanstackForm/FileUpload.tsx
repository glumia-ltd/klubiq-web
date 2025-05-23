// packages/ui-components/src/components/TanstackForm/FileUpload.tsx
import { Card, CardContent, Box, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRef } from 'react';

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  value: FileList | null;
  onChange: (value: FileList | null) => void;
  onBlur: () => void;
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
  subtitle?: string;
  caption?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  accept,
  multiple = false,
  subtitle = 'COVER PHOTO', // default
  caption = 'Upload a cover photo for your property', // default
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
    onBlur();
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {subtitle}
        </Typography>
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
            <CloudUploadIcon fontSize="large" />
          </IconButton>
          <Typography variant="body2" color="textSecondary" align="center">
            {caption}
          </Typography>
          <input
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
        {helperText && (
          <Typography variant="caption" color={error ? 'error' : 'textSecondary'} display="block" mt={1}>
            {helperText}
          </Typography>
        )}
        {value && value.length > 0 && (
          <Box mt={2}>
            <Typography variant="caption" color="textSecondary">
              Selected file{value.length > 1 ? 's' : ''}:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {Array.from(value).map((file, idx) => (
                <li key={idx}>
                  <Typography variant="caption">{file.name}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};