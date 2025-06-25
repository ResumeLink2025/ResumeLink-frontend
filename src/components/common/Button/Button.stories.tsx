import type { Meta, StoryObj } from '@storybook/nextjs';

import Button from '.';

type ButtonType = typeof Button;

const meta: Meta<typeof Button> = {
  title: 'common/Button',
  component: Button,
  argTypes: {
    styleType: {
      control: 'inline-radio',
      options: ['gray20', 'gray25', 'primary', 'white', 'outline'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

export const DefaultButton: StoryObj<ButtonType> = {
  render: (args) => <Button {...args}>기본 버튼</Button>,
};

export const DisabledButton: StoryObj<ButtonType> = {
  render: (args) => (
    <Button disabled {...args}>
      disabled 된 버튼
    </Button>
  ),
};

export const ExampleToUseButton: StoryObj<ButtonType> = {
  render: (args) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const userName = formData.get('userName') as string;

      alert(`사용자 이름: ${userName}`);
    };

    return (
      <form className="flex flex-col gap-5 w-[350px]" onSubmit={handleSubmit}>
        <input
          name="userName"
          placeholder="유저 이름을 입력해주세요"
          className="border border-gray-40 rounded-lg p-3"
        />
        <Button {...args} type="submit">
          제출하기
        </Button>
      </form>
    );
  },
};
