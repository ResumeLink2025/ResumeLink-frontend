import { Button } from '@/components/common';
import { DEVELOP_EXPERIENCE, DEVELOP_OCCUPATION } from '@/constants/developersHub';

import CategoryList from './CategoryList';
import useResumeCategory from './hooks/useResumeCategory';

const ResumeCategory = () => {
  const { experience, occupation, onClickExperience, onClickOccupation, onClickSearchKeyword } =
    useResumeCategory();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 max-h-50 overflow-y-auto hide-scrollbar">
        <CategoryList
          title="개발 직군"
          categories={DEVELOP_EXPERIENCE}
          checkedList={experience}
          onClickCategory={onClickExperience}
        />
        <CategoryList
          title="개발 연차"
          categories={DEVELOP_OCCUPATION}
          checkedList={occupation}
          onClickCategory={onClickOccupation}
        />
      </div>
      <Button onClick={onClickSearchKeyword}>검색하기</Button>
    </div>
  );
};

export default ResumeCategory;
