import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import Tag from '.';

type TagType = typeof Tag;

const meta: Meta<TagType> = {
  title: 'common/Tag',
  component: Tag,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    styleType: {
      control: 'inline-radio',
      options: ['primary', 'gray', 'outline', 'outlinePrimary'],
    },
    isSelected: {
      control: 'boolean',
    },
  },
};

export default meta;

export const DefaultTag: StoryObj<TagType> = {
  render: (args) => {
    const tags = ['React', 'Next', 'Express', 'Nest', 'Swift'];

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const onClickSelectTag = (tag: string) => {
      setSelectedTags((prevState) => {
        const isSelected = prevState?.includes(tag);

        if (isSelected) {
          return prevState.filter((prevTag) => tag !== prevTag);
        } else {
          return [...prevState, tag];
        }
      });
    };

    console.log('selectedTags', selectedTags);

    return (
      <div className="flex gap-2">
        {tags.map((tag) => (
          <Tag
            key={tag}
            isSelected={selectedTags?.includes(tag)}
            onClick={() => onClickSelectTag(tag)}
            {...args}
          >
            {tag}
          </Tag>
        ))}
      </div>
    );
  },
};
