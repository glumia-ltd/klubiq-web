import { useState } from 'react';
import { Add } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Stack,
	Checkbox,
	//FormControlLabel,
	Box,
	Chip,
	Select,
	MenuItem,
	ListItemText,
} from '@mui/material';
import { KlubiqTSFormFields } from '@klubiq/ui-components';

interface AmenitiesDialogProps {
	field: any; // FormFieldApi
	form: any;
}
type AmenityOption = { value: string; label: string };
// type FieldType = {
// 	fieldConfig: { options?: AmenityOption[] };
// 	state: { value: string[] };
// 	handleChange: (value: string[]) => void;
// };
export const AmenitiesDialog: React.FC<AmenitiesDialogProps> = ({
	field,
	form,
}) => {
	const [open, setOpen] = useState(false);
	const [customAmenity, setCustomAmenity] = useState('');
	// Use a local copy of options to allow adding custom amenities
	const [options, setOptions] = useState(field.fieldConfig.options || []);
	const value = Array.isArray(field.state.value) ? field.state.value : [];

	const handleAddCustomAmenity = () => {
		if (
			customAmenity.trim() &&
			!options.some((a: AmenityOption ) => a.value === customAmenity.trim())
		) {
			const newOption = {
				value: customAmenity.trim(),
				label: customAmenity.trim(),
			};
			setOptions([...options, newOption]);
			field.handleChange([...value, customAmenity.trim()]);
			setCustomAmenity('');
			setOpen(false);
		}
	};

	return (
		<Stack spacing={1}>
			<Stack spacing={1}>
				<Select
					multiple
					value={field.state.value || []}
					onChange={(e) => field.handleChange(e.target.value as string[])}
					displayEmpty
					renderValue={() => 'Select amenities'}
					sx={{
						'& .MuiSelect-select': {
							p: 1,
						},
					}}
				>
					{(field.fieldConfig.options || []).map((option: any) => (
						<MenuItem key={option.value} value={option.value}>
							<Checkbox
								checked={field.state.value?.indexOf(option.value) > -1}
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
					{field.state.value?.map((value: string) => (
						<Chip
							key={value}
							label={value}
							size='small'
							onDelete={() => {
								const newValue = field.state.value.filter(
									(v: string) => v !== value,
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
					))}
				</Box>
			</Stack>
			<Stack direction='row' justifyContent='end'>
				<Button
					variant='klubiqOutlinedButton'
					startIcon={<Add />}
					onClick={() => setOpen(true)}
				>
					Add custom amenities
				</Button>
			</Stack>
			<Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Add Custom Amenity</DialogTitle>
				<DialogContent>
					<KlubiqTSFormFields
						field={{
							...field,
							state: {
								...field.state,
								value: customAmenity,
								meta: { ...field.state.meta, errors: [] },
							},
							handleChange: setCustomAmenity,
							handleBlur: () => {},
						}}
						form={form}
						fieldConfig={{
							name: 'customAmenity',
							type: 'text',
							label: '',
							required: false,
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button onClick={handleAddCustomAmenity} variant='klubiqMainButton'>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
};
