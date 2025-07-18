import ResumeDetail from '@/features/resume/detail';

const ResumeDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ResumeDetail id={id} />;
};

export default ResumeDetailPage;
