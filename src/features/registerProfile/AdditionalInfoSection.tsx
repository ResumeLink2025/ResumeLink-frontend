import { Typography } from '@/components/common';
import CustomSelectBox from '@/components/common/customSelectBox';

import { developerList, yearList } from './types';

interface AdditionalInfoSectionProps {
  selectJob: string;
  setSelectJob: (value: string) => void;
  selectYear: string;
  setSelectYear: (value: string) => void;
}

export default function AdditionalInfoSection({
  selectJob,
  setSelectJob,
  selectYear,
  setSelectYear,
}: AdditionalInfoSectionProps) {
  return (
    <>
      <div className="col-span-1 flex flex-col gap-2">
        <Typography type="body4">희망 직무</Typography>
        <CustomSelectBox options={developerList} value={selectJob} onChange={setSelectJob} />
      </div>

      <div className="col-span-1 flex flex-col gap-2">
        <Typography type="body4">연차</Typography>
        <CustomSelectBox options={yearList} value={selectYear} onChange={setSelectYear} />
      </div>
    </>
  );
}
