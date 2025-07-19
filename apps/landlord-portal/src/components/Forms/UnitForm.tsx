import {
	DynamicTanstackFormProps,
	FormFieldV1,
	KlubiqFormV1,
} from '@klubiq/ui-components';

import { openSnackbar } from '../../store/SnackbarStore/SnackbarSlice';
import { MEASUREMENTS } from '../../helpers/utils';
import { FC, useEffect, useRef, useState } from 'react';

import FormSkeleton from '../skeletons/FormSkeleton';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/system/useMediaQuery';
import { z } from 'zod';
import {
	Box,
	InputAdornment,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { AmenitiesDialog } from '../CustomFormComponents/AmenitiesDialog';
import { useAddUnitMutation, useGetPropertiesMetaDataQuery } from '../../store/PropertyPageStore/propertyApiSlice';
import { CategoryMetaDataType, UnitType } from '../../shared/type';
import { useDispatch } from 'react-redux';
import { screenMessages } from '../../helpers/screen-messages';

interface UnitFormProps {
	propertyId: string;
	categoryId: string | number;
	unit?: UnitType;
	onClose?: () => void;
}
const useDebounce = (callback: Function, delay: number) => {
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (...args: any[]) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};
const getGeneralUnitFields = (
	z: any,
	isMobile: boolean = false,
	unit: UnitType | undefined,
): FormFieldV1[] => [
	{
		name: 'bathrooms',
		type: 'number',
		label: 'Bathrooms',
		defaultValue: unit?.bathrooms || null,
		predefinedValue: unit?.bathrooms || null,
		required: false,
		width: isMobile ? '100%' : '48%',
		validation: {
			schema: z
				.number({ message: 'Bathrooms must be a number' })
				.nullable()
				.optional(),
		},
	},
	{
		name: 'toilets',
		type: 'number',
		label: 'Toilets',
		defaultValue: unit?.toilets || null,
		predefinedValue: unit?.toilets || null,
		required: false,
		width: isMobile ? '100%' : '48%',
		validation: {
			schema: z
				.number({ message: 'Toilets must be a number' })
				.nullable()
				.optional(),
		},
	},
	{
		name: 'area',
		type: 'number',
		label: 'Floor Plan',
		defaultValue: unit?.area || null,
		predefinedValue: unit?.area || null,

		width: isMobile ? '100%' : '48%',
		validation: {
			schema: z
				.any({ message: 'Floor plan is required' })
				.refine((data: any) => data.value !== null && data.value !== 0, {
					message: 'Floor plan is required',
				}),
		},
		customComponent: renderAreaField,
	},
];

function renderAreaField(fieldApi: any, fieldConfig: any, form: any) {
	const debouncedValidate = useDebounce(() => {
		const isArraySubField = fieldConfig && fieldConfig._isArraySubField;
		const arrayFieldName = fieldConfig._arrayFieldName;
		if (isArraySubField && arrayFieldName !== undefined) {
			form.validateField(arrayFieldName);
		}
	}, 500);
	return (
		<Box sx={{ width: '100%' }}>
			<TextField
				fullWidth
				type='text'
				label={fieldConfig.isInFieldLabel ? fieldConfig.label : undefined}
				value={fieldApi.state.value?.value || ''}
				onChange={(e) => {
					const { value } = e.target;
					if (/^\d*\.?\d*$/.test(value)) {
						const numValue = value === '' ? null : parseFloat(value);
						const newValue = {
							...fieldApi.state.value,
							value: numValue,
							unit: fieldApi.state.value?.unit || 'SqM',
						};
						fieldApi.handleChange(newValue);
						debouncedValidate();
					}
				}}
				onBlur={fieldApi.handleBlur}
				error={!!fieldApi.state.meta.errors[0]}
				InputProps={{
					inputProps: {
						inputMode: 'decimal',
						pattern: '[0-9]*',
						onKeyPress: (e: any) => {
							if (!/[\d.]/.test(e.key)) {
								e.preventDefault();
							}
							if (
								e.key === '.' &&
								(e.target as HTMLInputElement).value.includes('.')
							) {
								e.preventDefault();
							}
						},
					},
					endAdornment: (
						<InputAdornment position='end'>
							<Select
								value={fieldApi.state.value?.unit || 'SqM'}
								onChange={(e) => {
									const newValue = {
										...fieldApi.state.value,
										unit: e.target.value,
									};
									fieldApi.handleChange(newValue);
									debouncedValidate();
								}}
								sx={{ '.MuiOutlinedInput-notchedOutline': { border: 'none' } }}
							>
								{MEASUREMENTS.map((entry: any, index: number) => (
									<MenuItem value={entry.unit} key={`${entry.unit}-${index}`}>
										{entry.symbol}
									</MenuItem>
								))}
							</Select>
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
}

function renderAmenitiesDialog(fieldApi: any, fieldConfig: any, form: any) {
	return (
		<AmenitiesDialog
			field={{
				fieldConfig: {
					...fieldConfig,
					options: Array.isArray(fieldConfig.options)
						? fieldConfig.options.map((opt: { value: string | number }) => ({
								...opt,
								value: String(opt.value),
							}))
						: typeof fieldConfig.options === 'function'
							? fieldConfig
									.options(form.getValues())
									.map((opt: { value: string | number }) => ({
										...opt,
										value: String(opt.value),
									}))
							: [],
				},
				state: fieldApi.state,
				handleChange: fieldApi.handleChange,
			}}
			form={form}
		/>
	);
}

const getResidentialUnitFields = (
	z: any,
	customAmenitiesField: FormFieldV1,
	isMobile: boolean = false,
	unit: UnitType | undefined,
): FormFieldV1[] => [
	{
		name: 'bedrooms',
		type: 'number',
		label: 'Bedrooms',
		defaultValue: unit?.bedrooms || null,
		predefinedValue: unit?.bedrooms || null,
		required: true,
		width: isMobile ? '100%' : '48%',
		validation: {
			schema: z
				.any({ message: 'No. of bedrooms is required' })
				.refine((data: any) => data > 0, {
					message: 'No. of bedrooms is required',
				}),
		},
	},
	...getGeneralUnitFields(z, isMobile, unit),
	customAmenitiesField,
];

const getCommercialUnitFields = (
	z: any,
	customAmenitiesField: FormFieldV1,
	isMobile: boolean = false,
	unit: UnitType | undefined,
): FormFieldV1[] => [
	{
		name: 'offices',
		type: 'number',
		label: 'Offices',
		defaultValue: unit?.offices || null,
		predefinedValue: unit?.offices || null,
		required: true,
		width: isMobile ? '100%' : '48%',
		validation: {
			schema: z
				.any({ message: 'No. of offices is required' })
				.refine((data: any) => data > 0, {
					message: 'No. of offices is required',
				}),
		},
	},
	...getGeneralUnitFields(z, isMobile, unit),
	customAmenitiesField,
];

const getHospitalityUnitFields = (
	z: any,
	customAmenitiesField: FormFieldV1,
	isMobile: boolean = false,
	unit: UnitType | undefined,
): FormFieldV1[] => [
	{
		name: 'rooms',
		type: 'number',
		label: 'Rooms',
		defaultValue: unit?.rooms || null,
		predefinedValue: unit?.rooms || null,
		required: true,
		width: isMobile ? '100%' : '48%',
		validation: {
			schema: z
				.any({ message: 'No. of rooms is required' })
				.refine((data: any) => data > 0, {
					message: 'No. of rooms is required',
				}),
		},
	},
	...getGeneralUnitFields(z, isMobile, unit),
	customAmenitiesField,
];

const getUnitFieldsByCategory = (
	category: any,
	z: any,
	unit: UnitType | undefined,
	customAmenitiesField: FormFieldV1,
	isMobile: boolean = false,
) => {
	if (category?.metaData?.hasBedrooms) {
		return getResidentialUnitFields(z, customAmenitiesField, isMobile, unit);
	}
	if (category?.metaData?.hasRooms) {
		return getHospitalityUnitFields(z, customAmenitiesField, isMobile, unit);
	}
	if (category?.metaData?.hasOffices) {
		return getCommercialUnitFields(z, customAmenitiesField, isMobile, unit);
	}
	return [customAmenitiesField];
};
type CategoryType = {
	id: number;
	name: string;
	displayText: string;
	metaData?: CategoryMetaDataType;
	Image: any;
};

const mapOptions = (arr: any[] = [], labelKey = 'name', valueKey = 'name') =>
	arr.map((item) => ({
		value: item[valueKey],
		label: item[labelKey],
	}));
const UnitForm: FC<UnitFormProps> = ({ propertyId, categoryId, unit, onClose }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [unitData, setUnitData] = useState<UnitType | undefined>(undefined);
	const [addUnit] = useAddUnitMutation();
	const dispatch = useDispatch();
	const sortByName = (a: { name: string }, b: { name: string }) =>
		a.name.localeCompare(b.name);
	const queryResult = useGetPropertiesMetaDataQuery(undefined, {
		selectFromResult: ({ data, isLoading: loading }) => ({
			amenities: data?.amenities ? [...data.amenities].sort(sortByName) : [],
			categories: data?.categories ? [...data.categories].sort(sortByName) : [],
			isLoading: loading,
		}),
	});

	useEffect(() => {
		if (unit) {
			setUnitData(unit);
		} else {
			setUnitData(undefined);
		}
	}, [unit]);

	const { amenities, categories, isLoading } = queryResult;
	const amenitiesOptions = mapOptions(amenities);

	const customAmenitiesField: FormFieldV1 = {
		name: 'amenities',
		type: 'checkbox-group',
		label: 'Amenities',
		options: amenitiesOptions,
		defaultValue: unit?.amenities || [],
		predefinedValue: unit?.amenities || [],
		customComponent: renderAmenitiesDialog,
	};

	const getUnitFields = () => {
		const selectedCategory = categories?.find(
			(cat: CategoryType) => cat.id.toString() === categoryId?.toString(),
		);
		const unitFields: FormFieldV1[] = [
			{
				name: 'unitNumber',
				type: 'text',
				label: 'Unit Number/Name',
				defaultValue: unitData?.unitNumber || '',
				predefinedValue: unitData?.unitNumber || '',
				width: isMobile ? '100%' : '48%',
				required: true,
				validation: {
					schema: z
						.string({ message: 'Unit number is required' })
						.min(1, { message: 'Unit number is required' })
						.max(10, {
							message: 'Unit number must be less than 10 characters',
						}),
				},
			},
		];
		return [
			...unitFields,
			...getUnitFieldsByCategory(selectedCategory, z, unit, customAmenitiesField),
		];
	};

	const initialValues = {
		unitNumber: '',
		bathrooms: null,
		toilets: null,
		area: {
			value: null,
			unit: 'SqM',
		},
		rooms: null,
		offices: null,
		bedrooms: null,
		amenities: [],
	};

	const unitFormFields: FormFieldV1[] = getUnitFields();

	const onSubmit = async (values: any) => {
		try {
			console.log(values);
			const units = [{...values, propertyUuid: propertyId}];
			const response = await addUnit({ propertyUuid: propertyId, data: units }).unwrap();
			dispatch(openSnackbar({
				message:screenMessages.unit.add.success,
				severity: 'success',
				isOpen: true,
				duration: 5000,
			}	));
			onClose?.();
			return response;
		} catch (error) {
			const errorMessage = (error as any)?.message;
			dispatch(
				openSnackbar({
					message: errorMessage,
					severity: 'error',
					isOpen: true,
					duration: 7000,
				}),
			);
			throw error;
		}
	};
	const onReset = () => {
		setUnitData(unit);
		onClose?.();
	};

	const unitFormConfig: DynamicTanstackFormProps = {
		formWidth: '100%',
		submitButtonText: unitData ? 'Update Unit' : 'Add Unit',
		resetButtonText: 'Cancel',
		enableReset: true,
		fields: unitFormFields,
		initialValues,
		onSubmit,
		onReset,
		showBackdrop: true,
		backdropText: 'Adding unit...',
		fullWidthButtons: false,
		horizontalAlignment: 'right',
		verticalAlignment: 'top',
	};

	return (
		<>
			{isLoading ? (
				<FormSkeleton
					rows={unitFormFields.length}
					columns={[1, 1, 1]}
					sx={{ width: '100%', p: 2 }}
				/>
			) : (
				<KlubiqFormV1 {...unitFormConfig} />
			)}
		</>
	);
};

export default UnitForm;
