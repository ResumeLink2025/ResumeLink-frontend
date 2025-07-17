import ResumeDetail from '@/features/resume/detail';

export interface ResumeDetailPageProps {
  params: { id: string };
}

const ResumeDetailPage = async ({ params }: ResumeDetailPageProps) => {
  const { id } = await params;

  return <ResumeDetail id={id} />;
};

export default ResumeDetailPage;
