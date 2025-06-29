import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import DefaultTextarea from './index';

const meta: Meta<typeof DefaultTextarea> = {
  title: 'Components/DefaultTextarea',
  component: DefaultTextarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultTextarea>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    size: 'medium',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <DefaultTextarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const Disabled: Story = {
  args: {
    value: '비활성화 상태입니다',
    disabled: true,
    size: 'medium',
  },
};

export const SmallSize: Story = {
  args: {
    placeholder: '작은 크기 텍스트 영역',
    size: 'small',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <DefaultTextarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const LargeSize: Story = {
  args: {
    placeholder: '큰 크기 텍스트 영역',
    size: 'large',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <DefaultTextarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};
