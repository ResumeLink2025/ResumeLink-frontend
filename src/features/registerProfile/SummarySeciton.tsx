import Textarea from '@/components/common/Textarea';
import { cn } from '@/utils/styleMerge'; // class 병합 유틸리티 사용

type SummarySectionProps = {
  className?: string;
};

const SummarySection = ({ className }: SummarySectionProps) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Textarea
        label="자기소개"
        placeholder="본인을 소개하는 글을 작성해주세요."
        // {...register('projectDesc')}
        // errorMessage={errors.projectDesc?.message}
      />
    </div>
  );
};

export default SummarySection;
