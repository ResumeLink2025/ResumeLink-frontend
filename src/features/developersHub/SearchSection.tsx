'use client';

import { Button, DropDown, Typography } from '@/components/common';
import Input from '@/components/common/Input';
import useDropDown from '@/hooks/useDropDown';

import { FadeInOutMotion } from '../components';
import useSearchSection from './hooks/useSearchSection';
import useSortProfileSection from './hooks/useSortProfileSection';
import ResumeCategory from './ResumeCategory';
import SortProfileSection from './SortProfileSection';

const SearchSection = () => {
  const { isOpen, onClickToggle, onCloseMenu } = useDropDown();
  const { inputSearch, onChangeSearch, onClickSearchKeyword } = useSearchSection();
  const { currentType } = useSortProfileSection();

  return (
    <div className="mt-12 flex flex-col px-4">
      <div className="flex flex-col justify-between lg:flex-row gap-4">
        <FadeInOutMotion key={currentType}>
          <div className="flex flex-col gap-1">
            <Typography type="heading1">
              {currentType === 'project'
                ? '공개된 프로젝트를 확인해 보세요'
                : '공개된 이력서를 확인해 보세요'}
            </Typography>
            <Typography type="body1" className="text-gray-50">
              {currentType === 'project'
                ? '마음에 드는 프로젝트가 있다면 커피챗 요청을 보내보세요!'
                : '마음에 드는 이력서가 있다면 커피챗 요청을 보내보세요!'}
            </Typography>
          </div>
        </FadeInOutMotion>
        <div className="flex flex-col gap-6 input-lg:flex-row">
          <DropDown onClose={onCloseMenu}>
            <DropDown.Trigger onClick={onClickToggle} size="large">
              카테고리 선택
            </DropDown.Trigger>
            <DropDown.Menu isOpen={isOpen} size="large">
              <ResumeCategory onClose={onCloseMenu} />
            </DropDown.Menu>
          </DropDown>
          <div className="flex gap-3">
            <Input
              size="large"
              className="w-74"
              value={inputSearch}
              onChange={onChangeSearch}
              placeholder="검색어를 입력해주세요."
            />
            <Button className="w-22 h-[50px]" onClick={onClickSearchKeyword}>
              검색
            </Button>
          </div>
        </div>
      </div>
      <SortProfileSection />
    </div>
  );
};

export default SearchSection;
