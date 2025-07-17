import { Button } from '@/components/common';
import { DEVELOP_OCCUPATIONS, DEVELOP_SKILLS } from '@/constants/developersHub';

import CategoryList from './CategoryList';
import useResumeCategory from './hooks/useResumeCategory';

export interface ResumeCategoryProps {
  onClose: () => void;
}

const ResumeCategory = ({ onClose }: ResumeCategoryProps) => {
  const { devSkill, occupation, isTypeProject, onClickDevSkill, onClickOccupation, onClickSearchKeyword } =
    useResumeCategory(onClose);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 max-h-50 overflow-y-auto hide-scrollbar">
        <CategoryList
          title="기술 스택"
          categories={DEVELOP_SKILLS}
          checkedList={devSkill}
          onClickCategory={onClickDevSkill}
        />
        {!isTypeProject && (
          <CategoryList
            title="개발 직군"
            categories={DEVELOP_OCCUPATIONS}
            checkedList={occupation}
            onClickCategory={onClickOccupation}
          />
        )}
      </div>
      <Button onClick={onClickSearchKeyword}>검색하기</Button>
    </div>
  );
};

export default ResumeCategory;
