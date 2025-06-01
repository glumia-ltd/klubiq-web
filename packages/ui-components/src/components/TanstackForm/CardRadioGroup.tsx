import React from 'react';
import { Stack, Typography, Card } from '@mui/material';

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
  <Stack direction={{ sm: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
    {options.map((option) => (
      <Card
        key={option.value}
        onClick={() => onChange(option.value)}
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onChange(option.value)}
        sx={{
          cursor: 'pointer',
          border: value === option.value ? '2.5px solid' : '1px solid',
          borderColor: value === option.value ? 'primary.light' : 'primary.contrastText',
          borderRadius: 2,
          boxShadow: 'none',
          p: 4,
          minWidth: 260,
          textAlign: 'center',
          outline: value === option.value ? '2px solid primary.light' : '1px solid primary.contrastText',
        }}
        aria-checked={value === option.value}
        role="radio"
      >
        <Stack mb={2} fontSize={48} direction="row" justifyContent="center" alignItems="center">
          {option.icon}
        </Stack>
        <Typography variant="h6">
          {option.label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {option.description}
        </Typography>
      </Card>
    ))}
  </Stack>
);