import React from 'react';
import { Box, Typography, Paper, Radio } from '@mui/material';

export type RadioCardOption = {
  value: string;
  label: string;
  description?: string;
};

interface RadioCardGroupProps {
  value: string;
  options: RadioCardOption[];
  onChange: (value: string) => void;
}

export const RadioCardGroup: React.FC<RadioCardGroupProps> = ({ value, options, onChange }) => (
  <Box display="flex" flexDirection="column" gap={3}>
    {options.map((option) => (
      <Paper
        key={option.value}
        elevation={0}
        onClick={() => onChange(option.value)}
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onChange(option.value)}
        sx={{
          cursor: 'pointer',
          border: value === option.value ? '2px solid primary.light' : '1px solid primary.contrastText',
          borderRadius: 2,
          p: 3,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          background: 'transparent',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          outline: value === option.value ? '2px solid primary.light' : 'none',
        }}
        aria-checked={value === option.value}
        role="radio"
      >
        <Radio
          checked={value === option.value}
          tabIndex={-1}
          value={option.value}
          sx={{ mt: 0.5 }}
        />
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {option.label}
          </Typography>
          {option.description && (
            <Typography variant="body1" fontWeight={500} mt={1}>
              {option.description}
            </Typography>
          )}
        </Box>
      </Paper>
    ))}
  </Box>
);