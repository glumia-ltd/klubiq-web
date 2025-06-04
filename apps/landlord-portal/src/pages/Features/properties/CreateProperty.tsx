import {
	FormStep,
	KlubiqFormV1,
	//	ArrayFormFieldV1,
	InputAdornment as InputAdornmentType,
	FormFieldV1,
} from '@klubiq/ui-components';
import { CategoryMetaDataType } from '../../../shared/type';
import { useAddPropertyMutation, useGetPropertiesMetaDataQuery } from '../../../store/PropertyPageStore/propertyApiSlice';
import {
	EmojiOneBuildingIcon,
	EmojiOneHomeIcon,
	FloorPlan,
	HouseIcon,
} from '../../../components/Icons/CustomIcons';
import { CardRadioGroup, RadioCardGroup } from '@klubiq/ui-components';
import {
	HomeIcon,
	PropertyDetailsIcon,
	UnitTypeIcon,
} from '../../../components/Icons/CustomIcons';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../../store/AuthStore/AuthSlice';
import { AmenitiesDialog } from '../../../components/CustomFormComponents/AmenitiesDialog';
//import { UnitsAccordionArray } from '../../../components/CustomFormComponents/UnitsAccordionArray';
import {
	TextField,
	Select,
	MenuItem,
	Box,
	InputAdornment,
	useMediaQuery,
	useTheme,
	// Typography,
	// Stack,
	// Button,
} from '@mui/material';
import { getCurrencySymbol, MEASUREMENTS } from '../../../helpers/utils';
import { z } from 'zod';
import countriesList from '../../../helpers/countries-meta.json';
import { GooglePlacesAutocomplete } from '@klubiq/ui-components';
import { Bathroom, BedroomParent, Business, Wc } from '@mui/icons-material';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftArrowIcon } from '../../../components/Icons/LeftArrowIcon';
import { useUploadImagesMutation } from '../../../store/GlobalStore/globalApiSlice';
import { useDeleteFileMutation } from '../../../store/GlobalStore/globalApiSlice';
import { consoleError, consoleInfo, consoleLog } from '../../../helpers/debug-logger';
import { Property } from '../../../page-tytpes/properties/request.types';


interface AddressValue {
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	latitude: number;
	longitude: number;
	isManualAddress: boolean;
}

const MAX_UNITS = 10;

const countries = countriesList
	.filter((item) => item.active)
	.map((item) => ({ id: item.code, label: item.name, value: item.name }));
