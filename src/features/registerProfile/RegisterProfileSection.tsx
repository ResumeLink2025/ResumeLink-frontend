'use client';
import { useState } from 'react';

import Input from '@/components/common/Input';

import ActionButtonSection from './ActionButtonSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import AddSkillInfoSection from './AddSkillInfoSection';
import BasicInfoSection from './BasicInfoSection';
import { ProfileHederSection } from './ProfileHeaderSection';
import ProfileImageSection from './ProfileImageSection';
import { developerList, yearList } from './types';

export default function RegisterProfileSection() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectJob, setSelectJob] = useState<string>(developerList[0].value);
  const [selectYear, setSelectYear] = useState<string>(yearList[0].value);

  const handleUploadFile = (files?: FileList | null) => {
    console.log('check');
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
    <div className="flex items-center justify-center bg-white w-full h-full flex-grow pt-40 pb-20">
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        <ProfileHederSection />

        <form className="grid grid-cols-2 gap-4 w-full">
          <ProfileImageSection imageUrl={imageUrl} handleUploadFile={handleUploadFile} />

          <BasicInfoSection />

          <AdditionalInfoSection
            selectJob={selectJob}
            setSelectJob={setSelectJob}
            selectYear={selectYear}
            setSelectYear={setSelectYear}
          />

          <div className="col-span-2 flex flex-col gap-2">
            <Input
              label="기술 스택"
              size="medium"
              placeholder="기술 스택을 검색하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="focus:outline-none "
            />
            <AddSkillInfoSection
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
          </div>

          <ActionButtonSection />
        </form>
      </div>
    </div>
  );
}
