import { Plus, X } from 'lucide-react';

import { Typography } from '@/components/common';
import Input from '@/components/common/Input';

import useCertificate from './hooks/useCertificate';

const CertificateField = () => {
  const { certificates, register, onClickAddCertificate, onClickDeleteCertificate } = useCertificate();

  return (
    <div className="p-5 border-2 border-dashed border-gray-60 rounded-[10px] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography type="heading2">자격증</Typography>
        <Plus className="cursor-pointer" onClick={onClickAddCertificate} />
      </div>
      {certificates.map((certificate, idx) => (
        <div key={certificate.id} className="flex flex-col gap-4 border-t border-gray-30 py-2">
          <div className="w-full flex items-center justify-between py-2">
            <Typography type="title2">자격증 {idx + 1}</Typography>
            <X size={20} onClick={() => onClickDeleteCertificate(idx)} className="cursor-pointer" />
          </div>
          <Input
            label="자격증 명"
            placeholder="자격증 명을 입력해주세요."
            {...register(`certificates.${idx}.name`)}
          />
          <div className="flex gap-3">
            <Input label="취득일" type="date" {...register(`certificates.${idx}.date`)} />
            <Input
              label="점수 / 급수"
              type="number"
              step={0.1}
              placeholder="자격증 점수 혹은 급수를 입력해주세요."
              {...register(`certificates.${idx}.grade`)}
            />
          </div>
          <Input
            label="발급 기관"
            placeholder="발급 기관을 입력해주세요."
            {...register(`certificates.${idx}.issuer`)}
          />
        </div>
      ))}
    </div>
  );
};

export default CertificateField;
