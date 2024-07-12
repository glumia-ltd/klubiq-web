import reverse from '../../assets/images/reverse.svg';
import ascend from '../../assets/images/alpha-asc.svg';
import topBottom from '../../assets/images/top-bottom.svg';

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

export type OptionsType = {
	title: string;
	options: { label: string; icon?: string }[];
	multiSelect?: boolean;
}[];

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
			{ label: 'Recently updated', icon: topBottom },
			{ label: 'Newest', icon: reverse },
			{ label: 'Oldest', icon: reverse },
			{ label: 'Property name (A -> Z)', icon: ascend },
			{ label: 'Property name (Z -> A)', icon: ascend },
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
