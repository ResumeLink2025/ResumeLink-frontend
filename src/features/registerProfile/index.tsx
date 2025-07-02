'use client';

import { useState } from 'react';

import { PageWrapper } from '@/layouts';

import FormSection from './FormSection';
import { ProfileHederSection } from './ProfileHeaderSection';

const RegisterInfoPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUploadFile = (files?: FileList | null) => {
    if (!files || files.length === 0) {
      setImageUrl(null); // X버튼 클릭시 이미지 제거하기 위해서 이부분이 꼭 필요함

      return;
    }

    const file = files[0];

    console.log('file', file);
    const imageUrl = URL.createObjectURL(file);

    setImageUrl(imageUrl);
  };
  return (
    <PageWrapper>
      <div className=" flex items-center justify-center bg-white">
        <div className="w-full max-w-2xl flex flex-col items-center px-4">
          <ProfileHederSection />
          <FormSection imageUrl={imageUrl} handleUploadFile={handleUploadFile} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default RegisterInfoPage;
