import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { PaymentCardDisplay, PaymentCardDisplaySkeleton } from './';
import { Box, Chip } from '@mui/material';

export default {
	title: 'Components/PaymentCardDisplay',
	component: PaymentCardDisplay,
	subcomponents: { PaymentCardDisplaySkeleton },
	argTypes: {
		onEdit: { action: 'edit clicked' },
		variant: {
			control: { type: 'radio' },
			options: ['default', 'compact'],
		},
	},
} as Meta<typeof PaymentCardDisplay>;

const Template: StoryFn<typeof PaymentCardDisplay> = (args) => (
	<Box maxWidth={600}>
		<PaymentCardDisplay {...args} />
	</Box>
);

export const Default = Template.bind({});
Default.args = {
	last4: '4242',
	brand: 'Visa',
	isPrimary: true,
};

export const Compact = Template.bind({});
Compact.args = {
	last4: '1234',
	brand: 'Mastercard',
	isPrimary: false,
	variant: 'compact',
};

export const WithDynamicChildren = Template.bind({});
WithDynamicChildren.args = {
	last4: '5678',
	brand: 'Amex',
	isPrimary: false,
	children: <Chip label='Business Card' color='info' />,
};

export const LoadingSkeleton: React.FC = () => (
	<Box maxWidth={600}>
		<PaymentCardDisplaySkeleton />
	</Box>
);
LoadingSkeleton.displayName = 'Loading Skeleton';
