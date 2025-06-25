import type { Meta, StoryObj } from '@storybook/nextjs';

import Typography from '.';

const meta: Meta<typeof Typography> = {
  title: 'common/Typography',
  component: Typography,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: [
        'heading1',
        'heading2',
        'heading3',
        'heading4',
        'title1',
        'title2',
        'title3',
        'title4',
        'title5',
        'body1',
        'body2',
        'body3',
        'body4',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const DefaultTypography: Story = {
  args: {
    children: '안녕 타이포그라피',
    type: 'body3',
  },
};
