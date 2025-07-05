import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { RESUME_RESPONSE } from '@/fixtures/resume';

const useResumeDetail = () => {
  const isThemeBlack = RESUME_RESPONSE.theme === 'black';

  const onClickDownLoadResume = async () => {
    const resumeElement = document.getElementById('pdf-content');
    if (!resumeElement) return;

    const canvas = await html2canvas(resumeElement, {
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

    if (isThemeBlack) {
      pdf.setFillColor(22, 22, 22);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
    }

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position += pdfHeight;
      pdf.addPage();

      if (isThemeBlack) {
        pdf.setFillColor(22, 22, 22);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
      }

      pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('이력서.pdf');
  };

  return { isThemeBlack, onClickDownLoadResume };
};

export default useResumeDetail;
