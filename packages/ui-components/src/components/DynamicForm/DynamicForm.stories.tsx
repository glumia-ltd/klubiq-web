import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { KlubiqForm } from './klubiq-form';
import * as Yup from 'yup';
import { FormField, FormGroup } from './types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const meta: Meta<typeof KlubiqForm> = {
  title: 'Components/DynamicForm',
  component: KlubiqForm,
  decorators: [
    (Story) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Story />
      </LocalizationProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KlubiqForm>;

// Basic Form Story
export const BasicForm: Story = {
  args: {
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        validation: Yup.string().required('First name is required'),
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validation: Yup.string().email('Invalid email').required('Email is required'),
      },
    ],
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert(JSON.stringify(values, null, 2));
    },
    submitButtonText: 'Submit Basic Form',
    enableReset: true,
  },
};

// Complex Form with All Field Types
export const AllFieldTypes: Story = {
  args: {
    fields: [
      {
        name: 'text',
        label: 'Text Input',
        type: 'text',
        required: true,
      },
      {
        name: 'email',
        label: 'Email Input',
        type: 'email',
        required: true,
      },
      {
        name: 'select',
        label: 'Select Input',
        type: 'select',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
      },
      {
        name: 'multiselect',
        label: 'Multi Select',
        type: 'select',
        multiple: true,
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
      },
      {
        name: 'date',
        label: 'Date Input',
        type: 'date',
      },
      {
        name: 'checkbox',
        label: 'Checkbox Input',
        type: 'checkbox',
      },
      {
        name: 'radio',
        label: 'Radio Input',
        type: 'radio',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ],
      },
      {
        name: 'textarea',
        label: 'Textarea Input',
        type: 'textarea',
        rows: 4,
      },
    ],
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert(JSON.stringify(values, null, 2));
    },
    submitButtonText: 'Submit All Fields',
    enableReset: true,
  },
};
const groupFields = [
    {
        name: 'personalInfo',
        label: 'Personal Information',
        type: 'group',
        isGroup: true,
        columns: 2,
        fields: [
          {
            name: 'personalInfo.firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            validation: Yup.string().required('First name is required'),
          },
          {
            name: 'personalInfo.lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
            validation: Yup.string().required('Last name is required'),
          },
        ],
      },
      {
        name: 'contactInfo',
        label: 'Contact Information',
        type: 'group',
        isGroup: true,
        columns: 2,
        fields: [
          {
            name: 'contactInfo.email',
            label: 'Email',
            type: 'email',
            required: true,
            validation: Yup.string()
              .email('Invalid email')
              .required('Email is required'),
          },
          {
            name: 'contactInfo.phone',
            label: 'Phone',
            type: 'text',
            validation: Yup.string()
              .matches(/^[0-9]+$/, 'Must be only digits')
              .min(10, 'Must be exactly 10 digits')
              .max(10, 'Must be exactly 10 digits'),
          },
        ],
      },

    ]
const complexGroupFields = [
    {
        name: 'personalInfo',
        label: 'Personal Information',
        type: 'group',
        isGroup: true,
        columns: 2,
        fields: [
          {
            name: 'personalInfo.title',
            label: 'Title',
            type: 'select',
            options: [
              { label: 'Mr.', value: 'mr' },
              { label: 'Mrs.', value: 'mrs' },
              { label: 'Ms.', value: 'ms' },
            ],
          },
          {
            name: 'personalInfo.firstName',
            label: 'First Name',
            type: 'text',
            required: true,
          },
          {
            name: 'personalInfo.lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
          },
        ],
      },
      {
          name: 'address',
          label: 'Address',
          type: 'group',
          isGroup: true,
          columns: 2,
          fields: [
            {
              name: 'address.street',
              label: 'Street',
              type: 'text',
              required: true,
            },
            {
              name: 'address.city',
              label: 'City',
              type: 'text',
              required: true,
            },
            {
              name: 'address.state',
              label: 'State',
              type: 'select',
              options: [
                { label: 'California', value: 'CA' },
                { label: 'New York', value: 'NY' },
                // Add more states
              ],
            },
            {
              name: 'address.zipCode',
              label: 'Zip Code',
              type: 'text',
              required: true,
            },
          ],
        }
]
// Form with Groups
export const GroupedForm: Story = {
    args: {
        fields: groupFields as FormField[],
        initialValues: {
            personalInfo: {
              firstName: '',
              lastName: '',
            },
            contactInfo: {
              email: '',
              phone: '',
            },
          },
          onSubmit: (values) => {
            console.log('Form submitted:', values);
            alert(JSON.stringify(values, null, 2));
          },
          submitButtonText: 'Submit Grouped Form',
          enableReset: true,
        },
        parameters: {
          docs: {
            description: {
              story: 'A form with grouped fields demonstrating nested form structure.',
            },
          },
        },
};

// Add more variations of grouped forms
export const ComplexGroupedForm: Story = {
    args: {
        fields: complexGroupFields as FormField[],
        initialValues: {
            personalInfo: {
              title: '',
              firstName: '',
              lastName: '',
            },
            address: {
              street: '',
              city: '',
              state: '',
              zipCode: '',
            },
          },
          onSubmit: (values) => {
            console.log('Form submitted:', values);
            alert(JSON.stringify(values, null, 2));
          },
          submitButtonText: 'Submit Complex Form',
          enableReset: true,
        },
        parameters: {
          docs: {
            description: {
              story: 'A complex form with multiple grouped sections and different field types.',
            },
          },
        },
};

// Form with Validation
export const ValidationForm: Story = {
  args: {
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        validation: Yup.string()
          .min(3, 'Username must be at least 3 characters')
          .required('Username is required'),
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validation: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .matches(/[0-9]/, 'Password must contain a number')
          .matches(/[a-z]/, 'Password must contain a lowercase letter')
          .matches(/[A-Z]/, 'Password must contain an uppercase letter')
          .required('Password is required'),
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        required: true,
        validation: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Password confirmation is required'),
      },
    ],
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert(JSON.stringify(values, null, 2));
    },
    submitButtonText: 'Submit Validated Form',
    enableReset: true,
  },
};

// Form with Currency and Percentage
export const CurrencyPercentageForm: Story = {
  args: {
    fields: [
      {
        name: 'amount',
        label: 'Amount',
        type: 'decimal',
        required: true,
        formatType: 'decimal',
        adornment: {
          prefix: '$',
        },
      },
      {
        name: 'percentage',
        label: 'Percentage',
        type: 'percent',
        required: true,
        formatType: 'percent',
        adornment: {
          suffix: '%',
        },
      },
    ],
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert(JSON.stringify(values, null, 2));
    },
    submitButtonText: 'Submit Currency Form',
    enableReset: true,
  },
};