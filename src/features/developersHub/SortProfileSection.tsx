import { Button, SelectBox } from '@/components/common';
import { FILTER_OPTIONS } from '@/constants/developersHub';

import useSortProfileSection from './hooks/useSortProfileSection';

const SortProfileSection = () => {
  const { currentType, sortProfile, onClickChangeType, onChangeSortProfile } = useSortProfileSection();

  return (
    <div className="w-114 flex gap-3 mt-6">
      <Button
        onClick={() => onClickChangeType('resume')}
        styleType={currentType === 'resume' ? 'primary' : 'outline'}
      >
        이력서
      </Button>
      <Button
        onClick={() => onClickChangeType('project')}
        styleType={currentType === 'project' ? 'primary' : 'outline'}
      >
        프로젝트
      </Button>
      <SelectBox
        className="ml-3"
        options={FILTER_OPTIONS}
        value={sortProfile || 'popular'}
        onChange={onChangeSortProfile}
      />
    </div>
  );
};

export default SortProfileSection;
