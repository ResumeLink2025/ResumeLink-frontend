import type { Meta, StoryObj } from '@storybook/react';

import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Input', // 사이드바에 보일 이름
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    isValid: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '입력해 주세요',
    value: '',
    isValid: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '입력 불가',
    value: '비활성화됨',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: '이메일 입력',
    value: 'test@',
    isValid: false,
    errorMessage: '올바르지 않은 이메일 형식입니다.',
  },
};
