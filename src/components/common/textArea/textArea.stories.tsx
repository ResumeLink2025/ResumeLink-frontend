import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import TextArea from './index';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
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
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextArea {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: '내용을 입력하세요',
    size: 'medium',
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => {
    return <TextArea {...args} value="비활성화 상태입니다" />;
  },
  args: {
    disabled: true,
  },
};

export const SmallSize: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextArea {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: '작은 크기 텍스트 영역',
    size: 'small',
    disabled: false,
  },
};

export const LargeSize: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextArea {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: '큰 크기 텍스트 영역',
    size: 'large',
    disabled: false,
  },
};
