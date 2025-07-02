import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import SelectBox from './index';

const meta: Meta<typeof SelectBox> = {
  title: 'Components/customSelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  argTypes: {
    options: { control: false }, // options는 직접 넘겨줌
    value: { control: 'text' },
    isDisabled: { control: 'boolean' },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

const defaultOptions = [
  { label: '선택 1', value: '1' },
  { label: '선택 2', value: '2' },
  { label: '선택 3', value: '3' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    size: 'medium',
    isDisabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    isDisabled: true,
    value: '2',
  },
  render: (args) => <SelectBox {...args} />,
};

export const SmallSize: Story = {
  args: {
    options: defaultOptions,
    size: 'small',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const LargeSize: Story = {
  args: {
    options: defaultOptions,
    size: 'large',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};
