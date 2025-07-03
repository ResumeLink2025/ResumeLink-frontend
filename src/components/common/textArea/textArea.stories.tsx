import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import Textarea from '.';

const meta: Meta<typeof Textarea> = {
  title: 'common/Textarea',
  component: Textarea,
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
type Story = StoryObj<typeof Textarea>;

export const DefaultTextarea: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    size: 'medium',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const DisabledTextarea: Story = {
  args: {
    value: '비활성화 상태입니다',
    disabled: true,
    size: 'medium',
  },
};

export const SmallSizeTextarea: Story = {
  args: {
    placeholder: '작은 크기 텍스트 영역',
    size: 'small',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const LargeSizeTextarea: Story = {
  args: {
    placeholder: '큰 크기 텍스트 영역',
    size: 'large',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};
