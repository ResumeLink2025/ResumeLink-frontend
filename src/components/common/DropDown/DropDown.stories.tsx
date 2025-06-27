import type { Meta, StoryObj } from '@storybook/nextjs';

import Typography from '../Typography';
import DropDown from '.';
import useDropDown from './hooks/useDropDown';

type DropDownType = typeof DropDown;

const meta: Meta<DropDownType> = {
  title: 'common/DropDown',
  component: DropDown,
};

export default meta;

export const DefaultDropDown: StoryObj<DropDownType> = {
  render: () => {
    const { isOpen, onClickToggle, onCloseMenu } = useDropDown();

    return (
      <DropDown onClose={onCloseMenu}>
        <DropDown.Trigger onClick={onClickToggle}>카테고리</DropDown.Trigger>
        <DropDown.Menu isOpen={isOpen}>프로젝트, 이력서 관련 카테고리가 들어가는 공간</DropDown.Menu>
      </DropDown>
    );
  },
};

export const SmallSizeDropDown: StoryObj<DropDownType> = {
  render: () => {
    const { isOpen, onClickToggle, onCloseMenu } = useDropDown();

    return (
      <DropDown onClose={onCloseMenu}>
        <DropDown.Trigger onClick={onClickToggle} size="small">
          카테고리
        </DropDown.Trigger>
        <DropDown.Menu isOpen={isOpen} size="small">
          프로젝트, 이력서 관련 카테고리가 들어가는 공간
        </DropDown.Menu>
      </DropDown>
    );
  },
};

export const LargeSizeDropDown: StoryObj<DropDownType> = {
  render: () => {
    const { isOpen, onClickToggle, onCloseMenu } = useDropDown();

    return (
      <DropDown onClose={onCloseMenu}>
        <DropDown.Trigger onClick={onClickToggle} size="large">
          카테고리
        </DropDown.Trigger>
        <DropDown.Menu isOpen={isOpen} size="large">
          프로젝트, 이력서 관련 카테고리가 들어가는 공간
        </DropDown.Menu>
      </DropDown>
    );
  },
};

export const LeftMenuDropDown: StoryObj<DropDownType> = {
  render: () => {
    const { isOpen, onClickToggle, onCloseMenu } = useDropDown();

    return (
      <DropDown onClose={onCloseMenu}>
        <DropDown.Trigger onClick={onClickToggle} size="large">
          카테고리
        </DropDown.Trigger>
        <DropDown.Menu isOpen={isOpen} size="large" direction="left">
          프로젝트, 이력서 관련 카테고리가 들어가는 공간
        </DropDown.Menu>
      </DropDown>
    );
  },
};

export const DuplicationDropDown: StoryObj<DropDownType> = {
  render: () => {
    const hook1 = useDropDown();
    const hook2 = useDropDown();

    return (
      <div className="flex flex-col gap-20">
        <div className="w-full flex flex-col justify-center items-center">
          <DropDown onClose={hook1.onCloseMenu}>
            <DropDown.Trigger onClick={hook1.onClickToggle}>카테고리</DropDown.Trigger>
            <DropDown.Menu isOpen={hook1.isOpen} direction="left">
              프로젝트, 이력서 관련 카테고리가 들어가는 공간
            </DropDown.Menu>
          </DropDown>

          <Typography>밑에 들어가는 내용.....</Typography>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <DropDown onClose={hook2.onCloseMenu}>
            <DropDown.Trigger onClick={hook2.onClickToggle}>카테고리</DropDown.Trigger>
            <DropDown.Menu isOpen={hook2.isOpen}>
              프로젝트, 이력서 관련 카테고리가 들어가는 공간 <br />
              프로젝트, 이력서 관련 카테고리가 들어가는 공간
            </DropDown.Menu>
          </DropDown>

          <Typography>밑에 들어가는 내용.....</Typography>
        </div>
      </div>
    );
  },
};
