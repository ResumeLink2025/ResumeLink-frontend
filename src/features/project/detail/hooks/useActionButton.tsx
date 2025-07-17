import { useOverlay } from '@toss/use-overlay';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Modal } from '@/components/common';
import { routeProjectPage } from '@/constants/routes';
import AlertDeleteModal from '@/features/components/AlertDeleteModal';
import useGetMyProfile from '@/hooks/apis/profile/useGetMyProfile';
import useDeleteProject from '@/hooks/apis/project/useDeleteProject';

const useActionButton = (projectNumber?: number) => {
  const router = useRouter();
  const overlay = useOverlay();

  const { data: myProfile } = useGetMyProfile();
  const { mutate: deleteProjectMutate } = useDeleteProject(projectNumber, {
    onSuccess: () => {
      toast.success('프로젝트가 삭제되었습니다.');

      router.replace(routeProjectPage);
    },
    onError: () => {
      overlay.close();
      toast.error('프로젝트 삭제중 에러가 발생했습니다.');
    },
  });

  const onClickRouteUpdateProject = () => {
    router.push(`/project/update/${projectNumber}`);
  };

  const onClickDeleteProject = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <AlertDeleteModal
          isOpen={isOpen}
          close={close}
          title="프로젝트를"
          onClickDelete={deleteProjectMutate}
        />
      </Modal>
    ));
  };

  return { myProfile, onClickRouteUpdateProject, onClickDeleteProject };
};

export default useActionButton;
