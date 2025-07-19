import { PageWrapper } from '@/layouts';
import { cn } from '@/utils/styleMerge';

const SkeletonBox = ({ className }: { className: string }) => {
  return <div className={cn('relative overflow-hidden bg-gray-30', className)} />;
};

const ResumeDetailSkeleton = () => {
  return (
    <PageWrapper className="max-w-4xl my-12 animate-pulse">
      <div className="flex justify-end gap-2 mb-6">
        <SkeletonBox className="w-32 h-10 rounded-lg" />
      </div>

      <div className="border rounded-xl border-gray-30 bg-white">
        <div className="p-8 flex flex-col gap-14 bg-gray-10 rounded-[10px]">
          <div className="flex gap-8">
            <SkeletonBox className="size-[170px]" />
            <div className="flex flex-col justify-center gap-3">
              <SkeletonBox className="w-64 h-10 rounded" />
              <SkeletonBox className="w-48 h-7 rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SkeletonBox className="w-32 h-8 rounded" />
            <div className="py-3 px-4 bg-gray-100">
              <SkeletonBox className="h-24 rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SkeletonBox className="w-32 h-8 rounded" />
            <div className="py-3 px-4 bg-gray-100">
              <SkeletonBox className="h-24 rounded" />
            </div>
            <div className="py-3 px-4 bg-gray-100">
              <SkeletonBox className="h-24 rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SkeletonBox className="w-32 h-8 rounded" />
            <div className="grid grid-cols-1 gap-6">
              <div className="border border-gray-30 rounded-[10px] p-4">
                <SkeletonBox className="h-6 w-3/4 mb-2 rounded" />
                <SkeletonBox className="h-4 w-1/2 mb-4 rounded" />
                <SkeletonBox className="h-16 rounded" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SkeletonBox className="w-32 h-8 rounded" />
            <div className="flex flex-wrap gap-3">
              <SkeletonBox className="w-20 h-8 rounded-full" />
              <SkeletonBox className="w-24 h-8 rounded-full" />
              <SkeletonBox className="w-16 h-8 rounded-full" />
              <SkeletonBox className="w-20 h-8 rounded-full" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SkeletonBox className="w-32 h-8 rounded" />
            <div className="flex flex-wrap gap-20 mt-3">
              <div className="flex flex-col gap-2">
                <SkeletonBox className="w-40 h-6 rounded" />
                <SkeletonBox className="w-24 h-4 rounded" />
              </div>
              <div className="flex flex-col gap-2">
                <SkeletonBox className="w-40 h-6 rounded" />
                <SkeletonBox className="w-24 h-4 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResumeDetailSkeleton;
