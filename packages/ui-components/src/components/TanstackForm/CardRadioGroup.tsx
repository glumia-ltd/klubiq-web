import React from 'react';
import { Stack, Typography, Card, Skeleton } from '@mui/material';

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
  isLoading?: boolean;
  skeletonCount?: number;
}

export const CardRadioGroup: React.FC<CardRadioGroupProps> = ({ 
  value, 
  options, 
  onChange,
  isLoading = false,
  skeletonCount = 3
}) => {
  if (isLoading) {
    return (
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={3} gap={3} justifyContent="space-between">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Card
            key={`skeleton-${index}`}
            sx={{
              border: '1px solid',
              borderColor: 'primary.contrastText',
              borderRadius: 2,
              boxShadow: 'none',
              minWidth: 200,
              p: 4,
              textAlign: 'center',
            }}
          >
            <Stack mb={2} fontSize={48} direction="row" justifyContent="center" alignItems="center">
              <Skeleton variant="circular" width={48} height={48} />
            </Stack>
            <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
            <Skeleton variant="text" width="80%" sx={{ mx: 'auto', mt: 1 }} />
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <Stack direction={{ sm: 'column', md: 'row' }} spacing={3} gap={3} justifyContent="space-between">
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
};