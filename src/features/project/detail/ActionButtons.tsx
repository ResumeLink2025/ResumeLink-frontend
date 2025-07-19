import { Button } from '@/components/common';

import useActionButton from './hooks/useActionButton';

interface ActionButtonProps {
  userId?: string;
  projectNumber?: number;
  requestCoffeeChat: () => Promise<void>;
}

const ActionButtons = ({ userId, projectNumber, requestCoffeeChat }: ActionButtonProps) => {
  const { myProfile, onClickRouteUpdateProject, onClickDeleteProject } = useActionButton(projectNumber);

  return (
    <>
      {userId === myProfile?.profile.id ? (
        <div className="flex items-center">
          <Button size="small" styleType="white" className="w-15" onClick={onClickRouteUpdateProject}>
            수정
          </Button>
          <Button size="small" styleType="white" className="w-15 mr-3" onClick={onClickDeleteProject}>
            삭제
          </Button>
        </div>
      ) : (
        <Button size="small" className="w-32" onClick={requestCoffeeChat}>
          커피챗 신청하기
        </Button>
      )}
    </>
  );
};

export default ActionButtons;
