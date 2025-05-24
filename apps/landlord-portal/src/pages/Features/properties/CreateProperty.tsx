import { FormStep, ArrayFormFieldV1 } from '@klubiq/ui-components';
import { CategoryMetaDataType } from '../../../shared/type';
import { useGetPropertiesMetaDataQuery } from '../../../store/PropertyPageStore/propertyApiSlice';
import { EmojiOneBuildingIcon, EmojiOneHomeIcon, HouseIcon } from '../../../components/Icons/CustomIcons';
import { CardRadioGroup, RadioCardGroup } from '@klubiq/ui-components';

type CategoryType = {
	id: number;
	name: string;
	displayText: string;
	metaData?: CategoryMetaDataType;
	Image: any;
};
const { purposes, 
  // amenities, 
  types, categories } = useGetPropertiesMetaDataQuery(undefined, {
    selectFromResult: ({ data }) => ({
        purposes: data?.purposes,
        // amenities: data?.amenities,
        types: data?.types,
        categories: data?.categories,
    }),
});
const icons: Record<string, any> = {
    HouseIcon,
    EmojiOneHomeIcon,
    EmojiOneBuildingIcon,
};

const cardData: CategoryType[] = categories?.map(
    (category: CategoryType) => {
        return {
            ...category,
            id: category?.id,
            Image: icons[category.metaData?.icon || ''],
        };
    },
);

export const propertyFormSteps: FormStep[] = [
  {
    title: 'Property Category',
    fields: [
      {
        name: 'propertyCategory',
        type: 'radio',
        label: 'PROPERTY CATEGORY (required)',
        required: true,
        radioGroupDirection: 'row',
        customComponent: (field) => <CardRadioGroup
            value={field.state.value}
            onChange={field.handleChange}
            options={cardData.map((category) => {
                return {
                    value: category.id.toString(),
                    label: category.name,
                    description: category.displayText,
                    icon: category.Image,
                }
            })}
        />,
      },
    ],
  },
  {
    title: 'Property Details',
    fields: [
      {
        name: '_',
        type: 'group',
        label: '',
        groupFields: [
            { 
                name: 'propertyType', 
                type: 'select', 
                label: 'PROPERTY TYPE (required)', 
                required: true, 
                options: types?.map((type: CategoryType) => ({
                    value: type.id.toString(),
                    label: type.name,
                })) 
            },
            { name: 'propertyName', type: 'text', label: 'PROPERTY NAME (required)', required: true },
            { name: 'description', type: 'textarea', label: 'DESCRIPTION' },
        ],
    },
    {
        name: 'coverPhoto',
        type: 'file',
        label: 'Cover Photo',
        fileConfig: {
          subtitle: 'COVER PHOTO',
          caption: 'Upload a cover photo for your property',
          accept: 'image/*',
        },
      },
    ],
  },
  {
    title: 'Unit Type',
    fields: [ 
        {
            name: '_',
            type: 'group',
            label: '',
            groupFields: [
                { 
                    name: 'unitType', 
                    type: 'radio', 
                    label: 'UNIT TYPE (required)', 
                    required: true, 
                    customComponent: (field) => (
                        <RadioCardGroup
                          value={field.state.value}
                          onChange={field.handleChange}
                          options={[
                            {
                              value: 'single',
                              label: 'Single Unit',
                              description: 'Single unit properties are rentals in which there is only one rental unit associated to a specific address. This type of property does not allow to add any units.',
                            },
                            {
                              value: 'multi',
                              label: 'Multi Unit',
                              description: 'Multi-unit properties are rentals in which there are multiple rental units (with multiple units and leases) associated to a specific (single) address. This type of property allows adding units.',
                            },
                          ]}
                        />
                      ),
                }
            ],
        },
        {
            name: '_',
            type: 'group',
            label: '',
            groupFields: [
                {
                    name: 'propertyPurpose',
                    type: 'radio',
                    label: 'PROPERTY PURPOSE (required)',
                    required: true,
                    customComponent: (field) => (
                        <RadioCardGroup
                          value={field.state.value}
                          onChange={field.handleChange}
                          options={purposes?.map((purpose: CategoryType) => ({
                            value: purpose.id.toString(),
                            label: purpose.name,
                            description: purpose.displayText,
                          }))
                        }
                      />
                    ),
                }
            ],
        },
        {
            name: '_',
            type: 'group',
            label: 'ADDRESS',
            groupFields: [
                { 
                    name: 'addressLine1', 
                    type: 'address', 
                    label: 'Street Address (required)', 
                    required: true, 
                    width: '50%',
                    addressConfig: {
                        apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
                        country: 'Nigeria',
                    },
                },
                {
                    name: 'addressLine2',
                    type: 'text',
                    label: 'Apartment, suite, or unit',
                    required: false,
                    width: '50%',
                    // showIf: (values) => values.unitType === 'single',
                },
                {
                    name: 'country',
                    type: 'text',
                    label: 'Country',
                    required: false,
                    width: '50%',
                },
                {
                    name: 'state',
                    type: 'text',
                    label: 'State (Province or Region)',
                    required: false,
                    width: '50%',
                },
                {
                    name: 'city',
                    type: 'text',
                    label: 'City',
                    required: false,
                    width: '50%',
                },
                {
                    name: 'postalCode',
                    type: 'text',
                    label: 'Postal Code',
                    required: false,
                    width: '50%',
                },
            ],
        },
      {
        name: 'units',
        type: 'array',
        label: 'Unit',
        showIf: (values) => values.unitType === 'multi' || values.unitType === 'single',
        fields: [
          { name: 'unitName', type: 'text', label: 'Unit Name', required: true },
          { name: 'unitDetails', type: 'textarea', label: 'Unit Details' },
        ],
      } as ArrayFormFieldV1,
      {
        name: 'amenities',
        type: 'checkbox-group',
        label: 'Amenities',
        checkboxGroupDirection: 'row',
        options: [
          { value: 'pool', label: 'Swimming Pool' },
          { value: 'fitness', label: 'Fitness Center' },
          { value: 'parking', label: 'Parking Space' },
        ],
      },
    ],
  },
];