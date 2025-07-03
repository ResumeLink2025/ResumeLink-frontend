import type { SetStateAction } from 'react';

import { Toggle, Typography } from '@/components/common';

interface PrivateFieldProps {
  isPublic?: boolean;
  onChangePrivateToggle: React.Dispatch<SetStateAction<boolean>>;
}

const PrivateField = ({ isPublic = false, onChangePrivateToggle }: PrivateFieldProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Typography type="body1">프로젝트 공개 여부</Typography>
      <div className="flex items-center gap-3">
        <Toggle checked={isPublic} onChange={onChangePrivateToggle} />
        <Typography type="body2">{isPublic ? '공개' : '비공개'}</Typography>
      </div>
    </div>
  );
};

export default PrivateField;
