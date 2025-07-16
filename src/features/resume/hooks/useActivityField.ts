import { useFieldArray, useFormContext } from 'react-hook-form';

import type { ResumeFormDataType } from '../schemas/resumeSchema';

const useActivityField = () => {
  const { register, control } = useFormContext<ResumeFormDataType>();
  const { fields, append, remove } = useFieldArray({ control, name: 'activities' });

  const onClickAddActivity = () => {
    append({ title: '', startDate: '', endDate: '', description: '' });
  };

  const onClickDeleteActivity = (idx: number) => {
    remove(idx);
  };

  return {
    activities: fields,
    register,
    onClickAddActivity,
    onClickDeleteActivity,
  };
};

export default useActivityField;
