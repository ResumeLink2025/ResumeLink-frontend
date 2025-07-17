import Resume from '@/features/resume';

interface UpdateResumePageProps {
  params: { id: string };
}

const UpdateResumePage = async ({ params }: UpdateResumePageProps) => {
  const { id } = await params;

  return <Resume id={id} />;
};

export default UpdateResumePage;
