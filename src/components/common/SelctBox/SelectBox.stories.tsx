import type { Meta, StoryObj } from '@storybook/nextjs';

import SelectBox from './index';

const options = [
  { label: '옵션 1', value: 'option1' },
  { label: '옵션 2', value: 'option2' },
  { label: '옵션 3', value: 'option3' },
];

const meta: Meta<typeof SelectBox> = {
  title: 'Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    isValid: { control: 'boolean' },
    errorMessage: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

export const Default: Story = {
  args: {
    options,
    value: 'option1',
    disabled: false,
    isValid: true,
  },
};

export const Disabled: Story = {
  args: {
    options,
    value: 'option2',
    disabled: true,
    isValid: true,
  },
};

export const Invalid: Story = {
  args: {
    options,
    value: 'option3',
    disabled: false,
    isValid: false,
    errorMessage: '잘못된 선택입니다.',
  },
};

export const NoValue: Story = {
  args: {
    options,
    value: '',
    disabled: false,
    isValid: true,
  },
};
