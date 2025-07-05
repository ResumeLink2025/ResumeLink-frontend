import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import Textarea from '.';

const meta: Meta<typeof Textarea> = {
  title: 'common/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const DefaultTextarea: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    disabled: false,
    label: '라벨',
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
  },
};

export const ErrorTextarea: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요',
    disabled: false,
    errorMessage: '50글자 이상 작성해 주세요.'
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};
