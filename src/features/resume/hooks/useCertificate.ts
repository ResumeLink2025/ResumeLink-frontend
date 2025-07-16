import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { CertificatesType } from '@/constants/resume';

import type { ResumeFormDataType } from '../schemas/resumeSchema';

const useCertificate = (defaultCertifications?: CertificatesType[]) => {
  const { register, control } = useFormContext<ResumeFormDataType>();
  const { fields, append, remove, replace } = useFieldArray({ control, name: 'certificates' });

  const onClickAddCertificate = () => {
    append({ name: '', date: '', grade: '', issuer: '' });
  };

  const onClickDeleteCertificate = (idx: number) => {
    remove(idx);
  };

  useEffect(() => {
    if (defaultCertifications && defaultCertifications.length > 0) {
      const formattedCertifications = defaultCertifications?.map((certification) => ({
        name: certification.name ?? '',
        date: certification.date ?? '',
        grade: certification.grade ?? '',
        issuer: certification.issuer ?? '',
      }));

      replace(formattedCertifications);
    }
  }, [defaultCertifications, replace]);

  return {
    certificates: fields,
    register,
    onClickAddCertificate,
    onClickDeleteCertificate,
  };
};

export default useCertificate;
