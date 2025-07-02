'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { ImageUpload, Tag, Typography } from '@/components/common';
import CustomSelectBox from '@/components/common/customSelectBox';
import Input from '@/components/common/Input';
import SelectBox from '@/components/common/SelctBox';
import { skillList } from '@/constants/skill';

import { developerList, genderList, yearList } from './types';

export default function RegisterProfileSection() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectJob, setSelectJob] = useState<string>(developerList[0].value);
  const [selectYear, setSelectYear] = useState<string>(yearList[0].value);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const filteredSkills = skillList.filter((skill) =>
    skill.value.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="flex items-center justify-center bg-white w-full h-full flex-grow pt-40 pb-20">
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        <Image src="/images/RESUMELINK.png" alt="RESUMELINK" width={200} height={40} className="mb-8" />
        <Typography type="title2" className="text-black mb-6">
          추가 정보 입력
        </Typography>

        <form className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">프로필 사진</label>
            <ImageUpload size="profile" previewUrl={imageUrl} uploadFile={handleUploadFile} />
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <Input
              label="닉네임"
              name="nickName"
              size="medium"
              placeholder="닉네임"
              className="focus:ring-2 focus:ring-yellow-300 rounded-md"
            />

            <Typography type="body4" className="text-gray-70">
              성별
            </Typography>
            <SelectBox id="gender" size="medium" options={genderList}></SelectBox>

            <Typography type="body4" className="text-gray-70">
              생일
            </Typography>
            <input
              ref={inputRef}
              type="date"
              onClick={() => inputRef.current?.showPicker?.()}
              className="appearance-auto border border-gray-40 rounded-[10px] cursor-pointer h-[45px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Typography type="body4">희망 직무</Typography>
            <CustomSelectBox options={developerList} value={selectJob} onChange={setSelectJob} />
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <Typography type="body4">연차</Typography>
            <CustomSelectBox options={yearList} value={selectYear} onChange={setSelectYear} />
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <Input
              label="기술 스택"
              size="medium"
              placeholder="기술 스택을 검색하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {filteredSkills.map((skill, idx) => (
                <button key={idx} type="button" onClick={() => toggleSkill(skill.value)}>
                  <Tag
                    styleType={selectedSkills.includes(skill.value) ? 'primary' : 'outline'}
                    isSelected={selectedSkills.includes(skill.value) ? true : false}
                    size="medium"
                  >
                    {skill.value}
                  </Tag>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-2 flex justify-between mt-4 w-full">
            <button
              type="button"
              className="w-1/3 py-2 bg-gray-200 text-black font-semibold rounded-md hover:bg-gray-300 transition"
            >
              뒤로가기
            </button>
            <button
              type="submit"
              className="w-1/3 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 transition"
            >
              가입 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
