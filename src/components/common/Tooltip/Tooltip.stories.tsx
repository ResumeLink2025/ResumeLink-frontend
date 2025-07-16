import type { Meta, StoryObj } from '@storybook/nextjs';

import Tag from '../Tag';
import Tooltip from '.';

type TooltipType = typeof Tooltip;

const meta: Meta<TooltipType> = {
  title: 'common/Tooltip',
  component: Tooltip,
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['top', 'bottom'],
    },
  },
};

export default meta;

type Story = StoryObj<TooltipType>;

export const DefaultTooltip: Story = {
  args: {
    children: '툴팁입니다.',
    content: '안녕하세요.',
  },
  render: (args) => {
    const tooltipContent = [
      { title: '요구르트' },
      { title: '사이다' },
      { title: '콜라' },
      { title: '삼다수' },
      { title: '밀키스' },
    ];

    return (
      <div className="p-20">
        <Tooltip
          {...args}
          content={
            <div className="flex flex-wrap gap-2">
              {tooltipContent.map((content) => (
                <Tag key={content.title}>{content.title}</Tag>
              ))}
            </div>
          }
        >
          툴팁에 관련된 내용입니다.
        </Tooltip>
      </div>
    );
  },
};