type CategoryType = {
	id: number;
	name: string;
	displayText: string;
	metaData?: CategoryMetaDataType;
	Image: any;
};
const unit = {
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
const getInitialUnits = (): Record<string, any>[] => {
	return Array.from({ length: MAX_UNITS }, (_, index) => ({
		...unit,
		unitNumber: `Unit ${index + 1}`,
	}));
};

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

const mapOptions = (arr: any[] = [], labelKey = 'name', valueKey = 'name') =>
	arr.map((item) => ({
		value: item[valueKey],
		label: item[labelKey],
	}));

const getGeneralUnitFields = (z: any, isMobile: boolean = false): FormFieldV1[] => [
	{
		name: 'bathrooms',
		type: 'number',
		label: 'Bathrooms',
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
		required: true,
		width: isMobile ? '100%' : 	'48%',
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
	isMobile: boolean = false
): FormFieldV1[] => [
	{
		name: 'bedrooms',
		type: 'number',
		label: 'Bedrooms',
		required: true,
		width: isMobile ? '100%' : '48%',
	},
	...getGeneralUnitFields(z, isMobile),
	customAmenitiesField,
];

const getCommercialUnitFields = (
	z: any,
	customAmenitiesField: FormFieldV1,
	isMobile: boolean = false
): FormFieldV1[] => [
	{
		name: 'offices',
		type: 'number',
		label: 'Offices',
		required: true,
		width: isMobile ? '100%' : '48%',
		validation: {
			schema: z
				.number({ message: 'Offices must be a number' })
				.min(1, { message: 'Offices must be greater than 0' })
				.nullable(),
		},
	},
	...getGeneralUnitFields(z, isMobile),
	customAmenitiesField,
];

const getHospitalityUnitFields = (
	z: any,
	customAmenitiesField: FormFieldV1,
	isMobile: boolean = false
): FormFieldV1[] => [
	{
		name: 'rooms',
		type: 'number',
		label: 'Rooms',
		required: true,
		width: isMobile ? '100%' : '48%',
		validation: {
			schema: z
				.number({ message: 'Rooms must be a number' })
				.min(1, { message: 'Rooms must be greater than 0' })
				.nullable(),
		},
	},
	...getGeneralUnitFields(z, isMobile),
	customAmenitiesField,
];

const getUnitFieldsByCategory = (
	category: any,
	z: any,
	customAmenitiesField: FormFieldV1,
	isMobile: boolean = false
) => {
	if (category?.metaData?.hasBedrooms) {
		return getResidentialUnitFields(z, customAmenitiesField, isMobile);
	}
	if (category?.metaData?.hasRooms) {
		return getHospitalityUnitFields(z, customAmenitiesField, isMobile);
	}
	if (category?.metaData?.hasOffices) {
		return getCommercialUnitFields(z, customAmenitiesField, isMobile);
	}
	return [customAmenitiesField];
};

export const CreateProperty = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const { user } = useSelector(getAuthState);
	const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
	const queryResult = useGetPropertiesMetaDataQuery(undefined, {
		selectFromResult: ({ data, isLoading: loading }) => ({
			purposes: data?.purposes ? [...data.purposes].sort(sortByName) : [],
			amenities: data?.amenities ? [...data.amenities].sort(sortByName) : [],
			types: data?.types ? [...data.types].sort(sortByName) : [],
			categories: data?.categories ? [...data.categories].sort(sortByName) : [],
			isLoading: loading,
		}),
	});
	const { purposes, amenities, types, categories, isLoading } = queryResult;
	const [addProperty] = useAddPropertyMutation();
	const [uploadImages] = useUploadImagesMutation();
	const [deleteFile] = useDeleteFileMutation();

	const icons: Record<string, any> = {
		HouseIcon,
		EmojiOneHomeIcon,
		EmojiOneBuildingIcon,
	};

	const cardData = categories?.map((category: CategoryType) => ({
		...category,
		id: category?.id,
		Image: icons[category.metaData?.icon || ''],
	}));

	const amenitiesOptions = mapOptions(amenities);

	const customAmenitiesField: FormFieldV1 = {
		name: 'amenities',
		type: 'checkbox-group',
		label: 'Amenities',
		options: amenitiesOptions,
		customComponent: renderAmenitiesDialog,
	};

	const getSingleUnitFields = (values: Record<string, any>) => {
		const selectedCategory = categories?.find(
			(cat: CategoryType) =>
				cat.id.toString() === values?.category?.id?.toString(),
		);
		return getUnitFieldsByCategory(selectedCategory, z, customAmenitiesField, isMobile);
	};

	const getMultiUnitFields = (values: Record<string, any>) => {
		const selectedCategory = categories?.find(
			(cat: CategoryType) =>
				cat.id.toString() === values?.category?.id?.toString(),
		);
		const unitFields: FormFieldV1[] = [
			{
				name: 'unitNumber',
				type: 'text',
				label: 'Unit Number/Name',
				defaultValue: '',
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
			...getUnitFieldsByCategory(selectedCategory, z, customAmenitiesField),
			
		];
	};

	const initialValues = {
		category: { id: '' },
		purpose: { id: '' },
		propertyDetails: {
			typeId: '',
			name: '',
			description: '',
			marketValue: null,
			sellingPrice: null,
		},
		address: {
			addressLine1: '',
			addressLine2: '',
			city: '',
			state: '',
			postalCode: '',
			latitude: '',
			longitude: '',
			country: '',
			isManualAddress: true,
		},
		unitDetails: { unitType: '', totalUnits: '2' },
		singleUnit: { ...unit },
		propertyImages: {},
		customAmenities: [],
		multiUnits: getInitialUnits(),
	};

	const uploadPropertyImages = async (files: File[]) => {
		const organizationUuid = user?.organizationUuid;
		const organizationName = user?.organization || user?.firstName + user?.lastName || 'glumia';
		const rootFolder = 'properties';
		consoleLog('Uploading property images', files, organizationUuid, organizationName, rootFolder);
		const response = await uploadImages({ files, organizationUuid, organizationName, rootFolder }).unwrap();
		consoleInfo('Uploading property images response', response);
		return response;
	}
	const deletePropertyImage = async (fileId: string) => {
		await deleteFile(fileId);
	}

	const propertyForm: FormStep[] = [
		// Property Category & Purpose
		{
			title: 'Property Category & Purpose',
			fields: [
				{
					name: 'category',
					type: 'group',
					label: 'PROPERTY CATEGORY',
					layout: 'row',
					spacing: 2,
					groupFields: [
						{
							name: 'id',
							type: 'radio',
							label: 'Select Property Category',
							required: true,
							customComponent: (field) => {
								const Component = CardRadioGroup;
								return (
									<Component
										value={field.state.value}
										onChange={field.handleChange}
										isLoading={isLoading}
										skeletonCount={3}
										options={
											cardData
												? cardData.map((category) => ({
														value: category.id.toString(),
														label: category.name,
														description: category.displayText,
														icon: category.Image ? (
															<category.Image />
														) : undefined,
													}))
												: []
										}
									/>
								);
							},
						},
					],
				},
				{
					name: 'purpose',
					type: 'group',
					label: 'Is this property for sale or rent?',
					layout: 'column',
					spacing: 2,
					groupFields: [
						{
							name: 'id',
							type: 'radio',
							label: '',
							required: true,
							customComponent: (field) => {
								const Component = RadioCardGroup;
								return (
									<Component
										value={field.state.value}
										isLoading={isLoading}
										skeletonCount={2}
										onChange={field.handleChange}
										options={
											purposes
												? purposes.map((purpose: CategoryType) => ({
														value: purpose.id.toString(),
														label: purpose.name,
													}))
												: []
										}
									/>
								);
							},
						},
					],
				},
			],
			icon: { icon: <HomeIcon /> },
		},
		// Property Details
		{
			title: 'Property Details',
			fields: [
				{
					name: 'propertyDetails',
					type: 'group',
					label: 'PROPERTY DETAILS',
					layout: 'row',
					required: true,
					spacing: 2,
					groupFields: [
						{
							name: 'typeId',
							type: 'select',
							label: 'Select Property Type',
							required: true,
							width: '100%',
							options: types
								? types.map((type: CategoryType) => ({
										value: type.id.toString(),
										label: type.name,
									}))
								: [],
						},
						{
							name: 'name',
							type: 'text',
							label: 'What is the name of your property?',
							required: true,
							width: '100%',
							validation: {
								schema: z
									.string({ message: 'Enter a name for your property' })
									.min(1, { message: 'Enter a name for your property' }),
							},
						},
						{
							name: 'marketValue',
							type: 'decimal',
							label: 'What is the market value of your property?',
							width: '100%',
							formatType: 'decimal',
							decimals: 2,
							adornment: {
								prefix: getCurrencySymbol(user?.orgSettings),
							} as InputAdornmentType,
							showIf: (values) => {
								const selectedPurpose = purposes?.find(
									(purpose: CategoryType) =>
										purpose.id.toString() === values?.purpose?.id?.toString(),
								);
								return Boolean(selectedPurpose?.name === 'Sale');
							},
						},
						{
							name: 'sellingPrice',
							type: 'decimal',
							label: 'What is the selling price of your property?',
							formatType: 'decimal',
							decimals: 2,
							adornment: {
								prefix: getCurrencySymbol(user?.orgSettings),
							} as InputAdornmentType,
							width: '100%',
							showIf: (values) => {
								const selectedPurpose = purposes?.find(
									(purpose: CategoryType) =>
										purpose.id.toString() === values?.purpose?.id?.toString(),
								);
								return Boolean(selectedPurpose?.name === 'Sale');
							},
						},
						{
							name: 'description',
							type: 'textarea',
							rows: 3,
							label: 'Describe your property',
							width: '100%',
						},
					],
				},
				{
					name: 'propertyImages',
					type: 'file',
					label: 'Property Images',
					validation: {
						schema: z.any().optional(),
					},
					fileConfig: {
						subtitle: 'PROPERTY IMAGES',
						caption: 'Drag and drop or click to upload images of your property and mark the cover photo as favorite',
						accept: 'image/*',
						multiple: true,
						onUpload: uploadPropertyImages,
						onDelete: deletePropertyImage,
						uploadButtonText: 'Upload Images',
						maxFavorites: 1,
						tooltipMessages: {
							upload: 'Upload property images',
							sizeLimit: 'Maximum file size is 10MB',
						},
					},
				},
			],
			icon: { icon: <PropertyDetailsIcon /> },
		},
		// Unit(s) Details
		{
			title: 'Unit Details',
			fields: [
				{
					name: 'unitDetails',
					type: 'group',
					label: 'UNIT TYPE',
					layout: 'column',
					spacing: 2,
					groupFields: [
						{
							name: 'unitType',
							type: 'radio',
							label: 'Does your property have multiple units?',
							required: true,
							customComponent: (field) => (
								<RadioCardGroup
									value={field.state.value}
									onChange={(value) => {
										field.handleChange(value);
									}}
									options={[
										{
											value: 'single',
											label: 'Single Unit',
											description:
												'Single unit properties are rentals in which there is only one rental unit associated to a specific address. This type of property does not allow to add any units.',
										},
										{
											value: 'multi',
											label: 'Multi Unit',
											description:
												'Multi-unit properties are rentals in which there are multiple rental units (with multiple units and leases) associated to a specific (single) address. This type of property allows adding units.',
										},
									]}
								/>
							),
						},
						{
							name: 'totalUnits',
							type: 'select',
							label: 'How many units does your property have?',
							required: (values) => values.unitDetails.unitType === 'multi',
							showIf: (values) => values.unitDetails.unitType === 'multi',
							options: [
								...Array.from({ length: MAX_UNITS - 1 }, (_, i) => ({
									value: `${i + 2}`,
									label: `${i + 2} Units`,
								})),
							],
						},
					],
				},
				{
					name: 'address',
					type: 'group',
					label: 'ADDRESS',
					layout: isMobile ? 'column' : 'row',
					spacing: 2,
					groupFields: [
						{
							name: 'addressLine1',
							type: 'text',
							label: '',
							required: true,
							width: isMobile ? '100%' : '48%',
							addressConfig: {
								apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
								country: user?.orgSettings?.countryCode || 'NG',
								label: 'Street Address',
							},
							customComponent: (fieldApi, fieldConfig, form) => {
								const debouncedValidate = useDebounce(() => {
									form.validateField('address');
								}, 500); // 500ms delay

								return (
									<Box sx={{ width: '100%' }}>
										<GooglePlacesAutocomplete
											apiKey={fieldConfig.addressConfig?.apiKey ?? ''}
											//value={fieldApi.state.value}
											value={form.state.values.address.addressLine1}
											label={'Street Address'}
											onChange={(value: AddressValue) => {
												// Update the entire address group
												form.setFieldValue('address', {
													...form.state.values.address,
													...value,
												});
												debouncedValidate();
												// Update the individual field
												//fieldApi.handleChange(value.addressLine1);
											}}
											onBlur={fieldApi.handleBlur}
											error={!!fieldApi.state.meta.errors[0]}
											helperText={fieldApi.state.meta.errors[0]}
											country={fieldConfig.addressConfig?.country}
											required={
												typeof fieldConfig.addressConfig?.required ===
												'function'
													? fieldConfig.addressConfig?.required(
															form.state.values,
														)
													: fieldConfig.addressConfig?.required
											}
										/>
									</Box>
								);
							},
						},
						{
							name: 'addressLine2',
							type: 'text',
							label: 'Apartment, suite, or unit',
							required: false,
							width: isMobile ? '100%' : '48%',
						},
						{
							name: 'country',
							type: 'select',
							label: 'Country',
							required: true,
							width: isMobile ? '100%' : '48%',
							options: countries,
						},
						{
							name: 'state',
							type: 'text',
							label: 'State (Province or Region)',
							required: false,
							width: isMobile ? '100%' : '48%',
						},
						{
							name: 'city',
							type: 'text',
							label: 'City',
							required: false,
							width: isMobile ? '100%' : '48%',
						},
						{
							name: 'postalCode',
							type: 'text',
							label: 'Postal Code',
							required: false,
							width: isMobile ? '100%' : '48%',
						},
						{
							name: 'latitude',
							type: 'hidden',
							label: 'Latitude',
						},
						{
							name: 'longitude',
							type: 'hidden',
							label: 'Longitude',
						},
						{
							name: 'isManualAddress',
							type: 'hidden',
							label: 'Is Manual Address',
						},
					],
				},
				{
					name: 'singleUnit',
					type: 'group',
					label: 'UNIT DETAILS',
					layout: isMobile ? 'column' : 'row',
					spacing: 2,
					showIf: (values) => values.unitDetails.unitType === 'single',
					groupFields: (values) => getSingleUnitFields(values),
				},
				{
					name: 'multiUnits',
					type: 'array',
					label: 'MULTI UNITS',
					showIf: (values) => values.unitDetails.unitType === 'multi',
					fields: (values) => getMultiUnitFields(values), // or your array of subfields
					useAccordion: true,
					summaryFields: [
						{
							field: 'unitNumber',
						},
						{
							field: 'bedrooms',
							icon: <BedroomParent fontSize='small' />,
							label: 'Beds',
						},
						{
							field: 'rooms',
							icon: <BedroomParent fontSize='small' />,
							label: 'Rooms',
						},
						{
							field: 'offices',
							icon: <Business fontSize='small' />,
							label: 'Offices',
						},
						{
							field: 'bathrooms',
							icon: <Bathroom fontSize='small' />,
							label: 'Bathrooms',
						},
						{
							field: 'toilets',
							icon: <Wc fontSize='small' />,
							label: 'Toilets',
						},
						{
							field: 'area.value',
							icon: <FloorPlan fontSize='small' />,
							label: 'Area',
						},
					],
					getArrayLength: (values) =>
						parseInt(values.unitDetails.totalUnits, 10),
					arrayLengthMin: 2,
					arrayLengthMax: MAX_UNITS,
					showAddButton: false,
					arrayLengthSelectorField: 'unitDetails.totalUnits',
				},
			],
			icon: { icon: <UnitTypeIcon /> },
		},
	];

	const onSubmit = async (values: any) => {

		consoleLog('submitted', values);
		if(!values.category?.id || !values.purpose?.id || !values.typeId) {
			consoleError('Please select a category, purpose, and type');
			return;
		}
		const newPropertyData: Property = {
			categoryId: values.category.id,
			purposeId: values.purpose.id,
			typeId: values.typeId,
			name: values.name,
			marketValue: values.marketValue,
			sellingPrice: values.sellingPrice,
			description: values.description,
			address: values.address,
			images: values.propertyImages,
			isMultiUnit: values.unitDetails.unitType === 'multi',
			units: values.unitDetails.unitType === 'single' ? [values.singleUnit] : values.multiUnits,

		}
		const response = await addProperty(values);
		consoleInfo('addProperty response', response);
		return Promise.resolve(values);
	};

		const handleAllPropertiesClick = () => {
			navigate('/properties');
		};

	return (
		<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
			<KlubiqFormV1
				fields={propertyForm}
				initialValues={initialValues}
				onSubmit={onSubmit}
				submitButtonText='Create Property'
				isMultiStep={true}
				showTopBackButton={true}
				topBackButton={{
					showDialog: true,
					dialogTitle: 'Are you sure you want to leave?',
					dialogDescription: 'You have unsaved changes. If you leave now, your changes will be lost.',
					dialogConfirmButtonText: 'Leave',
					dialogCancelButtonText: 'Continue',
					onClick: handleAllPropertiesClick,
					text: 'All Properties',
					variant: 'text',
					startIcon: <LeftArrowIcon />,

				}}
			/>
		</Box>
	);
};
