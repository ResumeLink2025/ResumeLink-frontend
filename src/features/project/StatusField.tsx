import { SelectBox, Typography } from '@/components/common';
import { PROJECT_STATUS_OPTIONS } from '@/constants/project';

interface StatusFieldProps {
  projectStatus: string;
  isSubmitted: boolean;
  errorMessage?: string;
  onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StatusField = ({ projectStatus, isSubmitted, errorMessage, onChangeStatus }: StatusFieldProps) => {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <Typography type="body2">프로젝트 진행 상태</Typography>
      <SelectBox
        value={projectStatus}
        onChange={onChangeStatus}
        options={PROJECT_STATUS_OPTIONS}
        placeholder="-"
        errorMessage={isSubmitted ? errorMessage : undefined}
      />
    </div>
  );
};

export default StatusField;
