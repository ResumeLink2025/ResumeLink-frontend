import { Button, Tag } from '@/components/common';
import { RESUME_RESPONSE } from '@/fixtures/resume';

interface ActionButtonsProps {
  onClickDownLoadResume: () => void;
  requestCoffeeChat: () => Promise<void>;
}

const ActionButtons = ({ onClickDownLoadResume, requestCoffeeChat }: ActionButtonsProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-3">
        {RESUME_RESPONSE.categories.map((category) => (
          <Tag key={category} styleType="outline">
            # {category}
          </Tag>
        ))}
      </div>
      {false ? (
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
      ) : (
        <Button size="small" className="w-32" onClick={requestCoffeeChat}>
          커피챗 신청하기
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
