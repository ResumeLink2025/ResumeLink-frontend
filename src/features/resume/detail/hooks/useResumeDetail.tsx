import { useOverlay } from '@toss/use-overlay';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import toast from 'react-hot-toast';

import { Loader, Modal } from '@/components/common';
import { createCoffeeChat } from '@/features/chat/apis/chatApi';

const useResumeDetail = (theme?: string) => {
  const isThemeBlack = theme === 'dark';

  const resumeRef = useRef<HTMLDivElement | null>(null);
  const overlay = useOverlay();

  const onClickDownLoadResume = async () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <Loader />
      </Modal>
    ));

    try {
      if (!resumeRef.current) return;

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: isThemeBlack ? '#161616' : '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      const fillBackgroundBlack = () => {
        if (isThemeBlack) {
          pdf.setFillColor(22, 22, 22);
          pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
        }
      };

      fillBackgroundBlack();

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position += pdfHeight;
        pdf.addPage();

        fillBackgroundBlack();

        pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('이력서.pdf');
    } catch {
      toast.error('이력서 다운로드에 실패했어요.');
    } finally {
      overlay.close();
    }
  };
  const requestCoffeeChat = async (receiverId: string) => {
    createCoffeeChat(receiverId);
  };

  return { isThemeBlack, resumeRef, onClickDownLoadResume, requestCoffeeChat };
};

export default useResumeDetail;
