import type { SetStateAction } from 'react';

import { Toggle, Typography } from '@/components/common';

interface PrivateFieldProps {
  isPublic?: boolean;
  onChangePrivateToggle: React.Dispatch<SetStateAction<boolean>>;
}

const PrivateField = ({ isPublic = false, onChangePrivateToggle }: PrivateFieldProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Typography type="heading2">이력서 공개 여부</Typography>
      <div className="flex items-center gap-3">
        <Toggle checked={isPublic} onChange={onChangePrivateToggle} />
        <Typography type="body1">{isPublic ? '공개' : '비공개'}</Typography>
      </div>
    </div>
  );
};

export default PrivateField;
