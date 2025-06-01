import {
	FormStep,
	KlubiqFormV1,
	//	ArrayFormFieldV1,
	InputAdornment as InputAdornmentType,
	FormFieldV1,
} from '@klubiq/ui-components';
import { CategoryMetaDataType } from '../../../shared/type';
import { useGetPropertiesMetaDataQuery } from '../../../store/PropertyPageStore/propertyApiSlice';
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
} from '@mui/material';
import { getCurrencySymbol, MEASUREMENTS } from '../../../helpers/utils';
import { z } from 'zod';
import countriesList from '../../../helpers/countries-meta.json';
import { GooglePlacesAutocomplete } from '@klubiq/ui-components';
import { Bathroom, BedroomParent, Business, Wc } from '@mui/icons-material';

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
	amenities: [],
};
export const CreateProperty = () => {
	const initialValues = {
		category: {
			id: '',
		},
		purpose: {
			id: '',
		},
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
		unitDetails: {
			unitType: '',
			totalUnits: '2',
		},
		singleUnit: {
			rooms: null,
			offices: null,
			bedrooms: null,
			...unit,
		},
		propertyImages: {},
		customAmenities: [],
		multiUnits: [
			{
				unitNumber: 'Unit 1',
				bathrooms: null,
				toilets: null,
				area: {
					value: null,
					unit: 'SqM',
				},
				amenities: [],
			},
		],
	};
	const { user } = useSelector(getAuthState);
	const { purposes, amenities, types, categories } =
		useGetPropertiesMetaDataQuery(undefined, {
			selectFromResult: ({ data }) => {
				const sortByName = (a: { name: string }, b: { name: string }) =>
					a.name.localeCompare(b.name);
				return {
					purposes: data?.purposes ? [...data.purposes].sort(sortByName) : [],
					amenities: data?.amenities
						? [...data.amenities].sort(sortByName)
						: [],
					types: data?.types ? [...data.types].sort(sortByName) : [],
					categories: data?.categories
						? [...data.categories].sort(sortByName)
						: [],
				};
			},
		});
	const icons: Record<string, any> = {
		HouseIcon,
		EmojiOneHomeIcon,
		EmojiOneBuildingIcon,
	};

	const cardData: CategoryType[] = categories?.map((category: CategoryType) => {
		return {
			...category,
			id: category?.id,
			Image: icons[category.metaData?.icon || ''],
		};
	});
	const amenitiesOptions = amenities?.map((amenity: CategoryType) => {
		return {
			value: amenity.name,
			label: amenity.name,
		};
	});
	const customAmenitiesField: FormFieldV1 = {
		name: 'amenities',
		type: 'checkbox-group',
		label: 'Amenities',
		options: amenitiesOptions,
		customComponent: (fieldApi: any, fieldConfig: any, form: any) => (
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
		),
	}
	const generalUnitFields = [
		{
			name: 'bathrooms',
			type: 'number',
			label: 'Bathrooms',
			required: false,
			width: '48%',
			validation: {
				schema: z.number({message: 'Bathrooms must be a number'}).nullable().optional(),
			},
		},
		{
			name: 'toilets',
			type: 'number',
			label: 'Toilets',
			required: false,
			width: '48%',
			validation: {
				schema: z.number({message: 'Toilets must be a number'}).nullable().optional(),
			},
		},
		{
			name: 'area',
			type: 'number',
			label: 'Floor Plan',
			required: true,
			width: '48%',
			validation: {
				schema: z.any({ message: 'Floor plan is required' }).refine(
					(data) => {
						if (data.value === null || data.value === 0) {
							return false;
						}
						return true;
					},
					{ message: 'Floor plan is required' },
				),
			},
			customComponent: (fieldApi: any, fieldConfig: any) => (
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
								// Update the entire area object
								fieldApi.handleChange({
									...fieldApi.state.value,
									value: numValue,
									unit: fieldApi.state.value?.unit || 'SqM',
								});
							}
						}}
						onBlur={fieldApi.handleBlur}
						error={!!fieldApi.state.meta.errors[0]}
						InputProps={{
							inputProps: {
								inputMode: 'decimal',
								pattern: '[0-9]*',
								onKeyPress: (e) => {
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
											// Update the entire area object
											fieldApi.handleChange({
												...fieldApi.state.value,
												unit: e.target.value,
											});
										}}
										sx={{
											'.MuiOutlinedInput-notchedOutline': {
												border: 'none',
											},
										}}
									>
										{MEASUREMENTS.map((entry: any, index: number) => (
											<MenuItem
												value={entry.unit}
												key={`${entry.unit}-${index}`}
											>
												{entry.symbol}
											</MenuItem>
										))}
									</Select>
								</InputAdornment>
							),
						}}
					/>
				</Box>
			),
		},
	] as FormFieldV1[];
	const residentialUnitFields: FormFieldV1[] = [
		{
			name: 'bedrooms',
			type: 'number',
			label: 'Bedrooms',
			required: true,
			width: '48%',
			// validation: {
			// 	schema: z.number({message: 'Bedrooms must be a number'}).min(1, { message: 'Bedrooms must be greater than 0' }).nullable(),
			// },
		},
		...generalUnitFields,
	];
	const commercialUnitFields: FormFieldV1[] = [
		{
			name: 'offices',
			type: 'number',
			label: 'Offices',
			required: true,
			width: '48%',
			validation: {
				schema: z.number({message: 'Offices must be a number'}).min(1, { message: 'Offices must be greater than 0' }).nullable(),
			},
		},
		...generalUnitFields,
	];
	const hospitalityUnitFields: FormFieldV1[] = [
		{
			name: 'rooms',
			type: 'number',
			label: 'Rooms',
			required: true,
			width: '48%',
			validation: {
				schema: z.number({message: 'Rooms must be a number'}).min(1, { message: 'Rooms must be greater than 0' }).nullable(),
			},
		},
		...generalUnitFields,
	];

	const getSingleUnitFields = (values: Record<string, any>) => {
		const selectedCategory = categories?.find(
			(cat: CategoryType) =>
				cat.id.toString() === values?.category?.id?.toString(),
		);
		const unitFields = [customAmenitiesField];
		if (selectedCategory?.metaData?.hasBedrooms) {
			return [...residentialUnitFields, ...unitFields] as FormFieldV1[];
		} else if (selectedCategory?.metaData?.hasRooms) {
			return [...hospitalityUnitFields, ...unitFields] as FormFieldV1[];
		} else if (selectedCategory?.metaData?.hasOffices) {
			return [...commercialUnitFields, ...unitFields] as FormFieldV1[];
		}
		return unitFields as FormFieldV1[];
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
				width: '48%',
				required: true,
				validation: {
					schema: z.string({message: 'Unit number is required'})
					.min(1, { message: 'Unit number is required' })
					.max(10, { message: 'Unit number must be less than 10 characters' }),
				},
			},
			customAmenitiesField,
		];
		if (selectedCategory?.metaData?.hasBedrooms) {
			return [...residentialUnitFields, ...unitFields] as FormFieldV1[];
		} else if (selectedCategory?.metaData?.hasRooms) {
			return [...hospitalityUnitFields, ...unitFields] as FormFieldV1[];
		} else if (selectedCategory?.metaData?.hasOffices) {
			return [...commercialUnitFields, ...unitFields] as FormFieldV1[];
		}
		return unitFields as FormFieldV1[];
	};

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

					label: 'Cover Photo',
					validation: {
						schema: z.any().optional(),
					},
					fileConfig: {
						subtitle: 'COVER PHOTO',
						caption: 'Upload a cover photo for your property',
						accept: 'image/*',
						multiple: true,
					},
				},
			],
			icon: { icon: <PropertyDetailsIcon /> },
		},
		// Unit(s) Details
		{
			title: 'Unit(s) Details',
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
					layout: 'row',
					spacing: 2,
					groupFields: [
						{
							name: 'addressLine1',
							type: 'text',
							label: '',
							required: true,
							width: '48%',
							addressConfig: {
								apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
								country: user?.orgSettings?.countryCode || 'NG',
								label: 'Street Address',
							},
							customComponent: (fieldApi, fieldConfig, form) => (
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

											// Update the individual field
											//fieldApi.handleChange(value.addressLine1);
										}}
										onBlur={fieldApi.handleBlur}
										error={!!fieldApi.state.meta.errors[0]}
										helperText={fieldApi.state.meta.errors[0]}
										country={fieldConfig.addressConfig?.country}
										required={
											typeof fieldConfig.addressConfig?.required === 'function'
												? fieldConfig.addressConfig?.required(form.state.values)
												: fieldConfig.addressConfig?.required
										}
									/>
								</Box>
							),
						},
						{
							name: 'addressLine2',
							type: 'text',
							label: 'Apartment, suite, or unit',
							required: false,
							width: '48%',
						},
						{
							name: 'country',
							type: 'select',
							label: 'Country',
							required: true,
							width: '48%',
							options: countries,
						},
						{
							name: 'state',
							type: 'text',
							label: 'State (Province or Region)',
							required: false,
							width: '48%',
						},
						{
							name: 'city',
							type: 'text',
							label: 'City',
							required: false,
							width: '48%',
						},
						{
							name: 'postalCode',
							type: 'text',
							label: 'Postal Code',
							required: false,
							width: '48%',
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
					layout: 'row',
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
					showAddButton: true,
					addButtonText: 'Add Unit',
					arrayLengthSelectorField: 'unitDetails.totalUnits',
				},
				// {
				// 	name: 'multiUnits',
				// 	type: 'array',
				// 	label: 'MULTI UNITS',
				// 	showIf: (values) => values.unitDetails.unitType === 'multi',
				// 	fields: (values) => {
				// 		const fields = getMultiUnitFields(values);
				// 		return fields;
				// 	},
				// 	useAccordion: true,
				// 	getArrayLength: (values) => parseInt(values.unitDetails.totalUnits, 10),
				// },
			],
			icon: { icon: <UnitTypeIcon /> },
		},
	];

	const onSubmit = (values: any) => {
		console.log('submitted', values);
		return Promise.resolve(values);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<KlubiqFormV1
				fields={propertyForm}
				initialValues={initialValues}
				onSubmit={onSubmit}
				submitButtonText='Create Property'
				isMultiStep={true}
			/>
		</Box>
	);
};
