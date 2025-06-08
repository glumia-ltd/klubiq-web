
import { useState, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Checkbox,
  Box,
  Chip,
  Select,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { KlubiqTSFormFields } from '@klubiq/ui-components';

interface TenantDialogProps {
  field: any; // FormFieldApi
  form: any;
}

type TenantOption = { value: string; label: string, email: string };

interface NewTenant {
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	companyName?: string;
}

export const TenantDialog: React.FC<TenantDialogProps> = ({
  field,
  form,
}) => {
  const [open, setOpen] = useState(false);
  const [newTenant, setNewTenant] = useState<NewTenant>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
  
  });

  // Use a local copy of options to allow adding custom amenities
  const [options] = useState(field.fieldConfig.options || []);
  
  // Ensure value is always an array
  const value = Array.isArray(field.state.value) ? field.state.value : [];
  
  // Initialize field value as an array if it's not already
  useEffect(() => {
    if (!Array.isArray(field.state.value)) {
      field.handleChange([]);
    }
  }, [field]);

  const handleAddTenant = () => {
    if (
      newTenant.email.trim() &&
      !options.some((a: TenantOption) => a.email === newTenant.email.trim())
    ) {
      form.setFieldValue('newTenant', [newTenant]);
      setOpen(false);
    }
  };

  return (
    <Stack spacing={1}>
      <Stack spacing={1}>
        <Select
          multiple
          value={value}
          onChange={(e) => field.handleChange(e.target.value as string[])}
          displayEmpty
          renderValue={() => `${value.length > 0 ? value.length : 'Select'} tenants`}
          sx={{
            '& .MuiSelect-select': {
              p: 1,
            },
          }}
        >
          {(field.fieldConfig.options || []).map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox
                checked={value.indexOf(option.value) > -1}
              />
              <ListItemText
                primary={option.label}
                primaryTypographyProps={{
                  color: 'primary.contrastText',
                }}
              />
            </MenuItem>
          ))}
        </Select>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            minHeight: 32,
          }}
        >
          {/* {value.map((amenity: string) => (
            <Chip
              key={amenity}
              label={amenity}
              size='small'
              onDelete={() => {
                const newValue = value.filter(
                  (v: string) => v !== amenity,
                );
                field.handleChange(newValue);
              }}
              sx={{
                height: 24,
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          ))} */}
        </Box>
      </Stack>
      <Stack direction='row' justifyContent='end'>
        <Button
          variant='klubiqTextButton'
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add tenant
        </Button>
      </Stack>
      <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Tenant</DialogTitle>
        <DialogContent>
          <KlubiqTSFormFields
            field={{
              ...field,
              state: {
                ...field.state,
                value: newTenant.firstName,
                meta: { ...field.state.meta, errors: [] },
              },
              handleChange: setNewTenant,
              handleBlur: () => {},
            }}
            form={form}
            fieldConfig={{
              name: 'newTenant.firstName',
              type: 'text',
              label: 'First Name',
              required: true,
            }}
          />
           <KlubiqTSFormFields
            field={{
              ...field,
              state: {
                ...field.state,
                value: newTenant.lastName,
                meta: { ...field.state.meta, errors: [] },
              },
              handleChange: setNewTenant,
              handleBlur: () => {},
            }}
            form={form}
            fieldConfig={{
              name: 'newTenant.lastName',
              type: 'text',
              label: 'Last Name',
              required: true,
            }}
          />
           <KlubiqTSFormFields
            field={{
              ...field,
              state: {
                ...field.state,
                value: newTenant.email,
                meta: { ...field.state.meta, errors: [] },
              },
              handleChange: setNewTenant,
              handleBlur: () => {},
            }}  
            form={form}
            fieldConfig={{
              name: 'newTenant.email',
              type: 'text',
              label: 'Email',
              required: true,
            }}  
          />
           <KlubiqTSFormFields
            field={{
              ...field,
              state: {
                ...field.state,
                value: newTenant.phone,
                meta: { ...field.state.meta, errors: [] },
              },
              handleChange: setNewTenant,
              handleBlur: () => {},
            }}  
            form={form}
            fieldConfig={{
              name: 'newTenant.phone',
              type: 'text',
              label: 'Phone',
              required: false,
            }}  
            />
           <KlubiqTSFormFields
            field={{
              ...field,
              state: {
                ...field.state,
                value: newTenant.companyName,
                meta: { ...field.state.meta, errors: [] },
              },
              handleChange: setNewTenant,
              handleBlur: () => {},
            }}    
            form={form}
            fieldConfig={{
              name: 'newTenant.companyName',
              type: 'text',
              label: 'Company Name',
              required: false,
            }}  
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTenant} variant='klubiqMainButton'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};