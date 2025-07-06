import type { Meta, StoryObj } from '@storybook/nextjs';

import { Loader } from '@/components/common';

type LoaderType = typeof Loader;

const meta: Meta<LoaderType> = {
  title: 'common/Loader',
  component: Loader,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<LoaderType>;

export const DefaultLoader: Story = {
  args: {
    size: 'medium',
  },
};
