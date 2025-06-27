import type { Meta, StoryObj } from '@storybook/nextjs';
import { Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';

import Button from '../Button';
import Input from '.';

type InputType = typeof Input;

const meta: Meta<InputType> = {
  title: 'common/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<InputType>;

export const DefaultInput: Story = {
  args: {
    placeholder: '값을 입력해 주세요',
  },
};

export const DisabledInput: Story = {
  args: {
    placeholder: '이미 마감되었어요',
    disabled: true,
  },
};

export const ErrorInput: Story = {
  args: {
    placeholder: '이메일 입력',
    value: 'test@',
    errorMessage: '올바르지 않은 이메일 형식입니다.',
  },
};

export const IconInput: Story = {
  render: (args) => {
    const onClickIcon = () => {
      alert('아이콘을 클릭했습니다.');
    };

    return <Input icon={<X size={20} onClick={onClickIcon} />} {...args} />;
  },
};

export const FormInputExample: Story = {
  render: (args) => {
    const [errorState, setErrorState] = useState({
      id: '',
      password: '',
    });
    const [isTypePassword, setIsTypePassword] = useState(true);

    const onClickChangeType = () => {
      setIsTypePassword(!isTypePassword);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const id = formData.get('id') as string;
      const password = formData.get('password') as string;

      const regexEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

      if (!regexEmail.test(id)) {
        setErrorState((prevState) => ({ ...prevState, id: '올바른 형식의 이메일 주소를 입력해주세요.' }));
      } else {
        setErrorState((prevState) => ({ ...prevState, id: '' }));
      }

      if (password.length < 8) {
        setErrorState((prevState) => ({ ...prevState, password: '8글자 이상 입력해주세요.' }));
      } else {
        setErrorState((prevState) => ({ ...prevState, password: '' }));
      }
    };

    return (
      <>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '350px' }}
          onSubmit={handleSubmit}
        >
          <Input label="아이디" name="id" errorMessage={errorState.id} {...args} />
          <Input
            label="비밀번호"
            type={isTypePassword ? 'password' : 'text'}
            name="password"
            errorMessage={errorState.password}
            icon={
              isTypePassword ? (
                <EyeOff size={20} onClick={onClickChangeType} />
              ) : (
                <Eye size={20} onClick={onClickChangeType} />
              )
            }
            {...args}
          />

          <Button type="submit" className="mt-2" styleType="primary">
            제출하기
          </Button>
        </form>
      </>
    );
  },
};
