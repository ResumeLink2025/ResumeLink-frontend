import { Button } from '@/components/common';

const ActionButtons = () => {
  return (
    <>
      {true ? (
        <div className="flex items-center">
          <Button size="small" styleType="white" className="w-15">
            수정
          </Button>
          <Button size="small" styleType="white" className="w-15 mr-3">
            삭제
          </Button>
        </div>
      ) : (
        <Button size="small" className="w-32">
          커피팻 신청하기
        </Button>
      )}
    </>
  );
};

export default ActionButtons;
