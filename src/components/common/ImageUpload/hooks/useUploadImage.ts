import { useRef, useState } from 'react';

import { preventDefaults } from '../utils';

const useUploadImage = (uploadFile: (files?: FileList | null) => void) => {
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleClickRef = () => {
    ref.current?.click();
  };

  // 드래그 요소가 드롭 대상에 들어갈때 발생
  const onDragEnter = (e: React.DragEvent<HTMLButtonElement>) => {
    preventDefaults(e);
    setIsDragging(true);
  };

  // 드래그 요소가 드롭 대상 위에 있을때 발생
  const onDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    preventDefaults(e);
    setIsDragging(true);
  };

  // 드래그 요소가 드롭 대상에서 벗어날때 발생
  const onDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    preventDefaults(e);
    setIsDragging(false);
  };

  // 드래그 요소를 드롭 대상에 놓을때 발생
  const onDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    preventDefaults(e);
    setIsDragging(false);
    uploadFile(e.dataTransfer.files);
  };

  const onChangeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    uploadFile(ref.current?.files);
  };

  const onClickRemoveFile = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    uploadFile(null);
  };

  return {
    ref,
    isDragging,
    handleClickRef,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onChangeFileUpload,
    onClickRemoveFile,
  };
};

export default useUploadImage;
