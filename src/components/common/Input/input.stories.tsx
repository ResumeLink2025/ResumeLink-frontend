import type { Meta, StoryObj } from '@storybook/nextjs';

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
    isSearch: { control: 'boolean' },
    onSearchClick: { action: 'searchClicked' }, // 클릭 액션 이벤트로 설정
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '입력해 주세요',
    value: '',
    isValid: true,
    isSearch: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '입력 불가',
    value: '비활성화됨',
    disabled: true,
    isSearch: false,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: '이메일 입력',
    value: 'test@',
    isValid: false,
    errorMessage: '올바르지 않은 이메일 형식입니다.',
    isSearch: false,
  },
};

export const SearchInput: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    value: '',
    isValid: true,
    isSearch: true,
  },
};
