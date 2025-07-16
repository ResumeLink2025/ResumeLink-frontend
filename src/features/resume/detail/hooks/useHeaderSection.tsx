import { useQueryClient } from '@tanstack/react-query';
import { useOverlay } from '@toss/use-overlay';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Modal } from '@/components/common';
import { routeMainPage } from '@/constants/routes';
import AlertDeleteModal from '@/features/components/AlertDeleteModal';
import useDeleteResume from '@/hooks/apis/resume/useDeleteResume';
import { RESUME_LIST } from '@/hooks/apis/resume/useGetResumeList';

const useHeaderSection = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const overlay = useOverlay();

  const { mutate: deleteResumeMutate } = useDeleteResume(id, {
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
        <AlertDeleteModal isOpen={isOpen} close={close} title="이력서를" onClickDelete={deleteResumeMutate} />
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
