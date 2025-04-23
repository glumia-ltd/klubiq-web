import React from 'react';
import { useForm, FormProvider, UseFormProps, FieldValues } from 'react-hook-form';
import { Box, Button, Stack } from '@mui/material';

export interface FormProps<T extends FieldValues> extends UseFormProps<T> {
  children: React.ReactNode;
  onSubmit: (data: T) => void | Promise<void>;
  submitButtonText?: string;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Form<T extends FieldValues>({
  children,
  onSubmit,
  submitButtonText = 'Submit',
  isLoading = false,
  disabled = false,
  fullWidth = true,
  maxWidth = 'sm',
  ...formProps
}: FormProps<T>) {
  const methods = useForm<T>(formProps);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        sx={{
          width: fullWidth ? '100%' : 'auto',
          maxWidth: maxWidth,
          mx: 'auto',
        }}
      >
        <Stack spacing={3}>
          {children}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading || disabled}
            sx={{ mt: 2 }}
          >
            {isLoading ? 'Loading...' : submitButtonText}
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
} 