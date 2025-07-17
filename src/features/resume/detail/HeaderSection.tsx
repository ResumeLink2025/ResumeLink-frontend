import { Button } from '@/components/common';
import useGetMyProfile from '@/hooks/apis/profile/useGetMyProfile';

import useHeaderSection from './hooks/useHeaderSection';

interface ActionButtonsProps {
  resumeId: string;
  userId?: string;
  onClickDownLoadResume: () => void;
}

const ActionButtons = ({ resumeId, userId, onClickDownLoadResume }: ActionButtonsProps) => {
  const { data: myProfile } = useGetMyProfile();
  const { onClickDeleteResume, onClickRouteUpdatePage } = useHeaderSection(resumeId);

  return (
    <div className="flex justify-end mb-4">
      {userId === myProfile?.profile.id ? (
        <div className="flex items-center">
          <Button size="small" styleType="white" className="w-15" onClick={onClickRouteUpdatePage}>
            수정
          </Button>
          <Button size="small" styleType="white" className="w-15 mr-3" onClick={onClickDeleteResume}>
            삭제
          </Button>
          <Button onClick={onClickDownLoadResume} size="small" styleType="gray25" className="w-40">
            PDF 파일로 저장하기
          </Button>
        </div>
      ) : (
        <Button size="small" className="w-32">
          커피챗 신청하기
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
