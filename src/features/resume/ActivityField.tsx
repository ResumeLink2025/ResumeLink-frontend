import { Plus, X } from 'lucide-react';

import { Typography } from '@/components/common';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import type { ActivitiesType } from '@/constants/resume';

import useActivityField from './hooks/useActivityField';

export interface ActivityFieldProps {
  defaultActivities?: ActivitiesType[];
}

const ActivityField = ({ defaultActivities }: ActivityFieldProps) => {
  const { activities, register, onClickAddActivity, onClickDeleteActivity } =
    useActivityField(defaultActivities);

  return (
    <div className="p-5 border-2 border-dashed border-gray-60 rounded-[10px] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Typography type="heading2">개발 관련 활동</Typography>
        <Plus className="cursor-pointer" onClick={onClickAddActivity} />
      </div>
      {activities &&
        activities.map((activity, idx) => (
          <div key={activity.id} className="flex flex-col gap-4 border-t border-gray-30 py-2">
            <div className="w-full flex items-center justify-between py-2">
              <Typography type="title2">개발 관련 활동 {idx + 1}</Typography>
              <X size={20} onClick={() => onClickDeleteActivity(idx)} className="cursor-pointer" />
            </div>
            <Input
              label="개발 관련 활동명"
              placeholder="개발 관련 활동명을 입력해주세요."
              {...register(`activities.${idx}.title`)}
            />
            <div className="flex gap-3">
              <Input label="시작일" type="date" {...register(`activities.${idx}.startDate`)} />
              <Input label="종료일" type="date" {...register(`activities.${idx}.endDate`)} />
            </div>
            <Textarea
              className="mt-2"
              placeholder="개발 관련 활동에 대한 내용을 상세하게 입력해주세요."
              {...register(`activities.${idx}.description`)}
            />
          </div>
        ))}
    </div>
  );
};

export default ActivityField;
