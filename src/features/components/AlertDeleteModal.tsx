import { CircleAlert } from 'lucide-react';

import { Button, Modal, Typography } from '@/components/common';

interface AlertModalProps {
  isOpen: boolean;
  close: () => void;
  title: string;
  onClickDelete: () => void;
}

const AlertDeleteModal = ({ isOpen, close, title, onClickDelete }: AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="bg-white p-5 rounded-[10px] flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <CircleAlert size={30} color="red" />
          <Typography type="heading4" className="text-gray-70">
            {title} 삭제하시겠습니까?
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onClickDelete()}>삭제하기</Button>
          <Button styleType="gray25" onClick={close}>
            취소하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertDeleteModal;
