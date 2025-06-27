import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
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

export const SearchInput: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    value: '',
    isValid: true,
  },
};

export const FormExample: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateEmail(email)) {
        setError('올바르지 않은 이메일 형식입니다.');
      } else {
        setError('');
        alert('제출 완료!');
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <Input
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isValid={!error}
          errorMessage={error}
          type="email"
        />
        <button type="submit" style={{ marginTop: 12 }}>
          제출
        </button>
      </form>
    );
  },
};
