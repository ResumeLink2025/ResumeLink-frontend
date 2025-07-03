import { useFieldArray, useFormContext } from 'react-hook-form';

import type { ResumeFormDataType } from '../schemas/resumeSchema';

const useCertificate = () => {
  const { register, control } = useFormContext<ResumeFormDataType>();

  const { fields, append, remove } = useFieldArray({ control, name: 'certificates' });

  const onClickAddCertificate = () => {
    append({ name: '', date: '', grade: '', issuer: '' });
  };

  const onClickDeleteCertificate = (idx: number) => {
    remove(idx);
  };

  return {
    certificates: fields,
    register,
    onClickAddCertificate,
    onClickDeleteCertificate,
  };
};

export default useCertificate;
