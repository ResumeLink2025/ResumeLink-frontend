import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import SelectBox from '.';

const options = [
  { label: '옵션 1', value: 'option1' },
  { label: '옵션 2', value: 'option2' },
  { label: '옵션 3', value: 'option3' },
];

const meta: Meta<typeof SelectBox> = {
  title: 'common/SelectBox',
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

export const DefaultSelectBox: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('option1');
    return (
      <SelectBox {...args} value={selected} onChange={(e) => setSelected(e.target.value)} options={options} />
    );
  },
};

export const DisabledSelectBox: Story = {
  args: {
    options,
    defaultValue: 'option1',
    disabled: true,
  },
};

export const InvalidSelectBox: Story = {
  args: {
    options,
    value: 'option3',
    disabled: false,
    errorMessage: '잘못된 선택입니다.',
  },
};

export const ExampleToUseSelectBox: Story = {
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
