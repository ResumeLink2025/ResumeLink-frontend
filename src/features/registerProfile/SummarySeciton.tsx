import { useFormContext } from 'react-hook-form';

import Textarea from '@/components/common/Textarea';
import { cn } from '@/utils/styleMerge';

import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';

type Props = { className?: string };

export default function SummarySection({ className }: Props) {
  const { register } = useFormContext<UserProfileType>();

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Textarea label="자기소개" placeholder="본인을 소개하는 글을 작성해주세요." {...register('summary')} />
    </div>
  );
}
