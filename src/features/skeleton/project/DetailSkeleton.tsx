import { PageWrapper } from '@/layouts';

const SkeletonText = ({ type = 'title2', className = '' }) => {
  let heightClass = '';
  let widthClass = '';
  switch (type) {
    case 'heading':
      heightClass = 'h-10';
      widthClass = 'w-3/4';
      break;
    case 'title':
      heightClass = 'h-6';
      widthClass = 'w-1/2';
      break;
    case 'tag':
      heightClass = 'h-8';
      widthClass = 'w-20';
      break;
    default:
      heightClass = 'h-6';
      widthClass = 'w-full';
  }
  return <div className={`bg-gray-200 rounded animate-pulse ${heightClass} ${widthClass} ${className}`} />;
};

const SkeletonImage = () => (
  <div className="size-[190px] bg-gray-200 rounded-[10px] shrink-0 animate-pulse" />
);

const SkeletonTagField = () => (
  <div className="flex flex-col gap-2">
    <SkeletonText type="title" className="w-40" />
    <div className="flex flex-wrap gap-2">
      <SkeletonText type="tag" />
      <SkeletonText type="tag" />
      <SkeletonText type="tag" />
    </div>
  </div>
);

const SkeletonContentField = () => (
  <div className="flex flex-col gap-2">
    <SkeletonText type="title" className="w-56" />
    <div className="bg-gray-25 animate-pulse h-30 px-[18px] py-3 rounded-[10px]" />
  </div>
);

const ProjectDetailSkeleton = () => {
  return (
    <PageWrapper className="max-w-4xl mt-6 mb-10 flex flex-col gap-10">
      <div className="flex gap-8">
        <SkeletonImage />
        <div className="flex flex-col w-full gap-5">
          <div className="flex items-center justify-between">
            <SkeletonText type="heading" className="w-3/4" />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <SkeletonText type="title" className="w-48" />
            <div className="px-3 py-2 rounded bg-gray-10 w-48 h-5" />
          </div>
        </div>
      </div>
      <SkeletonTagField />
      <SkeletonContentField />
      <SkeletonContentField />
    </PageWrapper>
  );
};

export default ProjectDetailSkeleton;
