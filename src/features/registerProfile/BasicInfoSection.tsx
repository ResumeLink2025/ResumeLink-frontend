import { useRef } from 'react';

import { Typography } from '@/components/common';
import Input from '@/components/common/Input';
import SelectBox from '@/components/common/SelectBox';

import { genderList } from './types';

export default function BasicInfoSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="col-span-1 flex flex-col gap-3">
      <Input label="닉네임" name="nickName" size="medium" placeholder="닉네임" className="rounded-md" />

      <Typography type="body4" className="text-gray-70">
        성별
      </Typography>
      <SelectBox id="gender" size="medium" options={genderList} selectClassName=""></SelectBox>

      <Typography type="body4" className="text-gray-70">
        생일
      </Typography>
      <input
        ref={inputRef}
        type="date"
        onClick={() => inputRef.current?.showPicker?.()}
        className="appearance-auto border border-gray-40 rounded-[10px] cursor-pointer h-[45px] px-3 py-2  focus:ring-yellow-300"
      />
    </div>
  );
}
