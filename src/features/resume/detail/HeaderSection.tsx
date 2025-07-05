import { Button, Tag } from '@/components/common';
import { RESUME_RESPONSE } from '@/fixtures/resume';

interface ActionButtonsProps {
  onClickDownLoadResume: () => void;
}

const ActionButtons = ({ onClickDownLoadResume }: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-3">
        {RESUME_RESPONSE.categories.map((category) => (
          <Tag key={category.name} styleType="outline">
            # {category.name}
          </Tag>
        ))}
      </div>
      <div className="flex items-center">
        <Button size="small" styleType="white" className="w-15">
          수정
        </Button>
        <Button size="small" styleType="white" className="w-15 mr-3">
          삭제
        </Button>
        <Button onClick={onClickDownLoadResume} size="small" styleType="gray25" className="w-40">
          PDF 파일로 저장하기
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
