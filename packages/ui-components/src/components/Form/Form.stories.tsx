import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './index';
import ControlledTextField from '../ControlledTextField';
import ControlledSelect from '../ControlledSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFormContext } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  role: string;
}

const meta: Meta<typeof Form<FormData>> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form<FormData>>;

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
});

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'editor', label: 'Editor' },
];

const FormFields = () => {
  const { control } = useFormContext<FormData>();

  return (
    <>
      <ControlledTextField
        name="name"
        label="Name"
        placeholder="Enter your name"
        required
        control={control}
      />
      <ControlledTextField
        name="email"
        label="Email"
        placeholder="Enter your email"
        required
        control={control}
      />
      <ControlledSelect
        name="role"
        label="Role"
        options={roles}
        required
        control={control}
      />
    </>
  );
};

export const Default: Story = {
  render: () => {
    const handleSubmit = (data: FormData) => {
      console.log('Form submitted:', data);
    };

    return (
      <Form<FormData>
        onSubmit={handleSubmit}
        resolver={yupResolver(schema)}
        defaultValues={{
          name: '',
          email: '',
          role: '',
        }}
      >
        <FormFields />
      </Form>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const handleSubmit = (data: FormData) => {
      console.log('Form submitted:', data);
    };

    return (
      <Form<FormData>
        onSubmit={handleSubmit}
        resolver={yupResolver(schema)}
        defaultValues={{
          name: '',
          email: '',
          role: '',
        }}
        isLoading
      >
        <FormFields />
      </Form>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const handleSubmit = (data: FormData) => {
      console.log('Form submitted:', data);
    };

    return (
      <Form<FormData>
        onSubmit={handleSubmit}
        resolver={yupResolver(schema)}
        defaultValues={{
          name: '',
          email: '',
          role: '',
        }}
        disabled
      >
        <FormFields />
      </Form>
    );
  },
}; 