import {
	TopBottom,
	AscendIcon,
	ReverseIcon,
} from '../../components/Icons/CustomIcons';
import { OptionsType } from '../../components/Filter/Filter';

export const data = [
	{
		title: '5 Bedroom House',
		address: '16B Ibrahim Fadoyin Street, Ikosi Ketu',
		bedrooms: 5,
		bathrooms: 5,
		sqm: 1000,
		type: 'Residential Housing',
		status: 'For Sale',
		image: '../../../src/assets/images/Rectangle 157.jpg',
		propertyType: 'Bungalow',
		unitType: 'Multi Unit',
		purpose: 'Sell',
	},
	{
		title: 'Landmark Estate',
		address: 'Engineering Close, off Idowu Street, Victoria Island, Lagos',
		bedrooms: 5,
		bathrooms: 5,
		sqm: 800,
		type: 'Residential Housing',
		status: 'For Rent',
		image: '../../../src/assets/images/Rectangle 157.jpg',
		propertyType: 'Duplex',
		unitType: 'Single Unit',
		purpose: 'Lease',
	},
	{
		title: 'Next Estate',
		address: 'Engineering Close, off Idowu Street, Victoria Island, Lagos',
		bedrooms: 5,
		bathrooms: 5,
		sqm: 800,
		type: 'Residential Housing',
		status: 'For Rent',
		image: '../../../src/assets/images/Rectangle 157.jpg',
		propertyType: 'Apartment',
		unitType: 'Single Unit',
		purpose: 'Lease',
	},
	{
		title: 'Terrace Estate',
		address: 'Engineering Close, off Idowu Street, Victoria Island, Lagos',
		bedrooms: 5,
		bathrooms: 5,
		sqm: 800,
		type: 'Residential Housing',
		status: 'For Rent',
		image: '../../../src/assets/images/Rectangle 157.jpg',
		propertyType: 'Terrace',
		unitType: 'Multi Unit',
		purpose: 'Sell',
	},
	{
		title: 'Land Estate',
		address: 'Engineering Close, off Idowu Street, Victoria Island, Lagos',
		bedrooms: 5,
		bathrooms: 5,
		sqm: 800,
		type: 'Residential Housing',
		status: 'For Rent',
		image: '../../../src/assets/images/Rectangle 157.jpg',
		propertyType: 'Land',
		unitType: 'Single Unit',
		purpose: 'Lease',
	},
];

export const filterOptions: OptionsType = [
	{ title: 'Display', options: [{ label: 'All' }, { label: 'Archived' }] },
	{
		title: 'Purpose',
		options: [{ label: 'All' }, { label: 'Lease' }, { label: 'Sell' }],
	},
	{
		title: 'Unit type',
		options: [{ label: 'Single Unit' }, { label: 'Multi Unit' }],
	},
	{
		title: 'Sorting options',
		options: [
			{ label: 'Recently updated', Icon: TopBottom },
			{
				label: 'Newest',
				Icon: ReverseIcon,
			},
			{
				label: 'Oldest',
				Icon: ReverseIcon,
			},
			{
				label: 'Property name (A -> Z)',
				Icon: AscendIcon,
			},
			{
				label: 'Property name (Z -> A)',
				Icon: AscendIcon,
			},
		],
	},
	{
		title: 'Property Type',
		options: [
			{ label: 'Apartment' },
			{ label: 'Duplex' },
			{ label: 'Bungalow' },
			{ label: 'Land' },
			{ label: 'Terrace' },
		],
		multiSelect: true,
	},
];
