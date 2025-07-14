import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Filter } from './index';

const meta: Meta<typeof Filter> = {
	title: 'Components/Filter',
	component: Filter,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
		},
		placeholder: {
			control: 'text',
		},
		disabled: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Filter>;

const options = [
	{ value: 'all', label: 'All' },
	{ value: 'active', label: 'Active' },
	{ value: 'inactive', label: 'Inactive' },
	{ value: 'pending', label: 'Pending' },
];

const Template = (args: any) => {
	const [value, setValue] = useState('all');
	return (
		<Filter {...args} value={value} onChange={setValue} options={options} />
	);
};

export const Default: Story = {
	render: Template,
	args: {
		label: 'Status',
		placeholder: 'Select status',
	},
};

export const Disabled: Story = {
	render: Template,
	args: {
		label: 'Status',
		placeholder: 'Select status',
		disabled: true,
	},
};

export const CustomLabel: Story = {
	render: Template,
	args: {
		label: 'Filter by Status',
		placeholder: 'Choose a status',
	},
};
