import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { Button, Chip, IconButton, useTheme } from '@mui/material';
import { Home, Notifications, Settings, LocationOn } from '@mui/icons-material';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
PageHeader is a versatile component for creating page headers with various layouts and styles.
It supports different variants, custom content, and is fully responsive.

## Features
- Multiple style variants (default, compact, detailed, custom)
- Supports icons, actions, and custom content
- Fully responsive layout
- Theme-aware styling
- Customizable through Material-UI's theme system
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'custom'],
      description: 'The style variant of the header',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    title: {
      control: 'text',
      description: 'Main header title',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

// Basic usage
export const Default: Story = {
  args: {
    title: 'Welcome back, Adebayo!',
    subtitle: 'Your next rent payment is due in 12 days',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage with title and subtitle.',
      },
    },
  },
};

// With icon and actions
export const WithIconAndActions: Story = {
  args: {
    title: 'Welcome back, Adebayo!',
    subtitle: 'Your next rent payment is due in 12 days',
    icon: <Home fontSize="large" />,
    actions: (
      <>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with an icon and action buttons.',
      },
    },
  },
};

// Compact variant
export const CompactVariant: Story = {
  args: {
    title: 'Dashboard',
    variant: 'compact',
    icon: <Home />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant with reduced padding, suitable for dense UIs.',
      },
    },
  },
};

// Detailed variant with custom content
export const DetailedVariant: Story = {
  args: {
    title: 'Property Overview',
    subtitle: 'Manage your properties and tenants',
    variant: 'detailed',
    rightContent: (
      <Chip
        icon={<LocationOn />}
        label="Victoria Garden City"
        color="primary"
        variant="outlined"
      />
    ),
    actions: (
      <Button variant="contained" color="primary">
        Add Property
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Detailed variant with extra padding and custom content.',
      },
    },
  },
};

// Custom variant with dynamic content
export const CustomContent: Story = {
  args: {
    variant: 'custom',
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Home color="primary" />
        <span>Custom Header</span>
      </div>
    ),
    subtitle: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Chip label="Active" color="success" size="small" />
        <span>Custom subtitle with status</span>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom variant with complex title and subtitle components.',
      },
    },
  },
};

// Dark theme example
export const DarkThemeExample: Story = {
  args: {
    title: 'Dark Theme Header',
    subtitle: 'With custom background color',
    icon: <Home fontSize="large" />,
    backgroundColor: '#1a1a1a',
    sx: { color: 'white' },
    actions: (
      <Button variant="contained" color="primary">
        Action
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of the header with a dark theme and custom styling.',
      },
    },
  },
}; 