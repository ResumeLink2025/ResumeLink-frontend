import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import Toggle from '.';

type ToggleType = typeof Toggle;

const meta: Meta<ToggleType> = {
  title: 'common/Toggle',
  component: Toggle,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

export const DefaultToggle: StoryObj<ToggleType> = {
  render: (args) => {
    const [enabled, setEnabled] = useState(false);

    console.log('toggle', enabled);

    return <Toggle {...args} checked={enabled} onChange={setEnabled} />;
  },
};
