import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import type { ActivitiesType } from '@/constants/resume';

import type { ResumeFormDataType } from '../schemas/resumeSchema';

const useActivityField = (defaultActivities?: ActivitiesType[]) => {
  const { register, control } = useFormContext<ResumeFormDataType>();
  const { fields, append, remove, replace } = useFieldArray({ control, name: 'activities' });

  const onClickAddActivity = () => {
    append({ title: '', startDate: '', endDate: '', description: '' });
  };

  const onClickDeleteActivity = (idx: number) => {
    remove(idx);
  };

  useEffect(() => {
    if (defaultActivities && defaultActivities.length > 0) {
      const formattedActivities = defaultActivities.map((activity) => ({
        title: activity.title ?? '',
        description: activity.description ?? '',
        startDate: activity.startDate ?? '',
        endDate: activity.endDate ?? '',
      }));

      replace(formattedActivities);
    }
  }, [defaultActivities, replace]);

  return {
    activities: fields,
    register,
    onClickAddActivity,
    onClickDeleteActivity,
  };
};

export default useActivityField;
