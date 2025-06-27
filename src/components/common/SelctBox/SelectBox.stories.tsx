import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

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
  },
};

export const Disabled: Story = {
  args: {
    options,
    value: 'option2',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    options,
    value: 'option3',
    disabled: false,
    errorMessage: '잘못된 선택입니다.',
  },
};

export const StateExample: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(options[0].value);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(e.target.value);
    };

    return (
      <div style={{ width: '300px' }}>
        <SelectBox {...args} value={selectedValue} onChange={handleChange} options={options} />
        <p style={{ marginTop: '8px' }}>
          현재 선택된 값: <strong>{selectedValue || '(없음)'}</strong>
        </p>
      </div>
    );
  },
};
