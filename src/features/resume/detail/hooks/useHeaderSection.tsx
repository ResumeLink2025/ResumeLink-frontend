import { useQueryClient } from '@tanstack/react-query';
import { useOverlay } from '@toss/use-overlay';
import { CircleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button, Modal, Typography } from '@/components/common';
import { routeMainPage } from '@/constants/routes';
import useDeleteResume from '@/hooks/apis/resume/useDeleteResume';
import { RESUME_LIST } from '@/hooks/apis/resume/useGetResumeList';

const useHeaderSection = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const overlay = useOverlay();

  const { mutate: deleteProjectMutate } = useDeleteResume(id, {
    onSuccess: () => {
      toast.success('이력서가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: [RESUME_LIST, 'resume'] });

      router.replace(routeMainPage);
    },
    onError: () => {
      overlay.close();
      toast.error('이력서 삭제중 에러가 발생했습니다.');
    },
  });

  const onClickDeleteResume = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <div className="bg-white p-5 rounded-[10px] flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <CircleAlert size={30} color="red" />
            <Typography type="heading3">이력서를 삭제하시겠습니까?</Typography>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => deleteProjectMutate()}>삭제하기</Button>
            <Button styleType="gray25" onClick={close}>
              취소하기
            </Button>
          </div>
        </div>
      </Modal>
    ));
  };

  const onClickRouteUpdatePage = () => {
    router.push(`/resume/update/${id}`);
  };

  return {
    onClickDeleteResume,
    onClickRouteUpdatePage,
  };
};

export default useHeaderSection;
