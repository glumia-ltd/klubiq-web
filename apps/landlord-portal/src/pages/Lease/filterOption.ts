import { OptionsType } from '../../components/Filter/Filter';

export const filterOptions: OptionsType = [
	{
		id: 'display',
		title: 'Display',
		options: [
			{ label: 'All', value: 'all' },
			{ label: 'Archived', value: 'archived' },
		],
	},
	{
		id: 'property',
		title: 'Property Name',
		options: [
			{ label: 'Landmark House', value: 'landmark_house' },
			{ label: 'City High', value: 'city_high' },
			{ label: 'Resolved Avenue', value: 'resolved_avenue' },
			{ label: 'Gateway Garden', value: 'gateway_garden' },
		],
	},
	{
		id: 'status',
		title: 'Status',
		options: [
			{ label: 'Active', value: 'active' },
			{ label: 'Expiring', value: 'expiring' },
			{ label: 'Overdue', value: 'overdue' },
		],
	},
	{
		id: 'date',
		title: 'Date',
		options: [
			{ label: 'Today', value: 'today' },
			{ label: 'Yesterday', value: 'yesterday' },
			{ label: 'Last 30 Days', value: 'last_30_days' },
			{ label: 'Last 3 Months', value: 'last_3_months' },
			{ label: '2024', value: '2024' },
			{ label: 'Custom', value: 'custom' },
		],
	},
	{
		id: 'sortBy',
		title: 'Sort by',
		options: [
			{ label: 'Recently updated', value: 'recently_updated' },
			{ label: 'Newest', value: 'newest' },
			{ label: 'Oldest', value: 'oldest' },
			{ label: 'Property name (A -> Z)', value: 'name_asc', order: 'ASC' },
			{ label: 'Property name (Z -> A)', value: 'name_desc', order: 'DESC' },
		],
	},
	{
		id: 'unitType',
		title: 'Unit Type',
		options: [
			{ label: 'All', value: 'all' },
			{ label: 'Archived', value: 'archived' },
		],
	},
];
