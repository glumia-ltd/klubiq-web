import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export type CardRadioOption = {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

interface CardRadioGroupProps {
  value: string;
  options: CardRadioOption[];
  onChange: (value: string) => void;
}

export const CardRadioGroup: React.FC<CardRadioGroupProps> = ({ value, options, onChange }) => (
  <Box display="flex" justifyContent="space-between">
    {options.map((option) => (
      <Paper
        key={option.value}
        elevation={value === option.value ? 8 : 2}
        onClick={() => onChange(option.value)}
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onChange(option.value)}
        sx={{
          cursor: 'pointer',
          border: value === option.value ? '2px solid primary.light' : '1px solid primary.contrastText',
          borderRadius: 3,
          p: 4,
          minWidth: 260,
          textAlign: 'center',
          //background: value === option.value ? 'rgba(33,150,243,0.08)' : 'inherit',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          outline: value === option.value ? '2px solid primary.light' : '1px solid primary.contrastText',
        }}
        aria-checked={value === option.value}
        role="radio"
      >
        <Box mb={2} fontSize={48} display="flex" justifyContent="center">
          {option.icon}
        </Box>
        <Typography variant="h6">
          {option.label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {option.description}
        </Typography>
      </Paper>
    ))}
  </Box>
);