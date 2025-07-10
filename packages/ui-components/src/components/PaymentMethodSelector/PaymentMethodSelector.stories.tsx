import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import PaymentMethodSelector from './PaymentMethodSelector';

const meta: Meta<typeof PaymentMethodSelector> = {
	title: 'Components/PaymentMethodSelector',
	component: PaymentMethodSelector,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		value: {
			control: { type: 'select' },
			options: ['card', 'bank', 'wallet'],
		},
		loading: {
			control: { type: 'boolean' },
		},
	},
};
export default meta;

const Template = (args: any) => {
	const [selected, setSelected] = useState(args.value || 'card');
	return (
		<div style={{ maxWidth: 600, margin: '2rem auto' }}>
			<PaymentMethodSelector
				{...args}
				value={selected}
				onChange={(val: string) => {
					setSelected(val);
					if (args.onChange) args.onChange(val);
				}}
			/>
			<div style={{ marginTop: 24, textAlign: 'center' }}>
				<strong>Selected:</strong> {selected}
			</div>
		</div>
	);
};

export const Default: StoryObj<typeof PaymentMethodSelector> = {
	render: Template,
	args: { value: 'card' },
};

export const BankTransferSelected: StoryObj<typeof PaymentMethodSelector> = {
	render: Template,
	args: { value: 'bank' },
};

export const WalletSelected: StoryObj<typeof PaymentMethodSelector> = {
	render: Template,
	args: { value: 'wallet' },
};

export const Loading: StoryObj<typeof PaymentMethodSelector> = {
	render: Template,
	args: { value: 'card', loading: true },
};
